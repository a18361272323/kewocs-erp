import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'
import { generateModelContracts, parseModelContracts } from './gen_model_contracts.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const preserveKeys = new Set(['current', 'pageSize', 'orders', 'appTag', 'modelKey', 'methodKey'])

function toPlatformKey(key) {
  return preserveKeys.has(key) ? key : key.replace(/([A-Z])/g, '_$1').toLowerCase()
}

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), 'utf8')
}

function parseJs(source, filename) {
  return parse(source, {
    sourceType: 'module',
    plugins: ['jsx'],
    errorRecovery: true,
    sourceFilename: filename
  })
}

function extractScript(source) {
  return source.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] || source
}

function walk(node, visitor) {
  if (!node || typeof node !== 'object') return
  visitor(node)
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const child of value) {
        if (child && typeof child.type === 'string') walk(child, visitor)
      }
    } else if (value && typeof value.type === 'string') {
      walk(value, visitor)
    }
  }
}

function listSourceFiles(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...listSourceFiles(fullPath))
    } else if (/\.(js|vue)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

function objectStringMap(node) {
  const result = {}
  if (node?.type !== 'ObjectExpression') return result
  for (const property of node.properties) {
    if (property.type !== 'ObjectProperty') continue
    const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
    if (property.value.type === 'StringLiteral') result[key] = property.value.value
  }
  return result
}

function objectKeys(node) {
  if (node?.type !== 'ObjectExpression') return []
  return node.properties
    .filter(property => property.type === 'ObjectProperty')
    .map(property => property.key.type === 'Identifier' ? property.key.name : property.key.value)
}

function buildApiReferenceMap() {
  const source = readText('src/api/index.js')
  const ast = parseJs(source, 'src/api/index.js')
  const constants = {}
  const apiMap = new Map()

  for (const statement of ast.program.body) {
    if (statement.type !== 'ExportNamedDeclaration' || statement.declaration?.type !== 'VariableDeclaration') continue
    for (const declaration of statement.declaration.declarations) {
      if (['MODEL_KEYS', 'METHOD_KEYS'].includes(declaration.id.name)) {
        constants[declaration.id.name] = objectStringMap(declaration.init)
      }
    }
  }

  function resolve(node) {
    if (!node) return null
    if (node.type === 'StringLiteral') return node.value
    if (
      node.type === 'MemberExpression' &&
      node.object.type === 'Identifier' &&
      node.property.type === 'Identifier'
    ) {
      return constants[node.object.name]?.[node.property.name] || null
    }
    return null
  }

  function findRunModelMethod(node) {
    let found = null
    walk(node, current => {
      if (
        !found &&
        current.type === 'CallExpression' &&
        current.callee.type === 'Identifier' &&
        current.callee.name === 'runModelMethod'
      ) {
        found = current
      }
    })
    return found
  }

  for (const statement of ast.program.body) {
    if (statement.type !== 'ExportNamedDeclaration' || statement.declaration?.type !== 'VariableDeclaration') continue
    for (const declaration of statement.declaration.declarations) {
      if (declaration.init?.type !== 'ObjectExpression') continue
      const apiName = declaration.id.name
      for (const property of declaration.init.properties) {
        const methodName = property.key?.type === 'Identifier' ? property.key.name : property.key?.value
        const methodNode = property.type === 'ObjectMethod' ? property : property.value
        const call = findRunModelMethod(methodNode)
        if (call) {
          apiMap.set(`${apiName}.${methodName}`, {
            modelKey: resolve(call.arguments[0]),
            methodKey: resolve(call.arguments[1])
          })
        }
      }
    }
  }

  for (const statement of ast.program.body) {
    if (statement.type === 'ExpressionStatement' && statement.expression.type === 'AssignmentExpression') {
      const left = statement.expression.left
      const right = statement.expression.right
      if (
        left.type === 'MemberExpression' &&
        right.type === 'MemberExpression' &&
        left.object.type === 'Identifier' &&
        right.object.type === 'Identifier' &&
        left.object.name === right.object.name &&
        left.property.type === 'Identifier' &&
        right.property.type === 'Identifier'
      ) {
        const target = `${right.object.name}.${right.property.name}`
        if (apiMap.has(target)) apiMap.set(`${left.object.name}.${left.property.name}`, apiMap.get(target))
      }
    }
  }

  return { apiMap, constants }
}

function validateRunModelMethodCalls(contracts, constants) {
  const issues = []
  const source = readText('src/api/index.js')
  const ast = parseJs(source, 'src/api/index.js')

  function resolve(node) {
    if (!node) return null
    if (node.type === 'StringLiteral') return node.value
    if (
      node.type === 'MemberExpression' &&
      node.object.type === 'Identifier' &&
      node.property.type === 'Identifier'
    ) {
      return constants[node.object.name]?.[node.property.name] || null
    }
    return null
  }

  function checkKeys(file, line, modelKey, methodKey, keys) {
    const contract = contracts[modelKey]?.methods?.[methodKey]
    if (!contract) {
      issues.push(`${file}:${line} unknown model/method ${modelKey || '?'} ${methodKey || '?'}`)
      return
    }
    for (const key of keys) {
      const normalized = toPlatformKey(key)
      if (!contract.inputs.includes(normalized)) {
        issues.push(`${file}:${line} ${modelKey}.${methodKey} does not accept "${key}" (normalized: "${normalized}")`)
      }
    }
  }

  walk(ast.program, node => {
    if (
      node.type !== 'CallExpression' ||
      node.callee.type !== 'Identifier' ||
      node.callee.name !== 'runModelMethod'
    ) {
      return
    }
    const modelKey = resolve(node.arguments[0])
    const methodKey = resolve(node.arguments[1])
    if (node.arguments[2]?.type === 'ObjectExpression') {
      checkKeys('src/api/index.js', node.loc.start.line, modelKey, methodKey, objectKeys(node.arguments[2]))
    }
  })

  return issues
}

function validateSourceCallLiterals(contracts, apiMap) {
  const issues = []
  const files = [
    ...listSourceFiles(path.join(rootDir, 'src')),
    ...listSourceFiles(path.join(rootDir, 'src-mobile'))
  ]

  function checkKeys(file, line, apiName, keys) {
    const ref = apiMap.get(apiName)
    const contract = ref && contracts[ref.modelKey]?.methods?.[ref.methodKey]
    if (!contract) return
    for (const key of keys) {
      const normalized = toPlatformKey(key)
      if (!contract.inputs.includes(normalized)) {
        issues.push(`${file}:${line} ${apiName} does not accept "${key}" (normalized: "${normalized}")`)
      }
    }
  }

  for (const fullPath of files) {
    const relativePath = path.relative(rootDir, fullPath).replaceAll('\\', '/')
    let ast
    try {
      ast = parseJs(extractScript(fs.readFileSync(fullPath, 'utf8')), relativePath)
    } catch {
      continue
    }

    walk(ast.program, node => {
      if (node.type !== 'CallExpression') return
      if (
        node.callee.type !== 'MemberExpression' ||
        node.callee.object.type !== 'Identifier' ||
        node.callee.property.type !== 'Identifier'
      ) {
        return
      }
      const apiName = `${node.callee.object.name}.${node.callee.property.name}`
      if (!apiMap.has(apiName) || node.arguments[0]?.type !== 'ObjectExpression') return
      checkKeys(relativePath, node.loc.start.line, apiName, objectKeys(node.arguments[0]))
    })
  }

  return issues
}

const generated = generateModelContracts()
const currentContractsPath = path.join(rootDir, 'src', 'api', 'modelContracts.js')
if (!fs.existsSync(currentContractsPath) || fs.readFileSync(currentContractsPath, 'utf8') !== generated) {
  console.error('src/api/modelContracts.js is out of sync. Run: npm run gen:api-contracts')
  process.exit(1)
}

const contracts = parseModelContracts(readText('docs/MODEL_API_DOCS.md'))
const { apiMap, constants } = buildApiReferenceMap()
const issues = [
  ...validateRunModelMethodCalls(contracts, constants),
  ...validateSourceCallLiterals(contracts, apiMap)
]

if (issues.length > 0) {
  console.error('API contract check failed:')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exit(1)
}

console.log('API contract check passed.')
