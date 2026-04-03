import { motion, AnimatePresence } from 'framer-motion';
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineHighQuality, MdPeople, MdPriceCheck } from "react-icons/md";

export default function Cards() {

  const cards = [
    {
      id: 1,
      icon: <MdOutlineHighQuality size={40} className="text-blue-500 mb-4" />,
      title: "Qualidade garantida",
      description: "Obtenha os produtos de Alta Qualidade na DinaFashion."
    },
    {
      id: 2,
      icon: <CiDeliveryTruck size={40} className="text-blue-500 mb-4" />,
      title: "Entrega rápida",
      description: "Tenha os seus produtos em tempo recorde, com nosso serviço eficiente de entrega."
    },
    {
      id: 3,
      icon: <MdPriceCheck size={40} className="text-blue-500 mb-4" />,
      title: "Preços Fixes",
      description: "Os preços mais justos do mercado é aqui na DinaFashion, sem comprometer a qualidade."
    },
    {
      id: 4,
      icon: <MdPeople size={40} className="text-blue-500 mb-4" />,
      title: "Atendimento de Qualidade",
      description: "Temos um enorme compromisso com a satisfação dos nossos clientes."
    }
  ];

  return (
    <AnimatePresence>
      <h1 className="font-semibold text-3xl mt-5 mb-16 text-center">Serviços Prestados</h1>

      <motion.div className="flex max-md:flex-col gap-6 items-center justify-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="bg-white rounded-lg shadow-md p-6 w-72 h-64 flex flex-col items-center text-center"
            // Animação de entrada para cada card com efeitos harmoniosos
            initial={{ opacity: 0, y: 50 }} // Todos começam com 'y' 50
            whileInView={{ opacity: 1, y: 0 }} // Eles se movem para 'y' 0
            viewport={{ once: false, amount: 0.5 }}  // O 'amount' determina a visibilidade
            transition={{
              duration: 1, // Duração da animação
              delay: index * 0.2, // Delay progressivo para criar a sequência
              type: "spring", // Transição com mais naturalidade
              stiffness: 100, // Firmeza no movimento, para deixar mais natural
              damping: 25, // Amortecimento no final para um movimento mais suave
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
              transition: { duration: 0.4 }
            }}
          >
            {card.icon}
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
