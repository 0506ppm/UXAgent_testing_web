# 娘家保健生技 - 測試網站

這是一個模擬娘家保健生技官方網站的靜態測試網站，專門用於 UXAgent 自動化測試。

## 專案特點

✅ **純靜態** - 不需要後端伺服器、資料庫或 Docker
✅ **UXAgent 友善** - 完全符合 UXAgent parser.js 的解析需求
✅ **語義化 HTML** - 所有互動元素都有清晰的屬性標記
✅ **模擬完整購物流程** - 商品瀏覽、詳情、加入購物車、結帳
✅ **Toast 提示訊息** - 符合 parser.js 的 toast 監聽機制
✅ **購物車徽章追蹤** - 支援 cart-count 數量變化檢測

## 檔案結構

```
testing_web/
├── products.html           # 商品列表頁 (主頁)
├── product-detail.html     # 商品詳情頁
├── cart.html              # 購物車頁面
├── css/
│   └── style.css          # 所有樣式
├── js/
│   ├── products-data.js   # 商品資料
│   ├── cart.js            # 購物車邏輯
│   ├── products.js        # 商品列表頁互動
│   ├── product-detail.js  # 商品詳情頁互動
│   └── cart-page.js       # 購物車頁面互動
└── images/                # 商品圖片 (選用)
```

## 快速開始

### 方法 1：直接打開 HTML 檔案

```bash
# 在瀏覽器中開啟
open products.html
```

### 方法 2：使用簡易 HTTP 伺服器

```bash
# 使用 Python 3
python3 -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000

# 然後在瀏覽器訪問
# http://localhost:8000/products.html
```

### 方法 3：使用 Node.js http-server

```bash
# 安裝 http-server (只需一次)
npm install -g http-server

# 啟動伺服器
http-server -p 8000

# 訪問 http://localhost:8000/products.html
```

## 與 UXAgent 整合

### 1. 啟動網站

```bash
cd /Users/akiraeason/Desktop/testing_web
python3 -m http.server 8000
```

### 2. 執行 UXAgent 測試

```bash
cd /Users/akiraeason/Desktop/UXAgent

# 單一測試
uv run -m src.simulated_web_agent.main \
  --intent "在娘家保健網站購買滷蛋白君" \
  --start-url "http://localhost:8000/products.html" \
  --max-steps 20 \
  --headed

# 或使用配置檔案
uv run -m src.simulated_web_agent.main.run
```

### 3. 測試場景建議

**基礎場景：**
- 瀏覽商品列表
- 點擊商品進入詳情頁
- 調整商品數量
- 加入購物車
- 查看購物車
- 模擬結帳

**進階場景：**
- 使用分類篩選
- 使用排序功能
- 對比不同商品
- 修改購物車數量
- 移除購物車商品

## 頁面說明

### 商品列表頁 (products.html)

**URL:** `http://localhost:8000/products.html`

**主要功能：**
- 商品分類標籤（全部、滴雞精、養生湯品、健康零食）
- 排序選擇（熱賣、價格、最新）
- 商品網格展示（6 個商品）
- 加入購物車 / 立即購買按鈕
- 購物車徽章（顯示商品數量）

**測試要點：**
- 分類切換是否正常
- 排序功能是否生效
- 加入購物車後徽章數字是否更新
- Toast 提示訊息是否顯示

### 商品詳情頁 (product-detail.html)

**URL:** `http://localhost:8000/product-detail.html?id=1`

**主要功能：**
- 商品圖片輪播（4 張圖片）
- 商品資訊展示（價格、規格、特點）
- 數量選擇器（+/- 按鈕）
- 加入購物車 / 立即購買 / 加入收藏
- 配送方式選擇
- 付款方式展示
- 頁籤切換（商品說明、規格說明、配送說明）
- 推薦商品

**測試要點：**
- 圖片切換是否正常
- 數量增減是否正確
- 加入購物車後是否跳出 Toast
- 立即購買是否導向購物車頁面
- 頁籤切換是否正常

### 購物車頁面 (cart.html)

**URL:** `http://localhost:8000/cart.html`

**主要功能：**
- 購物車商品列表
- 數量調整（+/- 按鈕 / 直接輸入）
- 移除商品
- 即時計算總額
- 運費計算（滿 1500 免運）
- 促銷資訊顯示
- 前往結帳按鈕

**測試要點：**
- 商品數量修改後總額是否更新
- 移除商品是否需要確認
- 空購物車時是否顯示提示
- 結帳按鈕是否正常運作

## UXAgent Parser 相容性

本網站完全符合 UXAgent 的 parser.js 解析需求：

### ✅ 語義化標籤
- 使用標準 `<button>`, `<a>`, `<input>`, `<select>`
- 所有互動元素都有 `cursor: pointer`
- 避免使用 SVG、Canvas 等會被忽略的標籤

