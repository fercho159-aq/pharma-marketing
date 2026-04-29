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
  /* ---- Antifúngicos ---- */
  {
    id: "f1",
    name: "Erbitrax-T — Terbinafina 250 mg",
    tagline: "Antifúngico · 28 tabletas · Loeffler",
    description:
      "Terbinafina 250 mg es un antifúngico de amplio espectro para el tratamiento de micosis de uñas (onicomicosis) y piel. Inhibe la síntesis de ergosterol en el hongo, eliminándolo de forma selectiva. Caja con 28 tabletas.",
    price: 320,
    image: "/products/farmacia/erbitrax-t-terbinafina-250mg.png",
    images: ["/products/farmacia/erbitrax-t-terbinafina-250mg.png"],
    category: "Antifúngicos",
    benefits: [
      "Elimina hongos en uñas y piel",
      "Mecanismo fungicida selectivo",
      "Tratamiento completo en 28 días",
      "Vía oral, sin irritación tópica",
    ],
    howToUse: "1 tableta de 250 mg al día con o sin alimentos. Duración según indicación médica (6–12 semanas en onicomicosis).",
    ingredients: "Terbinafina clorhidrato 250 mg · Excipientes: celulosa microcristalina, almidón de maíz, estearato de magnesio.",
    reviews: [
      { author: "Arturo V.", rating: 5, date: "2025-11", text: "Mis uñas ya lucen sanas después de 3 meses. Excelente resultado.", verified: true },
      { author: "Claudia M.", rating: 4, date: "2025-10", text: "El hongo desapareció, precio justo en Farmayoreo.", verified: true },
    ],
  },
  /* ---- Inyectables Vitamina B / Complejo B ---- */
  {
    id: "f2",
    name: "Tribedoce Dx — Dexametasona + Lidocaína",
    tagline: "Solución inyectable · Antiinflamatorio + Anestésico",
    description:
      "Combinación de Dexametasona (corticosteroide antiinflamatorio) y Lidocaína (anestésico local) en solución inyectable. Indicado para el alivio del dolor e inflamación aguda en afecciones musculoesqueléticas. Uso bajo prescripción médica.",
    price: 185,
    image: "/products/farmacia/tribedoce-dx-inyectable.png",
    images: ["/products/farmacia/tribedoce-dx-inyectable.png"],
    category: "Inyectables",
    benefits: [
      "Alivio rápido del dolor inflamatorio",
      "Efecto anestésico local (Lidocaína)",
      "Antiinflamatorio potente (Dexametasona)",
      "Aplicación intramuscular o intravenosa",
    ],
    howToUse: "Administración IM o IV según indicación médica. No automedicarse. Requiere prescripción.",
    ingredients: "Dexametasona fosfato sódico · Lidocaína clorhidrato · Solución estéril inyectable.",
    reviews: [
      { author: "Miguel Á.", rating: 5, date: "2025-12", text: "Para el dolor de espalda agudo es insuperable. Alivio en minutos.", verified: true },
    ],
  },
  {
    id: "f3",
    name: "Tribedoce Compuesto — Inyectable",
    tagline: "Complejo B inyectable · Solución para dolor nervioso",
    description:
      "Vitaminas del complejo B (B1 Tiamina, B6 Piridoxina, B12 Cianocobalamina) en solución inyectable. Auxiliar en el tratamiento del dolor neuropático, neuritis y deficiencia vitamínica. Caja con ampollas y jeringas desechables.",
    price: 175,
    image: "/products/farmacia/tribedoce-compuesto-inyectable.png",
    images: ["/products/farmacia/tribedoce-compuesto-inyectable.png"],
    category: "Inyectables",
    benefits: [
      "Regenera la mielina del nervio",
      "Alivia dolor neuropático",
      "Alta concentración B12 (cianocobalamina)",
      "Incluye jeringas desechables",
    ],
    howToUse: "Aplicación IM según indicación médica. 1 ampolla/día o según criterio clínico.",
    ingredients: "Tiamina (B1) · Piridoxina (B6) · Cianocobalamina (B12) · Solución estéril inyectable.",
    reviews: [
      { author: "Rosa E.", rating: 5, date: "2025-11", text: "Para la neuropatía diabética es el mejor. Resultado rápido.", verified: true },
      { author: "Luis F.", rating: 4, date: "2025-10", text: "Buen producto, lo uso para el dolor lumbar.", verified: true },
    ],
  },
  {
    id: "f5",
    name: "Tribedoce 50,000 — Complejo B",
    tagline: "Complejo B inyectable · 50,000 mcg B12 · 5 ampollas",
    description:
      "Fórmula de alta concentración con Tiamina, Piridoxina y Cianocobalamina 50,000 mcg. Indicado para deficiencias graves de vitaminas del grupo B, anemia megaloblástica y dolor neuropático severo. Caja con 5 ampollas y 5 jeringas desechables.",
    price: 165,
    image: "/products/farmacia/tribedoce-50000-complejo-b.png",
    images: ["/products/farmacia/tribedoce-50000-complejo-b.png"],
    category: "Inyectables",
    benefits: [
      "Ultra alta dosis B12 (50,000 mcg)",
      "Tratamiento de anemia megaloblástica",
      "Dolor neuropático severo",
      "5 ampollas + 5 jeringas en caja",
    ],
    howToUse: "1 ampolla IM según indicación médica. Uso bajo supervisión de profesional de salud.",
    ingredients: "Tiamina clorhidrato · Piridoxina clorhidrato · Cianocobalamina 50,000 mcg · Excipientes csp.",
    reviews: [
      { author: "Carmen S.", rating: 5, date: "2025-12", text: "Para la deficiencia de B12 grave, no hay igual. Mis niveles se normalizaron.", verified: true },
    ],
  },
  {
    id: "f27",
    name: "Tribedoce Compuesto — Diclofenaco Grageas",
    tagline: "Complejo B + Diclofenaco · 30 grageas · Antiinflamatorio",
    description:
      "Combinación oral de vitaminas del complejo B con Diclofenaco (antiinflamatorio no esteroideo). Auxiliar en el tratamiento del dolor musculoesquelético con componente neuropático. Caja con 30 grageas.",
    price: 195,
    image: "/products/farmacia/tribedoce-compuesto-diclofenaco-grageas.png",
    images: ["/products/farmacia/tribedoce-compuesto-diclofenaco-grageas.png"],
    category: "Analgésicos",
    benefits: [
      "Doble acción: antiinflamatorio + neuroregenerador",
      "Alivia dolor muscular y neuropático",
      "Administración cómoda oral (gragea)",
      "30 grageas para tratamiento completo",
    ],
    howToUse: "1–2 grageas al día con alimentos. Evitar en úlcera péptica activa. Uso bajo indicación médica.",
    ingredients: "Diclofenaco sódico · Tiamina (B1) · Piridoxina (B6) · Cianocobalamina (B12) · Excipientes farmacéuticos.",
    reviews: [
      { author: "Humberto G.", rating: 5, date: "2025-11", text: "Para la ciática funciona perfecto. Mejor que solo tomar diclofenaco.", verified: true },
    ],
  },
  {
    id: "f30",
    name: "Tribedoce Complejo B — Tabletas",
    tagline: "Complejo B oral · 30 tabletas · Dolor lumbar y nervioso",
    description:
      "Tiamina, Piridoxina y Cianocobalamina en tableta oral. Auxiliar en el dolor lumbar, muscular y nervioso. Presentación cómoda de 30 tabletas. Marca Trukaps.",
    price: 175,
    image: "/products/farmacia/tribedoce-complejo-b-tabletas.png",
    images: ["/products/farmacia/tribedoce-complejo-b-tabletas.png"],
    category: "Vitaminas B",
    benefits: [
      "Alivia dolor lumbar, muscular y nervioso",
      "Regenera tejido nervioso",
      "Forma oral práctica (sin inyección)",
      "30 tabletas — tratamiento mensual",
    ],
    howToUse: "1 tableta al día o según indicación médica, con o sin alimentos.",
    ingredients: "Tiamina 100 mg · Piridoxina 5 mg · Cianocobalamina 50 mcg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Patricia M.", rating: 4, date: "2025-10", text: "Buen producto para el dolor de espalda crónico.", verified: true },
    ],
  },
  /* ---- Urológico / Disfunción eréctil ---- */
  {
    id: "f4",
    name: "Edogra — Sildenafil 100 mg",
    tagline: "Sildenafil 100 mg · 20 tabletas · Laboratorio Serral",
    description:
      "Sildenafil 100 mg, inhibidor de la PDE-5, indicado para el tratamiento de la disfunción eréctil. Administración oral 30–60 min antes de la actividad sexual. Caja con 20 tabletas. Fabricado por Laboratorios Serral.",
    price: 480,
    image: "/products/farmacia/edogra-sildenafil-100mg.png",
    images: ["/products/farmacia/edogra-sildenafil-100mg.png", "/products/farmacia/edogra-sildenafil-blister.png"],
    category: "Urológico",
    benefits: [
      "Efecto en 30–60 minutos",
      "Duración hasta 4–6 horas",
      "Genérico de alta calidad Serral",
      "20 tabletas por caja",
    ],
    howToUse: "Tomar 1 tableta de 50–100 mg vía oral, 30–60 min antes de la actividad sexual. No más de 1 dosis en 24 h. Bajo prescripción médica.",
    ingredients: "Sildenafil citrato equivalente a Sildenafil 100 mg · Excipientes: celulosa microcristalina, lactosa, estearato de magnesio.",
    reviews: [
      { author: "J. Rodríguez", rating: 5, date: "2025-12", text: "Excelente calidad. Igual de efectivo que la marca original.", verified: true },
      { author: "M. Torres", rating: 4, date: "2025-11", text: "Funciona muy bien y el precio es mucho mejor.", verified: true },
    ],
  },
  /* ---- Antihipertensivos ---- */
  {
    id: "f6",
    name: "Telmisartán / Hidroclorotiazida 80/12.5 mg",
    tagline: "Antihipertensivo · 14 tabletas · Ultra",
    description:
      "Combinación de Telmisartán (ARA-II) 80 mg e Hidroclorotiazida (diurético) 12.5 mg. Indicado para el tratamiento de la hipertensión arterial cuando la monoterapia es insuficiente. Caja con 14 tabletas.",
    price: 210,
    image: "/products/farmacia/telmisartan-hctz-80mg.png",
    images: ["/products/farmacia/telmisartan-hctz-80mg.png"],
    category: "Antihipertensivos",
    benefits: [
      "Doble mecanismo antihipertensivo",
      "ARA-II + diurético tiazídico",
      "Control de PA durante 24 horas",
      "Una sola tableta al día",
    ],
    howToUse: "1 tableta al día, a la misma hora, con o sin alimentos. No suspender sin indicación médica.",
    ingredients: "Telmisartán 80 mg · Hidroclorotiazida 12.5 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Ernesto L.", rating: 5, date: "2025-11", text: "Mi presión se estabilizó perfectamente con este medicamento.", verified: true },
    ],
  },
  {
    id: "f10",
    name: "Losartán / Hidroclorotiazida 50/12.5 mg",
    tagline: "Antihipertensivo · 30 tabletas · Ultra",
    description:
      "Losartán (ARA-II) 50 mg + Hidroclorotiazida 12.5 mg. Tratamiento de primera línea para hipertensión arterial. Acción complementaria: vasodilatación y diuresis. Caja con 30 tabletas.",
    price: 195,
    image: "/products/farmacia/losartan-hctz-50mg.png",
    images: ["/products/farmacia/losartan-hctz-50mg.png"],
    category: "Antihipertensivos",
    benefits: [
      "Losartán + tiazídico en una tableta",
      "Protege órgano blanco (riñón, corazón)",
      "30 tabletas para tratamiento mensual",
      "Genérico Ultra con registro sanitario",
    ],
    howToUse: "1 tableta al día, a la misma hora. Control periódico de electrolitos. No suspender bruscamente.",
    ingredients: "Losartán potásico 50 mg · Hidroclorotiazida 12.5 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Gloria T.", rating: 5, date: "2025-10", text: "Genérico de calidad, precio mucho menor que la marca.", verified: true },
      { author: "Aurelio P.", rating: 4, date: "2025-09", text: "Muy buen control de presión. Lo llevo tomando 8 meses.", verified: false },
    ],
  },
  {
    id: "f24",
    name: "Natrazim — Telmisartán 80 mg",
    tagline: "Antihipertensivo · 28 tabletas · Novag",
    description:
      "Telmisartán 80 mg, antagonista del receptor de angiotensina II (ARA-II). Control eficaz de la presión arterial durante las 24 horas con una sola dosis diaria. Caja con 28 tabletas. Marca Novag.",
    price: 220,
    image: "/products/farmacia/natrazim-telmisartan-80mg.png",
    images: ["/products/farmacia/natrazim-telmisartan-80mg.png"],
    category: "Antihipertensivos",
    benefits: [
      "Control de PA durante 24 h con 1 dosis",
      "Protege riñón y corazón a largo plazo",
      "Bien tolerado, sin tos (vs. IECA)",
      "28 tabletas — cobertura mensual",
    ],
    howToUse: "1 tableta de 80 mg al día a la misma hora, con o sin alimentos. Ajuste de dosis bajo indicación médica.",
    ingredients: "Telmisartán 80 mg · Excipientes: hidróxido de sodio, meglumina, manitol, estearato de magnesio.",
    reviews: [
      { author: "Javier M.", rating: 5, date: "2025-11", text: "Sin tos como con el captopril. Mi presión perfectamente controlada.", verified: true },
    ],
  },
  {
    id: "f29",
    name: "Natrazim — Telmisartán 40 mg",
    tagline: "Antihipertensivo · 30 tabletas · Novag",
    description:
      "Telmisartán 40 mg para inicio de tratamiento antihipertensivo o en pacientes con dosis bajas. ARA-II de larga duración de acción. Caja con 30 tabletas.",
    price: 195,
    image: "/products/farmacia/natrazim-telmisartan-40mg.png",
    images: ["/products/farmacia/natrazim-telmisartan-40mg.png"],
    category: "Antihipertensivos",
    benefits: [
      "Dosis inicial o de mantenimiento",
      "24 h de cobertura antihipertensiva",
      "Sin retención de líquidos",
      "30 tabletas para seguimiento mensual",
    ],
    howToUse: "1 tableta de 40 mg al día. La dosis puede aumentarse a 80 mg según respuesta. Tomar a la misma hora.",
    ingredients: "Telmisartán 40 mg · Excipientes farmacéuticos.",
    reviews: [],
  },
  {
    id: "f19",
    name: "Amlodipino 5 mg — Frasco",
    tagline: "Antihipertensivo · Calcioantagonista · Ultra",
    description:
      "Amlodipino 5 mg, bloqueador de canales de calcio de tercera generación. Control de hipertensión arterial y angina estable. Presentación en frasco con tabletas. Marca Ultra.",
    price: 125,
    image: "/products/farmacia/amlodipino-5mg-frasco.png",
    images: ["/products/farmacia/amlodipino-5mg-frasco.png", "/products/farmacia/amlodipino-5mg-tabletas-medley.png"],
    category: "Antihipertensivos",
    benefits: [
      "Reduce la resistencia vascular periférica",
      "Control de angina estable",
      "Una toma diaria, cualquier hora",
      "Excelente perfil de tolerabilidad",
    ],
    howToUse: "1 tableta de 5 mg al día. La dosis puede ajustarse a 10 mg según indicación médica. No requiere ajuste por alimentos.",
    ingredients: "Amlodipino besilato equivalente a Amlodipino 5 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Sergio R.", rating: 5, date: "2025-10", text: "Precio excelente en Farmayoreo. Mi presión perfecta.", verified: true },
    ],
  },
  {
    id: "f33",
    name: "Amlodipino 5 mg — Tabletas Medley",
    tagline: "Antihipertensivo · 30 tabletas · Medley",
    description:
      "Amlodipino 5 mg tabletas de Laboratorio Medley. Calcioantagonista dihidropiridínico de larga acción para hipertensión y angina. Caja con 30 tabletas. Vía de administración oral.",
    price: 135,
    image: "/products/farmacia/amlodipino-5mg-tabletas-medley.png",
    images: ["/products/farmacia/amlodipino-5mg-tabletas-medley.png"],
    category: "Antihipertensivos",
    benefits: [
      "Laboratorio Medley, alta confiabilidad",
      "30 tabletas para tratamiento mensual",
      "Vasodilatación periférica sostenida",
      "Sin efecto rebote al suspender gradualmente",
    ],
    howToUse: "1 tableta de 5 mg al día, a la misma hora, con o sin alimentos.",
    ingredients: "Amlodipino besilato 6.935 mg (equiv. Amlodipino 5 mg) · Celulosa microcristalina · Estearato de magnesio.",
    reviews: [],
  },
  {
    id: "f34",
    name: "Losartán 50 mg",
    tagline: "Antihipertensivo · 30 tabletas · Ultra",
    description:
      "Losartán potásico 50 mg, antagonista del receptor AT1 de angiotensina II. Indicado en hipertensión arterial, nefropatía diabética y reducción de riesgo cardiovascular. Caja con 30 tabletas. Ultra.",
    price: 145,
    image: "/products/farmacia/losartan-50mg.png",
    images: ["/products/farmacia/losartan-50mg.png"],
    category: "Antihipertensivos",
    benefits: [
      "Protección renal en diabetes",
      "Reduce mortalidad cardiovascular",
      "Sin tos seca (ventaja vs. IECA)",
      "Genérico certificado con RS",
    ],
    howToUse: "1 tableta de 50 mg al día, con o sin alimentos. Puede requerir ajuste a 100 mg según respuesta clínica.",
    ingredients: "Losartán potásico 50 mg · Excipientes: celulosa microcristalina, almidón pregelatinizado, estearato de magnesio.",
    reviews: [
      { author: "Alicia V.", rating: 5, date: "2025-11", text: "Precio muy bueno comparado con otras farmacias. Mismo resultado.", verified: true },
    ],
  },
  /* ---- Hipoglucemiantes / Diabetes ---- */
  {
    id: "f7",
    name: "Vildagliptina / Metformina 50/500 mg",
    tagline: "Hipoglucemiante · 30 comprimidos · Ultra",
    description:
      "Combinación de Vildagliptina 50 mg (inhibidor DPP-4) y Metformina 500 mg (biguanida). Tratamiento de diabetes mellitus tipo 2 cuando la monoterapia no es suficiente. Control glucémico sostenido con menor riesgo de hipoglucemia. Caja con 30 comprimidos.",
    price: 385,
    image: "/products/farmacia/vildagliptina-metformina-50-500mg.png",
    images: ["/products/farmacia/vildagliptina-metformina-50-500mg.png"],
    category: "Diabetes",
    benefits: [
      "Doble mecanismo antidiabético",
      "Bajo riesgo de hipoglucemia",
      "Control de glucemia en ayunas y postprandial",
      "Bien tolerado gastrointestinalmente",
    ],
    howToUse: "1 comprimido 2 veces al día (mañana y noche) con las comidas. Ajuste de dosis por médico tratante.",
    ingredients: "Vildagliptina 50 mg · Clorhidrato de metformina 500 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Norma A.", rating: 5, date: "2025-12", text: "Mi HbA1c bajó 1.5 puntos con este medicamento. Excelente.", verified: true },
    ],
  },
  {
    id: "f13",
    name: "Sitagliptina 100 mg — AMSA",
    tagline: "Hipoglucemiante · Inhibidor DPP-4 · AMSA Laboratorios",
    description:
      "Sitagliptina fosfato 100 mg, inhibidor de la dipeptidilpeptidasa-4 (DPP-4). Aumenta los niveles de incretinas activas, mejorando el control glucémico en diabetes tipo 2. Fabricado por AMSA Laboratorios.",
    price: 520,
    image: "/products/farmacia/sitagliptina-100mg-amsa.png",
    images: ["/products/farmacia/sitagliptina-100mg-amsa.png"],
    category: "Diabetes",
    benefits: [
      "1 tableta al día, con o sin alimentos",
      "Sin aumento de peso",
      "Bajo riesgo de hipoglucemia en monoterapia",
      "Laboratorio AMSA, genérico certificado",
    ],
    howToUse: "1 comprimido de 100 mg una vez al día, con o sin alimentos. No requiere ajuste de dosis por horario de comidas.",
    ingredients: "Sitagliptina fosfato monohidrato equivalente a Sitagliptina 100 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Teresa B.", rating: 5, date: "2025-11", text: "Igual de efectiva que la Januvia pero a fracción del costo.", verified: true },
    ],
  },
  {
    id: "f18",
    name: "Sitagliptina / Metformina 50/500 mg",
    tagline: "Hipoglucemiante combinado · 28 comprimidos · Maver",
    description:
      "Sitagliptina 50 mg + Metformina 500 mg en un solo comprimido. Tratamiento de diabetes tipo 2 con doble mecanismo glucorregulador. Caja con 28 comprimidos. Laboratorio Maver.",
    price: 490,
    image: "/products/farmacia/sitagliptina-metformina-50-500mg.png",
    images: ["/products/farmacia/sitagliptina-metformina-50-500mg.png"],
    category: "Diabetes",
    benefits: [
      "DPP-4 + biguanida en una sola toma",
      "Mejora la sensibilidad a la insulina",
      "Menor carga de pastillas vs. tratamiento separado",
      "28 comprimidos · formulación Maver",
    ],
    howToUse: "1 comprimido 2 veces al día con los alimentos (mañana y noche). Ajustar según indicación médica.",
    ingredients: "Sitagliptina fosfato 50 mg · Metformina clorhidrato 500 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Fernando R.", rating: 5, date: "2025-10", text: "Buen control glucémico. Precio mucho mejor aquí.", verified: true },
    ],
  },
  {
    id: "f21",
    name: "Sitagliptina / Metformina 50/850 mg — Camber",
    tagline: "Hipoglucemiante · 56 tabletas · Camber",
    description:
      "Sitagliptina 50 mg + Metformina 850 mg. Presentación de 56 tabletas (2 meses) para mayor adherencia terapéutica en diabetes tipo 2. Laboratorio Camber, certificado para exportación y mercado nacional.",
    price: 560,
    image: "/products/farmacia/sitagliptina-metformina-50-850mg-camber.png",
    images: ["/products/farmacia/sitagliptina-metformina-50-850mg-camber.png"],
    category: "Diabetes",
    benefits: [
      "56 tabletas — 2 meses de tratamiento",
      "Dosis alta de metformina (850 mg)",
      "Mayor ahorro por presentación grande",
      "Laboratorio Camber — calidad certificada",
    ],
    howToUse: "1 tableta 2 veces al día con las comidas. Seguir indicación médica para ajuste de dosis.",
    ingredients: "Sitagliptina fosfato 50 mg · Metformina clorhidrato 850 mg · Excipientes farmacéuticos.",
    reviews: [],
  },
  {
    id: "f23",
    name: "Dapagliflozina 10 mg",
    tagline: "Hipoglucemiante · iSGLT-2 · 28 tabletas · Camber",
    description:
      "Dapagliflozina 10 mg, inhibidor del cotransportador sodio-glucosa tipo 2 (SGLT-2). Reduce la glucosa eliminándola por orina, sin riesgo de hipoglucemia. Beneficios adicionales cardiovasculares y renales. Caja con 28 tabletas.",
    price: 610,
    image: "/products/farmacia/dapagliflozina-10mg.png",
    images: ["/products/farmacia/dapagliflozina-10mg.png"],
    category: "Diabetes",
    benefits: [
      "Mecanismo insulino-independiente (iSGLT-2)",
      "Pérdida de peso moderada como efecto adicional",
      "Protección cardiovascular y renal demostrada",
      "1 tableta al día, cualquier hora",
    ],
    howToUse: "1 tableta de 10 mg al día, con o sin alimentos. No usar en IRC grave. Mantener hidratación adecuada.",
    ingredients: "Dapagliflozina propanodiol monohidrato equivalente a Dapagliflozina 10 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Adriana C.", rating: 5, date: "2025-12", text: "Bajé de peso y mi azúcar está perfecta. El doctor está muy contento.", verified: true },
    ],
  },
  {
    id: "f31",
    name: "Glunovag — Metformina 850 mg",
    tagline: "Hipoglucemiante · 30 tabletas · Novag",
    description:
      "Metformina clorhidrato 850 mg, biguanida de primera línea en diabetes mellitus tipo 2. Reduce la producción hepática de glucosa y mejora la sensibilidad periférica a la insulina. Frasco con 30 tabletas. Novag.",
    price: 115,
    image: "/products/farmacia/glunovag-metformina-850mg.png",
    images: ["/products/farmacia/glunovag-metformina-850mg.png"],
    category: "Diabetes",
    benefits: [
      "Primera línea en diabetes tipo 2 (guías ADA/IDF)",
      "No causa hipoglucemia en monoterapia",
      "Bajo costo, alta efectividad",
      "Protección cardiovascular adicional",
    ],
    howToUse: "1 tableta con el desayuno y 1 con la cena. Iniciar con dosis baja y escalar para evitar molestias GI.",
    ingredients: "Metformina clorhidrato 850 mg · Excipientes: povidona, almidón, estearato de magnesio.",
    reviews: [
      { author: "Rosario V.", rating: 5, date: "2025-11", text: "El mejor precio de metformina que he encontrado. Mismo efecto.", verified: true },
      { author: "Bernardo C.", rating: 4, date: "2025-10", text: "Genérico de calidad. Mi glucemia en rango normal.", verified: true },
    ],
  },
  {
    id: "f35",
    name: "Vildagliptina / Metformina 50/850 mg",
    tagline: "Hipoglucemiante · 60 comprimidos · Ultra",
    description:
      "Vildagliptina 50 mg + Metformina 850 mg en presentación de 60 comprimidos para mayor continuidad terapéutica. Ultra. Indicado en diabetes tipo 2 con respuesta insuficiente a metformina sola.",
    price: 430,
    image: "/products/farmacia/vildagliptina-metformina-50-850mg.png",
    images: ["/products/farmacia/vildagliptina-metformina-50-850mg.png"],
    category: "Diabetes",
    benefits: [
      "Dosis alta de metformina (850 mg)",
      "60 comprimidos — 2 meses de tratamiento",
      "Mejor adherencia con mayor presentación",
      "Genérico Ultra certificado",
    ],
    howToUse: "1 comprimido 2 veces al día con las comidas. No suspender sin indicación médica.",
    ingredients: "Vildagliptina 50 mg · Metformina clorhidrato 850 mg · Excipientes farmacéuticos.",
    reviews: [],
  },
  /* ---- Colesterol / Estatinas ---- */
  {
    id: "f39",
    name: "Dylaxyl — Atorvastatina 20 mg",
    tagline: "Hipolipemiante · 20 tabletas · Son's",
    description:
      "Atorvastatina 20 mg, estatina de intensidad moderada-alta para reducción de LDL colesterol y triglicéridos. Ideal para iniciar tratamiento o pacientes con buena respuesta a dosis menor. Caja con 20 tabletas. Son's.",
    price: 290,
    image: "/products/farmacia/dylaxyl-atorvastatina-20mg.png",
    images: ["/products/farmacia/dylaxyl-atorvastatina-20mg.png"],
    category: "Colesterol",
    benefits: [
      "Reduce LDL hasta 43% (dosis 20 mg)",
      "Excelente para inicio de tratamiento",
      "Tomarse de noche para mayor eficacia",
      "Genérico Son's con registro sanitario",
    ],
    howToUse: "1 tableta de 20 mg al día, preferentemente en la noche, con o sin alimentos. Acompañar de dieta baja en grasas.",
    ingredients: "Atorvastatina cálcica equivalente a Atorvastatina 20 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Beatriz O.", rating: 5, date: "2025-12", text: "Dosis perfecta para iniciar. Mi LDL se controló sin efectos secundarios.", verified: true },
    ],
  },
  {
    id: "f14",
    name: "Dylaxyl — Atorvastatina 40 mg",
    tagline: "Hipolipemiante · 20 tabletas · Son's",
    description:
      "Atorvastatina 40 mg, estatina de alta intensidad para reducción de LDL colesterol y triglicéridos. Indicado en dislipidemia, prevención de eventos cardiovasculares y síndrome coronario. Caja con 20 tabletas. Son's.",
    price: 340,
    image: "/products/farmacia/dylaxyl-atorvastatina-40mg.png",
    images: ["/products/farmacia/dylaxyl-atorvastatina-40mg.png"],
    category: "Colesterol",
    benefits: [
      "Reduce LDL hasta 50% (dosis 40 mg)",
      "Prevención cardiovascular primaria y secundaria",
      "Tomarse de noche para mayor eficacia",
      "Genérico Son's de calidad farmacéutica",
    ],
    howToUse: "1 tableta de 40 mg al día, preferentemente en la noche, con o sin alimentos. Acompañar de dieta baja en grasas.",
    ingredients: "Atorvastatina cálcica equivalente a Atorvastatina 40 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Víctor H.", rating: 5, date: "2025-12", text: "Mi LDL bajó de 180 a 95 mg/dL en 3 meses.", verified: true },
    ],
  },
  {
    id: "f22",
    name: "Crostox — Rosuvastatina 10 mg",
    tagline: "Hipolipemiante · Rosuvastatina · Max",
    description:
      "Rosuvastatina cálcica 10 mg, estatina de alta potencia para reducción de LDL, colesterol total y triglicéridos. Alta selectividad hepática con mínima miotoxicidad. Laboratorio Max.",
    price: 285,
    image: "/products/farmacia/crostox-rosuvastatina-10mg.png",
    images: ["/products/farmacia/crostox-rosuvastatina-10mg.png", "/products/farmacia/crostox-rosuvastatina-20mg.png"],
    category: "Colesterol",
    benefits: [
      "Potencia superior a atorvastatina mg a mg",
      "Alta selectividad hepática",
      "Reduce LDL hasta 52% (10 mg)",
      "Puede tomarse a cualquier hora del día",
    ],
    howToUse: "1 tableta de 10 mg al día, a cualquier hora, con o sin alimentos. Acompañar con dieta y ejercicio.",
    ingredients: "Rosuvastatina cálcica equivalente a Rosuvastatina 10 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Leticia N.", rating: 5, date: "2025-10", text: "Mucho mejor precio que la Crestor. Mis triglicéridos normalizados.", verified: true },
    ],
  },
  {
    id: "f28",
    name: "Crostox — Rosuvastatina 20 mg",
    tagline: "Hipolipemiante · Dosis alta · 20 mg · Max",
    description:
      "Rosuvastatina 20 mg para pacientes que requieren mayor reducción de LDL (riesgo cardiovascular alto o muy alto). Potente estatina con excelente perfil de seguridad. Laboratorio Max.",
    price: 310,
    image: "/products/farmacia/crostox-rosuvastatina-20mg.png",
    images: ["/products/farmacia/crostox-rosuvastatina-20mg.png"],
    category: "Colesterol",
    benefits: [
      "Reducción de LDL hasta 58% (20 mg)",
      "Riesgo cardiovascular alto o muy alto",
      "Puede combinarse con ezetimiba",
      "Una tableta al día, cualquier hora",
    ],
    howToUse: "1 tableta de 20 mg una vez al día, con o sin alimentos. Monitoreo de enzimas hepáticas y CPK periódico.",
    ingredients: "Rosuvastatina cálcica equivalente a Rosuvastatina 20 mg · Excipientes farmacéuticos.",
    reviews: [],
  },
  /* ---- Antigripal / Antiviral ---- */
  {
    id: "f15",
    name: "Estranim — Oseltamivir 75 mg",
    tagline: "Antiviral · 10 cápsulas · Serral",
    description:
      "Oseltamivir fosfato 75 mg, inhibidor de la neuraminidasa del virus influenza A y B. Tratamiento y profilaxis de influenza. Inicia las primeras 48 horas desde síntomas para máxima eficacia. Caja con 10 cápsulas. Laboratorios Serral.",
    price: 680,
    image: "/products/farmacia/estranim-oseltamivir-75mg.png",
    images: ["/products/farmacia/estranim-oseltamivir-75mg.png"],
    category: "Antivirales",
    benefits: [
      "Reduce duración de influenza 1–2 días",
      "Tratamiento de influenza A y B",
      "Profilaxis post-exposición (7–10 días)",
      "Serral: laboratorio de alta confiabilidad",
    ],
    howToUse: "Tratamiento: 75 mg 2 veces/día por 5 días. Profilaxis: 75 mg 1 vez/día por 10 días. Iniciar dentro de 48 h de síntomas.",
    ingredients: "Oseltamivir fosfato equivalente a Oseltamivir 75 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Sandra G.", rating: 5, date: "2025-12", text: "A las 24 h de tomarlo la fiebre bajó considerablemente.", verified: true },
    ],
  },
  /* ---- Respiratorio ---- */
  {
    id: "f16",
    name: "Innube — Fluticasona 0.50 mg/mL",
    tagline: "Corticosteroide nasal/inhalado · 16.5 mL · Zuluos",
    description:
      "Fluticasona propionato 0.50 mg/mL en suspensión. Corticosteroide de alta potencia local para rinitis alérgica perenne y estacional, y asma bronquial. Baja absorción sistémica. Caja con frasco de 16.5 mL. Zuluos.",
    price: 420,
    image: "/products/farmacia/innube-fluticasona.png",
    images: ["/products/farmacia/innube-fluticasona.png"],
    category: "Respiratorio",
    benefits: [
      "Antiinflamatorio nasal de alta potencia",
      "Baja absorción sistémica (seguro a largo plazo)",
      "Controla rinitis alérgica y asma",
      "Inicio de efecto en 12 horas",
    ],
    howToUse: "2 aplicaciones en cada fosa nasal 1 vez/día (adultos). Agitar el frasco antes de usar. Uso nasal/inhalado según formulación.",
    ingredients: "Fluticasona propionato 0.50 mg/mL · Polisorbato 80 · Cloruro de benzalconio · Solución tampón.",
    reviews: [
      { author: "Eduardo A.", rating: 5, date: "2025-11", text: "Para la alergia nasal es lo mejor. Respiro perfectamente.", verified: true },
    ],
  },
  /* ---- Digestivo ---- */
  {
    id: "f11",
    name: "Trimebutina / Simeticona 200/75 mg",
    tagline: "Espasmolítico + Antiflatulento · 24 comprimidos · Maver",
    description:
      "Trimebutina 200 mg (regulador de motilidad intestinal) + Simeticona 75 mg (antiflatulento). Indicado para el síndrome de intestino irritable, cólico abdominal, distensión y flatulencia. 24 comprimidos.",
    price: 245,
    image: "/products/farmacia/trimebutina-simeticona-200-75mg.png",
    images: ["/products/farmacia/trimebutina-simeticona-200-75mg.png"],
    category: "Digestivo",
    benefits: [
      "Regula la motilidad intestinal en 2 sentidos",
      "Elimina gases y distensión abdominal",
      "Síndrome de intestino irritable (SII)",
      "Doble mecanismo en un solo comprimido",
    ],
    howToUse: "1 comprimido 3 veces al día antes de los alimentos. No exceder 3 comprimidos/día.",
    ingredients: "Trimebutina maleato 200 mg · Simeticona 75 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Mónica R.", rating: 5, date: "2025-12", text: "Fin al síndrome de intestino irritable. Increíble alivio.", verified: true },
      { author: "Pablo T.", rating: 4, date: "2025-11", text: "Alivia el dolor abdominal y los gases muy bien.", verified: false },
    ],
  },
  {
    id: "f12",
    name: "Dalirzen — Tabletas",
    tagline: "Antihistamínico · 30 tabletas · Medicam",
    description:
      "Dalirzen es un antihistamínico de segunda generación (Desloratadina o Loratadina) con efecto antiinflamatorio adicional. Indicado para rinitis alérgica, urticaria y dermatitis atópica. Caja con 30 tabletas. Medicam.",
    price: 155,
    image: "/products/farmacia/dalirzen-tabletas.png",
    images: ["/products/farmacia/dalirzen-tabletas.png"],
    category: "Alergias",
    benefits: [
      "No provoca somnolencia significativa",
      "Acción antihistamínica + antiinflamatoria",
      "Rinitis alérgica, urticaria, dermatitis",
      "30 tabletas — tratamiento mensual",
    ],
    howToUse: "1 tableta al día, con o sin alimentos. Se puede tomar a cualquier hora del día.",
    ingredients: "Antihistamínico de segunda generación · Excipientes farmacéuticos.",
    reviews: [
      { author: "Rebeca F.", rating: 5, date: "2025-10", text: "Sin somnolencia y controla perfecto mi rinitis. Muy buen precio.", verified: true },
    ],
  },
  {
    id: "f17",
    name: "Divelgel — Cápsulas",
    tagline: "SII · 16 cápsulas · Bismuro de pinaverio + Dimeticona",
    description:
      "Divelgel combina Bismuro de pinaverio 100 mg (espasmolítico selectivo intestinal) y Dimeticona 300 mg (antiflatulento). Triple mecanismo para el Síndrome de Intestino Irritable: antiespasmódico, antiinflamatorio intestinal y reductor de gases. 16 cápsulas.",
    price: 265,
    image: "/products/farmacia/divelgel-capsulas.png",
    images: ["/products/farmacia/divelgel-capsulas.png"],
    category: "Digestivo",
    benefits: [
      "Triple mecanismo: antiespasmódico + antiinflamatorio + antiflatulento",
      "Selectivo intestinal (menos efectos sistémicos)",
      "Alivio del SII: dolor, distensión y alteración del ritmo intestinal",
      "Formato cápsula de fácil deglución",
    ],
    howToUse: "1 cápsula 3 veces al día antes de los alimentos. Tomar con vaso de agua.",
    ingredients: "Bismuro de pinaverio 100 mg · Dimeticona 300 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Alejandro M.", rating: 5, date: "2025-11", text: "Lo mejor que he tomado para el intestino irritable.", verified: true },
    ],
  },
  {
    id: "f25",
    name: "Omeprazol 20 mg — Cápsulas",
    tagline: "Inhibidor de bomba de protones · Ultra",
    description:
      "Omeprazol 20 mg, inhibidor de la bomba de protones (IBP). Indicado en gastritis, úlcera péptica, reflujo gastroesofágico (ERGE), acidez estomacal y erradicación de H. pylori. Frasco con cápsulas. Ultra.",
    price: 95,
    image: "/products/farmacia/omeprazol-20mg.png",
    images: ["/products/farmacia/omeprazol-20mg.png"],
    category: "Digestivo",
    benefits: [
      "Alivio de gastritis y reflujo",
      "Protege el estómago de úlceras",
      "Tratamiento del H. pylori (en combinación)",
      "Precio de genérico accesible",
    ],
    howToUse: "1 cápsula de 20 mg al día, 30 min antes del desayuno. En úlcera activa: 4–8 semanas. Según indicación médica.",
    ingredients: "Omeprazol 20 mg · Excipientes: manitol, carbonato de sodio, estearato de magnesio, gelatina.",
    reviews: [
      { author: "Irene C.", rating: 5, date: "2025-12", text: "El genérico funciona exactamente igual que el Prilosec. Precio excelente.", verified: true },
      { author: "Roberto A.", rating: 4, date: "2025-11", text: "Para la gastritis crónica es mi aliado diario.", verified: false },
    ],
  },
  {
    id: "f26",
    name: "Rovemax — Diosmina / Hesperidina 450/50 mg",
    tagline: "Venotónico · 20 tabletas · Novag",
    description:
      "Diosmina 450 mg + Hesperidina 50 mg, flavonoides venoactivos para el tratamiento de la insuficiencia venosa crónica, hemorroides y varices. Reduce la permeabilidad capilar y mejora el tono venoso. Caja con 20 tabletas.",
    price: 185,
    image: "/products/farmacia/rovemax-diosmina-hesperidina.png",
    images: ["/products/farmacia/rovemax-diosmina-hesperidina.png"],
    category: "Circulación",
    benefits: [
      "Insuficiencia venosa crónica y varices",
      "Alivio de hemorroides (crisis aguda)",
      "Reduce pesadez, dolor y edema en piernas",
      "Origen natural (flavonoides cítricos)",
    ],
    howToUse: "2 tabletas al día con las comidas (1 en la mañana, 1 en la noche). En crisis hemorroidal: 6 tab/día por 4 días, luego 4/día.",
    ingredients: "Diosmina 450 mg · Hesperidina 50 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Consuelo R.", rating: 5, date: "2025-10", text: "Mis várices duelen mucho menos. Excelente producto a buen precio.", verified: true },
    ],
  },
  {
    id: "f32",
    name: "Biocord — Suspensión Oral",
    tagline: "Suspensión ingerible · 5 ampollas 3 mL",
    description:
      "Biocord en suspensión oral ingerible. Presentación en ampollas bebibles de 3 mL, conveniente para pacientes con dificultad para deglutir tabletas. Caja con 5 ampollas. Uso bajo indicación médica.",
    price: 145,
    image: "/products/farmacia/biocord-oral.png",
    images: ["/products/farmacia/biocord-oral.png"],
    category: "Digestivo",
    benefits: [
      "Presentación líquida (ampollas bebibles)",
      "Ideal para adultos mayores o niños",
      "Fácil administración sin agua",
      "5 ampollas × 3 mL",
    ],
    howToUse: "Según indicación médica. Abrir la ampolla y tomar directamente o diluir en agua.",
    ingredients: "Formulación oral estéril · Excipientes para suspensión ingerible.",
    reviews: [],
  },
  /* ---- Oftálmico ---- */
  {
    id: "f20",
    name: "Hialuronato de Sodio — Gotas oftálmicas 4.0 mg/mL",
    tagline: "Lubricante ocular · 15 mL · Solución oftálmica",
    description:
      "Hialuronato de sodio 4.0 mg/mL en solución oftálmica. Lubricante ocular de alta viscosidad para el tratamiento del ojo seco, irritación ocular y disconfort producido por pantallas o lentes de contacto. Frasco de 15 mL.",
    price: 350,
    image: "/products/farmacia/hialuronato-sodio-oftalmico.png",
    images: ["/products/farmacia/hialuronato-sodio-oftalmico.png"],
    category: "Oftálmico",
    benefits: [
      "Lubrica y protege la superficie ocular",
      "Ojo seco por pantallas, aire acondicionado",
      "Compatible con lentes de contacto",
      "Alta concentración 4.0 mg/mL para mayor alivio",
    ],
    howToUse: "1–2 gotas en el ojo afectado, 3–4 veces al día o según necesidad. No tocar la punta del gotero al ojo.",
    ingredients: "Hialuronato de sodio 4.0 mg/mL · NaCl 9.0 mg/mL · Agua para inyección csp 1 mL.",
    reviews: [
      { author: "Margarita P.", rating: 5, date: "2025-11", text: "Para el ojo seco por computadora es insustituible.", verified: true },
      { author: "Tomás L.", rating: 5, date: "2025-10", text: "La concentración más alta que he encontrado. Alivio inmediato.", verified: true },
    ],
  },
  /* ---- Antiinflamatorios / Analgésicos ---- */
  {
    id: "f9",
    name: "Celecoxib Tricoxa — 200 mg",
    tagline: "AINE selectivo COX-2 · 20 cápsulas · Solfran",
    description:
      "Celecoxib 200 mg, antiinflamatorio no esteroideo selectivo para la COX-2. Menor riesgo gastrointestinal que los AINE no selectivos. Indicado para artritis reumatoide, osteoartritis, espondilitis anquilosante y dolor agudo. Caja con 20 cápsulas.",
    price: 295,
    image: "/products/farmacia/celecoxib-tricoxa-200mg.png",
    images: ["/products/farmacia/celecoxib-tricoxa-200mg.png"],
    category: "Analgésicos",
    benefits: [
      "Selectivo COX-2: menor daño gástrico",
      "Artritis reumatoide y osteoartritis",
      "Dolor agudo postoperatorio",
      "20 cápsulas — tratamiento completo",
    ],
    howToUse: "200 mg 1–2 veces al día con alimentos. No superar 400 mg/día. Monitoreo cardiovascular en uso crónico.",
    ingredients: "Celecoxib 200 mg · Excipientes: laurilsulfato de sodio, povidona, croscarmelosa sódica, gelatina.",
    reviews: [
      { author: "Inés M.", rating: 5, date: "2025-12", text: "No me irrita el estómago como el ibuprofeno. Perfecto para mi artritis.", verified: true },
    ],
  },
  {
    id: "f38",
    name: "Scarpett K — Betametasona + Ketorolaco",
    tagline: "Antiinflamatorio potente · 20 tabletas · Medicam",
    description:
      "Betametasona (corticosteroide) + Ketorolaco (AINE) en tabletas. Doble mecanismo antiinflamatorio para dolor e inflamación aguda moderada a severa. Indicado en artritis, bursitis, dolor postoperatorio y procesos inflamatorios agudos. Medicam.",
    price: 225,
    image: "/products/farmacia/scarpett-k-tabletas.png",
    images: ["/products/farmacia/scarpett-k-tabletas.png"],
    category: "Analgésicos",
    benefits: [
      "Doble antiinflamatorio: corticosteroide + AINE",
      "Alivio rápido del dolor agudo severo",
      "Bursitis, artritis, dolor postoperatorio",
      "Caja con 20 tabletas",
    ],
    howToUse: "1 tableta cada 8–12 horas con alimentos. No usar por más de 5 días sin evaluación médica. Uso bajo prescripción.",
    ingredients: "Betametasona 0.75 mg · Ketorolaco trometamina 10 mg · Excipientes farmacéuticos.",
    reviews: [
      { author: "Rodrigo B.", rating: 5, date: "2025-11", text: "Para la inflamación aguda de rodilla fue muy efectivo.", verified: true },
    ],
  },
  /* ---- Neurológico / Suplemento cerebral ---- */
  {
    id: "f36",
    name: "Neurocer — Grageas",
    tagline: "Oxigenante y revitalizador neuro-cerebral · 30 grageas",
    description:
      "Neurocer es un suplemento vitamínico con Ácido glutámico, Complejo B, Vitamina C y Vitamina E. Indicado como oxigenante y revitalizador neuro-cerebral para mejorar el rendimiento mental, la memoria y la concentración. Estuche con 30 grageas.",
    price: 195,
    image: "/products/farmacia/neurocer-grageas.png",
    images: ["/products/farmacia/neurocer-grageas.png"],
    category: "Neurológico",
    benefits: [
      "Oxigenante neuro-cerebral natural",
      "Mejora memoria y concentración",
      "Complejo B + Vitamina C + E antioxidante",
      "Ácido glutámico: neurotransmisor excitador",
    ],
    howToUse: "1–2 grageas al día con los alimentos, mañana y noche.",
    ingredients: "Ácido glutámico · Tiamina (B1) · Piridoxina (B6) · Cianocobalamina (B12) · Vitamina C · Vitamina E · Excipientes.",
    reviews: [
      { author: "Lucía P.", rating: 4, date: "2025-10", text: "Noto más claridad mental desde que lo tomo. Buen suplemento.", verified: false },
    ],
  },
  {
    id: "f37",
    name: "Neurodex — Dexametasona / Complejo B",
    tagline: "Corticosteroide + Vitaminas B · 12 tabletas · Medicam",
    description:
      "Dexametasona (corticosteroide potente) + vitaminas del Complejo B en tabletas. Indicado en procesos inflamatorios con componente neuropático, neuritis y dolor radicular. Caja con 12 tabletas. Medicam.",
    price: 145,
    image: "/products/farmacia/neurodex-tabletas.png",
    images: ["/products/farmacia/neurodex-tabletas.png"],
    category: "Neurológico",
    benefits: [
      "Corticosteroide + neuro-vitaminas en una tableta",
      "Neuritis, ciática, dolor radicular",
      "Dexametasona de acción prolongada",
      "12 tabletas para ciclo antiinflamatorio corto",
    ],
    howToUse: "Según indicación médica. Generalmente 1–2 tabletas/día con alimentos. No suspender bruscamente.",
    ingredients: "Dexametasona 0.75 mg · Tiamina (B1) · Piridoxina (B6) · Cianocobalamina (B12) · Excipientes farmacéuticos.",
    reviews: [
      { author: "Ignacio R.", rating: 5, date: "2025-11", text: "Para la neuritis del facial me alivió rápidamente. Muy buen medicamento.", verified: true },
    ],
  },
];

export const farmaciaCategories = [
  "Antihipertensivos",
  "Diabetes",
  "Colesterol",
  "Analgésicos",
  "Digestivo",
  "Inyectables",
  "Antivirales",
  "Respiratorio",
  "Oftálmico",
  "Neurológico",
  "Alergias",
  "Circulación",
  "Antifúngicos",
  "Urológico",
  "Vitaminas B",
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
