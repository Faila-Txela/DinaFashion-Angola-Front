// src/components/AdminSidebar/AdminSidebar.tsx
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { adminService } from "../../services/api/userAdmins/userAdmin";
import {
  LayoutDashboard,
  User,
  LogOut,
  ShoppingCart
} from "lucide-react";

type Admin = {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
};

export default function AdminSidebarContainer() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedAdmin = sessionStorage.getItem("currentAdmin");
  if (storedAdmin) {
    setAdmins([JSON.parse(storedAdmin)]);
    setLoading(false);
    return;
  }

  const fetchAdmins = async () => {
    try {
      const res = await adminService.getAll();
      setAdmins(res.data);

      if (res.data && res.data[0]) {
        sessionStorage.setItem("currentAdmin", JSON.stringify(res.data[0]));
      }
    } catch (error) {
      console.error("Erro ao carregar admins:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAdmins();
}, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando painel do admin...</p>
      </div>
    );
  }

  const currentAdmin = admins[0];

  if (!currentAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Nenhum admin encontrado.</p>
      </div>
    );
  }

  const user = {
    name: currentAdmin.nome,
    role: currentAdmin.email,
    avatar:
      currentAdmin.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        currentAdmin.nome
      )}&background=ba5511&color=fff`,
  };

  const links = [
    { label: "Dashboard", href: "/painel/dashboard", icon: <LayoutDashboard /> },
    { label: "Produtos", href: "/painel/products", icon: <ShoppingCart /> },
    { label: "Clientes", href: "/painel/clients", icon: <User /> },
    { label: "Admin", href: "/painel/list-admin", icon: <User /> },
    { label: "Sair", href: "/", icon: <LogOut /> },
  ];

  return <Sidebar links={links} user={user} />;
}