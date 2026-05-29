import { BrowserMultiFormatReader } from '@zxing/browser'
import { BarcodeFormat, DecodeHintType } from '@zxing/library'

// 仅识别 CODE_128 格式
const BARCODE_FORMATS = [BarcodeFormat.CODE_128]

function createHints() {
  const hints = new Map()
  hints.set(DecodeHintType.POSSIBLE_FORMATS, BARCODE_FORMATS)
  hints.set(DecodeHintType.TRY_HARDER, true)
  return hints
}

/**
 * 读取图片 EXIF 方向
 * 返回 Orientation 值（1-8），读取失败返回 1
 */
function getExifOrientation(arrayBuffer) {
  try {
    const view = new DataView(arrayBuffer)
    // 检查 JPEG 标志
    if (view.getUint16(0, false) !== 0xFFD8) return 1

    let offset = 2
    while (offset < view.byteLength - 2) {
      const marker = view.getUint16(offset, false)
      offset += 2
      // APP1 标记
      if (marker === 0xFFE1) {
        const length = view.getUint16(offset, false)
        // 检查 Exif 头
        if (view.getUint32(offset + 2, false) === 0x45786966 && // "Exif"
            view.getUint16(offset + 6, false) === 0x0000) {     // NUL NUL
          // 找到 TIFF 头
          const tiffOffset = offset + 8
          const isLittleEndian = view.getUint16(tiffOffset, false) === 0x4949 // "II"
          const ifdOffset = view.getUint32(tiffOffset + 4, isLittleEndian)
          const tags = view.getUint16(tiffOffset + ifdOffset, isLittleEndian)

          for (let i = 0; i < tags; i++) {
            const tagOffset = tiffOffset + ifdOffset + 2 + i * 12
            if (view.getUint16(tagOffset, isLittleEndian) === 0x0112) { // Orientation tag
              return view.getUint16(tagOffset + 8, isLittleEndian)
            }
          }
        }
        offset += length
      } else if ((marker & 0xFF00) === 0xFF00) {
        offset += view.getUint16(offset, false)
      } else {
        break
      }
    }
  } catch (e) {
    // EXIF 解析失败，忽略
  }
  return 1
}

/**
 * 根据 EXIF 方向在 canvas 上正确绘制图片
 * 返回修正后的 Blob URL
 */
async function fixExifAndCreateUrl(file) {
  const orientation = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(getExifOrientation(e.target.result))
    reader.onerror = () => resolve(1)
    reader.readAsArrayBuffer(file)
  })

  // orientation 为 1 或读取失败，不需要修正
  if (orientation <= 1) return URL.createObjectURL(file)

  const img = await new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('图片加载失败'))
    image.src = URL.createObjectURL(file)
  })

  const w = img.naturalWidth
  const h = img.naturalHeight

  // 根据方向确定 canvas 尺寸和变换
  let cw, ch, ctx
  const canvas = document.createElement('canvas')

  switch (orientation) {
    case 2: canvas.width = w; canvas.height = h; ctx = canvas.getContext('2d'); ctx.transform(-1, 0, 0, 1, w, 0); break
    case 3: canvas.width = w; canvas.height = h; ctx = canvas.getContext('2d'); ctx.transform(-1, 0, 0, -1, w, h); break
    case 4: canvas.width = w; canvas.height = h; ctx = canvas.getContext('2d'); ctx.transform(1, 0, 0, -1, 0, h); break
    case 5: canvas.width = h; canvas.height = w; ctx = canvas.getContext('2d'); ctx.transform(0, 1, 1, 0, 0, 0); break
    case 6: canvas.width = h; canvas.height = w; ctx = canvas.getContext('2d'); ctx.transform(0, 1, -1, 0, h, 0); break
    case 7: canvas.width = h; canvas.height = w; ctx = canvas.getContext('2d'); ctx.transform(0, -1, -1, 0, h, w); break
    case 8: canvas.width = h; canvas.height = w; ctx = canvas.getContext('2d'); ctx.transform(0, -1, 1, 0, 0, w); break
    default: canvas.width = w; canvas.height = h; ctx = canvas.getContext('2d'); break
  }

  ctx.drawImage(img, 0, 0)

  // 释放临时 object URL
  URL.revokeObjectURL(img.src)

  // canvas 转 Blob URL
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95))
  return URL.createObjectURL(blob)
}

/**
 * 从图片文件解码条码（仅 CODE_128）
 * 1. 修复 EXIF 方向后用 ZXing 官方 API 解码
 * 2. 如果失败，尝试原图解码（兼容相册图片 EXIF 本身正确的情况）
 * @param {File} file 图片文件
 * @returns {Promise<string>} 解码后的条码文本
 */
export async function decodeFromImage(file) {
  const reader = new BrowserMultiFormatReader(createHints())

  // 策略1：修复 EXIF 方向后解码（解决拍照方向问题）
  let fixedUrl = null
  try {
    fixedUrl = await fixExifAndCreateUrl(file)
    const result = await reader.decodeFromImageUrl(fixedUrl)
    if (result) return result.getText()
  } catch (e) {
    // EXIF 修正后仍无法识别，继续尝试
  } finally {
    if (fixedUrl) URL.revokeObjectURL(fixedUrl)
  }

  // 策略2：直接用原图解码（相册图片通常 EXIF 正确）
  const originalUrl = URL.createObjectURL(file)
  try {
    const result = await reader.decodeFromImageUrl(originalUrl)
    if (result) return result.getText()
  } catch (e) {
    // 原图也无法识别
  } finally {
    URL.revokeObjectURL(originalUrl)
  }

  throw new Error('无法识别图片中的条码')
}
