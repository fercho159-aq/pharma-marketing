export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export const farmaciaProducts: Product[] = [
  {
    id: "f1",
    name: "Multivitamínico diario",
    tagline: "Vitalidad sostenida · 60 cápsulas",
    description:
      "Complejo multivitamínico con vitaminas A, C, D, E y del complejo B, además de minerales esenciales como zinc y magnesio. Apoya el sistema inmune, la energía diaria y el bienestar general. Una cápsula al día con los alimentos.",
    price: 289,
    image: "/products/product-1.jpeg",
    category: "Vitaminas",
  },
  {
    id: "f2",
    name: "Magnesio bisglicinato",
    tagline: "Relajación muscular · 90 tabletas",
    description:
      "Forma altamente biodisponible del magnesio. Contribuye a la relajación muscular, favorece el descanso nocturno y reduce la fatiga. Libre de gluten y de origen vegetal. Toma 1-2 tabletas al día.",
    price: 349,
    image: "/products/product-2.jpeg",
    category: "Suplementos",
  },
  {
    id: "f3",
    name: "Omega 3 premium",
    tagline: "Salud cardiovascular · 60 perlas",
    description:
      "Ácidos grasos EPA y DHA purificados en aceite de pescado de calidad farmacéutica. Apoya la salud cardiovascular, la función cerebral y la salud visual. Sin sabor residual.",
    price: 429,
    image: "/products/product-3.jpeg",
    category: "Suplementos",
  },
  {
    id: "f4",
    name: "Probiótico intestinal",
    tagline: "Flora equilibrada · 30 cápsulas",
    description:
      "Fórmula con 10 mil millones de UFC y cepas clínicamente estudiadas. Restablece la flora intestinal, mejora la digestión y fortalece la barrera inmunológica. Una cápsula diaria en ayunas.",
    price: 519,
    image: "/products/product-4.jpeg",
    category: "Digestivo",
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

export const skincareProducts: Product[] = [
  {
    id: "s1",
    name: "Kit Ritual Completo Pulpa Cruda de Arroz",
    tagline: "Tónico + Sérum + Crema + Leche limpiadora",
    description:
      "El ritual completo de 4 pasos con la potencia botánica de la pulpa cruda de arroz y niacinamida. Limpia, tonifica, trata e hidrata para una piel luminosa, uniforme y visiblemente más joven. Ideal para todo tipo de piel.",
    price: 2490,
    image: "/products/kit-1.jpeg",
    category: "Kits",
  },
  {
    id: "s2",
    name: "Kit Esencial Pulpa Cruda de Arroz",
    tagline: "Los 4 pasos del ritual · Edición especial",
    description:
      "Versión esencial del ritual, perfecta para iniciar tu rutina con los productos insignia de la línea. Incluye limpiador, tónico, sérum y crema formulados con principios activos de origen natural.",
    price: 2290,
    image: "/products/kit-2.jpeg",
    category: "Kits",
  },
  {
    id: "s3",
    name: "Leche Limpiadora Pulpa Cruda de Arroz",
    tagline: "Niacinamida · Ácido hialurónico · 150 ml",
    description:
      "Leche limpiadora suave enriquecida con niacinamida y ácido hialurónico. Remueve maquillaje e impurezas sin resecar, deja la piel hidratada, uniforme y con sensación de confort. 150 ml.",
    price: 690,
    image: "/products/leche-limpiadora.jpeg",
    category: "Limpieza",
  },
  {
    id: "s4",
    name: "Sérum renovador",
    tagline: "Vitamina C · Piel luminosa",
    description:
      "Sérum concentrado con vitamina C estabilizada que ilumina, unifica el tono y protege frente al daño oxidativo. Textura ligera de rápida absorción. Ideal de día bajo protector solar.",
    price: 890,
    image: "/products/product-5.jpeg",
    category: "Sérum",
  },
  {
    id: "s5",
    name: "Crema hidratante nocturna",
    tagline: "Ácido hialurónico · 50 ml",
    description:
      "Crema de textura rica que sella la rutina y nutre durante la noche. Ácido hialurónico de triple peso molecular para una hidratación profunda y duradera. 50 ml.",
    price: 1240,
    image: "/products/product-6.jpeg",
    category: "Hidratación",
  },
  {
    id: "s6",
    name: "Aceite limpiador botánico",
    tagline: "Rosa mosqueta · 120 ml",
    description:
      "Aceite desmaquillante de primer paso con rosa mosqueta y vitamina E. Disuelve maquillaje waterproof y protector solar respetando el manto hidrolipídico. 120 ml.",
    price: 780,
    image: "/products/product-7.jpeg",
    category: "Limpieza",
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
