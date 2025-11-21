import Header from "./components/Header"
import Carrousel from './components/carrousel'
import DarkButton from "./components/Chat"
import Categories from './pages/Categories'
import Cards from "./components/Cards"
import Testimonies from "./components/Testimonies"
import News from "./components/News"
import Footer from "./components/Footer"


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-10">

      <Header />
        <Carrousel />
        <Categories />
        <Cards />
        <News />
        <Testimonies />
       <DarkButton />
      <Footer />

    </div>

  )
}
