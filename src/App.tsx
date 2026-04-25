import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Home from "./pages/Home";
import Masculine from "./pages/Masculine";
import Feminine from "./pages/Feminine";
import Kitchen from "./pages/Kitchen";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Terms from "./pages/Terms";
import ProductsList from "./pages/Products/ProductsSelecionado";
import ProductDetail from "./pages/Products/ProductsSelecionado";

import SigIn from "./pages/Admin/SigIn";
import Login from "./pages/Admin/Login";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Clients from "./pages/Admin/Clients";
import AdminList from "./pages/Admin/listAdmin";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/moda-masculina-angolana" element={<Masculine />} />
      <Route path="/moda-feminina-angolana" element={<Feminine />} />
      <Route path="/utensilios-de-cozinha" element={<Kitchen />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/services" element={<Services />} />
      <Route path="/produtos" element={<ProductsList />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/termos-de-uso" element={<Terms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sig-in" element={<SigIn />} />

      {/* Rota dos parâmetros para os produtos, ao clicar em um produto, ele vai para os detalhes do mesmo */}
      <Route path="/produto/:id" element={<ProductDetail />} />

      {/* Rotas protegidas (Dashboard) */}
      <Route
        path="/painel"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="clients" element={<Clients />} />
        <Route path="list-admin" element={<AdminList />} />
      </Route>

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;