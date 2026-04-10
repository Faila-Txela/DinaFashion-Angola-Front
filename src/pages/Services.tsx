import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Categories from "../components/Categories";
import Sidebar from "../components/Chat";

function Services(){
    return(
    <div>
    <Header />

    <div className="min-h-screen flex flex-col items-center justify-center mt-10 px-6 bg-white/70">
      <Categories />
    </div>

    <Sidebar />

    <Footer />
    </div>
    )
}

export default Services