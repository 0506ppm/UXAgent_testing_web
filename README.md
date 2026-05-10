# 娘家保健生技測試網站

模擬娘家保健生技官方網站的靜態測試網站，用於 UXAgent 自動化測試。

## 快速啟動

```bash
python3 -m http.server 3000
```

然後在瀏覽器開啟：http://localhost:3000/products.html

## 專案結構

```
├── products.html       # 商品列表頁
├── product-detail.html # 商品詳情頁
├── cart.html          # 購物車頁面
├── css/style.css      # 樣式
├── js/                # JavaScript
└── images/            # 圖片資源
```

## 測試 UXAgent

```bash
# 啟動網站
python3 -m http.server 3000

# 執行 UXAgent（另開終端機）
cd /Users/akiraeason/Desktop/UXAgent
uv run -m src.simulated_web_agent.main \
  --intent "瀏覽商品並加入購物車" \
  --start-url "http://localhost:3000/products.html" \
  --max-steps 20
```
