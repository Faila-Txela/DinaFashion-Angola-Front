import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaChevronDown } from "react-icons/fa6"
import Header from "../components/Header"
import Footer from "../components/Footer"
import faq from "../assets/faq.png"
import Chat from "../components/Chat"

const faqAnswers = [
  {
    question: "O que é a DinaFashion ?",
    answer:
      "DinaFashion é uma plataforma de e-commerce especializada em moda, oferecendo uma ampla variedade de roupas, acessórios e calçados para todas as idades e estilos.",
  },
  {
    question: "Quais são as opções de pagamento disponíveis?",
    answer: "De momento estamos aceitando apenas por transferência bancária ou via express.",
  },
  {
    question: "Qual é a política de devolução?",
    answer:
      "Nossa política de devolução permite que você devolva produtos em até 2 dias após a compra, desde que estejam em condições originais.",
  },
  {
    question: "Como posso entrar em contato com o suporte ao cliente?",
    answer:
      "Você pode entrar em contato com nosso suporte ao cliente através do formulário de contato na página 'Fale Conosco' ou pelo e-mail.",
  },
]

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (id: any) => {
    setActiveIndex(activeIndex === id ? null : id)
  }

  return (
    <div>
      <Header />

      <div className="bg-neutral-50 min-h-screen flex flex-col md:flex-row items-center justify-evenly gap-10 p-6">
        {/* Perguntas */}
        <motion.div
          className="dark:text-white max-w-2xl w-full"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-6 text-neutral-900">
            Perguntas Frequentes
          </h1>

          {faqAnswers.map((item, id) => (
            <div
              key={id}
              className="mb-4 p-4 bg-white rounded-xl shadow-md cursor-pointer"
              onClick={() => toggleFAQ(id)}
            >
              <div className="flex justify-between items-center text-neutral-800">
                <h2 className="text-lg font-semibold">{item.question}</h2>
                <motion.span
                  animate={{ rotate: activeIndex === id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2 text-gray-400"
                >
                  <FaChevronDown />
                </motion.span>
              </div>

              <AnimatePresence>
                {activeIndex === id && (
                  <motion.p
                    className="mt-2 text-gray-700"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Imagem (só aparece em telas médias ou maiores) */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={faq}
            alt="faqImage"
            className="max-w-md w-full object-contain"
          />
        </motion.div>
      </div>

      <Chat />
      <Footer />
    </div>
  )
}

export default Faq