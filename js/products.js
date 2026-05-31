// 商品列表頁面邏輯
(function() {
    'use strict';

    let currentCategory = 'all';
    let currentSort = 'sales';

    // 初始化
    function init() {
        setupEventListeners();
        renderProducts();
    }

    // 設定事件監聽器
    function setupEventListeners() {
        // 分類標籤
        const categoryTabs = document.querySelectorAll('.category-tab');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', handleCategoryChange);
        });

        // 排序選擇
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', handleSortChange);
        }

        // 清除篩選
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', handleClearFilters);
        }

        // 加入購物車按鈕 (事件委派)
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            productGrid.addEventListener('click', handleProductAction);
        }
    }

    // 處理分類變更
    function handleCategoryChange(e) {
        const tab = e.target;
        currentCategory = tab.dataset.category;

        // 更新分類標籤樣式
        document.querySelectorAll('.category-tab').forEach(t => {
            t.classList.remove('active');
        });
        tab.classList.add('active');

        renderProducts();
    }

    // 處理排序變更
    function handleSortChange(e) {
        currentSort = e.target.value;
        renderProducts();
    }

    // 處理清除篩選
    function handleClearFilters() {
        currentCategory = 'all';
        currentSort = 'sales';

        // 重置 UI
        document.querySelectorAll('.category-tab').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelector('.category-tab[data-category="all"]').classList.add('active');

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.value = 'sales';
        }

        renderProducts();
    }

    // 處理商品操作
    function handleProductAction(e) {
        const target = e.target;

        if (target.classList.contains('btn-add-cart')) {
            const productId = target.dataset.productId;
            handleAddToCart(productId);
        } else if (target.classList.contains('btn-buy-now')) {
            const productId = target.dataset.productId;
            handleBuyNow(productId);
        }
    }

    // 處理加入購物車
    function handleAddToCart(productId) {
        const product = getProduct(productId);
        const success = addToCart(productId, 1);
        if (success && product) {
            showCartToast(product.name, 1);
        }
    }

    // 處理立即購買
    function handleBuyNow(productId) {
        const success = addToCart(productId, 1);
        // UX 痛點：沒有任何反饋
        if (success) {
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 1000);
        }
    }

    // 渲染商品列表
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;

        // 取得商品
        let products = getProductsByCategory(currentCategory);
        products = sortProducts(products, currentSort);

        // 清空現有內容
        productGrid.innerHTML = '';

        // 生成商品卡片
        products.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }

    // 創建商品卡片
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;

        // 徽章
        let badgeHTML = '';
        if (product.badge) {
            const badgeClass = `badge-${product.badge}`;
            const badgeText = {
                'hot': '熱銷',
                'new': '新品',
                'gift': '送禮首選',
                'limited': '限量'
            }[product.badge] || '';

            badgeHTML = `<span class="badge ${badgeClass}">${badgeText}</span>`;
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
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${product.originalPrice ? `<span class="original-price">NT$ ${product.originalPrice}</span>` : ''}
                    <span class="sale-price">NT$ ${product.price}</span>
                </div>
                <div class="product-actions">
                    <button
                        type="button"
                        class="btn-add-cart"
                        data-product-id="${product.id}"
                        title="加入購物車"
                    >
                        加入購物車
                    </button>
                    <button
                        type="button"
                        class="btn-buy-now"
                        data-product-id="${product.id}"
                        title="立即購買"
                    >
                        立即購買
                    </button>
                </div>
            </div>
        `;

        // 點擊商品卡片(非按鈕)前往詳情頁
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-add-cart') &&
                !e.target.classList.contains('btn-buy-now')) {
                window.location.href = `product-detail.html?id=${product.id}`;
            }
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
