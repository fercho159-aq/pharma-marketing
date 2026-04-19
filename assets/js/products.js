/* =========================================
   Product catalog (placeholder data)
   Cliente no ha enviado productos finales.
   ========================================= */
const PRODUCTS = [
  // ============ FARMACIA ============
  {
    id: 'f01',
    section: 'farmacia',
    cat: 'Analgésicos',
    name: 'Paracetamol 500mg - Caja 20 tabletas',
    price: 49.00, priceOld: 69.00,
    rating: 4.8, reviews: 324,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
    short: 'Alivio rápido y efectivo del dolor leve a moderado y fiebre.',
    bullets: [
      'Fórmula de liberación rápida',
      'Apto para adultos y niños mayores de 12 años',
      'Libre de gluten y lactosa'
    ]
  },
  {
    id: 'f02',
    section: 'farmacia',
    cat: 'Vitaminas',
    name: 'Multivitamínico + Minerales 60 cápsulas',
    price: 389.00, priceOld: 459.00,
    rating: 4.9, reviews: 512,
    tag: 'new',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=800&auto=format&fit=crop',
    short: 'Apoya tu sistema inmune con 23 vitaminas y minerales esenciales.',
    bullets: [
      'Contiene Vitamina C, D3, B12 y Zinc',
      'Fórmula de absorción mejorada',
      'Ingesta: 1 cápsula diaria'
    ]
  },
  {
    id: 'f03',
    section: 'farmacia',
    cat: 'Digestivo',
    name: 'Probióticos + Fibra Vegetal 30 sobres',
    price: 279.00,
    rating: 4.7, reviews: 198,
    tag: null,
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=800&auto=format&fit=crop',
    short: 'Recupera el equilibrio de tu flora intestinal en 14 días.',
    bullets: ['10 cepas probióticas', 'Sin azúcares añadidos', 'Sabor neutro']
  },
  {
    id: 'f04',
    section: 'farmacia',
    cat: 'Antigripales',
    name: 'Descongestionante Día/Noche 12 cápsulas',
    price: 119.00, priceOld: 149.00,
    rating: 4.6, reviews: 240,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop',
    short: 'Combate gripa y congestión por 24 horas con doble acción.',
    bullets: ['Fórmula día: sin somnolencia', 'Fórmula noche: descanso reparador', 'Sabor mentolado']
  },
  {
    id: 'f05',
    section: 'farmacia',
    cat: 'Analgésicos',
    name: 'Ibuprofeno 400mg Caja 24 tabletas',
    price: 89.00,
    rating: 4.8, reviews: 411,
    tag: null,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=800&auto=format&fit=crop',
    short: 'Antiinflamatorio de acción prolongada para dolor muscular.',
    bullets: ['Efecto hasta 8 horas', 'Reduce inflamación', 'Recubrimiento gástrico']
  },
  {
    id: 'f06',
    section: 'farmacia',
    cat: 'Vitaminas',
    name: 'Vitamina C 1000mg Efervescente 20 tabs',
    price: 159.00, priceOld: 199.00,
    rating: 4.9, reviews: 620,
    tag: 'bestseller',
    image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=800&auto=format&fit=crop',
    short: 'Refuerza tus defensas todos los días. Sabor naranja.',
    bullets: ['Alta potencia 1000mg', 'Fácil disolución', 'Vegano']
  },
  {
    id: 'f07',
    section: 'farmacia',
    cat: 'Cuidado bucal',
    name: 'Enjuague Bucal Antibacterial 500ml',
    price: 99.00,
    rating: 4.5, reviews: 142,
    tag: null,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop',
    short: 'Elimina 99% de bacterias por 12 horas. Aliento fresco.',
    bullets: ['Sin alcohol', 'Con flúor', 'Menta suave']
  },
  {
    id: 'f08',
    section: 'farmacia',
    cat: 'Primeros auxilios',
    name: 'Botiquín Familiar Completo',
    price: 549.00, priceOld: 699.00,
    rating: 4.9, reviews: 89,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop',
    short: 'Todo lo que tu familia necesita en caso de emergencia.',
    bullets: ['+40 artículos', 'Estuche resistente', 'Guía de primeros auxilios']
  },

  // ============ SKINCARE ============
  {
    id: 's01',
    section: 'skincare',
    cat: 'Serums',
    name: 'Serum Vitamina C + Ácido Hialurónico 30ml',
    price: 699.00, priceOld: 899.00,
    rating: 4.9, reviews: 1247,
    tag: 'bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    short: 'Ilumina, unifica el tono y elimina manchas en 14 días.',
    bullets: [
      '20% Vitamina C estabilizada',
      'Hidratación profunda 72h',
      'Textura ligera, rápida absorción'
    ]
  },
  {
    id: 's02',
    section: 'skincare',
    cat: 'Limpieza',
    name: 'Limpiador Facial Suave 200ml',
    price: 289.00,
    rating: 4.8, reviews: 832,
    tag: 'new',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    short: 'Limpia sin resecar. Equilibra el pH natural de tu piel.',
    bullets: ['Sin sulfatos ni parabenos', 'Apto piel sensible', 'Con extracto de aloe']
  },
  {
    id: 's03',
    section: 'skincare',
    cat: 'Protección solar',
    name: 'Protector Solar FPS 50+ Toque Seco 60ml',
    price: 399.00, priceOld: 499.00,
    rating: 4.9, reviews: 956,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop',
    short: 'Protección UVA/UVB sin brillos. Ideal bajo el maquillaje.',
    bullets: ['FPS 50+', 'Toque seco no graso', 'Resistente al agua']
  },
  {
    id: 's04',
    section: 'skincare',
    cat: 'Antiedad',
    name: 'Crema Antiedad Noche Retinol 0.3% 50ml',
    price: 849.00,
    rating: 4.8, reviews: 687,
    tag: null,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?q=80&w=800&auto=format&fit=crop',
    short: 'Reduce líneas de expresión y mejora firmeza mientras duermes.',
    bullets: ['Retinol encapsulado', 'Péptidos y niacinamida', 'Uso nocturno']
  },
  {
    id: 's05',
    section: 'skincare',
    cat: 'Hidratación',
    name: 'Crema Hidratante Diurna 50ml',
    price: 449.00, priceOld: 549.00,
    rating: 4.7, reviews: 421,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop',
    short: 'Hidratación 24h + protección antioxidante diaria.',
    bullets: ['Con ácido hialurónico', 'Vitamina E y escualano', 'Base de maquillaje ideal']
  },
  {
    id: 's06',
    section: 'skincare',
    cat: 'Contorno',
    name: 'Contorno de Ojos Antifatiga 15ml',
    price: 549.00,
    rating: 4.6, reviews: 298,
    tag: 'new',
    image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop',
    short: 'Reduce ojeras, bolsas y arruguitas de expresión.',
    bullets: ['Aplicador metálico frío', 'Cafeína + péptidos', 'Efecto lifting inmediato']
  },
  {
    id: 's07',
    section: 'skincare',
    cat: 'Mascarillas',
    name: 'Mascarilla Arcilla Purificante 75ml',
    price: 319.00,
    rating: 4.8, reviews: 512,
    tag: null,
    image: 'https://images.unsplash.com/photo-1570194065921-d12fd0a6c5a7?q=80&w=800&auto=format&fit=crop',
    short: 'Elimina impurezas y afina poros en solo 10 minutos.',
    bullets: ['Arcilla roja + carbón', 'Piel mixta a grasa', '1-2 veces por semana']
  },
  {
    id: 's08',
    section: 'skincare',
    cat: 'Kit',
    name: 'Kit Rutina Facial Completa 4 pasos',
    price: 1499.00, priceOld: 1899.00,
    rating: 5.0, reviews: 187,
    tag: 'sale',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    short: 'Tu rutina profesional en casa: limpieza, serum, hidratante y FPS.',
    bullets: ['Ahorra 26%', 'Presentación de lujo', 'Incluye guía de uso']
  }
];

const BESTSELLERS = PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 8);

function getProducts(section) {
  return PRODUCTS.filter(p => p.section === section);
}
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
function formatPrice(n) {
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
