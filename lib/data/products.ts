export type Review = {
  author: string;
  rating: number; // 1-5
  date: string;
  text: string;
  verified?: boolean;
};

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;         // primary image (card)
  images?: string[];     // gallery (detail page)
  category: string;
  benefits?: string[];
  howToUse?: string;
  ingredients?: string;
  reviews?: Review[];
};

/* ===== FARMACIA ===== */

export const farmaciaProducts: Product[] = [
  {
    id: "f1",
    name: "Multivitamínico diario",
    tagline: "Vitalidad sostenida · 60 cápsulas",
    description:
      "Complejo multivitamínico con vitaminas A, C, D, E y del complejo B, además de minerales esenciales como zinc y magnesio. Apoya el sistema inmune, la energía diaria y el bienestar general. Una cápsula al día con los alimentos.",
    price: 289,
    image: "/products/product-1.jpeg",
    images: ["/products/product-1.jpeg"],
    category: "Vitaminas",
    benefits: [
      "Sistema inmune fortalecido",
      "Energía sostenida sin picos",
      "Salud ósea y muscular",
      "Fórmula libre de gluten",
    ],
    howToUse: "Tomar 1 cápsula al día con los alimentos. No exceder la dosis recomendada.",
    ingredients: "Vitamina A, C, D3, E, B1, B2, B3, B5, B6, B9, B12 · Zinc, Magnesio, Selenio · Celulosa microcristalina.",
    reviews: [
      { author: "Mariana G.", rating: 5, date: "2025-11", text: "Llevo 3 meses tomándolo y noto más energía. Muy buen producto.", verified: true },
      { author: "Roberto M.", rating: 4, date: "2025-10", text: "Buena calidad, precio accesible. Rápida entrega.", verified: true },
      { author: "Fernanda L.", rating: 5, date: "2025-09", text: "El mejor multivitamínico que he probado, sin sabor extraño.", verified: false },
    ],
  },
  {
    id: "f2",
    name: "Magnesio bisglicinato",
    tagline: "Relajación muscular · 90 tabletas",
    description:
      "Forma altamente biodisponible del magnesio. Contribuye a la relajación muscular, favorece el descanso nocturno y reduce la fatiga. Libre de gluten y de origen vegetal. Toma 1-2 tabletas al día.",
    price: 349,
    image: "/products/product-2.jpeg",
    images: ["/products/product-2.jpeg"],
    category: "Suplementos",
    benefits: [
      "Relaja los músculos después del ejercicio",
      "Mejora la calidad del sueño",
      "Reduce la fatiga y el cansancio",
      "Alta biodisponibilidad (forma bisglicinato)",
    ],
    howToUse: "1-2 tabletas antes de dormir con agua. Consulta a tu médico si estás embarazada o tomas medicamentos.",
    ingredients: "Magnesio bisglicinato 400 mg · Celulosa microcristalina · Estearato de magnesio vegetal.",
    reviews: [
      { author: "Diego R.", rating: 5, date: "2025-12", text: "Duermo como nunca. Lo recomiendo a todo el mundo.", verified: true },
      { author: "Ana Cristina V.", rating: 5, date: "2025-11", text: "El magnesio bisglicinato es la mejor forma. Sin efectos secundarios.", verified: true },
    ],
  },
  {
    id: "f3",
    name: "Omega 3 premium",
    tagline: "Salud cardiovascular · 60 perlas",
    description:
      "Ácidos grasos EPA y DHA purificados en aceite de pescado de calidad farmacéutica. Apoya la salud cardiovascular, la función cerebral y la salud visual. Sin sabor residual.",
    price: 429,
    image: "/products/product-3.jpeg",
    images: ["/products/product-3.jpeg"],
    category: "Suplementos",
    benefits: [
      "Salud cardiovascular",
      "Función cognitiva y memoria",
      "Visión saludable",
      "Sin sabor a pescado (recubierta)",
    ],
    howToUse: "1-2 perlas al día con los alimentos. Conservar en lugar fresco.",
    ingredients: "Aceite de pescado (Engraulis spp.) · EPA 360 mg · DHA 240 mg · Vitamina E (antioxidante) · Gelatina (cápsulas).",
    reviews: [
      { author: "Jorge P.", rating: 4, date: "2025-10", text: "Muy buena calidad, no deja sabor residual como otros.", verified: true },
      { author: "Paola A.", rating: 5, date: "2025-09", text: "Mi cardiólogo me lo recomendó y estoy muy contenta con el resultado.", verified: false },
    ],
  },
  {
    id: "f4",
    name: "Probiótico intestinal",
    tagline: "Flora equilibrada · 30 cápsulas",
    description:
      "Fórmula con 10 mil millones de UFC y cepas clínicamente estudiadas. Restablece la flora intestinal, mejora la digestión y fortalece la barrera inmunológica. Una cápsula diaria en ayunas.",
    price: 519,
    image: "/products/product-4.jpeg",
    images: ["/products/product-4.jpeg"],
    category: "Digestivo",
    benefits: [
      "Flora intestinal equilibrada",
      "Menos inflamación y malestar digestivo",
      "Sistema inmune reforzado",
      "10 B UFC por cápsula",
    ],
    howToUse: "1 cápsula en ayunas, 30 minutos antes del desayuno. Conservar en refrigeración.",
    ingredients: "Lactobacillus acidophilus, L. rhamnosus, Bifidobacterium longum, B. lactis · FOS (prebiótico) · Celulosa vegetal.",
    reviews: [
      { author: "Sofía B.", rating: 5, date: "2025-12", text: "Después de un tratamiento con antibióticos, esto salvó mi intestino.", verified: true },
      { author: "Carlos H.", rating: 5, date: "2025-11", text: "Excelente probiótico, lo uso toda la familia.", verified: true },
      { author: "Daniela F.", rating: 4, date: "2025-10", text: "Noto mucha diferencia en mi digestión. Recomendado.", verified: false },
    ],
  },
];

