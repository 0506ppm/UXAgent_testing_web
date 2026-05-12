// 商品詳情頁面邏輯
(function() {
    'use strict';

    let currentProduct = null;
    let currentQuantity = 1;
    let currentImageIndex = 0;

    // 初始化
    function init() {
        loadProductFromURL();
        setupEventListeners();
    }

    // 從 URL 載入商品
    function loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            // 沒有商品 ID，重導向到商品列表
            window.location.href = 'products.html';
            return;
        }

        currentProduct = getProduct(productId);

        if (!currentProduct) {
            // 商品不存在，直接導回首頁
            setTimeout(() => {
                window.location.href = 'products.html';
            }, 2000);
            return;
        }

        renderProduct();
    }

    // 渲染商品資訊
    function renderProduct() {
        if (!currentProduct) return;

        // 更新頁面標題
        document.title = `${currentProduct.name} - 娘家保健生技`;

        // 更新麵包屑
        const breadcrumb = document.getElementById('product-breadcrumb');
        if (breadcrumb) {
            breadcrumb.textContent = currentProduct.name;
        }

        // 更新商品圖片
        updateProductImages();

        // 不需要更新其他內容，因為 HTML 中已經有預設值
        // 如果需要動態更新，可以在這裡添加
    }

    // 更新商品圖片
    function updateProductImages() {
        const mainImage = document.getElementById('main-product-image');
        if (mainImage && currentProduct.image) {
            mainImage.src = currentProduct.image;
            mainImage.alt = currentProduct.name;
        }

        // 更新縮圖
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            if (currentProduct.images && currentProduct.images[index]) {
                thumb.src = currentProduct.images[index];
            }
        });
    }

    // 設定事件監聽器
    function setupEventListeners() {
        // 縮圖點擊
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', handleThumbnailClick);
        });

        // 數量控制
        const decreaseBtn = document.getElementById('quantity-decrease');
        const increaseBtn = document.getElementById('quantity-increase');
        const quantityInput = document.getElementById('quantity-input');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => updateQuantity(-1));
        }

        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => updateQuantity(1));
        }

        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                const value = parseInt(e.target.value) || 1;
                currentQuantity = Math.max(1, Math.min(10, value));
                quantityInput.value = currentQuantity;
            });
        }

        // 加入購物車按鈕
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', handleAddToCart);
        }

        // 立即購買按鈕
        const buyNowBtn = document.getElementById('buy-now-btn');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', handleBuyNow);
        }

        // 加入收藏按鈕
        const wishlistBtn = document.getElementById('add-to-wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', handleAddToWishlist);
        }

        // 頁籤切換
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', handleTabSwitch);
        });
    }

    // 處理縮圖點擊
    function handleThumbnailClick(e) {
        const thumbnail = e.target;
        const index = parseInt(thumbnail.dataset.index);

        // 更新主圖
        const mainImage = document.getElementById('main-product-image');
        if (mainImage && currentProduct.images && currentProduct.images[index]) {
            mainImage.src = currentProduct.images[index];
            currentImageIndex = index;
        }

        // 更新縮圖樣式
        document.querySelectorAll('.thumbnail').forEach(t => {
            t.classList.remove('active');
        });
        thumbnail.classList.add('active');
    }

    // 更新數量
    function updateQuantity(delta) {
        currentQuantity = Math.max(1, Math.min(10, currentQuantity + delta));

        const quantityInput = document.getElementById('quantity-input');
        if (quantityInput) {
            quantityInput.value = currentQuantity;
        }
    }

    // 處理加入購物車
    function handleAddToCart() {
        if (!currentProduct) return;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const success = addToCart(productId, currentQuantity);
        // UX 痛點：沒有任何反饋通知，使用者不知道是否成功加入購物車
    }

    // 處理立即購買
    function handleBuyNow() {
        if (!currentProduct) return;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const success = addToCart(productId, currentQuantity);
        // UX 痛點：沒有任何反饋通知
        if (success) {
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 1000);
        }
    }

    // 處理加入收藏
    function handleAddToWishlist() {
        // 這裡可以實作收藏功能
    }

    // 處理頁籤切換
    function handleTabSwitch(e) {
        const btn = e.target;
        const tabId = btn.dataset.tab;

        // 更新按鈕樣式
        document.querySelectorAll('.tab-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        // 更新內容顯示
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.getElementById(`tab-${tabId}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // 頁面載入完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
