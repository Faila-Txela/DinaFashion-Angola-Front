import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdWhatsapp } from 'react-icons/md';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Categories from '../Categories';

// DADOS DE EXEMPLO
const ProdutoDetalhado = {
    id: 1,
    nome: "Vestido Floral Luxo de Verão",
    descricaoCompleta: "Este é um elegante vestido floral, perfeito para um dia de verão ou um evento casual. Feito com tecido de algodão premium, oferece conforto inigualável e um caimento perfeito. Disponível em diversos tamanhos e cores vibrantes. É a peça essencial para o seu guarda-roupa.",
    preco: "25.000",
    emStock: true,
    imagens: [
        "https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg", // Principal
        "https://cdn.pixabay.com/photo/2017/01/14/10/03/fashion-1979136_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/07/16/06/dress-2605928_1280.jpg",
    ],
    whatsappLink: "https://wa.link/zqqw40", 

    // DADOS DE VARIAÇÕES E ESTOQUE
    variacoes: [
        { id: 'v1', cor: 'Azul Floral', hex: '#3B82F6', tamanho: 'S', stock: 5 },
        { id: 'v2', cor: 'Azul Floral', hex: '#3B82F6', tamanho: 'M', stock: 3 },
        { id: 'v3', cor: 'Azul Floral', hex: '#3B82F6', tamanho: 'XL', stock: 0 },
        { id: 'v4', cor: 'Vermelho Sólido', hex: '#DC2626', tamanho: 'M', stock: 12 },
        { id: 'v5', cor: 'Vermelho Sólido', hex: '#DC2626', tamanho: 'XL', stock: 8 },
        { id: 'v6', cor: 'Amarelo Padrão', hex: '#FACC15', tamanho: 'S', stock: 1 },
        { id: 'v7', cor: 'Amarelo Padrão', hex: '#FACC15', tamanho: 'M', stock: 6 },
    ],
    // Cores e Tamanhos Únicos para renderização dos botões
    coresDisponiveis: [
        { nome: 'Azul Floral', hex: '#3B82F6' },
        { nome: 'Vermelho Sólido', hex: '#DC2626' },
        { nome: 'Amarelo Padrão', hex: '#FACC15' },
    ],
    tamanhosDisponiveis: ['S', 'M', 'XL'],
};


