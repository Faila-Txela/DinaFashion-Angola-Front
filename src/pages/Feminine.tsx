import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpand, FaShareAlt, FaRedo } from 'react-icons/fa'; 
import { MessageSquareWarningIcon, WifiOff } from 'lucide-react'
import Categories from '../components/Categories';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Bar from '../components/Bar';
import Skeleton from "../components/ui/skeleton";
import { toast } from "react-toastify";
import type { Products } from "../services/types/products";
import { productsService } from "../services/api/products/products";

function Feminine() {
    const [products, setProducts] = useState<Products[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<boolean>(false)

    const fetchProducts = async () => {
        try {
            setIsLoading(true)
            setError(false)
            const data = await productsService.getAll()
            setProducts(data)
        } catch (error) {
            console.error("Erro ao carregar produtos", error)
            setError(true)
            toast.error("Falha na conexão com o servidor")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <AnimatePresence>
            <Header />
            <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>

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
                        {isLoading ? (
                            // ESTADO 1: CARREGANDO (SKELETON)
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={`skeleton-${index}`} className="flex flex-col gap-3">
                                    <Skeleton className="h-72 w-full rounded-lg" />
                                    <div className="p-3 flex flex-col gap-2">
                                        <Skeleton className="h-5 w-3/4" />
                                        <Skeleton className="h-4 w-full" />
                                        <div className="flex items-center gap-2 mt-2">
                                            <Skeleton className="h-6 w-24" />
                                            <Skeleton className="h-5 w-12" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            // ESTADO 2: ERRO DE CONEXÃO / SERVIDOR
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <WifiOff className="w-12 h-12 text-gray-400 mb-4" />
                                <h2 className="text-xl font-semibold text-gray-800">Ops! Falha na conexão</h2>
                                <p className="text-gray-500 mb-6 max-w-xs">Não conseguimos conectar ao servidor. Verifique sua internet ou tente novamente.</p>
                                <button 
                                    type="button"
                                    onClick={fetchProducts}
                                    className="flex items-center gap-2 bg-black cursor-pointer text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all"
                                >
                                    <FaRedo size={14} /> Tentar novamente
                                </button>
                            </div>
                        ) : products.length === 0 ? (
                            // ESTADO 3: SUCESSO, MAS ARRAY VAZIO
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                <MessageSquareWarningIcon className="w-12 h-12 text-orange-400 mb-4" />
                                <h2 className="text-xl font-semibold text-gray-800">Nenhum produto encontrado</h2>
                                <p className="text-gray-500">Nenhum produto nesta categoria no momento.</p>
                            </div>
                        ) : (
                            // ESTADO 4: SUCESSO E COM DADOS
                            products.map((produto, index) => (
                                <Link 
                                    to={`/produto/${produto.id}`} 
                                    key={`${produto.id}-${index}`} 
                                    className="relative group w-full overflow-hidden bg-gray-50 rounded-lg hover:shadow-xl transition-shadow duration-300"
                                >

                                    <div className='relative overflow-hidden h-72 w-full'>
                                        <motion.img
                                            src={produto.imagens && produto.imagens.length > 0 ? produto.imagens[0].url : 'caminho/para/placeholder.jpg'}
                                            alt={produto.name}
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        />

                                        <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4'>
                                            <button title="2" type="button" className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors'>
                                                <FaExpand size={20} />
                                            </button>
                                            <button title="1" type="button" className='bg-white/80 p-3 rounded-full text-gray-800 hover:bg-white transition-colors'>
                                                <FaShareAlt size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className='p-3 flex flex-col'>
                                        <h3 className='font-semibold text-gray-900 truncate'>{produto.name}</h3>
                                        <p className='text-sm text-gray-600 truncate'>{produto.description}</p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <p className='font-bold text-lg text-[#ba5511]'>{produto.price.toLocaleString()} kz</p>
                                            <p className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${produto.active ? 'text-green-700' : 'text-red-700'}`}>{produto.active ? "activo" : "esgotado"}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </motion.div>
                </div>

                <div className='w-full mt-8 flex-1'>
                    <Categories />
                </div>
            </div>
            <Footer />
        </AnimatePresence>
    );
}
export default Feminine;