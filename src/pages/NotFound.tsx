import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import error from '../assets/404-error.png'
import Chat from "../components/Chat"

export default function NotFound() {
  return (
    <div>
   <Header />

     <AnimatePresence>
        <motion.div
        className="flex flex-col gap-4 items-center justify-center mt-20 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        >
          <img className="w-96" src={error} alt="Erro 404 - Página não encontrada" />
          <h1 className="text-3xl font-semibold">Oops! Página não encontrada.</h1>
          <Link to="/" className="text-[#ba5511] hover:underline">Voltar para a página inicial</Link>

        </motion.div>
     </AnimatePresence>

     <Chat />

   <Footer />
    </div>
  )
}
