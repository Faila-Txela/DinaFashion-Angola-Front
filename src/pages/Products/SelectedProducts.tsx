import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdWhatsapp } from 'react-icons/md';
import { FaRedo } from 'react-icons/fa';
import { WifiOff, PackageSearch } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Categories from '../../components/Categories';
import Skeleton from "../../components/ui/skeleton";
import { toast } from 'react-toastify';
import type { Products } from '../../services/types/products';
import { productsService } from '../../services/api/products/products';
import { useParams, Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState<Products | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(false);
      const data = await productsService.getById(id);
      setProduct(data);
      
      if (data.imagens && data.imagens.length > 0) {
        setMainImage(data.imagens[0].url);
      }
    } catch (err) {
      console.error("Erro ao carregar o produto selecionado", err);
      setError(true);
      toast.error("Erro na conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const whatsappLink = product 
    ? `https://wa.me/946121098?text=Olá DinaFashion! Gostaria de fazer este pedido: ${product.name} Total: ${new Intl.NumberFormat("pt-AO").format(product.price)} AOA` 
    : "#";

  return (
    <AnimatePresence>
      <Header />
      <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>
        
        {error ? (
          // ESTADO: ERRO DE CONEXÃO
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <WifiOff className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Problema na conexão</h2>
            <p className="text-gray-500 mb-8 max-w-sm">Não foi possível carregar os detalhes do produto. Verifique sua internet.</p>
            <button 
              onClick={fetchProduct}
              className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all font-bold"
            >
              <FaRedo /> Tentar novamente
            </button>
          </div>
        ) : !loading && !product ? (
          // ESTADO: PRODUTO NÃO ENCONTRADO (404)
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <PackageSearch className="w-16 h-16 text-orange-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
            <p className="text-gray-500 mb-8">O item que você procura não existe ou foi removido.</p>
            <Link to="/" className="text-[#ba5511] font-bold underline">Voltar para a loja</Link>
          </div>
        ) : (
          // ESTADO: CARREGANDO OU SUCESSO
          <div className='flex flex-col md:flex-row gap-8 w-full min-h-90 mt-10'>
            
            {/* Lado Esquerdo: Imagens */}
            <div className='flex flex-col md:flex-row md:w-3/5 gap-4 w-full'>
              <div className='flex md:flex-col gap-2 overflow-x-auto md:w-20 w-full'>
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-md" />
                  ))
                ) : (
                  product?.imagens.map((img, index) => (
                    <img
                      alt={product.name}
                      key={`${img.id}-${index}`}
                      src={img.url}
                      className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border-2 transition-all ${mainImage === img.url ? 'border-black' : 'border-gray-100 hover:border-gray-300'}`}
                      onClick={() => setMainImage(img.url)}
                    />
                  ))
                )}
              </div>
              <div className='flex-1'>
                {loading ? (
                  <Skeleton className="w-full h-[400px] md:h-[600px] rounded-xl" />
                ) : (
                  <img src={mainImage} alt={product?.name} className='w-full max-h-[600px] object-cover rounded-xl shadow-sm' />
                )}
              </div>
            </div>

            {/* Lado Direito: Info */}
            <div className='flex flex-col w-full md:w-2/5 p-4'>
              {loading ? (
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-10 w-1/2" />
                  <div className="mt-4 flex flex-col gap-2">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-28 rounded-full" />
                      <Skeleton className="h-8 w-20 rounded-full" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <Skeleton className="h-8 w-40 mb-3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-14 w-full rounded-lg mt-4" />
                </div>
              ) : (
                product && (
                  <>
                    <h1 className='font-extrabold text-4xl mb-2 text-gray-900'>{product.name}</h1>
                    <p className='text-4xl font-light text-[#ba5511] mb-6'>{product.price.toLocaleString('pt-AO')} kz</p>
                    
                    <div className='mb-8'>
                      <h3 className='font-semibold text-lg text-gray-800'>Disponibilidade:</h3>
                      <div className='flex items-center gap-4 mt-1'>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {product.inStock > 0 ? `${product.inStock} em stock` : '❌ Esgotado'}
                        </span>
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${product.active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                          {product.active ? "Activo" : "Desativo"}
                        </span>
                      </div>
                    </div>

                    <h2 className='font-semibold text-xl border-b pb-2 mb-3 text-gray-800'>Descrição</h2>
                    <p className='text-gray-700 mb-8 leading-relaxed'>{product.description}</p>

                    <a 
                      href={whatsappLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className='bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-transform active:scale-95 shadow-md'
                    >
                      <MdWhatsapp size={24}/> Pedir no WhatsApp
                    </a>
                  </>
                )
              )}
            </div>
          </div>
        )}
        
        <Categories />
      </div>
      <Footer />
    </AnimatePresence>
  );
}

export default ProductDetail;