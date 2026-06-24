import type { Collection, Product } from "../types/catalog";

export const collections: Collection[] = [
  {
    slug: "tai-chi-shoes",
    name: {
      "en-us": "Tai Chi Shoes",
      "zh-cn": "太极养生鞋",
      "es-us": "Zapatos de Tai Chi"
    },
    description: {
      "en-us": "Slip-resistant, low-profile shoes made for balance practice, errands, and calm daily movement.",
      "zh-cn": "防滑、低重心的日常鞋履，适合平衡练习、通勤采买与从容行走。",
      "es-us": "Zapatos antideslizantes y de perfil bajo para práctica de equilibrio, mandados y movimiento diario tranquilo."
    },
    image: "/images/products/balance-walker-generated.jpg",
    imageAlt: {
      "en-us": "Black tai chi walking shoes styled beside tea and wellness notes",
      "zh-cn": "黑色太极行走鞋，搭配茶具与养护札记陈列",
      "es-us": "Zapatos negros para caminar y tai chi junto a té y notas de bienestar"
    },
    seoTitle: {
      "en-us": "Slip-Resistant Tai Chi Shoes for Daily Balance",
      "zh-cn": "防滑太极养生鞋 | 日常平衡与稳步行走",
      "es-us": "Zapatos antideslizantes de tai chi para equilibrio diario"
    }
  },
  {
    slug: "wellness-apparel",
    name: {
      "en-us": "Wellness Apparel",
      "zh-cn": "轻养生服装",
      "es-us": "Ropa de bienestar"
    },
    description: {
      "en-us": "Breathable hemp-touch layers for stretching, tea, travel, and easy home rituals.",
      "zh-cn": "透气麻感层搭，适合舒展、茶事、旅行与居家轻仪式。",
      "es-us": "Capas transpirables con tacto de cáñamo para estirarse, tomar té, viajar y crear rituales en casa."
    },
    image: "/images/products/cloud-hemp-set-generated.jpg",
    imageAlt: {
      "en-us": "Light hemp-touch wellness apparel set in a calm studio",
      "zh-cn": "安静空间里的浅色麻感轻养生服装套装",
      "es-us": "Conjunto claro de ropa de bienestar con tacto de cáñamo en un estudio tranquilo"
    },
    seoTitle: {
      "en-us": "Breathable Eastern Wellness Apparel",
      "zh-cn": "透气东方轻养生服装",
      "es-us": "Ropa transpirable de bienestar oriental"
    }
  },
  {
    slug: "ritual-kits",
    name: {
      "en-us": "Ritual Kits",
      "zh-cn": "仪式套组",
      "es-us": "Kits rituales"
    },
    description: {
      "en-us": "Giftable product sets that pair functional footwear and apparel with future member care rituals.",
      "zh-cn": "适合礼赠的鞋服套组，连接机能产品与未来会员养护仪式。",
      "es-us": "Conjuntos para regalo que unen calzado y prendas funcionales con futuros rituales de cuidado para miembros."
    },
    image: "/images/brand/ritual-kit-still-life.jpg",
    imageAlt: {
      "en-us": "Wellness footwear and apparel gift set with care cards and natural details",
      "zh-cn": "轻养生鞋服礼赠套组，搭配养护卡片与自然细节",
      "es-us": "Set de regalo de calzado y ropa de bienestar con tarjetas de cuidado y detalles naturales"
    },
    seoTitle: {
      "en-us": "Eastern Wellness Gift and Ritual Kits",
      "zh-cn": "东方轻养生礼赠与仪式套组",
      "es-us": "Kits de regalo y ritual de bienestar oriental"
    }
  }
];

