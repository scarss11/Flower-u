// Estado de la aplicación
let cart = [];
let selectedProduct = null;
let selectedSpecs = {};

// Productos - Actualizados a ropa deportiva
const products = [
    {
        id: 1,
        name: "Performance Running Shorts",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
        description: "Lightweight running shorts with moisture-wicking technology. Perfect for training sessions and marathon running with maximum comfort.",
        category: "running",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black", "Navy Blue", "Charcoal", "Electric Blue"]
        }
    },
    {
        id: 2,
        name: "Compression Training Top",
        price: 52.00,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
        description: "High-performance compression top that supports muscles during intense workouts. Breathable fabric with strategic ventilation.",
        category: "training",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black", "White", "Red", "Royal Blue"]
        }
    },
    {
        id: 3,
        name: "Yoga Pro Leggings",
        price: 68.00,
        image: "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=800&h=800&fit=crop",
        description: "Four-way stretch leggings with high waist support. Perfect for yoga, pilates, and low-impact training with maximum flexibility.",
        category: "yoga",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black", "Dark Grey", "Forest Green", "Deep Purple"]
        }
    },
    {
        id: 4,
        name: "Training Hoodie",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
        description: "Technical hoodie with thermal regulation for cool weather training. Features thumb holes and zippered pockets.",
        category: "training",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Charcoal", "Navy", "Burgundy", "Olive Green"]
        }
    },
    {
        id: 5,
        name: "Running Jacket",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
        description: "Wind and water resistant running jacket with reflective elements. Perfect for early morning or evening runs.",
        category: "running",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black/Reflective", "Electric Blue", "Safety Yellow", "Dark Grey"]
        }
    },
    {
        id: 6,
        name: "Training Shorts",
        price: 42.00,
        image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=800&h=800&fit=crop",
        description: "Versatile training shorts with built-in compression liner. Ideal for cross-training, gym sessions, and recreational sports.",
        category: "training",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black", "Navy", "Dark Red", "Charcoal"]
        }
    },
    {
        id: 7,
        name: "Performance Tank Top",
        price: 38.00,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
        description: "Lightweight tank top with racerback design for maximum mobility. Perfect for warm weather training and gym sessions.",
        category: "training",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["White", "Black", "Grey", "Royal Blue"]
        }
    },
    {
        id: 8,
        name: "Compression Leggings",
        price: 72.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
        description: "High-compression leggings with sculpting fit and sweat-wicking technology. Ideal for intense training and running.",
        category: "training",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Black", "Dark Grey", "Navy", "Burgundy"]
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
        color: 'Color'
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
            <label class="spec-label">Customization (Optional)</label>
            <textarea 
                class="dedication-input"
                placeholder="Add any customization requests or notes..."
                rows="4"
                oninput="selectSpec('customization', this.value)"
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
    
    if (specType !== 'customization') {
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
                .filter(([key, value]) => key !== 'customization' || value)
                .map(([key, value]) => {
                    const labels = { size: 'Size', color: 'Color', customization: 'Notes' };
                    const displayValue = key === 'customization' && value ? value.substring(0, 30) + '...' : value;
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