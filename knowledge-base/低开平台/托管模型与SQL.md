---
title: "托管模型与SQL"
tags: [低开平台, 数据模型, SQL]
created: 2026-05-30
---

# 托管模型与 SQL

## 托管模型

> [!warning] 数据安全
> 平台仅能存放脱敏后的"敏感二级"和"其他一般"等级信息。

### 新建模型
- 填写模型名称 -> 自动生成拼音首字母表名
- 短文本字段支持: 网址校验、身份证校验、自定义正则
- 短文本字段支持**唯一性校验**

### 字段类型
短文本、长文本、数字、日期、日期时间、下拉、文件、图片等

## SQL 语法 (MySQL)

### 查询
```sql
SELECT column_name FROM table_name
[WHERE Clause]
[LIMIT N] [OFFSET M]
```
- 仅支持**单表查询**
- `SELECT *` 返回所有字段
- `LIMIT` 限制返回数, `OFFSET` 指定偏移

### 新增
```sql
INSERT INTO table_name (field1, field2) VALUES (value1, value2)
```

### 更新
```sql
UPDATE table_name SET field1=value1 [WHERE Clause]
```

### 删除
```sql
DELETE FROM table_name [WHERE Clause]
```

## 入参与 SQL 的对应关系

> [!important]
> 模型方法运行时的入参 JSON key 必须与 SQL 中 `#{xxx}` 匹配。
> SQL: `WHERE sn_code = #{sn_code}` -> 入参: `{ "sn_code": "xxx" }`

## 模型关键字限制

- 模型名: 中文+字母+数字, <=50字符
- 字段名: 字母+数字+下划线, <=64字符
- modelKey: 系统自动生成 10 位

## 相关笔记

- [[模型方法运行]]
- [[../项目架构/模型速查]]
- [[平台核心概念]]