export const products: Product[] = [
  {
    slug: "balance-walker",
    collectionSlugs: ["tai-chi-shoes", "ritual-kits"],
    name: {
      "en-us": "Balance Walker",
      "zh-cn": "衡步太极鞋",
      "es-us": "Balance Walker"
    },
    eyebrow: {
      "en-us": "Slip-resistant tai chi shoe",
      "zh-cn": "防滑太极养生鞋",
      "es-us": "Zapato de tai chi antideslizante"
    },
    description: {
      "en-us": "A grounded walking shoe with a grippy outsole, wide stable base, and soft upper for tai chi practice and everyday safety.",
      "zh-cn": "抓地外底、宽稳底盘与柔软鞋面结合，适合太极练习与日常安全行走。",
      "es-us": "Un zapato firme con suela de buen agarre, base ancha y estable, y capellada suave para tai chi y seguridad diaria."
    },
    price: 128,
    image: "/images/products/balance-walker-generated.jpg",
    imageAlt: {
      "en-us": "Black low-profile tai chi walking shoe with textured outsole",
      "zh-cn": "黑色低帮太极行走鞋，带纹理防滑外底",
      "es-us": "Zapato negro de perfil bajo para caminar y tai chi con suela texturizada"
    },
    benefits: {
      "en-us": ["Wet-floor traction", "Low, balanced stance", "Soft collar for ankle comfort"],
      "zh-cn": ["湿滑地面抓地", "低重心平衡脚感", "柔软鞋口呵护脚踝"],
      "es-us": ["Tracción en pisos húmedos", "Postura baja y equilibrada", "Cuello suave para comodidad del tobillo"]
    },
    specs: {
      "en-us": [
        { label: "Upper", value: "Breathable microfiber knit" },
        { label: "Outsole", value: "Textured rubber grip" },
        { label: "Use", value: "Tai chi, walking, indoor errands" }
      ],
      "zh-cn": [
        { label: "鞋面", value: "透气微纤针织" },
        { label: "外底", value: "纹理橡胶防滑底" },
        { label: "场景", value: "太极、步行、室内日常" }
      ],
      "es-us": [
        { label: "Capellada", value: "Tejido de microfibra transpirable" },
        { label: "Suela", value: "Goma texturizada de agarre" },
        { label: "Uso", value: "Tai chi, caminata, mandados interiores" }
      ]
    },
    faqs: {
      "en-us": [
        { question: "Is it only for tai chi?", answer: "No. It is built for practice, light walking, and daily indoor-outdoor movement." }
      ],
      "zh-cn": [
        { question: "只能练太极穿吗？", answer: "不是。它适合练习、轻步行和日常室内外活动。" }
      ],
      "es-us": [
        { question: "¿Es solo para tai chi?", answer: "No. Está hecho para práctica, caminatas ligeras y movimiento diario dentro y fuera de casa." }
      ]
    }
  },
  {
    slug: "ritual-slip-on",
    collectionSlugs: ["tai-chi-shoes"],
    name: {
      "en-us": "Ritual Slip-On",
      "zh-cn": "入境一脚蹬",
      "es-us": "Ritual Slip-On"
    },
    eyebrow: {
      "en-us": "Easy-entry wellness shoe",
      "zh-cn": "易穿脱轻养生鞋",
      "es-us": "Zapato de bienestar fácil de poner"
    },
    description: {
      "en-us": "A slip-on made for quick transitions, with a secure heel cup, flexible forefoot, and understated Eastern-inspired lines.",
      "zh-cn": "为快速出入设计的一脚蹬，稳固后跟、灵活前掌，并融入克制的东方线条。",
      "es-us": "Un slip-on para transiciones rápidas, con talón seguro, antepié flexible y líneas sutiles de inspiración oriental."
    },
    price: 118,
    compareAtPrice: 138,
    image: "/images/products/ritual-slip-on-generated.jpg",
    imageAlt: {
      "en-us": "Taupe slip-on wellness shoe with flexible forefoot",
      "zh-cn": "灰褐色轻养生一脚蹬，前掌灵活",
      "es-us": "Zapato slip-on color topo de bienestar con antepié flexible"
    },
    benefits: {
      "en-us": ["Hands-free entry feel", "Stable heel guidance", "Quiet styling for gifting"],
      "zh-cn": ["顺畅穿脱体验", "稳定后跟导向", "适合礼赠的安静设计"],
      "es-us": ["Sensación de entrada fácil", "Guía estable en el talón", "Estilo sobrio para regalar"]
    },
    specs: {
      "en-us": [
        { label: "Closure", value: "Slip-on with elastic gore" },
        { label: "Footbed", value: "Cushioned removable insole" },
        { label: "Use", value: "Travel, home entry, daily walking" }
      ],
      "zh-cn": [
        { label: "结构", value: "弹力侧片一脚蹬" },
        { label: "鞋垫", value: "可取出缓震鞋垫" },
        { label: "场景", value: "旅行、入户、日常步行" }
      ],
      "es-us": [
        { label: "Cierre", value: "Slip-on con elástico lateral" },
        { label: "Plantilla", value: "Plantilla acolchada removible" },
        { label: "Uso", value: "Viaje, entrada al hogar, caminata diaria" }
      ]
    },
    faqs: {
      "en-us": [
        { question: "Does it feel loose?", answer: "The elastic side panels ease entry while the molded heel helps keep the foot centered." }
      ],
      "zh-cn": [
        { question: "会不会不跟脚？", answer: "弹力侧片方便穿脱，定型后跟帮助脚部保持居中稳定。" }
      ],
      "es-us": [
        { question: "¿Se siente flojo?", answer: "Los paneles elásticos facilitan la entrada y el talón moldeado ayuda a centrar el pie." }
      ]
    }
  },
  {
    slug: "cloud-hemp-set",
    collectionSlugs: ["wellness-apparel", "ritual-kits"],
    name: {
      "en-us": "Cloud Hemp Set",
      "zh-cn": "云麻舒展套装",
      "es-us": "Cloud Hemp Set"
    },
    eyebrow: {
      "en-us": "Breathable ritual layer",
      "zh-cn": "透气仪式层搭",
      "es-us": "Capa ritual transpirable"
    },
    description: {
      "en-us": "A relaxed hemp-touch top and pant set for stretching, tea rituals, recovery walks, and elevated wellness gifting.",
      "zh-cn": "松弛麻感上衣与长裤套装，适合舒展、茶事、恢复散步与轻养生礼赠。",
      "es-us": "Conjunto relajado de top y pantalón con tacto de cáñamo para estirarse, tomar té, caminar en recuperación y regalar bienestar."
    },
    price: 168,
    image: "/images/products/cloud-hemp-set-generated.jpg",
    imageAlt: {
      "en-us": "Soft hemp-touch wellness top and pants in warm gray",
      "zh-cn": "暖灰色柔软麻感轻养生上衣和长裤",
      "es-us": "Top y pantalón de bienestar con tacto de cáñamo en gris cálido"
    },
    benefits: {
      "en-us": ["Airy natural-touch weave", "Easy stretch silhouette", "Gift-ready ritual pairing"],
      "zh-cn": ["轻盈天然触感织物", "便于舒展的宽松廓形", "适合礼赠的仪式组合"],
      "es-us": ["Tejido aireado de tacto natural", "Silueta cómoda para estirar", "Combinación ritual lista para regalo"]
    },
    specs: {
      "en-us": [
        { label: "Fabric", value: "Hemp-touch viscose blend" },
        { label: "Fit", value: "Relaxed top and tapered pant" },
        { label: "Use", value: "Stretching, tea, travel, gifting" }
      ],
      "zh-cn": [
        { label: "面料", value: "麻感粘纤混纺" },
        { label: "版型", value: "宽松上衣与收口长裤" },
        { label: "场景", value: "舒展、茶事、旅行、礼赠" }
      ],
      "es-us": [
        { label: "Tela", value: "Mezcla de viscosa con tacto de cáñamo" },
        { label: "Corte", value: "Top relajado y pantalón cónico" },
        { label: "Uso", value: "Estiramiento, té, viaje, regalo" }
      ]
    },
    faqs: {
      "en-us": [
        { question: "Is the fabric heavy?", answer: "No. The set is designed to feel airy while keeping a composed drape." }
      ],
      "zh-cn": [
        { question: "面料会厚重吗？", answer: "不会。套装强调轻盈透气，同时保留从容垂感。" }
      ],
      "es-us": [
        { question: "¿La tela es pesada?", answer: "No. El conjunto está diseñado para sentirse aireado y mantener una caída serena." }
      ]
    }
  }
];