export const farmaciaCategories = [
  "Vitaminas",
  "Analgésicos",
  "Antigripales",
  "Digestivo",
  "Higiene",
  "Cuidado bebé",
  "Dermatología",
  "Primeros auxilios",
];

/* ===== SKINCARE ===== */

export const skincareProducts: Product[] = [
  {
    id: "s1",
    name: "Kit Ritual Completo Pulpa Cruda de Arroz",
    tagline: "Tónico + Sérum + Crema + Leche limpiadora",
    description:
      "El ritual completo de 4 pasos con la potencia botánica de la pulpa cruda de arroz y niacinamida. Limpia, tonifica, trata e hidrata para una piel luminosa, uniforme y visiblemente más joven. Ideal para todo tipo de piel.",
    price: 2490,
    image: "/products/kit-1.jpeg",
    images: ["/products/kit-1.jpeg", "/products/kit-2.jpeg"],
    category: "Kits",
    benefits: [
      "4 pasos en un solo kit",
      "Niacinamida al 5% unifica el tono",
      "Ácido hialurónico de triple peso",
      "Apto para piel sensible",
    ],
    howToUse:
      "Mañana y noche: 1) Leche limpiadora · 2) Tónico de arroz · 3) Sérum de niacinamida · 4) Crema hidratante. Aplicar en piel limpia y seca.",
    ingredients:
      "Oryza sativa (pulpa de arroz) · Niacinamida 5% · Ácido hialurónico (triple peso) · Extracto de camomila · Aloe vera · Glicerina.",
    reviews: [
      { author: "Valentina R.", rating: 5, date: "2025-12", text: "A las 2 semanas noté el tono más uniforme. Increíble.", verified: true },
      { author: "Camila D.", rating: 5, date: "2025-11", text: "El ritual completo es una maravilla. Piel suave desde la primera semana.", verified: true },
      { author: "Melissa P.", rating: 4, date: "2025-10", text: "Me encantó la textura de todos los productos. Packaging muy bonito.", verified: false },
    ],
  },
  {
    id: "s2",
    name: "Kit Esencial Pulpa Cruda de Arroz",
    tagline: "Los 4 pasos del ritual · Edición especial",
    description:
      "Versión esencial del ritual, perfecta para iniciar tu rutina con los productos insignia de la línea. Incluye limpiador, tónico, sérum y crema formulados con principios activos de origen natural.",
    price: 2290,
    image: "/products/kit-2.jpeg",
    images: ["/products/kit-2.jpeg", "/products/kit-1.jpeg"],
    category: "Kits",
    benefits: [
      "Edición especial edición limitada",
      "Kit completo de inicio al ritual",
      "Formulación botánica y farmacéutica",
      "Sin parabenos ni sulfatos",
    ],
    howToUse:
      "Aplicar en orden: limpiador, tónico, sérum y crema. Dos veces al día sobre piel limpia.",
    ingredients:
      "Pulpa cruda de arroz · Niacinamida · Ácido hialurónico · Ceramidas vegetales · Extracto de loto blanco.",
    reviews: [
      { author: "Luz M.", rating: 5, date: "2025-11", text: "El esencial es perfecto para empezar. Resultados rápidos.", verified: true },
      { author: "Andrea F.", rating: 5, date: "2025-10", text: "Me lo regalaron y ya compré el segundo. Piel increíble.", verified: false },
    ],
  },
  {
    id: "s3",
    name: "Leche Limpiadora Pulpa Cruda de Arroz",
    tagline: "Niacinamida · Ácido hialurónico · 150 ml",
    description:
      "Leche limpiadora suave enriquecida con niacinamida y ácido hialurónico. Remueve maquillaje e impurezas sin resecar, deja la piel hidratada, uniforme y con sensación de confort. 150 ml.",
    price: 690,
    image: "/products/leche-limpiadora.jpeg",
    images: ["/products/leche-limpiadora.jpeg"],
    category: "Limpieza",
    benefits: [
      "Retira maquillaje waterproof",
      "No reseca ni irrita",
      "Niacinamida para tono uniforme",
      "Apta para pieles sensibles y reactivas",
    ],
    howToUse:
      "Aplicar en piel seca con movimientos circulares. Retirar con agua tibia o algodón. Usar mañana y noche.",
    ingredients:
      "Aqua · Oryza sativa · Niacinamida 5% · Ácido hialurónico sódico · Aloe barbadensis · Glicerina · PEG-7.",
    reviews: [
      { author: "Isabela T.", rating: 5, date: "2025-12", text: "Limpia perfectamente sin resecar. Mi piel ama este limpiador.", verified: true },
      { author: "Natalia C.", rating: 4, date: "2025-11", text: "Textura sedosa, quita maquillaje sin esfuerzo.", verified: true },
    ],
  },
  {
    id: "s7",
    name: "Kit Antiedad Microneedle Serum",
    tagline: "Solución antiedad · 3 ampollas × 5 ml + microagujas",
    description:
      "Tratamiento antiedad profesional con tecnología de microagujas. Kit completo que incluye 3 ampollas de 5 ml con suero concentrado y 1 aplicador de microagujas para potenciar la absorción de activos. Reduce arrugas, mejora la textura y devuelve luminosidad a la piel.",
    price: 1890,
    image: "/products/microneedle-kit-box.jpeg",
    images: [
      "/products/microneedle-kit-box.jpeg",
      "/products/microneedle-kit-open.jpeg",
      "/products/microneedle-kit-vials.jpeg",
      "/products/microneedle-kit-lotus.jpeg",
    ],
    category: "Tratamiento",
    benefits: [
      "Tecnología de microagujas para absorción máxima",
      "3 ampollas × 5 ml de suero concentrado",
      "Reduce líneas de expresión y arrugas",
      "Luminosidad visible desde la primera sesión",
      "Activos de calidad farmacéutica",
    ],
    howToUse:
      "1) Limpia bien el rostro. 2) Aplica el suero de la ampolla sobre la zona a tratar. 3) Pasa suavemente el aplicador de microagujas en movimientos verticales, horizontales y diagonales 4-5 veces. 4) Deja actuar sin enjuagar. 5) Aplicar 2-3 veces por semana. Siempre usar protector solar al día siguiente.",
    ingredients:
      "Hyaluronic Acid · Retinol · Peptides (Argireline, Matrixyl) · Vitamin C · Niacinamide · Centella asiatica · Aqua.",
    reviews: [
      { author: "Patricia V.", rating: 5, date: "2025-12", text: "Increíble resultado en 4 semanas. Las arrugas del contorno de ojos se ven mucho menos. 100% recomendado.", verified: true },
      { author: "Rebeca M.", rating: 5, date: "2025-11", text: "Al principio le tuve miedo a las microagujas pero no duele nada. La piel queda luminosa.", verified: true },
      { author: "Silvia G.", rating: 5, date: "2025-10", text: "Lo compré después de ver los resultados de una amiga. ¡Ahora yo también lo recomiendo!", verified: false },
      { author: "Guadalupe T.", rating: 4, date: "2025-09", text: "Muy buen producto, piel más firme a las 2 semanas.", verified: true },
    ],
  },
  {
    id: "s4",
    name: "Sérum renovador",
    tagline: "Vitamina C · Piel luminosa",
    description:
      "Sérum concentrado con vitamina C estabilizada que ilumina, unifica el tono y protege frente al daño oxidativo. Textura ligera de rápida absorción. Ideal de día bajo protector solar.",
    price: 890,
    image: "/products/product-5.jpeg",
    images: ["/products/product-5.jpeg"],
    category: "Sérum",
    benefits: [
      "Vitamina C estabilizada al 15%",
      "Ilumina y unifica el tono en 4 semanas",
      "Protección antioxidante diaria",
      "Textura ultraligera sin residuos",
    ],
    howToUse:
      "Aplicar 3-4 gotas en rostro y cuello cada mañana sobre piel limpia. Seguir con crema hidratante y protector solar.",
    ingredients:
      "Ascorbyl glucoside 15% · Niacinamida 3% · Hyaluronic acid · Ferulic acid · Propanediol · Aqua.",
    reviews: [
      { author: "Ximena L.", rating: 5, date: "2025-12", text: "Mi piel brilla como nunca. El mejor sérum de vitamina C que he probado.", verified: true },
      { author: "Karla N.", rating: 4, date: "2025-11", text: "Se absorbe increíble, sin esa textura pegajosa de otros sérums.", verified: false },
    ],
  },
  {
    id: "s5",
    name: "Crema hidratante nocturna",
    tagline: "Ácido hialurónico · 50 ml",
    description:
      "Crema de textura rica que sella la rutina y nutre durante la noche. Ácido hialurónico de triple peso molecular para una hidratación profunda y duradera. 50 ml.",
    price: 1240,
    image: "/products/product-6.jpeg",
    images: ["/products/product-6.jpeg"],
    category: "Hidratación",
    benefits: [
      "Hidratación profunda de 8 horas",
      "Ácido hialurónico triple peso molecular",
      "Activa la renovación celular nocturna",
      "Piel suave y rellena al despertar",
    ],
    howToUse:
      "Aplicar como último paso de la rutina nocturna. Usar movimientos ascendentes en cuello y rostro. 50 ml.",
    ingredients:
      "Sodium hyaluronate (LMW, MMW, HMW) · Ceramides · Shea butter · Squalane · Panthenol · Allantoin · Aqua.",
    reviews: [
      { author: "Lorena B.", rating: 5, date: "2025-11", text: "Me despierto con la piel suavísima. No volvería a usar otra crema nocturna.", verified: true },
      { author: "Fernanda A.", rating: 5, date: "2025-10", text: "Textura rica pero no grasosa. Perfecta para el invierno.", verified: true },
    ],
  },
  {
    id: "s6",
    name: "Aceite limpiador botánico",
    tagline: "Rosa mosqueta · 120 ml",
    description:
      "Aceite desmaquillante de primer paso con rosa mosqueta y vitamina E. Disuelve maquillaje waterproof y protector solar respetando el manto hidrolipídico. 120 ml.",
    price: 780,
    image: "/products/product-7.jpeg",
    images: ["/products/product-7.jpeg"],
    category: "Limpieza",
    benefits: [
      "Disuelve maquillaje waterproof sin restregar",
      "Rosa mosqueta regenera e hidrata",
      "Método double cleansing",
      "No obstruye poros",
    ],
    howToUse:
      "Aplicar en piel seca antes del limpiador. Masajear 30 segundos, agregar unas gotas de agua para emulsionar y retirar. Seguir con limpiador en gel o espuma.",
    ingredients:
      "Rosa canina (rosehip) oil · Helianthus annuus oil · Tocopherol (vit. E) · Caprylic/capric triglyceride · BHT.",
    reviews: [
      { author: "Adriana P.", rating: 5, date: "2025-11", text: "El mejor primer paso de limpieza. Quita hasta el delineador más resistente.", verified: true },
      { author: "Daniela C.", rating: 4, date: "2025-10", text: "Me gustó mucho. Piel limpia sin sentirla jalada.", verified: false },
    ],
  },
];

export const distribucionCategories = [
  {
    slug: "patente",
    title: "Medicamento de patente",
    description:
      "Laboratorios líderes con cadena de frío y trazabilidad verificable. Atención a farmacias y hospitales.",
  },
  {
    slug: "generico",
    title: "Medicamento genérico",
    description:
      "Bioequivalentes certificados, abasto estable y precios competitivos para expansión de farmacia independiente.",
  },
  {
    slug: "rebotica",
    title: "Rebotica y cuidado personal",
    description:
      "Línea complementaria para tu anaquel: higiene, vitaminas, primeros auxilios y productos de alta rotación.",
  },
];

export const ritualSteps = [
  { n: "01", title: "Limpieza", text: "Ritual matutino y nocturno con aceites botánicos que respetan la barrera cutánea." },
  { n: "02", title: "Tratamiento", text: "Sérum de principio activo concentrado para corregir y prevenir signos visibles." },
  { n: "03", title: "Hidratación", text: "Capa nutritiva que sella los activos y mantiene el manto hidrolipídico en equilibrio." },
  { n: "04", title: "Protección", text: "Barrera solar mineral para preservar la luminosidad conseguida durante el día." },
];
