// Base de datos de productos
const products = [
    {
        id: 1,
        name: { es: "Lomito Completo", gu: "Lomito Opavavete" },
        description: { es: "Lomito con lechuga, tomate, jamón, queso, huevo y papas", gu: "Lomito yurúpe, tomate, jamón, queso, ryguasu ha mandio" },
        category: "lomitos",
        price: 35000,
        image: "assets/images/lomito1.jpg",
        available: true,
        tags: ["popular"],
        extras: [
            { id: 1, name: { es: "Doble carne", gu: "So'o mokõi" }, price: 8000 },
            { id: 2, name: { es: "Queso extra", gu: "Queso hetave" }, price: 2500 },
            { id: 3, name: { es: "Panceta", gu: "Panceta" }, price: 3500 }
        ],
        rating: 4.8,
        reviews: 127
    },
    {
        id: 2,
        name: { es: "Lomito Especial", gu: "Lomito Especial" },
        description: { es: "Lomito premium con ingredientes selectos y salsa especial", gu: "Lomito premium mba'e iporãitereíva ha salsa especial" },
        category: "lomitos",
        price: 42000,
        image: "assets/images/lomito2.jpg",
        available: true,
        tags: ["premium", "especial"],
        extras: [
            { id: 1, name: { es: "Doble carne", gu: "So'o mokõi" }, price: 8000 },
            { id: 2, name: { es: "Queso extra", gu: "Queso hetave" }, price: 2500 },
            { id: 4, name: { es: "Champiñones", gu: "Champiñón-kuéra" }, price: 4000 }
        ],
        rating: 4.9,
        reviews: 203
    },
    {
        id: 3,
        name: { es: "Hamburguesa Clásica", gu: "Hamburguesa Ymaguare" },
        description: { es: "Hamburguesa con carne jugosa, lechuga, tomate y cebolla", gu: "Hamburguesa so'o porã, yurú, tomate ha sevói" },
        category: "hamburguesas",
        price: 28000,
        image: "assets/images/hamburguesa1.jpg",
        available: true,
        tags: [],
        extras: [
            { id: 1, name: { es: "Doble carne", gu: "So'o mokõi" }, price: 8000 },
            { id: 2, name: { es: "Queso extra", gu: "Queso hetave" }, price: 2500 },
            { id: 3, name: { es: "Panceta", gu: "Panceta" }, price: 3500 }
        ],
        rating: 4.6,
        reviews: 89
    },
    {
        id: 4,
        name: { es: "Hamburguesa BBQ", gu: "Hamburguesa BBQ" },
        description: { es: "Con salsa BBQ, cebolla caramelizada y queso cheddar", gu: "Salsa BBQ, sevói caramelizada ha queso cheddar" },
        category: "hamburguesas",
        price: 32000,
        image: "assets/images/hamburguesa2.jpg",
        available: true,
        tags: ["popular"],
        extras: [
            { id: 1, name: { es: "Doble carne", gu: "So'o mokõi" }, price: 8000 },
            { id: 2, name: { es: "Queso extra", gu: "Queso hetave" }, price: 2500 },
            { id: 5, name: { es: "Aros de cebolla", gu: "Sevói aros" }, price: 3000 }
        ],
        rating: 4.7,
        reviews: 156
    },
    {
        id: 5,
        name: { es: "Papas Fritas Grandes", gu: "Mandio Frito Tuicha" },
        description: { es: "Porción grande de papas fritas crocantes", gu: "Porción tuicha mandio frito kañy" },
        category: "papas",
        price: 12000,
        image: "assets/images/papas1.jpg",
        available: true,
        tags: [],
        extras: [
            { id: 6, name: { es: "Salsa cheddar", gu: "Salsa cheddar" }, price: 2000 },
            { id: 7, name: { es: "Salsa BBQ", gu: "Salsa BBQ" }, price: 1500 }
        ],
        rating: 4.5,
        reviews: 234
    },
    {
        id: 6,
        name: { es: "Papas con Cheddar y Panceta", gu: "Mandio Cheddar ha Panceta" },
        description: { es: "Papas fritas cubiertas con queso cheddar y panceta crocante", gu: "Mandio frito cheddar ha panceta kañy" },
        category: "papas",
        price: 18000,
        image: "assets/images/papas2.jpg",
        available: true,
        tags: ["popular"],
        extras: [
            { id: 8, name: { es: "Extra panceta", gu: "Panceta hetave" }, price: 3000 }
        ],
        rating: 4.8,
        reviews: 178
    },
    {
        id: 7,
        name: { es: "Coca Cola 500ml", gu: "Coca Cola 500ml" },
        description: { es: "Bebida gaseosa refrescante", gu: "Hy'a gaseosa" },
        category: "bebidas",
        price: 6000,
        image: "assets/images/coca.jpg",
        available: true,
        tags: [],
        extras: [],
        rating: 4.3,
        reviews: 412
    },
    {
        id: 8,
        name: { es: "Jugo Natural de Naranja", gu: "Naranha Jugo Natural" },
        description: { es: "Jugo exprimido de naranjas frescas", gu: "Jugo naranha pyahu" },
        category: "bebidas",
        price: 8000,
        image: "assets/images/jugo.jpg",
        available: true,
        tags: ["natural"],
        extras: [],
        rating: 4.7,
        reviews: 95
    },
    {
        id: 9,
        name: { es: "Brownie con Helado", gu: "Brownie Helado" },
        description: { es: "Brownie de chocolate caliente con helado de vainilla", gu: "Brownie chocolate haku helado vainilla" },
        category: "postres",
        price: 15000,
        image: "assets/images/brownie.jpg",
        available: true,
        tags: ["dulce"],
        extras: [
            { id: 9, name: { es: "Dulce de leche extra", gu: "Dulce de leche hetave" }, price: 2000 }
        ],
        rating: 4.9,
        reviews: 267
    },
    {
        id: 10,
        name: { es: "Combo Familiar", gu: "Combo Familia" },
        description: { es: "2 lomitos + papas grandes + 2 bebidas", gu: "2 lomito + mandio tuicha + 2 hy'a" },
        category: "ofertas",
        price: 65000,
        originalPrice: 78000,
        image: "assets/images/combo.jpg",
        available: true,
        tags: ["oferta", "ahorro"],
        extras: [],
        rating: 4.8,
        reviews: 189
    }
];

// Categorías
const categories = [
    { id: "lomitos", name: { es: "Lomitos", gu: "Lomito-kuéra" }, icon: "🥖" },
    { id: "hamburguesas", name: { es: "Hamburguesas", gu: "Hamburguesa-kuéra" }, icon: "🍔" },
    { id: "papas", name: { es: "Papas", gu: "Mandio-kuéra" }, icon: "🍟" },
    { id: "bebidas", name: { es: "Bebidas", gu: "Hy'a-kuéra" }, icon: "🥤" },
    { id: "postres", name: { es: "Postres", gu: "Tembi'u he'ẽ" }, icon: "🍰" },
    { id: "ofertas", name: { es: "Ofertas", gu: "Ñemuhã" }, icon: "⭐" }
];

// Idioma actual
let currentLanguage = 'es';

// Función para obtener texto traducido
function getText(obj) {
    if (typeof obj === 'string') return obj;
    return obj[currentLanguage] || obj.es;
}

// Función para formatear precio
function formatPrice(price) {
    return `Gs. ${price.toLocaleString('es-PY')}`;
}
