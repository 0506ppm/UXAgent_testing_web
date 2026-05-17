// 商品資料庫
const PRODUCTS = [
    {
        id: '1',
        name: '娘家廚房x職人雞 滷蛋白君-醬香',
        category: 'chicken',
        price: 225,
        originalPrice: 250,
        image: 'images/滷蛋白君＿醬香＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿醬香＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '使用動福認證雞蛋，健康有保障。低卡零脂肪，豐富蛋白質，健身族首選。常溫獨立包裝，無添加防腐劑，方便攜帶隨時補充營養。',
        sku: '32695120',
        weight: '175g',
        size: '13×7×21 cm',
        stock: 50,
        badge: 'hot',
        discount: null
    },
    {
        id: '2',
        name: '娘家廚房x職人雞 滷蛋白君-香辣',
        category: 'chicken',
        price: 225,
        originalPrice: 250,
        image: 'images/滷蛋白君＿香辣＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿香辣＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '精選職人雞蛋白，獨家香辣配方，辣度適中。低卡零脂肪，豐富蛋白質，適合喜歡辣味的健身族群。常溫保存，方便攜帶。',
        sku: '32695121',
        weight: '175g',
        size: '13×7×21 cm',
        stock: 45,
        badge: 'hot',
        discount: null
    },
    {
        id: '3',
        name: '娘家廚房x職人雞 滷蛋白君-黑胡椒',
        category: 'chicken',
        price: 235,
        originalPrice: 260,
        image: 'images/滷蛋白君＿黑胡椒＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿黑胡椒＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '黑胡椒風味，香氣濃郁，口感絕佳。低卡零脂肪，豐富蛋白質，健康又美味。獨立包裝設計，方便食用。',
        sku: '32695122',
        weight: '175g',
        size: '13×7×21 cm',
        stock: 38,
        badge: 'new',
        discount: null
    },
    {
        id: '4',
        name: '娘家廚房x職人雞 滷蛋白君-醬香（精裝版）',
        category: 'chicken',
        price: 280,
        originalPrice: 320,
        image: 'images/滷蛋白君＿醬香＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿醬香＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '經典醬香風味，濃郁香醇。精裝版份量更大，適合全家分享。常溫保存，開封即食超方便。',
        sku: '32695123',
        weight: '250g',
        size: '15×8×23 cm',
        stock: 42,
        badge: null,
        discount: null
    },
    {
        id: '5',
        name: '娘家廚房x職人雞 滷蛋白君-香辣（豪華版）',
        category: 'chicken',
        price: 260,
        originalPrice: 290,
        image: 'images/滷蛋白君＿香辣＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿香辣＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '特製香辣配方，風味獨特，層次豐富。豪華版包裝精美，適合送禮。滷製入味，口感超棒。',
        sku: '32695124',
        weight: '220g',
        size: '14×8×22 cm',
        stock: 33,
        badge: null,
        discount: null
    },
    {
        id: '6',
        name: '娘家廚房x職人雞 滷蛋白君-黑胡椒（禮盒版）',
        category: 'chicken',
        price: 310,
        originalPrice: 350,
        image: 'images/滷蛋白君＿黑胡椒＿首頁.jpeg',
        images: [
            'images/滷蛋白君＿黑胡椒＿首頁.jpeg',
            'images/滷蛋白君＿共用＿內頁.jpeg'
        ],
        description: '黑胡椒風味，層次豐富，香氣十足。禮盒版份量加大，豐富蛋白質，高級包裝適合贈送親友。',
        sku: '10811634',
        weight: '280g',
        size: '16×9×24 cm',
        stock: 25,
        badge: 'limited',
        discount: null
    }
];

// 取得單一商品
function getProduct(id) {
    return PRODUCTS.find(p => p.id === id);
}

// 取得所有商品
function getAllProducts() {
    return PRODUCTS;
}

// 依分類篩選
function getProductsByCategory(category) {
    if (category === 'all') {
        return PRODUCTS;
    }
    return PRODUCTS.filter(p => p.category === category);
}

// 排序商品
function sortProducts(products, sortMode) {
    const sorted = [...products];

    switch(sortMode) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.reverse();
        case 'sales':
        default:
            return sorted;
    }
}
