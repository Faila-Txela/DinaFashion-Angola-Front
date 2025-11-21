import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const imagens = [
  "https://cdn.pixabay.com/photo/2017/09/19/21/30/fashion-2766711_1280.jpg",
  "https://cdn.pixabay.com/photo/2025/03/12/09/59/fashion-9464875_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_1280.jpg"
];

export default function Carrousel() {
  const [current, setCurrent] = useState(0);

  // Próximo slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === imagens.length - 1 ? 0 : prev + 1));
  };

  // Slide anterior
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? imagens.length - 1 : prev - 1));
  };

  // Troca automática de slide a cada 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden shadow-xl">
      <AnimatePresence>
        <motion.img
          key={current}
          src={imagens[current]}
          alt={`Slide ${current + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Botão Anterior */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 border-none transition"
      >
        <FaChevronLeft className="w-5 h-5 text-white/80 cursor-pointer" />
      </button>

      {/* Botão Próximo */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 border-none transition"
      >
        <FaChevronRight className="w-5 h-5 text-white/80 cursor-pointer" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {imagens.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ir para slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}