#!/bin/bash

echo "🚀 EchoMind 网站快速部署脚本"
echo "================================"
echo ""

# 检查是否已经是 git 仓库
if [ ! -d .git ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit - EchoMind website"
    echo "✅ Git 仓库初始化完成"
    echo ""
    echo "📝 下一步操作："
    echo "1. 在 GitHub 创建新仓库: https://github.com/new"
    echo "2. 仓库名称建议: echomind-website"
    echo "3. 创建后，运行以下命令:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/echomind-website.git"
    echo "   git push -u origin main"
    echo ""
    echo "4. 然后访问 Vercel 部署: https://vercel.com/new"
else
    echo "✅ Git 仓库已存在"
    
    # 检查是否有远程仓库
    if git remote | grep -q origin; then
        echo "✅ 远程仓库已配置"
        echo ""
        echo "📤 推送最新代码..."
        git add .
        git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有新的更改"
        git push
        echo ""
        echo "✅ 代码已推送！Vercel 会自动重新部署。"
    else
        echo "⚠️  未配置远程仓库"
        echo ""
        echo "请先配置 GitHub 仓库:"
        echo "   git remote add origin https://github.com/YOUR_USERNAME/echomind-website.git"
        echo "   git push -u origin main"
    fi
fi

echo ""
echo "🎯 部署平台链接:"
echo "   Vercel: https://vercel.com"
echo "   Netlify: https://netlify.com"
echo "   Cloudflare Pages: https://pages.cloudflare.com"
