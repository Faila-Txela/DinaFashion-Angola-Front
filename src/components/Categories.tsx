import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/models";

export default function Categories() {
  const [index] = useState(0);

  return (
    <div className="px-6 py-10">
      <h1 className="font-semibold text-3xl mt-5 mb-6 text-center">Categorias Disponíveis</h1>
      <AnimatePresence>
        <motion.div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, i) => (
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
                <h3 className="text-2xl font-bold text-white text-center px-2">
                  {cat.titulo}
                </h3>
              </div>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}