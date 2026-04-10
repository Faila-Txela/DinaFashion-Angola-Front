import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#1a1f2c] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-4">DinaFashion</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Moda sofisticada e atemporal para todos os momentos da sua vida. 
              Qualidade premium com design minimalista.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/70 transition-colors" title='instagram'>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/70 transition-colors" title='facebook'>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white/70 transition-colors" title='twitter'>
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/" className="transition-colors transition-colors">Loja</Link></li>
              <li><Link to="/moda-masculina-angolana" className="hover:text-white transition-colors">Masculino</Link></li>
              <li><Link to="/moda-feminina-angolana" className="hover:text-white transition-colors">Feminino</Link></li>
              <li><Link to="/infantil" className="hover:text-white transition-colors">Infantil</Link></li>
              <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link to="/faq" className="hover:text-white transition-colors">Perguntas Frequentes</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Troca</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Formas de Pagamento</a></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Congolenses - Rangel, LD</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>(244) 924 157 094</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>albertinasauimbo17@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-white/60">
          <p>© Todos os direitos reservados 2026.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer