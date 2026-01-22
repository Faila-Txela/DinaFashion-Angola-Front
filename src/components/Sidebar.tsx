import { useState, useEffect, useRef, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

type SidebarProps = {
  links: { label: string; href: string; icon: JSX.Element }[];
  user: { name: string; role: string; avatar: string };
};

export default function Sidebar({ links, user }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(links[0]?.href || "");
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Fecha o sidebar ao clicar fora (mobile)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (href: string) => {
    setActive(href);
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Botão mobile */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 bg-[#ba5511] text-white px-3 py-2 rounded-xl shadow-md md:hidden transition hover:bg-[#a24b10]"
      >
        ☰
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || window.innerWidth >= 768) && (
          <motion.nav
            ref={sidebarRef}
            initial={{ x: window.innerWidth >= 768 ? 0 : -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed md:relative top-0 left-0 bottom-0 w-70 bg-[#b95411]/90 backdrop-blur-md text-white p-6 z-40 
                       md:translate-x-0 shadow-2xl md:shadow-none rounded-r-3xl md:rounded-none border-r border-[#b95411]/40 flex flex-col justify-between"
          >
            {/* Perfil */}
            <div>

              <div className="flex items-center gap-2 mb-8">
                <h2 className="text-2xl font-semibold tracking-wide">
                  DinaFashion Panel
                </h2>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-300">{user.role}</p>
                </div>
              </div>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                        ${
                          active === link.href
                            ? "bg-[#ba5511]/80 shadow-inner"
                            : "hover:bg-[#ba5511]/60"
                        }`}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rodapé */}
            <footer className="text-sm text-gray-200 opacity-80 mt-10 text-center border-t border-[#5e2b3e]/40 pt-4">
              © 2025 Green World. Todos os direitos reservados.
            </footer>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};