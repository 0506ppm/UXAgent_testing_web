// 商品列表頁面邏輯 (簡化版 - 無按鈕)
(function() {
    'use strict';

    let currentSort = 'sales';

    // 初始化
    function init() {
        setupEventListeners();
        renderProducts();
    }

    // 設定事件監聽器
    function setupEventListeners() {
        // 排序選擇
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', handleSortChange);
        }

        // 視圖切換按鈕
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', handleViewChange);
        });
    }

    // 處理排序變更
    function handleSortChange(e) {
        currentSort = e.target.value;
        renderProducts();
    }

    // 處理視圖變更
    function handleViewChange(e) {
        const btn = e.target;
        const view = btn.dataset.view;

        // 更新按鈕樣式
        document.querySelectorAll('.view-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        // 可以在這裡切換網格/列表視圖
        // 目前只有網格視圖
    }

    // 渲染商品列表
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        // 取得並排序商品
        let products = getAllProducts();
        products = sortProducts(products, currentSort);

        // 清空現有內容
        productGrid.innerHTML = '';

        // 生成商品卡片
        products.forEach(product => {
            const card = createProductCardSimple(product);
            productGrid.appendChild(card);
        });
    }

    // 創建簡化版商品卡片（無按鈕）
    function createProductCardSimple(product) {
        const card = document.createElement('div');
        card.className = 'product-card-simple';
        card.dataset.productId = product.id;

        // 徽章
        let badgeHTML = '';
        if (product.badge) {
            const badgeClass = `badge-${product.badge}`;
            const badgeText = {
                'hot': '1-9顆單盒',
                'new': '新品',
                'gift': '送禮首選',
                'limited': '限量',
                'app': 'APP獨賣',
                'promo': '優惠'
            }[product.badge] || '';

            badgeHTML = `<span class="badge ${badgeClass}">${badgeText}</span>`;
        }

        // 右上角標籤（如果有特別促銷）
        let labelHTML = '';
        if (product.discount) {
            labelHTML = `<div class="product-label-top-right">${product.discount}</div>`;
        }

        card.innerHTML = `
            <div class="product-image-wrapper">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="this.src='https://via.placeholder.com/300x300?text=商品圖片'"
                />
                ${badgeHTML ? `<div class="product-badges">${badgeHTML}</div>` : ''}
                ${labelHTML}
            </div>
            <div class="product-info-simple">
                <h3 class="product-title-simple">${product.name}</h3>
                <div class="product-price-simple">
                    <span class="sale-price">NT$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">NT$${product.originalPrice}</span>` : ''}
                </div>
            </div>
        `;

        // 點擊整張卡片前往詳情頁
        card.addEventListener('click', () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        });

        return card;
    }

    // 頁面載入完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
