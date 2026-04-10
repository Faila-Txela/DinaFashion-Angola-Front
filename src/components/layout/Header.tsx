import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  //const [searchQuery, setSearchQuery] = useState('')   Fazer a parte de Pesquisa de produtos. Entender melhor a organização que o Lovable me entregou.


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 flex items-center justify-between px-10 py-4 ${
        isScrolled 
          ? 'bg-white/6 backdrop-blur-md shadow-md' 
          : 'bg-white'
      }`}
    >

      <Link to="/" className="font-display text-2xl md:text-3xl font-semibold tracking-tight">DinaFashion</Link>

      {/* Menu desktop */}
      <nav className="hidden md:block">
        <ul className="flex gap-8 items-center p-2 text-lg font-medium relative">
          

          <li className="flex items-center gap-10">
            <Link to="/moda-feminina-angolana" className="hover:text-[#ba5511] transition-colors">Mulheres</Link>
            <Link to="/moda-masculina-angolana" className="hover:text-[#ba5511] transition-colors">Homens</Link>
            <Link to="/" className="hover:text-[#ba5511] transition-colors">Crianças</Link>
            <Link to="/" className="hover:text-[#ba5511] transition-colors">Acessórios</Link>
          </li>
        </ul>
      </nav>

      <button 
        type="button"
        title="Abrir menu"
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-3/4 bg-white/70 backdrop-blur-md shadow-lg flex flex-col items-center justify-center gap-6 text-lg font-medium md:hidden"
          >

            <button
              type="button"
              title="Fechar menu"
              className="absolute top-5 right-5 text-3xl"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            <Link to="/moda-feminina-angolana" className="hover:text-[#ba5511] transition-colors" onClick={() => setMenuOpen(false)}>Mulheres</Link>
            <Link to="/moda-masculina-angolana" className="hover:text-[#ba5511] transition-colors" onClick={() => setMenuOpen(false)}>Homens</Link>
            <Link to="/" className="hover:text-[#ba5511] transition-colors" onClick={() => setMenuOpen(false)}>Crianças</Link>
            <Link to="/" className="hover:text-[#ba5511] transition-colors" onClick={() => setMenuOpen(false)}>Acessórios</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header