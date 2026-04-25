import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaShareAlt } from 'react-icons/fa'; 
import Categories from '../components/Categories';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Bar from '../components/Bar';
import { toast } from "react-toastify";
import type { Products } from "../services/types/products";
import { productsService } from "../services/api/products/products";

function Feminine() {
    const [products, setProducts] = useState<Products[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Função para carregar os produtos
    useEffect(() => {
      const fetchProducts = async () => {
        try{
            setIsLoading(true)
            const data = await productsService.getAll()
            setProducts(data)
        }

        catch(error){
            console.error("Erro ao carregar produtos", error)
          toast.error("Não foi possível carregar os produtos")
        }
        finally{
            setIsLoading(false)
        }
      }
      fetchProducts()
    }, [])

    return (

        <AnimatePresence>

            <Header />

            <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>

                {/* --- Container Principal: Sidebar + Produtos --- */}
                <div className='flex gap-6 w-full min-h-90'>

                      <div className="relative">
                        <Bar />
                      </div>

                    {/* Conteúdo dos Produtos */}
                    <motion.div
                        className='flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    > 
                    {isLoading && <p>Carregando produtos...</p>} 
                        {!isLoading && products.map((produto, index) => (
                            <Link 
                                to={`/produto/${produto.id}`} 
                                key={`${produto.id}-${index}`} 
                                className="relative group w-full overflow-hidden bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300"
                            >

                                {/* Imagem do Produto */}
                                <div className='relative overflow-hidden h-72 w-full'>

                                    <motion.img
                                         // Acessando as imagens, mesmo o type das imagens estar em outra tipagem
                                        src={produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : 'caminho/para/imagem-placeholder.jpg'}
                                        alt={produto.name}
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                    />

                                    {/* Opções em Grid ao passar o mouse (Hover Overlay) */}
                                    <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>

                                        <button 
                                         type="button" 
                                         className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors' 
                                         title="Expandir">
                                            <FaExpand size={20} />
                                        </button>

                                        <button 
                                         type="button" 
                                         className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors' 
                                         title="Compartilhar">
                                            <FaShareAlt size={20} />
                                        </button>

                                    </div>

                                </div>

                                {/* Informações do Produto (Abaixo da Imagem) */}
                                <div className='p-3 flex flex-col'>

                                    <h3 className='font-semibold text-gray-900 truncate'>{produto.name}</h3>
                                    <p className='text-sm text-gray-600 truncate'>{produto.description}</p>
                                    <p className='mt-2 font-bold text-lg text-[#ba5511]'>{produto.price.toLocaleString()} kz</p>

                                </div>

                            </Link>

                        ))}

                    </motion.div>

                </div>

                {/* --- Outras Categorias --- */}
                <div className='w-full mt-8 flex-1'>
                    <Categories />
                </div>

            </div>

            <Footer />

        </AnimatePresence>

    );

}

export default Feminine;