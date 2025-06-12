document.addEventListener('DOMContentLoaded', () => {
    // Load products
    loadProducts();
    
    // Initialize notifications
    setTimeout(showRandomNotification, 15000);
});

async function loadProducts() {
    try {
        const response = await fetch('scripts/data/deals.json');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        document.getElementById('products-container').innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-500">Failed to load deals. Please try again later.</p>
            </div>
        `;
    }
}

function renderProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    products.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

function createProductCard(product) {
    return `
        <div class="product-card group relative bg-white rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out">
            <div class="relative h-64 w-full overflow-hidden">
                <span class="absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded">
                    ${product.discount}
                </span>
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-full object-cover object-center group-hover:opacity-75">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                ${product.specialBadge ? `
                <div class="absolute bottom-3 ${product.specialBadgePosition} z-10">
                    <span class="text-white text-xs font-medium ${product.specialBadgeColor} px-2 py-1 rounded">
                        ${product.specialBadge}
                    </span>
                </div>
                ` : ''}
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-medium text-gray-900">
                            <a href="${product.affiliateLink}" target="_blank" rel="noopener">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${product.name}
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">${product.description}</p>
                    </div>
                    <div class="price-tag">
                        <span class="font-bold">${product.currentPrice}</span>
                    </div>
                </div>
                <div class="mt-4 flex items-center">
                    <div class="flex items-center">
                        ${generateStarRating(product.rating)}
                        <span class="ml-2 text-sm text-gray-500">${product.rating} (${product.reviewCount})</span>
                    </div>
                    <div class="ml-auto">
                        <span class="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                </div>
                <div class="mt-4">
                    <a href="${product.affiliateLink}" class="relative flex items-center justify-center w-full bg-blue-500 border border-transparent rounded-md py-2 px-8 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150">
                        <i class="fas fa-shopping-cart mr-2"></i> Buy Now
                    </a>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-yellow-400"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-yellow-400"></i>';
    }
    return stars;
}

// Simulate real-time price drop notifications
function showRandomNotification() {
    const products = [
        {name: "AirPods Pro 2", discount: "-27%", price: "$199", original: "$269"},
        {name: "PlayStation 5", discount: "-18%", price: "$459", original: "$559"},
        {name: "iPad Pro 12.9\"", discount: "-22%", price: "$999", original: "$1,279"},
        {name: "Dyson V11 Vacuum", discount: "-35%", price: "$499", original: "$769"}
    ];
    
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    const alertHTML = `
        <div class="flex items-center mb-2 sm:mb-0">
            <span class="drop-indicator flex items-center justify-center h-6 w-6 rounded-full bg-red-500 mr-2">
                <i class="fas fa-arrow-down text-white text-xs"></i>
            </span>
            <span class="text-sm font-medium text-gray-900">New Price Drop Alert!</span>
        </div>
        <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                ${randomProduct.name} just dropped to ${randomProduct.price} (${randomProduct.discount}) → 
                <span aria-hidden="true" class="ml-1">&rarr;</span>
            </a>
        </div>
    `;
    
    const alertSection = document.querySelector('.bg-yellow-50');
    alertSection.innerHTML = alertHTML;
    
    // Update every 30 seconds
    setTimeout(showRandomNotification, 30000);
}

// Start notifications
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showRandomNotification, 15000);
});