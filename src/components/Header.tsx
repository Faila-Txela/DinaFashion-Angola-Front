import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const dropdowns = {
    novidades: ["Coleção verão", "Coleção inverno", "Promoções"],
    roupas: ["Camisas", "Calças", "Vestidos"],
    acessorios: ["Bolsas", "Relógios", "Óculos"],
  }

  return (
    <header className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white z-50 transition-colors flex items-center justify-between px-4 py-3">
      <h1 className="font-montserrat font-extrabold text-2xl">DinaFashion</h1>

      {/* Menu desktop */}
      <nav className="hidden md:block">
        <ul className="flex gap-8 items-center p-2 text-lg font-medium relative">
          
          {/* Novidades */}
          <li 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("novidades")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button type="button" className="flex items-center gap-1 hover:text-[#ba5511] transition-colors">
              Novidades <FaChevronDown className="text-sm" />
            </button>
            <AnimatePresence>
              {openDropdown === "novidades" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48"
                >
                  {dropdowns.novidades.map((unique) => (
                    <li key={unique}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">{unique}</a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Roupas */}
          <li 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("roupas")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#ba5511] transition-colors">
              Roupas <FaChevronDown className="text-sm" />
            </button>
            <AnimatePresence>
              {openDropdown === "roupas" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48"
                >
                  {dropdowns.roupas.map((item) => (
                    <li key={item}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">{item}</a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Acessórios */}
          <li 
            className="relative group"
            onMouseEnter={() => setOpenDropdown("acessorios")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#ba5511] transition-colors">
              Acessórios <FaChevronDown className="text-sm" />
            </button>
            <AnimatePresence>
              {openDropdown === "acessorios" && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48"
                >
                  {dropdowns.acessorios.map((item) => (
                    <li key={item}>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100">{item}</a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Home (sem dropdown) */}
          <li>
            <Link to="/" className="hover:text-[#ba5511] transition-colors">Home</Link>
          </li>
        </ul>
      </nav>

      {/* Botão hamburguer (mobile) */}
      <button 
        type="button"
        title="Abrir menu"
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars />
      </button>

      {/* Menu mobile animado */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-3/4 bg-white/70 backdrop-blur-md shadow-lg flex flex-col items-center justify-center gap-6 text-lg font-medium md:hidden"
          >
            {/* Botão de fechar */}
            <button
              type="button"
              title="Fechar menu"
              className="absolute top-5 right-5 text-3xl"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            <details className="w-full text-center">
              <summary className="cursor-pointer hover:text-[#ba5511]">Novidades</summary>
              <ul>
                {dropdowns.novidades.map((item) => (
                  <li key={item}>
                    <a href="#" className="block py-1 hover:text-[#ba5511]" onClick={() => setMenuOpen(false)}>{item}</a>
                  </li>
                ))}
              </ul>
            </details>

            <details className="w-full text-center">
              <summary className="cursor-pointer hover:text-[#ba5511]">Roupas</summary>
              <ul>
                {dropdowns.roupas.map((item) => (
                  <li key={item}>
                    <a href="#" className="block py-1 hover:text-[#ba5511]" onClick={() => setMenuOpen(false)}>{item}</a>
                  </li>
                ))}
              </ul>
            </details>

            <details className="w-full text-center">
              <summary className="cursor-pointer hover:text-[#ba5511]">Acessórios</summary>
              <ul>
                {dropdowns.acessorios.map((item) => (
                  <li key={item}>
                    <a href="#" className="block py-1 hover:text-[#ba5511]" onClick={() => setMenuOpen(false)}>{item}</a>
                  </li>
                ))}
              </ul>
            </details>

            <Link to="/" className="hover:text-[#ba5511] font-semibold" onClick={() => setMenuOpen(false)}>Home</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header