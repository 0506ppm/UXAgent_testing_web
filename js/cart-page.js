// 購物車頁面邏輯
(function() {
    'use strict';

    // 初始化
    function init() {
        renderCart();
        setupEventListeners();
    }

    // 設定事件監聽器
    function setupEventListeners() {
        // 結帳按鈕
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }

        // 購物車項目操作 (事件委派)
        const cartContainer = document.getElementById('cart-items-container');
        if (cartContainer) {
            cartContainer.addEventListener('click', handleCartAction);
        }
    }

    // 渲染購物車
    function renderCart() {
        const cart = getCart();
        const container = document.getElementById('cart-items-container');
        const emptyMessage = document.getElementById('empty-cart-message');

        if (!container) return;

        // 清空容器
        container.innerHTML = '';

        if (cart.length === 0) {
            // 顯示空購物車訊息
            container.innerHTML = `
                <div id="empty-cart-message" class="empty-cart">
                    <p>購物車目前是空的</p>
                    <a href="products.html" class="btn btn-primary">
                        前往選購商品
                    </a>
                </div>
            `;
        } else {
            // 渲染購物車項目
            cart.forEach(item => {
                const cartItem = createCartItem(item);
                container.appendChild(cartItem);
            });
        }

        // 更新總計
        updateCartSummary();
    }

    // 創建購物車項目
    function createCartItem(item) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.productId = item.id;

        const subtotal = item.price * item.quantity;

        div.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
                onerror="this.src='https://via.placeholder.com/120x120?text=商品'"
            />
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-spec">商品編號：${item.sku}</div>
                <div class="cart-item-price">NT$ ${item.price}</div>
                <div class="cart-item-quantity">
                    <button
                        type="button"
                        class="cart-qty-btn decrease-qty"
                        data-product-id="${item.id}"
                        aria-label="減少數量"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        class="cart-qty-input"
                        value="${item.quantity}"
                        min="1"
                        max="10"
                        data-product-id="${item.id}"
                        aria-label="數量"
                    />
                    <button
                        type="button"
                        class="cart-qty-btn increase-qty"
                        data-product-id="${item.id}"
                        aria-label="增加數量"
                    >
                        +
                    </button>
                    <span style="margin-left: 15px; color: #666;">
                        小計：NT$ ${subtotal}
                    </span>
                </div>
            </div>
            <button
                type="button"
                class="cart-item-remove"
                data-product-id="${item.id}"
                title="移除商品"
            >
                刪除
            </button>
        `;

        return div;
    }

    // 處理購物車操作
    function handleCartAction(e) {
        const target = e.target;

        if (target.classList.contains('increase-qty')) {
            const productId = target.dataset.productId;
            handleQuantityChange(productId, 1);
        } else if (target.classList.contains('decrease-qty')) {
            const productId = target.dataset.productId;
            handleQuantityChange(productId, -1);
        } else if (target.classList.contains('cart-item-remove')) {
            const productId = target.dataset.productId;
            handleRemoveItem(productId);
        } else if (target.classList.contains('cart-qty-input')) {
            // 監聽數量輸入框變更
            target.addEventListener('change', (e) => {
                const productId = e.target.dataset.productId;
                const newQuantity = parseInt(e.target.value) || 1;
                handleQuantitySet(productId, newQuantity);
            });
        }
    }

    // 處理數量變更
    function handleQuantityChange(productId, delta) {
        const cart = getCart();
        const item = cart.find(i => i.id === productId);

        if (item) {
            const newQuantity = item.quantity + delta;

            if (newQuantity <= 0) {
                handleRemoveItem(productId);
            } else {
                updateCartItemQuantity(productId, Math.min(10, newQuantity));
                renderCart();
            }
        }
    }

    // 處理數量設定
    function handleQuantitySet(productId, quantity) {
        const validQuantity = Math.max(1, Math.min(10, quantity));
        updateCartItemQuantity(productId, validQuantity);
        renderCart();
    }

    // 處理移除項目
    function handleRemoveItem(productId) {
        const cart = getCart();
        const item = cart.find(i => i.id === productId);

        if (item && confirm(`確定要移除「${item.name}」嗎？`)) {
            removeFromCart(productId);
            renderCart();
        }
    }

    // 更新購物車摘要
    function updateCartSummary() {
        const cart = getCart();
        const subtotal = getCartTotal();

        // 計算運費 (滿 1500 免運)
        const shippingFee = subtotal >= 1500 ? 0 : 150;

        // 計算折扣 (這裡暫時設為 0)
        const discount = 0;

        // 總計
        const total = subtotal + shippingFee - discount;

        // 更新顯示
        const subtotalEl = document.getElementById('subtotal-amount');
        const shippingEl = document.getElementById('shipping-fee');
        const discountEl = document.getElementById('discount-amount');
        const totalEl = document.getElementById('total-amount');

        if (subtotalEl) subtotalEl.textContent = `NT$ ${subtotal}`;
        if (shippingEl) {
            shippingEl.textContent = shippingFee === 0 ? '免運費' : `NT$ ${shippingFee}`;
        }
        if (discountEl) discountEl.textContent = discount > 0 ? `-NT$ ${discount}` : 'NT$ 0';
        if (totalEl) totalEl.textContent = `NT$ ${total}`;

        // 更新結帳按鈕狀態
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = cart.length === 0;
        }
    }

    // 處理結帳
    function handleCheckout() {
        const cart = getCart();

        if (cart.length === 0) {
            return;
        }

        // 顯示確認訊息
        const total = getCartTotal();
        const confirmed = confirm(`確定要結帳嗎？\n總金額：NT$ ${total}`);

        if (confirmed) {
            // 模擬結帳成功，清空購物車
            setTimeout(() => {
                clearCart();
                renderCart();
            }, 1500);
        }
    }

    // 頁面載入完成後初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
