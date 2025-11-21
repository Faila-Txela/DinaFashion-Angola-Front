import { Outlet } from "react-router-dom";
import Sidebar from '../components/Sidebar'
import {
  LayoutDashboard,
  User,
  LogOut,
  ShoppingCart
} from "lucide-react";


function MainLayout() {

  const links = [
    { label: "Dashboard", href: "/painel/dashboard", icon: <LayoutDashboard /> },
    { label: "Produtos", href: "/painel/products", icon: <ShoppingCart /> },
    { label: "Clientes", href: "/painel/clients", icon: <User /> },
    { label: "Admin", href: "/painel/list-admin", icon: <User /> },
    { label: "Sair", href: "/", icon: <LogOut /> },
  ];

    const user = {
    name: "Albertina Sauimbo",
    role: "Admin",
    avatar: "https://www.istockphoto.com/vector/young-smiling-woman-ann-avatar-3d-vector-people-character-illustration-cartoon-gm1371904269-441148739?searchscope=image%2Cfilm",
  };

  return (    
  <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar links={links} user={user} />

      {/* Conteúdo principal */}
      <main className="flex-1 ml-12 py-8 px-8 overflow-y-auto">
        <div className=" bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default MainLayout