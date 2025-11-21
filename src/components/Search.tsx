import { CiSearch } from "react-icons/ci";
import { motion } from "framer-motion";

export default function Search() {
  return (
    <div className="flex justify-center items-center mt-10">
        <motion.div
            whileTap={{ scale: 0.009 }}
            className="relative placeholder-gray-400 text-gray-600 focus-within:text-gray-400"
        >
            <input 
                type="text" 
                placeholder="Pesquise por produtos..." 
                className="border border-gray-300 rounded-full py-2 px-12 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CiSearch className="absolute cursor-pointer left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </motion.div>
    </div>
  )
}
