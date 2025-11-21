import { useEffect, useState } from "react";
import { getUserAdmins } from "../../services/api/userAdmin";
import type { userAdmin } from "../../services/types/userAdmin";

export default function AdminList() {
  const [admin, setAdmin] = useState<userAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getUserAdmins();
        setAdmin(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Carregando admin's...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de admin's</h2>

      {admin.length === 0 ? (
        <p>Nenhum admin encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {admin.map((admin) => (
            <li
              key={admin.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <p><strong>Nome:</strong> {admin.nome}</p>
              <p><strong>Email:</strong> {admin.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
