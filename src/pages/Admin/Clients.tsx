import { useEffect, useState } from "react";
import { getClients } from "../../services/api/clients";
import type { Clients } from "../../services/types/clients";

export default function ClientsList() {
  const [clients, setClients] = useState<Clients[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Carregando clientes...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Clientes</h2>

      {clients.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {clients.map((client) => (
            <li
              key={client.id}
              className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <p><strong>Nome:</strong> {client.nome}</p>
              <p><strong>Email:</strong> {client.email}</p>
              {client.phone && <p><strong>Telefone:</strong> {client.phone}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
