import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const images = [
  { src: "https://cdn.pixabay.com/photo/2025/03/12/06/35/fashion-9463945_1280.jpg", title: "Estilo Urbano", description: "Roupas casuais com toque moderno." },
  { src: "https://cdn.pixabay.com/photo/2017/10/07/06/40/fashion-2825638_1280.jpg", title: "Minimalismo", description: "Peças neutras e sofisticadas." },
  { src: "https://cdn.pixabay.com/photo/2025/03/12/09/51/fashion-9464609_1280.jpg", title: "Vintage Chic", description: "Moda retrô em alta." },
  { src: "https://cdn.pixabay.com/photo/2017/05/17/04/00/golden-apple-2319787_1280.jpg", title: "Camisas Genuínas", description: "Tendência estilosa para os homens." },
  { src: "https://cdn.pixabay.com/photo/2025/03/12/06/37/fashion-9463977_1280.jpg", title: "Peças de Galas", description: "Looks adoravéis para seus eventos de luxo." },
  { src: "https://cdn.pixabay.com/photo/2019/12/25/17/42/fashion-4718992_1280.jpg", title: "Romântico", description: "Rendas, babados e tons suaves." },
  { src: "https://cdn.pixabay.com/photo/2025/07/20/15/48/ai-generated-9724696_1280.jpg", title: "All Jeans", description: "O jean também pode ser sua marê" },
  { src: "https://cdn.pixabay.com/photo/2017/09/19/21/35/fashion-2766725_1280.jpg", title: "Techwear", description: "Moda utilitária com atitude." },
  { src: "https://cdn.pixabay.com/photo/2025/03/12/09/53/fashion-9464670_1280.jpg", title: "Estilo Casual", description: "Casual e leve para o dia a dia." },
  { src: "https://cdn.pixabay.com/photo/2023/02/06/14/54/woman-7772187_1280.jpg", title: "Inverno", description: "Peças de inverno, com um toque moderno." },
];

function News() {
  const [position, setPosition] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; description: string } | null>(null);
  const containerRef = useRef(null);
  const IMAGE_WIDTH = 250;
  const GAP = 16;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (dir: any) => {
    setPosition((prev) => {
      if (dir === "prev") {
        // Se estiver no primeiro, vai para o último
        return prev === 0 ? images.length - 1 : prev - 1;
      } else {
        // Se estiver no último, vai para o primeiro
        return prev === images.length - 1 ? 0 : prev + 1;
      }
    });
  };

  // Função para a navegação dentro do modal
  const navigateModal = (direction: "prev" | "next") => {
    const currentIndex = images.findIndex((img) => img.src === selectedImage?.src);
    const newIndex =
      direction === "prev"
        ? currentIndex === 0
          ? images.length - 1
          : currentIndex - 1
        : currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;
    setSelectedImage(images[newIndex]);
  };

  // Função para fechar o modal ao clicar fora da área
  const handleCloseModal = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex-col max-md:flex gap-6 px-6 py-10">
      <AnimatePresence>
        <h1 className="font-semibold text-3xl mt-5 mb-16 text-center">
          Tendências no mercado
        </h1>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-4 transition-transform ease-in-out duration-700"
            animate={{ x: -((IMAGE_WIDTH + GAP) * position) }}
            // Impede que a rolagem ultrapasse o último item
            style={{
              transform: `translateX(-${(IMAGE_WIDTH + GAP) * position}px)`,
            }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="relative min-w-[250px] h-[350px] bg-gray-200 overflow-hidden shadow-lg flex-shrink-0 cursor-pointer group"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay "Ver mais" */}
                <div
                  onClick={() => setSelectedImage(img)}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                >
                  <span className="text-white text-lg font-medium -translate-y-1/2 bg-black/60 px-6">
                    Ver mais
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Botões de navegação */}
          <button
            title="prev"
            type="button"
            onClick={() => scrollTo("prev")}
            className="absolute left-2 top-1/2 -translate-y-1/2 shadow-md z-10"
          >
            <FaChevronLeft className="w-5 h-5 text-white/80 cursor-pointer" />
          </button>

          <button
            title="next"
            type="button"
            onClick={() => scrollTo("next")}
            className="absolute right-2 top-1/2 -translate-y-1/2 shadow-md z-10"
          >
            <FaChevronRight className="w-5 h-5 text-white/80 cursor-pointer" />
          </button>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div
                className="bg-white p-8 w-[95%] min-h-[500px] md:min-h-[600px] max-w-4xl relative flex flex-wrap md:flex-nowrap gap-8 items-start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <button
                  title="close"
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                  <MdClose className="w-6 h-6" />
                </button>

                {/* Imagem no modal */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full md:w-1/2 h-full object-cover"
                />

                <div className="flex flex-col justify-start w-full md:w-1/2">
                  <h2 className="text-3xl font-bold mb-4">{selectedImage.title}</h2>
                  <p className="text-gray-700 text-lg">{selectedImage.description}</p>
                </div>

                {/* Navegação dentro do modal */}
                <button
                  title="prev"
                  type="button"
                  onClick={() => navigateModal("prev")}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black z-10"
                >
                  <FaChevronLeft className="w-5 h-5 text-gray-500 cursor-pointer" />
                </button>

                <button
                  title="next"
                  type="button"
                  onClick={() => navigateModal("next")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black z-10"
                >
                  <FaChevronRight className="w-5 h-5 text-gray-500 cursor-pointer" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}

export default News;