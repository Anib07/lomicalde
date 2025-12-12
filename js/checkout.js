// Variables
const DELIVERY_FEE = 5000;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadCheckoutCart();
    setupCheckoutListeners();
});

// Cargar carrito en checkout
function loadCheckoutCart() {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart || JSON.parse(savedCart).length === 0) {
        window.location.href = 'index.html';
        return;
    }
    
    cart = JSON.parse(savedCart);
    renderOrderSummary();
}

// Renderizar resumen del pedido
function renderOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-info">
                <div class="order-item-name">${item.name} x${item.quantity}</div>
                ${item.extras.length > 0 ? `
                    <div class="order-item-details">+ ${item.extras.map(e => e.name).join(', ')}</div>
                ` : ''}
                ${item.observations ? `
                    <div class="order-item-details">Obs: ${item.observations}</div>
                ` : ''}
            </div>
            <div class="order-item-price">${formatPrice(getItemSubtotal(item))}</div>
        </div>
    `).join('');
    
    updateTotals();
}

// Actualizar totales
function updateTotals() {
    const subtotal = getCartTotal();
    const tipoEntrega = document.getElementById('tipoEntrega').value;
    const deliveryFee = tipoEntrega === 'delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('deliveryFee').textContent = formatPrice(deliveryFee);
    document.getElementById('total').textContent = formatPrice(total);
}

// Configurar event listeners
function setupCheckoutListeners() {
    // Tipo de entrega
    const tipoEntrega = document.getElementById('tipoEntrega');
    const direccionGroup = document.getElementById('direccionGroup');
    const direccion = document.getElementById('direccion');
    
    tipoEntrega.addEventListener('change', (e) => {
        if (e.target.value === 'retiro') {
            direccionGroup.style.display = 'none';
            direccion.removeAttribute('required');
        } else {
            direccionGroup.style.display = 'block';
            direccion.setAttribute('required', 'required');
        }
        updateTotals();
    });
    
    // Método de pago
    const metodoPagoInputs = document.querySelectorAll('input[name="metodoPago"]');
    const tarjetaFields = document.getElementById('tarjetaFields');
    
    metodoPagoInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.value === 'tarjeta') {
                tarjetaFields.classList.remove('hidden');
                tarjetaFields.querySelectorAll('input').forEach(inp => inp.setAttribute('required', 'required'));
            } else {
                tarjetaFields.classList.add('hidden');
                tarjetaFields.querySelectorAll('input').forEach(inp => inp.removeAttribute('required'));
            }
        });
    });
    
    // Formatear número de tarjeta
    const numeroTarjeta = document.querySelector('input[name="numeroTarjeta"]');
    if (numeroTarjeta) {
        numeroTarjeta.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Formatear vencimiento
    const vencimiento = document.querySelector('input[name="vencimiento"]');
    if (vencimiento) {
        vencimiento.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Formulario de checkout
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', handleCheckout);
}

// Procesar checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        cliente: {
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono'),
            email: formData.get('email')
        },
        entrega: {
            tipo: formData.get('tipoEntrega'),
            direccion: formData.get('direccion'),
            horario: formData.get('horario')
        },
        pago: {
            metodo: formData.get('metodoPago'),
            tarjeta: formData.get('metodoPago') === 'tarjeta' ? {
                numero: formData.get('numeroTarjeta')?.slice(-4), // Solo últimos 4 dígitos
                vencimiento: formData.get('vencimiento'),
                nombre: formData.get('nombreTarjeta')
            } : null
        },
        items: cart,
        subtotal: getCartTotal(),
        deliveryFee: formData.get('tipoEntrega') === 'delivery' ? DELIVERY_FEE : 0,
        total: getCartTotal() + (formData.get('tipoEntrega') === 'delivery' ? DELIVERY_FEE : 0),
        observaciones: formData.get('observaciones'),
        fecha: new Date().toISOString()
    };
    
    // Simular procesamiento de pago
    procesarPago(orderData);
}

// Simular procesamiento de pago
function procesarPago(orderData) {
    // Mostrar loading
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Procesando...';
    
    // Simular delay de procesamiento
    setTimeout(() => {
        // Guardar pedido en localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const orderId = 'ORD-' + Date.now();
        orderData.id = orderId;
        orderData.estado = 'pendiente';
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Limpiar carrito
        localStorage.removeItem('cart');
        cart = [];
        
        // Redirigir a página de confirmación
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        window.location.href = 'confirmacion.html';
    }, 2000);
}
