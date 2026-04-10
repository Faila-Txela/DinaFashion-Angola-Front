import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import Carrousel from '../components/ui/carrousel'
import DarkButton from "../components/Chat"
import Categories from '../components/Categories'
import Cards from "../components/ui/Cards"
import Testimonials from "../components/Testimonials"
import News from "../components/Carrousel"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-10">

      <Header />
        <Carrousel />
        <Categories />
        <Cards />
        <News />
        <Testimonials />
       <DarkButton />
      <Footer />

    </div>

  )
}
