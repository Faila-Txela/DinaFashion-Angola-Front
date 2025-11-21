// Bar.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Bar() {
    const [priceRange, setPriceRange] = useState(50); // Estado para o preço

    return (
        <AnimatePresence>
            {/* Sidebar (use w-1/4 ou um valor fixo responsivo como w-64/w-80) */}
            <motion.nav
                className='w-64 md:w-72 bg-white p-6 shadow-xl h-auto'
                // Classes de layout para fixar/mover a sidebar podem depender de como você a quer exibir em mobile
                // Mude a classe fixa para relativa/estática para ela ocupar espaço no layout principal
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-3xl text-gray-800 border-b pb-2'>
                      Filtros
                    </h2>

                    {/* --- Filtro de Tamanhos --- */}
                    <div>
                        <h3 className='font-semibold text-lg mb-3'>Tamanhos</h3>
                        <div className='flex flex-wrap gap-2'>
                          {/* Standars sizes (XS, S, M, L, XL, XXL) */}
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button
                                    type='button'
                                    key={size}
                                    className='px-3 py-1 cursor-pointer border border-gray-300 rounded-full text-sm hover:bg-black hover:text-white transition duration-200'
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- Filtro de Cores --- */}
                    <div>
                        <h3 className='font-semibold text-lg mb-3'>Cores</h3>
                        <div className='flex flex-wrap gap-2'>
                            {['red', 'blue', 'black', 'white', 'green', 'yellow'].map(color => (
                                <div
                                    key={color}
                                    className={`w-6 h-6 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-500`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* --- Filtro de Preço (Progress Bar/Range) --- */}
                    <div>
                        <h3 className='font-semibold text-lg mb-3'>Preço</h3>
                        <input
                            title='range'
                            type="range"
                            min="0"
                            max="100"
                            value={priceRange}
                            onChange={(e: any) => setPriceRange(e.target.value)}
                            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
                        />
                        <p className='text-sm mt-2 text-gray-600'>
                            Até {priceRange}.000kz
                        </p>
                    </div>

                </div>
            </motion.nav>
        </AnimatePresence>
    );
}

export default Bar;