# 🚀 EchoMind 网站部署指南

## ✅ 构建测试通过

项目已成功通过生产构建测试！

## 推荐部署方案

### 方案 1: Vercel (最推荐 ⭐)

**特点：**
- ✅ 完全免费（个人项目）
- ✅ 零配置，自动识别 Next.js
- ✅ 全球 CDN + 自动 HTTPS
- ✅ 每次 git push 自动部署
- ✅ 无限带宽

**步骤：**

1. **初始化 Git 仓库**
   ```bash
   cd /Users/bytedance/echomind-website
   git init
   git add .
   git commit -m "Initial commit - EchoMind website"
   ```

2. **推送到 GitHub**
   ```bash
   # 在 GitHub 创建新仓库: echomind-website
   git remote add origin https://github.com/YOUR_USERNAME/echomind-website.git
   git branch -M main
   git push -u origin main
   ```

3. **部署到 Vercel**
   - 访问: https://vercel.com/signup
   - 使用 GitHub 账号登录
   - 点击 "Add New Project"
   - 选择 `echomind-website` 仓库
   - 点击 "Deploy" (无需任何配置)
   - 等待 1-2 分钟，完成！

4. **获取域名**
   - Vercel 会自动分配: `echomind-website.vercel.app`
   - 也可以绑定自定义域名（在 Project Settings → Domains）

---

### 方案 2: Netlify

**步骤：**

1. 推送代码到 GitHub (同上)

2. 部署到 Netlify
   - 访问: https://app.netlify.com
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库
   - 构建设置：
     - Build command: `npm run build`
     - Publish directory: `.next`
   - 点击 "Deploy site"

---

### 方案 3: Cloudflare Pages

**步骤：**

1. 推送代码到 GitHub (同上)

2. 部署到 Cloudflare Pages
   - 访问: https://dash.cloudflare.com
   - 选择 "Workers & Pages"
   - 点击 "Create application" → "Pages"
   - 连接 GitHub 仓库
   - 框架预设选择: `Next.js`
   - 点击 "Save and Deploy"

---

### 方案 4: 自己的服务器 (VPS)

如果你有阿里云、腾讯云等 VPS：

```bash
# 1. SSH 登录服务器
ssh user@your-server-ip

# 2. 安装 Node.js (如果没有)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 克隆代码
git clone https://github.com/YOUR_USERNAME/echomind-website.git
cd echomind-website

# 4. 安装依赖
npm install

# 5. 构建
npm run build

# 6. 使用 PM2 保持运行
npm install -g pm2
pm2 start npm --name "echomind" -- start
pm2 save
pm2 startup

# 7. 配置 Nginx (可选)
sudo nano /etc/nginx/sites-available/echomind

# 添加配置:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 启用配置
sudo ln -s /etc/nginx/sites-available/echomind /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 📋 部署前检查清单

- [x] ✅ 生产构建成功 (`npm run build`)
- [x] ✅ `.gitignore` 已配置
- [ ] 📝 创建 GitHub 仓库
- [ ] 🚀 选择部署平台
- [ ] 🌐 配置自定义域名（可选）

---

## 🔧 环境变量（如果需要）

目前项目不需要环境变量，但如果将来需要，在 Vercel/Netlify 的项目设置中添加：

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

---

## 📊 当前网站状态

- **构建工具**: Next.js 16
- **音频文件**: 已包含在 `public/audio/` (会自动部署)
- **数据文件**: 已包含在 `data/` (静态 JSON)
- **图片**: 已包含在 `public/images/`

---

## 🎯 推荐操作流程

```bash
# 1. 初始化 Git
cd /Users/bytedance/echomind-website
git init
git add .
git commit -m "Initial commit"

# 2. 推送到 GitHub
# (在 GitHub 网页创建仓库后)
git remote add origin https://github.com/YOUR_USERNAME/echomind-website.git
git push -u origin main

# 3. 访问 Vercel
open https://vercel.com

# 4. 导入项目并部署
# (在 Vercel 网页操作)
```

---

## 🆘 常见问题

### Q: 音频文件太大会影响部署吗？
A: Vercel/Netlify 对静态资源有大小限制。如果音频文件总大小超过 1GB，建议使用对象存储（如 AWS S3、阿里云 OSS）。

### Q: 如何更新已部署的网站？
A: 只需 `git push`，Vercel/Netlify 会自动重新部署。

### Q: 可以使用自己的域名吗？
A: 可以！在部署平台的项目设置中添加自定义域名，然后在域名商处添加 CNAME 记录。

---

## 🎉 部署成功后

你的网站将可以通过以下地址访问：
- Vercel: `https://echomind-website.vercel.app`
- Netlify: `https://echomind-website.netlify.app`
- Cloudflare: `https://echomind-website.pages.dev`

或者你的自定义域名！
