import { Outlet } from "react-router-dom";
import AdminSidebarContainer from "../components/AdminSidebar/AdminSidebar";

function MainLayout() {
  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <AdminSidebarContainer />

      {/* Conteúdo principal */}
      <main className="flex-1 ml-0 py-8 px-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;