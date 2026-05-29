---
title: "Git工作流"
tags: [经验, Git, SSH]
created: 2026-05-30
---

# Git 工作流

## SSH 推送配置

公司网络封 HTTPS 443 端口，需通过 SSH 推送：

```bash
# 生成 key
ssh-keygen -t ed25519 -C "kewocs-erp"

# 添加到 GitHub Settings -> SSH Keys

# 切换远程
git remote set-url origin git@github.com:a18361272323/kewocs-erp.git

# Windows 需配置使用原生 OpenSSH
git config --global core.sshCommand 'C:/Windows/System32/OpenSSH/ssh.exe'
```

## 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
chore: 杂项/构建
```

## 安全编辑流程

1. 从 git 取原始文件: `git show <commit>:<path>`
2. 做逻辑修改（字符串替换）
3. UTF-8 无 BOM 写入
4. 扫描验证: `regex �` 检测损坏
5. 提交推送

## 常见问题

| 问题 | 诊断 | 解决 |
|------|------|------|
| HTTPS 超时 | `Test-NetConnection github.com 443` | 用 SSH |
| SSH key 不生效 | `ssh -T git@github.com` | 检查 key 是否添加到 GitHub |
| 中文用户名路径 | Git 自带 SSH 无法处理中文路径 | 切换原生 OpenSSH |
| 编码损坏 | grep `�` | 从 git 恢复 |
