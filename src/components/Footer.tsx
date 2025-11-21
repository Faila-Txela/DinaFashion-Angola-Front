import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#1a1f2c] py-10">
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-evenly items-center md:items-start mx-auto px-4 gap-10 md:gap-20">

        {/* Logo e redes sociais */}
        <AnimatePresence>
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 1 }}
            exit={{ x: 0 }}
            transition={{ duration: .8 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex-col items-center gap-6">
              <div className="flex gap-4 items-center justify-center">
                <MdShoppingCart color="white" size={42} />
                <h1 className="font-montserrat text-white font-extrabold text-4xl">DinaFashion</h1>
              </div>
              <p className='text-white opacity-20'>A loja onde sua personalidade é Revelada.</p>
            </div>

            <div className="flex gap-4">
              <a href="http://" title="instagram" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} color="white" className="hover:opacity-70 transition-opacity" />
              </a>
              <a href="http://" title="facebook" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} color="white" className="hover:opacity-70 transition-opacity" />
              </a>
              <a href="http://" title="github" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} color="white" className="hover:opacity-70 transition-opacity" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 text-center">

          {/* Loja */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .8 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-2xl font-semibold text-white">Loja</h1>
            <div className="flex flex-col gap-2 items-center">
              <Link to="/" className="hover:text-gray-200 text-white transition-colors">Home</Link>
              <Link to="/sobre-nossa-loja" className="hover:text-gray-200 text-white transition-colors">Sobre Nós</Link>
              <Link to="#" className="hover:text-gray-200 text-white transition-colors">Pagamentos</Link>
            </div>
          </motion.div>

          {/* Produtos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .8 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-2xl font-semibold text-white">Produtos</h1>
            <div className="flex flex-col gap-2 items-center">
              <Link to="/" className="hover:text-gray-200 text-white transition-colors">Acessórios</Link>
              <Link to="#" className="hover:text-gray-200 text-white transition-colors">Esportivos</Link>
              <Link to="#" className="hover:text-gray-200 text-white transition-colors">Elegante</Link>
              <Link to="#" className="hover:text-gray-200 text-white transition-colors">Descontraído</Link>
            </div>
          </motion.div>

          {/* Recursos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .8 }}
            className="flex flex-col items-center gap-2"
          >
            <h1 className="text-2xl font-semibold text-white">Recursos</h1>
            <div className="flex flex-col gap-2 items-center">
              <Link to="/services" className="hover:text-gray-200 text-white font-medium transition-colors">Serviços</Link>
              <Link to="/" className="hover:text-gray-200 text-white font-medium transition-colors">Suporte</Link>
              <Link to="/faq" className="hover:text-gray-200 text-white font-medium transition-colors">FAQ</Link>
              <Link to="/contacts" className="hover:text-gray-200 text-white font-medium transition-colors">Contato</Link>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Linha inferior */}
      <motion.div
        className="w-full pt-8 p-2 mt-10 border-t border-white/70 text-center md:flex md:justify-between md:text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-400 mb-4 md:mb-0">© 2025 DinaFashion. Todos os direitos reservados.</p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link to="/termos-de-uso" className="text-gray-200 hover:text-white transition-colors duration-300">Termos</Link>
          <Link to="#" className="text-gray-200 hover:text-white transition-colors duration-300">Privacidade</Link>
          <Link to="#" className="text-gray-200 hover:text-white transition-colors duration-300">Cookies</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Footer;