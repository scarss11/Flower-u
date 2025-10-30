// Estado de la aplicación
let cart = [];
let selectedProduct = null;
let selectedSpecs = {};

// Productos
const products = [
    {
        id: 1,
        name: "Sunflower Arrangement",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1597848212624-e530bb28cc08?w=800&h=800&fit=crop",
        description: "Bright and cheerful sunflowers that bring warmth and joy to any space. Perfect for celebrations or to brighten someone's day.",
        category: "arrangements",
        specs: {
            size: ["Small (5 stems)", "Medium (10 stems)", "Large (15 stems)"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 2,
        name: "Pink Peony Bundle",
        price: 52.00,
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=800&fit=crop",
        description: "Lush pink peonies that exude elegance and romance. These beautiful blooms are perfect for weddings and special occasions.",
        category: "seasonal",
        specs: {
            size: ["Small (6 stems)", "Medium (12 stems)", "Large (18 stems)"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 3,
        name: "White Rose Elegance",
        price: 48.00,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=800&fit=crop",
        description: "Classic white roses symbolizing purity and grace. A timeless choice for any occasion that calls for sophistication.",
        category: "roses",
        specs: {
            size: ["Small (9 roses)", "Medium (18 roses)", "Large (24 roses)"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 4,
        name: "Tulip Collection",
        price: 38.00,
        image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&h=800&fit=crop",
        description: "Fresh tulips in vibrant colors that celebrate spring and new beginnings. Perfect for adding a pop of color to any room.",
        category: "seasonal",
        specs: {
            size: ["Small (8 stems)", "Medium (15 stems)", "Large (20 stems)"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 5,
        name: "Mixed Spring Bouquet",
        price: 42.00,
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&h=800&fit=crop",
        description: "A delightful mix of seasonal flowers that brings the beauty of spring into your home. Each bouquet is unique and special.",
        category: "arrangements",
        specs: {
            size: ["Small", "Medium", "Large"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 6,
        name: "Garden Carnation Mix",
        price: 35.00,
        image: "https://images.unsplash.com/photo-1595167064433-e070d62d2d38?w=800&h=800&fit=crop",
        description: "Charming carnations in a variety of colors that last long and spread joy. A wonderful gift that keeps on giving.",
        category: "arrangements",
        specs: {
            size: ["Small", "Medium", "Large"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 7,
        name: "Lavender Dreams",
        price: 40.00,
        image: "https://images.unsplash.com/photo-1595814433015-e2a91c83a0b8?w=800&h=800&fit=crop",
        description: "Soothing lavender stems that bring calm and tranquility. Perfect for creating a peaceful atmosphere.",
        category: "seasonal",
        specs: {
            size: ["Small", "Medium", "Large"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    },
    {
        id: 8,
        name: "Red Rose Romance",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=800&fit=crop",
        description: "Classic red roses that speak the language of love. The ultimate romantic gesture for that special someone.",
        category: "roses",
        specs: {
            size: ["Small (12 roses)", "Medium (24 roses)", "Large (36 roses)"],
            vase: ["Clear Glass", "Ceramic White", "Rustic"]
        }
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    renderHomeGallery();
    updateCartBadge();
    // Inicializar Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Navegación entre páginas
function goToHome() {
    hideAllPages();
    document.getElementById('homePage').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToGallery() {
    hideAllPages();
    document.getElementById('galleryPage').style.display = 'block';
    renderFullGallery();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

function goToAbout() {
    hideAllPages();
    document.getElementById('aboutPage').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

function hideAllPages() {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('galleryPage').style.display = 'none';
    document.getElementById('aboutPage').style.display = 'none';
    document.getElementById('productPage').style.display = 'none';
}

// Renderizar galería principal (home)
function renderHomeGallery() {
    const gallery = document.getElementById('homeGallery');
    if (!gallery) return;

    gallery.innerHTML = products.slice(0, 6).map(product => `
        <div class="gallery-item" onclick="openProduct(${product.id})">
            <div class="gallery-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="gallery-item-name">${product.name}</p>
        </div>
    `).join('');
}

// Renderizar galería completa
function renderFullGallery() {
    const gallery = document.getElementById('fullGallery');
    if (!gallery) return;

    gallery.innerHTML = products.map(product => `
        <div class="masonry-item" onclick="openProduct(${product.id})">
            <div class="masonry-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="masonry-item-label">${product.name}</p>
        </div>
    `).join('');
}

// Abrir página de producto
function openProduct(productId) {
    selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return;

    selectedSpecs = {};

    hideAllPages();
    document.getElementById('productPage').style.display = 'block';

    document.getElementById('productImage').src = selectedProduct.image;
    document.getElementById('productImage').alt = selectedProduct.name;
    document.getElementById('productName').textContent = selectedProduct.name;
    document.getElementById('productDescription').textContent = selectedProduct.description;
    document.getElementById('productPrice').textContent = `$${selectedProduct.price.toFixed(2)}`;

    renderProductSpecs();
    renderRelatedProducts();

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

// Cerrar página de producto
function closeProduct() {
    selectedProduct = null;
    selectedSpecs = {};
    goToHome();
}

// Renderizar especificaciones del producto
function renderProductSpecs() {
    const specsContainer = document.getElementById('productSpecs');
    if (!specsContainer || !selectedProduct) return;

    const labels = {
        size: 'Size',
        vase: 'Vase Type'
    };

    let html = '';

    for (const [specType, options] of Object.entries(selectedProduct.specs)) {
        html += `
            <div class="spec-group">
                <label class="spec-label">
                    ${labels[specType]} <span style="color: #ef4444;">*</span>
                </label>
                <div class="spec-options">
                    ${options.map(option => `
                        <button 
                            class="spec-option ${selectedSpecs[specType] === option ? 'selected' : ''}"
                            onclick="selectSpec('${specType}', '${option}')"
                        >
                            <span>${option}</span>
                            <i data-lucide="check" class="check-icon"></i>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += `
        <div class="spec-group">
            <label class="spec-label">Dedication (Optional)</label>
            <textarea 
                class="dedication-input"
                placeholder="Write your special message here..."
                rows="4"
                oninput="selectSpec('dedication', this.value)"
            ></textarea>
        </div>
    `;

    specsContainer.innerHTML = html;
    updateAddToCartButton();
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

// Seleccionar especificación
function selectSpec(specType, value) {
    selectedSpecs[specType] = value;
    
    if (specType !== 'dedication') {
        renderProductSpecs();
    }
    
    updateAddToCartButton();
}

// Actualizar botón de agregar al carrito
function updateAddToCartButton() {
    const btn = document.getElementById('addToCartBtn');
    if (!btn || !selectedProduct) return;

    const requiredSpecs = Object.keys(selectedProduct.specs);
    const allSelected = requiredSpecs.every(spec => selectedSpecs[spec]);

    if (allSelected) {
        btn.disabled = false;
        btn.textContent = 'ADD TO CART';
    } else {
        btn.disabled = true;
        btn.textContent = 'SELECT ALL REQUIRED OPTIONS';
    }
}

// Agregar al carrito
function addToCart() {
    if (!selectedProduct) return;

    const requiredSpecs = Object.keys(selectedProduct.specs);
    const allSelected = requiredSpecs.every(spec => selectedSpecs[spec]);
    
    if (!allSelected) return;

    const cartItem = {
        ...selectedProduct,
        selectedSpecs: { ...selectedSpecs },
        cartId: Date.now(),
        quantity: 1
    };

    cart.push(cartItem);
    selectedSpecs = {};
    
    updateCartBadge();
    renderProductSpecs();
    
    alert('Product added to cart!');
}

// Renderizar productos relacionados
function renderRelatedProducts() {
    const container = document.getElementById('relatedProducts');
    if (!container || !selectedProduct) return;

    const otherProducts = products.filter(p => p.id !== selectedProduct.id);

    container.innerHTML = otherProducts.slice(0, 8).map(product => `
        <div class="related-item" onclick="openProduct(${product.id})">
            <div class="related-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <p class="related-item-name">${product.name}</p>
            <p class="related-item-price">$${product.price.toFixed(2)}</p>
        </div>
    `).join('');
}

// Toggle carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        renderCart();
    }
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

// Toggle menú móvil
function toggleMenu() {
    alert('Mobile menu - Implementar menú desplegable');
}

// Renderizar carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-cart" style="width: 64px; height: 64px;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => {
            const specs = Object.entries(item.selectedSpecs)
                .filter(([key, value]) => key !== 'dedication' || value)
                .map(([key, value]) => {
                    const labels = { size: 'Size', vase: 'Vase', dedication: 'Message' };
                    const displayValue = key === 'dedication' && value ? value.substring(0, 30) + '...' : value;
                    return `
                        <div class="cart-item-spec">
                            <strong>${labels[key]}:</strong> ${displayValue}
                        </div>
                    `;
                }).join('');

            return `
                <div class="cart-item">
                    <div class="cart-item-content">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-info">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <div class="cart-item-specs">${specs}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="updateQuantity(${item.cartId}, -1)">
                                        <i data-lucide="minus"></i>
                                    </button>
                                    <span class="quantity-value">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="updateQuantity(${item.cartId}, 1)">
                                        <i data-lucide="plus"></i>
                                    </button>
                                </div>
                                <button class="remove-btn" onclick="removeFromCart(${item.cartId})">
                                    <i data-lucide="trash-2"></i>
                                </button>
                            </div>
                            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        cartFooter.style.display = 'block';
        updateCartTotal();
    }
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);
}

// Actualizar cantidad
function updateQuantity(cartId, change) {
    const item = cart.find(i => i.cartId === cartId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
        updateCartBadge();
    }
}

// Eliminar del carrito
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    renderCart();
    updateCartBadge();
}

// Actualizar badge del carrito
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (cart.length > 0) {
        badge.textContent = cart.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Actualizar total del carrito
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}