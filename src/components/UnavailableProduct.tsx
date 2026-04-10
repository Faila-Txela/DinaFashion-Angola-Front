import { AnimatePresence, motion } from 'framer-motion'

function UnavailableProduct() {
  return (
    <AnimatePresence>
      <motion.div className='animate-ping'>
        Produto indisponível, aguardando preenchimento em stock
      </motion.div>
    </AnimatePresence>
  )
}

export default UnavailableProduct