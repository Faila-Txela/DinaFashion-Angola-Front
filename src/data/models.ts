import type { ProductFilters } from "../services/global/ProductFilters";

export const products: ProductFilters[] = []


export const carrousel = [
  { 
    id: 1,
    src: "https://cdn.pixabay.com/photo/2025/03/12/06/35/fashion-9463945_1280.jpg", 
    title: "Estilo Urbano", 
    description: "Roupas casuais com toque moderno." 
  },

  { 
    id: 2,
    src: "https://cdn.pixabay.com/photo/2017/10/07/06/40/fashion-2825638_1280.jpg", 
    title: "Minimalismo", 
    description: "Peças neutras e sofisticadas." 
  },

  { 
    id: 3,
    src: "https://cdn.pixabay.com/photo/2025/03/12/09/51/fashion-9464609_1280.jpg", 
    title: "Vintage Chic", 
    description: "Moda retrô em alta." 
  },

  { id: 4,
    src: "https://cdn.pixabay.com/photo/2017/05/17/04/00/golden-apple-2319787_1280.jpg", 
    title: "Camisas Genuínas", 
    description: "Tendência estilosa para os homens."
  },

  { id: 5,
    src: "https://cdn.pixabay.com/photo/2025/03/12/06/37/fashion-9463977_1280.jpg", 
    title: "Peças de Galas", 
    description: "Looks adoravéis para seus eventos de luxo."
  },

  { id: 6,
    src: "https://cdn.pixabay.com/photo/2019/12/25/17/42/fashion-4718992_1280.jpg", 
    title: "Romântico", 
    description: "Rendas, babados e tons suaves."
  },

  { id:7,
    src: "https://cdn.pixabay.com/photo/2025/07/20/15/48/ai-generated-9724696_1280.jpg", 
    title: "All Jeans", 
    description: "O jean também pode ser sua marê"
  },

  { id: 8,
    src: "https://cdn.pixabay.com/photo/2017/09/19/21/35/fashion-2766725_1280.jpg", 
    title: "Techwear", 
    description: "Moda utilitária com atitude." 
  },

  { id: 9,
    src: "https://cdn.pixabay.com/photo/2025/03/12/09/53/fashion-9464670_1280.jpg", 
    title: "Estilo Casual", 
    description: "Casual e leve para o dia a dia." 
  },

  { id: 10,
    src: "https://cdn.pixabay.com/photo/2023/02/06/14/54/woman-7772187_1280.jpg", 
    title: "Inverno", 
    description: "Peças de inverno, com um toque moderno." 
  },
];

export const categories = [

  {
    id: 1,
    titulo: "Moda Masculina",
    img: "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg",
    url: "/moda-masculina-angolana"
  },

  {
    id: 2,
    titulo: "Moda Feminina",
    img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg",
    url: "/moda-feminina-angolana"
  },

  {
    id: 3,
    titulo: "Acessórios Luxuosos",
    img: "https://cdn.pixabay.com/photo/2023/04/26/08/38/jewelry-7951905_1280.jpg",
    url: "/acessorios"
  },

  {
    id: 4,
    titulo: "Calçados Luxuosos",
    img: "https://cdn.pixabay.com/photo/2023/11/15/13/52/shoe-8390118_1280.jpg",
    url: "/calcados"
  },

  {
    id: 5,
    titulo: "Outros",
    img: "https://cdn.pixabay.com/photo/2016/01/31/14/32/architecture-1171462_1280.jpg",
    url: "/utensílios-de-cozinha"
  }

]

export const faqAnswers = [
  {
    id: 1,
    question: "O que é a DinaFashion ?",
    answer: "DinaFashion é uma plataforma de e-commerce especializada em moda, oferecendo uma ampla variedade de roupas, acessórios e calçados para todas as idades e estilos.",
  },

  {
    id: 2,
    question: "Quais são as opções de pagamento disponíveis?",
    answer: "De momento estamos aceitando apenas por transferência bancária ou via express.",
  },

  {
    id: 3,
    question: "Qual é a política de devolução?",
    answer: "Nossa política de devolução permite que você devolva produtos em até 2 dias após a compra, desde que estejam em condições originais.",
  },

  {
    id: 4,
    question: "Como posso entrar em contato com o suporte ao cliente?",
    answer: "Você pode entrar em contato com nosso suporte ao cliente através do formulário de contato na página 'Fale Conosco' ou pelo e-mail.",
  },
]
