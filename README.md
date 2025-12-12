# Lomitería Premium - Tienda Web

Sistema completo de tienda online para lomitería con carrito de compras, checkout, panel administrativo y sistema de reseñas.

## 🚀 Características Principales

### Para Clientes
- **Catálogo de productos** por categorías (Lomitos, Hamburguesas, Papas, Bebidas, Postres, Ofertas)
- **Página principal premium** con diseño moderno y animaciones suaves
- **Carrito de compras** con personalización de productos (extras y observaciones)
- **Checkout completo** con dos opciones de pago:
  - Pago con tarjeta (simulado)
  - Pagar al retirar
- **Sistema de reseñas** por producto con calificación de estrellas
- **Multilenguaje**: Español y Guaraní
- **Diseño responsive** para móviles y escritorio

### Para Administradores
- **Dashboard** con estadísticas en tiempo real
- **Gestión de pedidos** con cambio de estados
- **Gestión de productos** (CRUD básico)
- **Reportes de ventas** por período
- **Productos más vendidos**

## 📁 Estructura del Proyecto

```
lomiteria-web/
├── index.html              # Página principal
├── checkout.html           # Página de checkout
├── confirmacion.html       # Confirmación de pedido
├── admin.html             # Panel administrativo
├── css/
│   ├── styles.css         # Estilos principales
│   ├── checkout.css       # Estilos del checkout
│   └── admin.css          # Estilos del admin
├── js/
│   ├── data.js            # Base de datos de productos
│   ├── cart.js            # Lógica del carrito
│   ├── main.js            # Funcionalidad principal
│   ├── checkout.js        # Lógica del checkout
│   └── admin.js           # Lógica del panel admin
└── assets/
    ├── images/            # Imágenes de productos
    └── video/             # Video de fondo del hero
```

## 🎨 Diseño

### Paleta de Colores
- **Primary**: #8B2500 (Rojo oscuro)
- **Secondary**: #D4AF37 (Dorado)
- **Accent**: #FFF8DC (Crema)
- **Dark**: #2C1810 (Marrón oscuro)
- **Light**: #F5F5F5 (Gris claro)

### Tipografías
- **Títulos**: Playfair Display (serif)
- **Cuerpo**: Lato (sans-serif)

## 💾 Almacenamiento

El sistema utiliza **localStorage** para simular una base de datos:

- `cart`: Carrito de compras actual
- `orders`: Historial de pedidos
- `lastOrder`: Último pedido realizado

## 🛠️ Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor (funciona con archivos locales)

### Instalación

1. Descarga y descomprime el archivo ZIP
2. Abre `index.html` en tu navegador
3. ¡Listo! El sitio está funcionando

### Uso del Panel Administrativo

1. Accede a `admin.html` directamente o haz clic en "Ingresar" → "Mi Cuenta"
2. Navega por las secciones:
   - **Dashboard**: Estadísticas generales
   - **Pedidos**: Gestión de pedidos y cambio de estados
   - **Productos**: Gestión del catálogo
   - **Reportes**: Análisis de ventas

## 📱 Funcionalidades Implementadas

### ✅ Completadas
- [x] Catálogo de productos con filtros por categoría
- [x] Carrito de compras funcional
- [x] Personalización de productos (extras y observaciones)
- [x] Checkout con formulario completo
- [x] Simulación de pago con tarjeta
- [x] Opción de pagar al retirar
- [x] Confirmación de pedido
- [x] Panel administrativo
- [x] Gestión de pedidos con estados
- [x] Reportes básicos de ventas
- [x] Sistema de reseñas (estático)
- [x] Multilenguaje ES/GU
- [x] Diseño responsive
- [x] Animaciones y transiciones

### 🔄 Pendientes (Fase 2)
- [ ] Integración con pasarela de pagos real
- [ ] Backend con Node.js/Express
- [ ] Base de datos MySQL
- [ ] Sistema de autenticación real
- [ ] Notificaciones por email/SMS
- [ ] Actualización en tiempo real (WebSockets)
- [ ] Sistema de reseñas dinámico
- [ ] Gestión de stock automática
- [ ] Subida de imágenes desde admin
- [ ] Registro de actividad (logs)

## 🔐 Seguridad

**Nota importante**: Esta es una versión MVP (Producto Mínimo Viable) que simula funcionalidades. Para producción se requiere:

- Backend con API REST segura
- Base de datos real (MySQL)
- Autenticación JWT o sesiones seguras
- Integración con pasarela de pagos certificada (PCI DSS)
- HTTPS obligatorio
- Validación y sanitización de inputs
- Protección CSRF
- Hash de contraseñas (bcrypt)

## 📊 Datos de Ejemplo

El sistema incluye 10 productos de ejemplo:
- 2 Lomitos
- 2 Hamburguesas
- 2 Papas
- 2 Bebidas
- 1 Postre
- 1 Combo (Oferta)

Todos los precios están en **Guaraníes (Gs.)**.

## 🌐 Multilenguaje

El sistema soporta dos idiomas:
- **Español (ES)**: Idioma por defecto
- **Guaraní (GU)**: Idioma alternativo

Para cambiar el idioma, haz clic en el botón "ES / GU" en la barra de navegación.

## 📞 Contacto

Para consultas o soporte:
- **Teléfono**: +595 21 123 4567
- **Dirección**: Av. Principal 1234, Asunción
- **Horario**: Lunes a Domingo, 11:00 - 23:00

## 📄 Licencia

© 2025 Lomitería Premium. Todos los derechos reservados.

---

## 🚀 Próximos Pasos

### Para implementar en producción:

1. **Configurar Backend**
   ```bash
   npm init -y
   npm install express mysql2 bcrypt jsonwebtoken
   ```

2. **Crear Base de Datos**
   - Importar schema SQL (ver especificación)
   - Configurar conexión MySQL

3. **Integrar Pasarela de Pagos**
   - Bancard (Paraguay)
   - Stripe (Internacional)
   - PayPal

4. **Deploy**
   - Servidor con HTTPS
   - Configurar dominio
   - Backups automáticos

## 🎯 Criterios de Aceptación Cumplidos

- ✅ Página principal responsive con hero
- ✅ Catálogo navegable con fichas de producto
- ✅ Carrito funcional con extras y observaciones
- ✅ Checkout con pago con tarjeta y pagar al retirar
- ✅ Panel administrativo básico (CRUD productos, gestión pedidos)
- ✅ Sistema de reseñas por producto
- ✅ Multilenguaje ES + GU
- ✅ Documentación básica (README)

---

**Desarrollado por**: Manus AI  
**Versión**: 1.0.0 MVP  
**Fecha**: 2025
