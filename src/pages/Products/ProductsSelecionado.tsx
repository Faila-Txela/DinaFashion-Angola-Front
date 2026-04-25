import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MdWhatsapp } from 'react-icons/md';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Categories from '../../components/Categories';
import { toast } from 'react-toastify';
import type { Products } from '../../services/types/products';
import { productsService } from '../../services/api/products/products';
import { useParams } from 'react-router-dom';


function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Products | null>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await productsService.getById(id);
          console.log(data)
          setProduct(data);
          
          // Define a primeira imagem como principal assim que carrega
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0].url);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o produto selecionado", error);
        toast.error("Erro ao carregar produto selecionado");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="pt-32 text-center">Carregando detalhes...</p>;
  if (!product) return <p className="pt-32 text-center">Produto não encontrado.</p>;

  const whatsappLink = `https://wa.me/924157094?text=Olá, tenho interesse no produto: ${product.name}`;

  return (
    <AnimatePresence>
      <Header />
      <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>
        <div className='flex flex-col md:flex-row gap-8 w-full min-h-90 mt-10'>
          
          {/* Lado Esquerdo: Imagens */}
          <div className='flex flex-col md:flex-row md:w-3/5 gap-4 w-full'>
            <div className='flex md:flex-col gap-2 overflow-x-auto md:w-20 w-full'>
              {product.imagens.map((img, index) => (
                <img
                  title='imagem-detalhada'
                  key={`${img.id}-${index}`}
                  src={img.url}
                  className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border ${mainImage === img.url ? 'border-black' : 'border-gray-200'}`}
                  onClick={() => setMainImage(img.url)}
                />
              ))}
            </div>
            <div className='flex-1'>
              <img src={mainImage} alt={product.name} className='w-full max-h-[600px] object-cover' />
            </div>
          </div>

          {/* Lado Direito: Info */}
          <div className='flex flex-col w-full md:w-2/5 p-4'>
            <h1 className='font-extrabold text-4xl mb-2'>{product.name}</h1>
            <p className='text-4xl font-light text-[#ba5511] mb-6'>{product.price.toLocaleString('pt-AO')} kz</p>
            
            <div className='mb-8'>
              <h3 className='font-semibold text-lg'>Disponibilidade:</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.inStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.inStock > 0 ? `✅ ${product.inStock} em stock` : '❌ Esgotado'}
              </span>
            </div>

            <h2 className='font-semibold text-xl border-b pb-2 mb-3'>Descrição</h2>
            <p className='text-gray-700 mb-8'>{product.description}</p>

            <a href={whatsappLink} target="_blank" rel="noreferrer" className='bg-green-500 text-white p-4 rounded-lg flex items-center justify-center gap-3 font-bold'>
              <MdWhatsapp size={24}/> Pedir no WhatsApp
            </a>
          </div>
        </div>
        <Categories />
      </div>
      <Footer />
    </AnimatePresence>
  );
}

export default ProductDetail;