// Carrito de compras
let cart = [];

// Agregar al carrito
function addToCart(productId, selectedExtras = [], observations = '') {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: getText(product.name),
        price: product.price,
        image: product.image,
        quantity: 1,
        extras: selectedExtras.map(extraId => {
            const extra = product.extras.find(e => e.id === extraId);
            return {
                id: extra.id,
                name: getText(extra.name),
                price: extra.price
            };
        }),
        observations: observations
    };

    cart.push(cartItem);
    updateCartUI();
    showNotification('Producto agregado al carrito');
}

// Actualizar cantidad
function updateQuantity(cartItemId, change) {
    const item = cart.find(i => i.id === cartItemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        updateCartUI();
    }
}

// Eliminar del carrito
function removeFromCart(cartItemId) {
    cart = cart.filter(i => i.id !== cartItemId);
    updateCartUI();
    showNotification('Producto eliminado del carrito');
}

// Calcular subtotal de un item
function getItemSubtotal(item) {
    const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
    return (item.price + extrasTotal) * item.quantity;
}

// Calcular total del carrito
function getCartTotal() {
    return cart.reduce((sum, item) => sum + getItemSubtotal(item), 0);
}

// Actualizar UI del carrito
function updateCartUI() {
    // Actualizar contador
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Actualizar items del carrito
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Tu carrito está vacío</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${item.extras.length > 0 ? `
                        <div class="cart-item-extras">
                            Extras: ${item.extras.map(e => getText(e.name)).join(', ')}
                        </div>
                    ` : ''}
                    ${item.observations ? `
                        <div class="cart-item-extras">Obs: ${item.observations}</div>
                    ` : ''}
                    <div class="cart-item-price">${formatPrice(getItemSubtotal(item))}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-quantity" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn-quantity" onclick="removeFromCart(${item.id})" style="background: #dc3545;">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    // Actualizar total
    const cartTotal = document.getElementById('cartTotal');
    cartTotal.textContent = formatPrice(getCartTotal());

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Abrir carrito
function openCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.add('active');
}

// Cerrar carrito
function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.remove('active');
}

// Ir al checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío');
        return;
    }
    
    // Guardar carrito y redirigir
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-secondary);
        color: var(--color-dark);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Botón del carrito
    const btnCart = document.getElementById('btnCart');
    if (btnCart) {
        btnCart.addEventListener('click', openCart);
    }
});

// Estilos para animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
