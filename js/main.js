// Variables globales
let currentFilter = 'todos';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderProducts();
    setupEventListeners();
    setupScrollAnimations();
    setupNavbar();
}

// Renderizar productos
function renderProducts(filter = 'todos') {
    const productsGrid = document.getElementById('productsGrid');
    
    const filteredProducts = filter === 'todos' 
        ? products 
        : products.filter(p => p.category === filter);
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No hay productos en esta categoría</p>';
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <img src="${product.image}" alt="${getText(product.name)}" class="product-image" onerror="this.src='assets/images/placeholder.jpg'">
            <div class="product-info">
                ${product.tags.includes('oferta') ? '<span class="product-badge">OFERTA</span>' : ''}
                ${product.tags.includes('popular') ? '<span class="product-badge">POPULAR</span>' : ''}
                <h3 class="product-name">${getText(product.name)}</h3>
                <p class="product-description">${getText(product.description)}</p>
                <div class="product-footer">
                    <div>
                        ${product.originalPrice ? `
                            <span style="text-decoration: line-through; color: #999; font-size: 1rem;">${formatPrice(product.originalPrice)}</span><br>
                        ` : ''}
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <div class="product-rating">
                        ${'⭐'.repeat(Math.round(product.rating))} (${product.reviews})
                    </div>
                </div>
                <button class="btn-add-cart" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Filtrar por categoría
function filterCategory(category) {
    currentFilter = category;
    renderProducts(category);
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Scroll al menú
    scrollToMenu();
}

// Agregar rápido al carrito (sin extras)
function quickAddToCart(productId) {
    addToCart(productId, [], '');
}

// Mostrar modal de producto
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('productModalTitle');
    const modalBody = document.getElementById('productModalBody');
    
    modalTitle.textContent = getText(product.name);
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${getText(product.name)}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;" onerror="this.src='assets/images/placeholder.jpg'">
        <p style="margin-bottom: 1rem;">${getText(product.description)}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <span style="font-size: 2rem; font-weight: 700; color: var(--color-primary);">${formatPrice(product.price)}</span>
            <span style="color: var(--color-secondary); font-size: 1.2rem;">
                ${'⭐'.repeat(Math.round(product.rating))} ${product.rating} (${product.reviews} reseñas)
            </span>
        </div>
        
        ${product.extras.length > 0 ? `
            <h4 style="margin-bottom: 1rem; color: var(--color-primary);">Extras disponibles:</h4>
            <div style="margin-bottom: 1.5rem;">
                ${product.extras.map(extra => `
                    <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; cursor: pointer;">
                        <input type="checkbox" value="${extra.id}" class="extra-checkbox" data-price="${extra.price}">
                        <span>${getText(extra.name)} (+${formatPrice(extra.price)})</span>
                    </label>
                `).join('')}
            </div>
        ` : ''}
        
        <h4 style="margin-bottom: 0.5rem; color: var(--color-primary);">Observaciones:</h4>
        <textarea id="productObservations" placeholder="Ej: Sin cebolla, doble salsa..." style="width: 100%; padding: 0.8rem; border: 2px solid var(--color-primary); border-radius: 5px; margin-bottom: 1.5rem; font-family: var(--font-body);"></textarea>
        
        <button class="btn-submit" onclick="addProductFromModal(${product.id})">
            Agregar al Carrito
        </button>
        
        <div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid var(--color-accent);">
            <h4 style="margin-bottom: 1rem; color: var(--color-primary);">Reseñas de clientes</h4>
            <div style="background: var(--color-accent); padding: 1rem; border-radius: 10px; margin-bottom: 0.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>Juan Pérez</strong>
                    <span style="color: var(--color-secondary);">⭐⭐⭐⭐⭐</span>
                </div>
                <p style="font-size: 0.9rem;">Excelente calidad, muy recomendado. La mejor lomitería de la ciudad.</p>
            </div>
            <div style="background: var(--color-accent); padding: 1rem; border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <strong>María González</strong>
                    <span style="color: var(--color-secondary);">⭐⭐⭐⭐⭐</span>
                </div>
                <p style="font-size: 0.9rem;">Delicioso! Los ingredientes son frescos y el servicio es rápido.</p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Cerrar modal de producto
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
}

// Agregar producto desde modal
function addProductFromModal(productId) {
    const selectedExtras = Array.from(document.querySelectorAll('.extra-checkbox:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    const observations = document.getElementById('productObservations').value;
    
    addToCart(productId, selectedExtras, observations);
    closeProductModal();
}

// Configurar event listeners
function setupEventListeners() {
    // Toggle menú móvil
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Botón de idioma
    const btnLanguage = document.getElementById('btnLanguage');
    if (btnLanguage) {
        btnLanguage.addEventListener('click', toggleLanguage);
    }
    
    // Botón de login
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', openLogin);
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Cerrar modales al hacer clic fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Cambiar idioma
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'gu' : 'es';
    
    // Actualizar todos los elementos con data-es y data-gu
    document.querySelectorAll('[data-es]').forEach(element => {
        const text = currentLanguage === 'es' ? element.getAttribute('data-es') : element.getAttribute('data-gu');
        element.textContent = text;
    });
    
    // Actualizar placeholders
    document.querySelectorAll('[data-placeholder-es]').forEach(element => {
        const placeholder = currentLanguage === 'es' 
            ? element.getAttribute('data-placeholder-es') 
            : element.getAttribute('data-placeholder-gu');
        element.placeholder = placeholder;
    });
    
    // Re-renderizar productos
    renderProducts(currentFilter);
    
    // Actualizar carrito
    updateCartUI();
    
    showNotification(currentLanguage === 'es' ? 'Idioma cambiado a Español' : 'Ñe\'ẽ oñemoambue Guaraníme');
}

// Abrir modal de login
function openLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
}

// Cerrar modal de login
function closeLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
}

// Manejar formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.');
    e.target.reset();
}

// Manejar login
function handleLogin(e) {
    e.preventDefault();
    showNotification('Sesión iniciada correctamente');
    closeLogin();
    
    // Cambiar botón de login
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent = 'Mi Cuenta';
    btnLogin.onclick = () => window.location.href = 'admin.html';
}

// Configurar navbar con scroll
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.category-card, .product-card, .about-content, .contact-content').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Scroll suave al menú
function scrollToMenu() {
    const menu = document.getElementById('menu');
    menu.scrollIntoView({ behavior: 'smooth' });
}

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
