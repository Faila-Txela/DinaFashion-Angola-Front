import { Package, Layers, Tag, Calendar, X } from "lucide-react";
import Button from "./Button";

interface Product {
  id: string;
  name: string;
  imagens: { url: string }[];
  description: string;
  price: number;
  inStock: number;
  active?: boolean;
  categoria?: string;
  tags?: string[];
  createdAt: string;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const ProductDetailsModal = ({ isOpen, onClose, product }: ProductDetailsModalProps) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Container Principal do Modal */}
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Botão de Fechar */}
        <Button 
          onClick={onClose}
          type="button"
          title="close"
          addClassName="absolute top-5 right-5 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-500 hover:text-black hover:bg-white transition-all shadow-md hover:scale-110 cursor-pointer"
        >
          <X size={24} />
        </Button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          
          {/* Lado esquerdo: Imagem */}
          <div className="w-full md:w-1/2 bg-gray-50 relative overflow-hidden group">
            {product.imagens && product.imagens.length > 0 ? (
              <img 
                src={product.imagens[0].url} 
                alt={product.name} 
                className="w-full h-full min-h-[400px] md:min-h-[600px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
              />
            ) : (
              <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-gray-300 gap-4">
                <Package size={80} strokeWidth={1} />
                <span className="text-sm font-medium uppercase tracking-widest text-gray-400">Sem imagem cadastrada</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Badge de Status */}
            <div className={`absolute top-6 left-6 z-10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[2px] shadow-lg ${product.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {product.active ? "● Em Stock" : "● Esgotado"}
            </div>
          </div>

          {/* Lado esquerdo: Informações */}
          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-[#b95411] font-bold text-xs uppercase tracking-[2px] mb-3">
                 <Layers size={14} />
                 {product.categoria || 'Categoria Geral'}
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                {product.name}
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-[#b95411]/20 pl-4 italic">
                {product.description}
              </p>
            </div>

            {/* Grid de Preço e Stock */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-3 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#b95411]/20 transition-colors">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Preço de Venda</span>
                <span className="text-2xl font-black text-gray-900">
                  {new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(product.price)}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-3xl border border-gray-100 hover:border-[#b95411]/20 transition-colors">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block mb-2">Disponibilidade</span>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-gray-900">{product.inStock}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">Unid.</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-10">
                <h4 className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <Tag size={14} />
                    Tags do Produto
                </h4>
                <div className="flex flex-wrap gap-2">
                    {product.tags && product.tags.length > 0 ? (
                        product.tags.map((tag, i) => (
                            <span 
                                key={i} 
                                className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-[#b95411] hover:text-white hover:scale-105 transition-all cursor-default"
                            >
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-300 text-xs italic">Nenhuma tag...</span>
                    )}
                </div>
            </div>

            {/* Rodapé Interno */}
            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-6">
                <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={16} />
                    <span className="text-[11px] font-medium uppercase tracking-wider">
                        Registrado em {new Intl.DateTimeFormat('pt-AO', { dateStyle: 'long' }).format(new Date(product.createdAt))}
                    </span>
                </div>
                
                <Button 
                  title="close"
                  type="button"
                  onClick={onClose}
                  addClassName="w-full py-3 bg-[#b95411] text-white tracking-widest rounded-2xl hover:bg-[#a1480f] transition-all shadow-xl shadow-[#b95411]/20 active:scale-[0.98] cursor-pointer font-bold"
                >
                  Fechar Detalhes
                </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;