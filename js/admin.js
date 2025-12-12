// Variables globales
let orders = [];
let currentOrderId = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
    updateDashboard();
    renderOrders();
    renderProducts();
});

// Cargar pedidos
function loadOrders() {
    orders = JSON.parse(localStorage.getItem('orders') || '[]');
}

// Mostrar sección
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar links activos
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Actualizar título
    const titles = {
        'dashboard': 'Dashboard',
        'pedidos': 'Gestión de Pedidos',
        'productos': 'Gestión de Productos',
        'reportes': 'Reportes y Estadísticas'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionId];
}

// Actualizar dashboard
function updateDashboard() {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.fecha).toDateString() === today);
    
    document.getElementById('totalPedidos').textContent = todayOrders.length;
    
    const ventasHoy = todayOrders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('ventasHoy').textContent = formatPrice(ventasHoy);
    
    const pendientes = orders.filter(o => o.estado === 'pendiente' || o.estado === 'preparando').length;
    document.getElementById('pedidosPendientes').textContent = pendientes;
    
    const completados = orders.filter(o => o.estado === 'entregado').length;
    document.getElementById('pedidosCompletados').textContent = completados;
    
    // Pedidos recientes
    const recentOrders = document.getElementById('recentOrders');
    const recent = orders.slice(-5).reverse();
    
    if (recent.length === 0) {
        recentOrders.innerHTML = '<p style="text-align: center; color: #666;">No hay pedidos recientes</p>';
    } else {
        recentOrders.innerHTML = recent.map(order => `
            <div class="order-card">
                <div class="order-info">
                    <h4>${order.id}</h4>
                    <p>${order.cliente.nombre} - ${formatPrice(order.total)}</p>
                </div>
                <span class="order-status status-${order.estado}">${getStatusText(order.estado)}</span>
            </div>
        `).join('');
    }
}

// Renderizar pedidos
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay pedidos registrados</p>';
        return;
    }
    
    ordersList.innerHTML = orders.slice().reverse().map(order => `
        <div class="order-item-admin">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div style="color: #666; font-size: 0.9rem;">${new Date(order.fecha).toLocaleString('es-PY')}</div>
                </div>
                <span class="order-status status-${order.estado}">${getStatusText(order.estado)}</span>
            </div>
            
            <div class="order-details-grid">
                <div class="order-detail-item">
                    <span class="order-detail-label">Cliente</span>
                    <span class="order-detail-value">${order.cliente.nombre}</span>
                </div>
                <div class="order-detail-item">
                    <span class="order-detail-label">Teléfono</span>
                    <span class="order-detail-value">${order.cliente.telefono}</span>
                </div>
                <div class="order-detail-item">
                    <span class="order-detail-label">Tipo de Entrega</span>
                    <span class="order-detail-value">${order.entrega.tipo === 'delivery' ? 'Delivery' : 'Retiro'}</span>
                </div>
                <div class="order-detail-item">
                    <span class="order-detail-label">Total</span>
                    <span class="order-detail-value" style="color: var(--color-primary); font-size: 1.2rem;">${formatPrice(order.total)}</span>
                </div>
            </div>
            
            ${order.entrega.direccion ? `
                <div style="margin-bottom: 1rem;">
                    <span class="order-detail-label">Dirección:</span>
                    <span class="order-detail-value">${order.entrega.direccion}</span>
                </div>
            ` : ''}
            
            <div class="order-items-list">
                <strong>Productos:</strong>
                <ul style="margin: 0.5rem 0 0 1.5rem;">
                    ${order.items.map(item => `
                        <li>${item.name} x${item.quantity} - ${formatPrice(getItemSubtotal(item))}</li>
                    `).join('')}
                </ul>
            </div>
            
            ${order.observaciones ? `
                <div style="margin-bottom: 1rem; padding: 0.8rem; background: var(--color-accent); border-radius: 5px;">
                    <strong>Observaciones:</strong> ${order.observaciones}
                </div>
            ` : ''}
            
            <div class="order-actions">
                <button class="btn-action btn-change-status" onclick="openStatusModal('${order.id}')">
                    Cambiar Estado
                </button>
                <button class="btn-action btn-view" onclick="viewOrderDetails('${order.id}')">
                    Ver Detalles
                </button>
            </div>
        </div>
    `).join('');
}

// Filtrar pedidos
function filterOrders() {
    const filterEstado = document.getElementById('filterEstado').value;
    
    const ordersList = document.getElementById('ordersList');
    const filteredOrders = filterEstado === 'todos' 
        ? orders 
        : orders.filter(o => o.estado === filterEstado);
    
    if (filteredOrders.length === 0) {
        ordersList.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">No hay pedidos con este estado</p>';
        return;
    }
    
    // Re-renderizar con pedidos filtrados
    const tempOrders = orders;
    orders = filteredOrders;
    renderOrders();
    orders = tempOrders;
}

