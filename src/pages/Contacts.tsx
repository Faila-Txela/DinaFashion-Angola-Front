import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Chat from "../components/Chat"

function Contacts() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")

  return (
     <div>
    <Header />
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Vídeo de fundo */}
      <motion.video
        src="https://cdn.pixabay.com/video/2019/04/05/22600-328624858_tiny.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10" />

      {/* Conteúdo principal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        exit={{ opacity: 0}}
        className="relative z-10 w-full max-w-5xl mt-20 mb-16 flex flex-col md:flex-row items-center gap-10"
      >
        {/* LADO ESQUERDO */}
        <div className="flex-1 text-white space-y-6">
          <h2 className="text-3xl font-bold">Fale Conosco</h2>
          <p className="text-lg text-gray-200">
            Tem alguma dúvida ou sugestão? Entre em contato conosco através do formulário ou diretamente pelas nossas redes sociais.
          </p>

          <div className="space-y-3">
            <p>📧 dinaFashion2025@gmail.com</p>
            <p>📞 +244 924 157 094</p>
            <p>📍 Luanda, Angola</p>
          </div>

        </div>

        {/* LADO DIREITO - FORMULÁRIO */}
        <form className="flex-1 bg-white/80 dark:bg-black/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Entre em Contato
          </h2>

          {/* Nome */}
          <div className="relative mb-6">
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder=" "
              className="peer w-full border-2 border-gray-400 rounded-lg px-3 pt-5 pb-2 bg-transparent focus:border-[#ba5511] focus:outline-none"
            />
            <label
              htmlFor="nome"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-[#ba5511] peer-focus:text-sm"
            >
              Nome
            </label>
          </div>

          {/* Email */}
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full border-2 border-gray-400 rounded-lg px-3 pt-5 pb-2 bg-transparent focus:border-[#ba5511] focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-[#ba5511] peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Mensagem */}
          <div className="relative mb-6">
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder=" "
              rows={4}
              className="peer w-full border-2 border-gray-400 text-white/80 rounded-lg px-3 pt-5 pb-2 bg-transparent focus:border-[#ba5511] focus:outline-none resize-none"
            />
            <label
              htmlFor="mensagem"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-[#ba5511] peer-focus:text-sm"
            >
              Mensagem
            </label>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-[#ba5511] hover:bg-[#ba5511] text-white font-semibold rounded-lg transition"
          >
            Enviar
          </button>
        </form>
      </motion.div>
    </div>
 
    <Chat />

    <Footer />
    
     </div>
  )
}

export default Contacts