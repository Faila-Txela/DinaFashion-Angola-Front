// About.jsx

import { motion, AnimatePresence, type Variants } from 'framer-motion' // Importe 'Variants' aqui
import Header from '../components/Header'
import Footer from '../components/Footer'
import Chat from '../components/Chat'

function About() {
  
  // Tipagem explícita para as variantes
  const sectionVariants: Variants = { // Adicione ': Variants' aqui
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        staggerChildren: 0.3 
      } 
    },
  };

  const itemVariants: Variants = { // E aqui também
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <AnimatePresence>
      <Header />

      <div className='bg-gray-50 min-h-screen flex flex-col items-center justify-start pt-32 pb-16 lg:pt-32 lg:pb-24'>

        <motion.section 
          className='w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center px-8 lg:px-16 gap-12'
          variants={sectionVariants} // Aqui está usando sectionVariants
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants} // E aqui itemVariants
            className='flex flex-col max-w-lg gap-4 order-2 lg:order-1'
          > 
            <h1 className='text-4xl font-extrabold text-[#ba5511]'>Sobre Nossa Loja</h1>
            
            <p className='text-gray-800 text-lg'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius soluta dignissimos tenetur beatae quisquam eveniet voluptatem odit nobis molestias itaque, sunt quos non consectetur, minima, repellendus accusamus officia! Eveniet, eaque.
            </p>
            <p className='text-gray-700 text-lg'>
              Acreditamos que o sucesso duradouro reside na construção de relacionamentos sólidos e transparentes. Por isso, valorizamos cada interação, ouvindo atentamente as necessidades de nossa comunidade e adaptando nossas ofertas para superar as expectativas.
            </p>
            <p className='text-gray-800 text-lg'>
              Estamos dedicados a ser um farol de inspiração em nosso setor, cultivando um ambiente de trabalho que incentiva o crescimento, a criatividade e a paixão. Queremos deixar um legado de valor, tanto para nossos colaboradores quanto para o mercado global.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants} // E novamente itemVariants
            className='w-full max-w-lg order-1 lg:order-2'
          >
            <img 
              src="https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_1280.jpg" 
              alt="Uma equipe trabalhando em um ambiente moderno"
              className='w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl ring-4 ring-white ring-opacity-60 transform hover:scale-[1.01] transition-transform duration-300'
            />
          </motion.div>
        </motion.section>

        <motion.div
          className='w-full max-w-4xl my-16 flex justify-center relative' 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className='w-full h-px bg-gray-300'></div> 
          
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='w-6 h-6 rounded-full bg-[#ab4e10] border-4 border-gray-50 shadow-md'>
            </div>
          </div>
        </motion.div>

        <motion.section
          className='w-full max-w-3xl px-8 lg:px-16 text-center mt-8' 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className='text-3xl font-bold mb-6 text-[#ba5511]'>Nossa Missão</h2>
          
          <div className='space-y-4'> 
            <p className='text-gray-800 text-lg'>
              Nossa missão é impulsionar a inovação e fornecer soluções de alta qualidade que transformem positivamente a vida de nossos clientes. Buscamos constantemente a excelência em nossos produtos e serviços, mantendo um compromisso inabalável com a ética e a sustentabilidade.
            </p>
            <p className='text-gray-700 text-lg'>
              Acreditamos que o sucesso duradouro reside na construção de relacionamentos sólidos e transparentes. Por isso, valorizamos cada interação, ouvindo atentamente as necessidades de nossa comunidade e adaptando nossas ofertas para superar as expectativas.
            </p>
            <p className='text-gray-800 text-lg'>
              Estamos dedicados a ser um farol de inspiração em nosso setor, cultivando um ambiente de trabalho que incentiva o crescimento, a criatividade e a paixão. Queremos deixar um legado de valor, tanto para nossos colaboradores quanto para o mercado global.
            </p>
          </div>
        </motion.section>
        
      </div>
      
      <Chat />
      <Footer />
    </AnimatePresence>
  )
}

export default About