// Abrir modal de cambio de estado
function openStatusModal(orderId) {
    currentOrderId = orderId;
    const order = orders.find(o => o.id === orderId);
    
    document.getElementById('newStatus').value = order.estado;
    document.getElementById('statusModal').classList.add('active');
}

// Cerrar modal de estado
function closeStatusModal() {
    document.getElementById('statusModal').classList.remove('active');
    currentOrderId = null;
}

// Actualizar estado del pedido
function updateOrderStatus() {
    const newStatus = document.getElementById('newStatus').value;
    const order = orders.find(o => o.id === currentOrderId);
    
    if (order) {
        order.estado = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        renderOrders();
        updateDashboard();
        closeStatusModal();
        
        alert('Estado actualizado correctamente');
    }
}

// Ver detalles del pedido
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    alert(`Detalles del pedido ${orderId}:\n\nCliente: ${order.cliente.nombre}\nTotal: ${formatPrice(order.total)}\nEstado: ${getStatusText(order.estado)}`);
}

// Renderizar productos
function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${getText(product.name)}" class="product-img-small" onerror="this.src='assets/images/placeholder.jpg'"></td>
            <td>${getText(product.name)}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>${formatPrice(product.price)}</td>
            <td>
                <span class="availability-badge ${product.available ? 'available' : 'unavailable'}">
                    ${product.available ? 'Disponible' : 'No disponible'}
                </span>
            </td>
            <td>
                <button class="btn-action" onclick="editProduct(${product.id})" style="background: var(--color-secondary); color: var(--color-dark);">
                    Editar
                </button>
                <button class="btn-action" onclick="toggleAvailability(${product.id})" style="background: ${product.available ? '#dc3545' : '#28a745'}; color: white;">
                    ${product.available ? 'Deshabilitar' : 'Habilitar'}
                </button>
            </td>
        </tr>
    `).join('');
}

// Obtener nombre de categoría
function getCategoryName(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    return category ? getText(category.name) : categoryId;
}

// Cambiar disponibilidad
function toggleAvailability(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.available = !product.available;
        renderProducts();
        alert(`Producto ${product.available ? 'habilitado' : 'deshabilitado'} correctamente`);
    }
}

// Editar producto
function editProduct(productId) {
    alert('Función de edición en desarrollo. ID del producto: ' + productId);
}

// Mostrar modal de agregar producto
function showAddProductModal() {
    alert('Función de agregar producto en desarrollo');
}

// Generar reporte
function generateReport() {
    const period = document.getElementById('reportPeriod').value;
    
    let filteredOrders = orders;
    const now = new Date();
    
    if (period === 'hoy') {
        filteredOrders = orders.filter(o => 
            new Date(o.fecha).toDateString() === now.toDateString()
        );
    } else if (period === 'semana') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filteredOrders = orders.filter(o => new Date(o.fecha) >= weekAgo);
    } else if (period === 'mes') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        filteredOrders = orders.filter(o => new Date(o.fecha) >= monthAgo);
    }
    
    const totalVentas = filteredOrders.reduce((sum, o) => sum + o.total, 0);
    document.getElementById('reportVentas').textContent = formatPrice(totalVentas);
    
    // Productos más vendidos
    const productSales = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.name]) {
                productSales[item.name] = 0;
            }
            productSales[item.name] += item.quantity;
        });
    });
    
    const topProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const topProductsDiv = document.getElementById('topProducts');
    
    if (topProducts.length === 0) {
        topProductsDiv.innerHTML = '<p style="color: #666;">No hay datos para este período</p>';
    } else {
        topProductsDiv.innerHTML = topProducts.map(([name, qty]) => `
            <div class="top-product-item">
                <span>${name}</span>
                <span style="font-weight: 700; color: var(--color-primary);">${qty} vendidos</span>
            </div>
        `).join('');
    }
}

// Obtener texto de estado
function getStatusText(status) {
    const statusTexts = {
        'pendiente': 'Pendiente',
        'preparando': 'Preparando',
        'listo': 'Listo',
        'entregado': 'Entregado',
        'cancelado': 'Cancelado'
    };
    return statusTexts[status] || status;
}

// Calcular subtotal de item (función duplicada para admin)
function getItemSubtotal(item) {
    const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
    return (item.price + extrasTotal) * item.quantity;
}

// Cerrar sesión
function logout() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = 'index.html';
    }
}

// Generar reporte inicial
generateReport();
