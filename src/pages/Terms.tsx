import { AnimatePresence } from "framer-motion"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Chat from "../components/Chat"

function Terms() {
  return (

    <AnimatePresence>
     <Header />

      <div className="bg-gray-100 min-h-screen flex flex-col py-26 px-6">
        <h1 className="font-semibold text-2xl">Termos de Uso do Website</h1>
      </div>

     <Chat />
     <Footer /> 
    </AnimatePresence>
  )
}
export default Terms