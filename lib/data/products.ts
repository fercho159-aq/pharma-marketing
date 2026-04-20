export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: string;
};

export const farmaciaProducts: Product[] = [
  {
    id: "f1",
    name: "Multivitamínico diario",
    tagline: "Vitalidad sostenida · 60 cápsulas",
    price: 289,
    image: "/products/product-1.jpeg",
    category: "Vitaminas",
  },
  {
    id: "f2",
    name: "Magnesio bisglicinato",
    tagline: "Relajación muscular · 90 tabletas",
    price: 349,
    image: "/products/product-2.jpeg",
    category: "Suplementos",
  },
  {
    id: "f3",
    name: "Omega 3 premium",
    tagline: "Salud cardiovascular · 60 perlas",
    price: 429,
    image: "/products/product-3.jpeg",
    category: "Suplementos",
  },
  {
    id: "f4",
    name: "Probiótico intestinal",
    tagline: "Flora equilibrada · 30 cápsulas",
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
    name: "Sérum renovador",
    tagline: "Vitamina C · Piel luminosa",
    price: 890,
    image: "/products/product-5.jpeg",
    category: "Sérum",
  },
  {
    id: "s2",
    name: "Crema hidratante nocturna",
    tagline: "Ácido hialurónico · 50 ml",
    price: 1240,
    image: "/products/product-6.jpeg",
    category: "Hidratación",
  },
  {
    id: "s3",
    name: "Aceite limpiador botánico",
    tagline: "Rosa mosqueta · 120 ml",
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