### ✅ 重要屬性
```html
<!-- Parser 會保留這些屬性 -->
<button
  id="add-to-cart"           ✅ id
  type="button"              ✅ type
  name="add-to-cart-btn"     ✅ name
  title="加入購物車"          ✅ title
  aria-label="加入購物車"     ✅ aria-label
  data-product-id="1"        ✅ data-*
>
  加入購物車
</button>
```

### ✅ Toast 訊息
```html
<!-- Parser 會自動捕捉這些 class -->
<div class="toast">商品已加入購物車</div>
<div role="alert">操作成功</div>
```

### ✅ 購物車徽章
```html
<!-- Parser 會追蹤數量變化 -->
<span class="cart-count" id="cart-count">3</span>
```

### ✅ 價格標示
```html
<!-- Parser 會識別價格類型 -->
<span class="original-price" style="text-decoration: line-through">
  NT$ 250
</span>
<span class="sale-price">NT$ 225</span>
```

## 商品資料

預設提供 6 個商品：

1. **娘家廚房x職人雞 滷蛋白君-醬香** (NT$ 225，原價 NT$ 250)
2. **娘家大紅麴膠囊** (NT$ 1,200，原價 NT$ 1,500)
3. **娘家滴雞精禮盒** (NT$ 2,800，原價 NT$ 3,200)
4. **娘家益生菌** (NT$ 880，原價 NT$ 1,000)
5. **娘家深海魚油** (NT$ 1,580，原價 NT$ 1,800)
6. **娘家養生雞湯** (NT$ 1,980，原價 NT$ 2,200)

所有商品資料都在 `js/products-data.js` 中，可以輕鬆修改或新增。

## 資料持久化

購物車資料使用 `localStorage` 儲存，關閉瀏覽器後資料仍會保留。

### 清空購物車資料

```javascript
// 在瀏覽器 Console 執行
localStorage.removeItem('ftvmall_cart');
location.reload();
```

### 查看購物車資料

```javascript
// 在瀏覽器 Console 執行
console.log(JSON.parse(localStorage.getItem('ftvmall_cart')));
```

## 自訂商品資料

編輯 `js/products-data.js`：

```javascript
const PRODUCTS = [
    {
        id: '7',  // 唯一 ID
        name: '新商品名稱',
        category: 'supplement',  // 分類
        price: 1200,
        originalPrice: 1500,
        image: 'images/product-7.jpg',
        images: ['images/product-7.jpg'],  // 多張圖片
        description: '商品說明...',
        sku: '10006',
        stock: 30,
        badge: 'new'  // 徽章: hot, new, gift, limited
    }
];
```

## 測試建議

### 1. 基礎操作測試
```bash
uv run -m src.simulated_web_agent.main \
  --intent "瀏覽商品並將滷蛋白君加入購物車" \
  --start-url "http://localhost:8000/products.html" \
  --max-steps 15
```

### 2. 完整購物流程測試
```bash
uv run -m src.simulated_web_agent.main \
  --intent "購買 2 個滷蛋白君和 1 個大紅麴膠囊" \
  --start-url "http://localhost:8000/products.html" \
  --max-steps 30
```

### 3. UI 導航測試
```bash
uv run -m src.simulated_web_agent.main \
  --intent "瀏覽不同分類的商品並比較價格" \
  --start-url "http://localhost:8000/products.html" \
  --max-steps 20
```

## 除錯技巧

### 1. 查看 Parser 輸出

在 UXAgent 執行過程中，會產生 `simp_html/` 目錄，可以查看 parser 解析後的 HTML：

```bash
# 查看最新的解析結果
cat runs/最新時間戳_*/simp_html/step_*.html
```

### 2. 查看 Toast 捕捉

Parser 會在 observation 中記錄 toast 訊息：

```bash
# 查看觀察記錄
cat runs/最新時間戳_*/observation_trace/*.json | grep toast
```

### 3. 查看購物車變化

Parser 會追蹤購物車徽章數量變化：

```bash
# 在瀏覽器 Console 執行
window.__getToastMessages()
```

## 常見問題

### Q: 為什麼圖片顯示不出來？
A: 預設使用 placeholder 圖片。如果要使用真實圖片，請將圖片放到 `images/` 目錄並命名為 `product-1.jpg`, `product-2.jpg` 等。

### Q: 如何重置購物車？
A: 在瀏覽器 Console 執行：
```javascript
localStorage.clear();
location.reload();
```

### Q: 能否修改商品數量？
A: 可以！編輯 `js/products-data.js` 修改 `PRODUCTS` 陣列即可。

### Q: 如何新增更多頁面？
A: 複製現有的 HTML 檔案並修改內容，然後在導航列加上連結。

## 技術規格

- **HTML5** - 語義化標籤
- **CSS3** - Flexbox & Grid 佈局
- **Vanilla JavaScript** - 無框架依賴
- **localStorage API** - 購物車資料持久化
- **響應式設計** - 支援桌面和行動裝置

## 授權

此專案僅供 UXAgent 測試使用，不得用於商業用途。

## 聯絡資訊

如有問題，請聯絡專案維護者。