function ProductDetail() {
    const [mainImage, setMainImage] = useState(ProdutoDetalhado.imagens[0]);
    const [selectedColor, setSelectedColor] = useState(ProdutoDetalhado.coresDisponiveis[0].nome);
    const [selectedSize, setSelectedSize] = useState(ProdutoDetalhado.tamanhosDisponiveis[0]);

    // Função para encontrar a variação atualmente selecionada e seu estoque
    const variation = ProdutoDetalhado.variacoes.find(v => 
        v.cor === selectedColor && v.tamanho === selectedSize
    );
    
    // Função para verificar se um tamanho específico está disponível para a cor atual
    const isSizeAvailable = (size: any) => {
        return ProdutoDetalhado.variacoes.some(v => 
            v.cor === selectedColor && v.tamanho === size && v.stock > 0
        );
    };

    const handleColorChange = (colorName: any) => {
        setSelectedColor(colorName);

        // Lógica de fallback de tamanho (
        if (!isSizeAvailable(selectedSize)) {
             // Define o primeiro tamanho disponível para a nova cor, ou string vazia se nenhum
            setSelectedSize(ProdutoDetalhado.tamanhosDisponiveis.find(size => isSizeAvailable(size)) || ''); 
        }
    };

    // Função para a galeria de miniaturas
    const handleThumbnailClick = (img: any) => {
        setMainImage(img);
    };

    return (
        <AnimatePresence>
            <Header />
            <div className='flex flex-col min-h-screen bg-white p-4 gap-8 pt-28'>
                
                {/* --- Container Principal de Detalhes --- */}
                <div className='flex flex-col md:flex-row gap-8 w-full min-h-90 mt-10'>
                    
                    {/* --- Lateral Esquerda: Galeria de Imagens e Imagem Principal --- */}
                    <div className='flex flex-col md:flex-row md:w-3/5 gap-4 w-full'>
                        
                        {/* Outras Imagens (Thumbnails) */}
                        <div className='flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-20 w-full'>
                            {ProdutoDetalhado.imagens.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Visualização ${index + 1}`}
                                    className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border-1 ${img === mainImage ? 'border-gray-900' : 'border-transparent'} hover:border-gray-500 transition-colors duration-200`}
                                    onClick={() => handleThumbnailClick(img)} 
                                />
                            ))}
                        </div>

                        {/* Imagem em Visualização Grande */}
                        <motion.div 
                            className='flex-1 w-full overflow-hidden'
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img 
                                src={mainImage}
                                alt={ProdutoDetalhado.nome}
                                className='w-full h-full object-cover max-h-[600px]'
                            />
                        </motion.div>
                    </div>

                    {/* Lateral Direita: Informações Detalhadas */}
                    <motion.div
                        className='flex flex-col w-full md:w-2/5 p-4 md:p-6'
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {/* Nome e Preço */}
                        <h1 className='font-extrabold text-4xl text-gray-900 mb-2'>{ProdutoDetalhado.nome}</h1>
                        <p className='text-4xl font-light text-[#ba5511] mb-6'>{ProdutoDetalhado.preco} kz</p>
                        
                        {/* --- Seleção de Cores --- */}
                        <div className='mb-6'>
                            <h3 className='font-semibold text-lg mb-2'>Cor: <span className='font-normal text-gray-700'>{selectedColor}</span></h3>
                            <div className='flex gap-3'>
                                {ProdutoDetalhado.coresDisponiveis.map((color) => (
                                    <div
                                        key={color.nome}
                                        onClick={() => handleColorChange(color.nome)} 
                                        className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === color.nome ? 'ring-4 ring-offset-2 ring-gray-900' : 'hover:ring-2 hover:ring-gray-400'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.nome}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* --- Seleção de Tamanhos --- */}
                        <div className='mb-6'>
                            <h3 className='font-semibold text-lg mb-2'>Tamanho: <span className='font-normal text-gray-700'>{selectedSize}</span></h3>
                            <div className='flex gap-3'>
                                
                                {ProdutoDetalhado.tamanhosDisponiveis.map((size) => {
                                    const available = isSizeAvailable(size);
                                    
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => available && setSelectedSize(size)}
                                            className={`
                                                px-4 py-2 border rounded-md font-medium transition-all duration-200
                                                ${selectedSize === size 
                                                    ? 'bg-gray-900 text-white border-gray-900' 
                                                    : available 
                                                        ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100' 
                                                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                                }
                                            `}
                                            disabled={!available}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* --- Estoque da Variação --- */}
                        <div className='mb-8'>
                            <h3 className='font-semibold text-lg mb-2'>Disponibilidade:</h3>
                            <span className={`px-3 py-1 text-sm font-bold rounded-full transition-colors duration-300
                                ${!variation || variation.stock === 0
                                    ? 'bg-red-100 text-red-700'
                                    : variation.stock <= 5
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-green-100 text-green-700'
                                }
                            `}>
                                {!variation 
                                    ? 'Selecione as opções' 
                                    : variation.stock === 0 
                                        ? '❌ Esgotado' 
                                        : variation.stock <= 5 
                                            ? `⚠️ Últimas ${variation.stock} unidades!` 
                                            : `✅ ${variation.stock} unidades em stock`
                                }
                            </span>
                        </div>
                        
                        {/* Descrição Detalhada */}
                        <h2 className='font-semibold text-xl border-b pb-2 mb-3'>Descrição</h2>
                        <p className='text-gray-700 leading-relaxed mb-8'>{ProdutoDetalhado.descricaoCompleta}</p>
                        
                        {/* Botão de WhatsApp */}
                        <a 
                            href={ProdutoDetalhado.whatsappLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold p-4 rounded-lg flex items-center justify-center gap-3 transition duration-300 shadow-md hover:shadow-lg'
                        >
                            <MdWhatsapp size={24}/>
                            Pedir no WhatsApp
                        </a>

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

export default ProductDetail;