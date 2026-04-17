import { useNavigate } from "react-router"
import { ShoppingCart } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import Button from "./ui/Button"

export default function ShopBanner() {

  const navigate = useNavigate()

  const ProductsLink = () =>{
    navigate("/moda-feminina-angolana")
  }

  return (
    <AnimatePresence>

      <div className="flex justify-center items-center max-w-fit  mx-auto bg-white/80 p-10 rounded-lg border border-dashed border-[#782143]">

        <div className="flex items-center gap-6">
          <div className="flex items-center flex-col gap-4">
            <motion.h4
            initial= {{y: 20}} 
            animate={{
              y: 0,
              transition: {duration: .3}}} 
              className="text-2xl font-medium"
              >
                Comece já as suas compras!
            </motion.h4>

            <motion.div
            initial= {{y: 20}} 
            animate={{
              y: 0,
              transition: {duration: .5}}} 
            >
              <Button 
               name="Produtos"
               type="button"
               title="ProductsLink"
               onClick={ProductsLink} 
               addClassName="font-medium bg-black/80 py-2 px-16 rounded-lg cursor-pointer text-white hover:bg-black/70 transition-all duration-300 text-xl"
               />
            </motion.div>
          </div>

          <motion.div
           initial= {{x: [0, 8 ,0]}} 
           animate={{
            x: 8,
            transition: {
              repeat: Infinity,
              duration: .8,
              ease: "linear",
              repeatType: "reverse"
            },
          }}
          >
           <ShoppingCart className="transform translate-x-0 -rotate-10 bg-[#782143] text-white p-1 rounded-b-xl" size={50} />
          </motion.div>

        </div>
      </div>

      {/*Estou pensando em colocar o Pointer como fixed, neste componente, tornando-o em um link e estilizá-lo melhor <Pointer />*/}
      
    </AnimatePresence>
  )
}