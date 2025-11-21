import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const categorias = [
  {
    titulo: "Moda Masculina",
    img: "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg",
    url: "/moda-masculina-angolana"
  },
  {
    titulo: "Moda Feminina",
    img: "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg",
    url: "/moda-feminina-angolana"
  },
  {
    titulo: "Acessórios Luxuosos",
    img: "https://cdn.pixabay.com/photo/2023/04/26/08/38/jewelry-7951905_1280.jpg",
    url: "/acessorios"
  },
  {
    titulo: "Calçados Luxuosos",
    img: "https://cdn.pixabay.com/photo/2023/11/15/13/52/shoe-8390118_1280.jpg",
    url: "/calcados"
  },
    {
    titulo: "Outros",
    img: "https://cdn.pixabay.com/photo/2016/01/31/14/32/architecture-1171462_1280.jpg",
    url: "/utensílios-de-cozinha  https://wa.link/zqqw40"
  }
];

export default function Categories() {
  const [index] = useState(0);

  return (
    <div className="px-6 py-10">
      <h1 className="font-semibold text-3xl mt-5 mb-16 text-center">Categorias Disponíveis</h1>
      <AnimatePresence>
        <motion.div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categorias.map((cat, i) => (
            <Link to={cat.url} key={i} className="relative group w-full">
              <motion.img
                src={cat.img}
                alt={cat.titulo}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }} // Ativar animação ao entrar no viewport
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2, 
                }}
                viewport={{ once: false, amount: 0.5 }} 
                className="h-80 w-full object-cover rounded-md shadow-lg group-hover:scale-92 transition-transform duration-500"
              />
              {/* Overlay com título */}
              <div className="absolute inset-0 flex justify-center items-center bg-gradient-to-t from-black/60 to-transparent rounded-md">
                <h2 className="text-xl font-bold text-white text-center px-2">
                  {cat.titulo}
                </h2>
              </div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}