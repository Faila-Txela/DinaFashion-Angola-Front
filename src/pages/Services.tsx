import Header from "../components/Header";
import Categories from "./Categories";
import Footer from "../components/Footer";
import Sidebar from "../components/Chat";

function Services(){
    return(
    <div>
    <Header />

    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white/70">
      <h1 className="text-4xl font-bold mb-8">Nossos Serviços</h1>
      <Categories />
    </div>

    <Sidebar />

    <Footer />
    </div>
    )
}

export default Services