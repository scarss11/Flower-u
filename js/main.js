// Estado de la aplicación
let cart = [];
let selectedProduct = null;
let selectedSpecs = {};

// Productos - Actualizados a ropa deportiva
const products = [
    {
        id: 1,
        name: "Shorts de Rendimiento para Correr",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=800&fit=crop",
        description: "Shorts ligeros para correr con tecnología que absorbe la humedad. Perfecto para sesiones de entrenamiento y carreras de maratón con máxima comodidad.",
        category: "correr",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro", "Azul Marino", "Carbón", "Azul Eléctrico"]
        }
    },
    {
        id: 2,
        name: "Top de Compresión para Entrenamiento",
        price: 52.00,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
        description: "Top de compresión de alto rendimiento que apoya los músculos durante entrenamientos intensos. Tela transpirable con ventilación estratégica.",
        category: "entrenamiento",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro", "Blanco", "Rojo", "Azul Real"]
        }
    },
    {
        id: 3,
        name: "Leggings Pro de Yoga",
        price: 68.00,
        image: "https://images.unsplash.com/photo-1594736797933-d0d69c3bc5db?w=800&h=800&fit=crop",
        description: "Leggings con elasticidad en cuatro direcciones y soporte de cintura alta. Perfecto para yoga, pilates y entrenamiento de bajo impacto con máxima flexibilidad.",
        category: "yoga",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro", "Gris Oscuro", "Verde Bosque", "Púrpura Profundo"]
        }
    },
    {
        id: 4,
        name: "Sudadera de Entrenamiento",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop",
        description: "Sudadera técnica con regulación térmica para entrenamientos en clima frío. Cuenta con agujeros para los pulgares y bolsillos con cremallera.",
        category: "entrenamiento",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Carbón", "Marino", "Borgoña", "Verde Oliva"]
        }
    },
    {
        id: 5,
        name: "Chaqueta para Correr",
        price: 89.00,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
        description: "Chaqueta resistente al viento y al agua con elementos reflectantes. Perfecta para carreras temprano en la mañana o por la noche.",
        category: "correr",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro/Reflectante", "Azul Eléctrico", "Amarillo de Seguridad", "Gris Oscuro"]
        }
    },
    {
        id: 6,
        name: "Shorts de Entrenamiento",
        price: 42.00,
        image: "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=800&h=800&fit=crop",
        description: "Shorts versátiles de entrenamiento con forro de compresión incorporado. Ideal para entrenamiento cruzado, sesiones de gimnasio y deportes recreativos.",
        category: "entrenamiento",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro", "Marino", "Rojo Oscuro", "Carbón"]
        }
    },
    {
        id: 7,
        name: "Camiseta sin Mangas de Rendimiento",
        price: 38.00,
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
        description: "Camiseta sin mangas ligera con diseño de espalda deportiva para máxima movilidad. Perfecta para entrenamientos en clima cálido y sesiones de gimnasio.",
        category: "entrenamiento",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Blanco", "Negro", "Gris", "Azul Real"]
        }
    },
    {
        id: 8,
        name: "Leggings de Compresión",
        price: 72.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop",
        description: "Leggings de alta compresión con ajuste moldeador y tecnología que absorbe el sudor. Ideal para entrenamiento intenso y carreras.",
        category: "entrenamiento",
        specs: {
            size: ["XS", "S", "M", "L", "XL"],
            color: ["Negro", "Gris Oscuro", "Marino", "Borgoña"]
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
        size: 'Talla',
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
            <label class="spec-label">Personalización (Opcional)</label>
            <textarea 
                class="dedication-input"
                placeholder="Agrega solicitudes de personalización o notas..."
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
        btn.textContent = 'AGREGAR AL CARRITO';
    } else {
        btn.disabled = true;
        btn.textContent = 'SELECCIONA TODAS LAS OPCIONES REQUERIDAS';
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
    
    alert('¡Producto agregado al carrito!');
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
    alert('Menú móvil - Implementar menú desplegable');
}

// Renderizar carrito
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-cart" style="width: 64px; height: 64px;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => {
            const specs = Object.entries(item.selectedSpecs)
                .filter(([key, value]) => key !== 'customization' || value)
                .map(([key, value]) => {
                    const labels = { size: 'Talla', color: 'Color', customization: 'Notas' };
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