# 部署指南

## 推送到 GitHub

### 方法 1: 使用 GitHub CLI (推薦)

```bash
# 1. 登入 GitHub
gh auth login

# 2. 創建 repository 並推送
gh repo create mama-health-testing-web --public --source=. --description="娘家保健生技測試網站 - 用於 UXAgent 自動化測試" --push
```

### 方法 2: 手動推送

```bash
# 1. 在 GitHub 網站上創建新 repository
# 前往 https://github.com/new
# Repository name: mama-health-testing-web
# Description: 娘家保健生技測試網站 - 用於 UXAgent 自動化測試
# Public repository
# 不要初始化 README、.gitignore 或 license

# 2. 在終端機執行以下命令（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/mama-health-testing-web.git
git branch -M main
git push -u origin main
```

## 本地運行

### 在 localhost:3000 運行

```bash
cd /Users/akiraeason/Desktop/testing_web
python3 -m http.server 3000
```

然後在瀏覽器開啟：http://localhost:3000/products.html

### 停止伺服器

```bash
# 按 Ctrl+C 或執行
pkill -f 'python3 -m http.server 3000'
```

## 與 UXAgent 整合測試

```bash
# 1. 啟動網站
cd /Users/akiraeason/Desktop/testing_web
python3 -m http.server 3000

# 2. 在另一個終端機執行 UXAgent
cd /Users/akiraeason/Desktop/UXAgent

uv run -m src.simulated_web_agent.main \
  --intent "在娘家保健網站瀏覽商品並將滷蛋白君加入購物車" \
  --start-url "http://localhost:3000/products.html" \
  --max-steps 20 \
  --headed
```

## GitHub Pages 部署（可選）

如果要將網站部署到 GitHub Pages：

```bash
# 1. 推送到 GitHub 後，前往 repository 設定
# 2. 點選 "Pages"
# 3. Source: 選擇 "main" branch
# 4. 點擊 "Save"
# 5. 等待幾分鐘，網站會部署到：
# https://YOUR_USERNAME.github.io/mama-health-testing-web/products.html
```

注意：GitHub Pages 上的網站可能需要調整路徑，因為會有 repository name 作為前綴。
