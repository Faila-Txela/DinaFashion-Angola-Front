import { useEffect, useState } from "react";
import { clientsService } from "../../services/api/clients/clients";
import { Loader2, Mail, Phone, User } from "lucide-react";

type Client = {
  id: string;
  nome: string;
  email?: string;
  telefone: string;
  pedido: string;
  interacoes: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await clientsService.getAll();
        setClients(response.data);  // Atualiza os dados da lista de clientes
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients(); 
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-start">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Carregando clientes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-600">Nenhum cliente encontrado.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4">Pedidos</th>
                <th className="py-3 px-4">Interações</th>
              </tr>
            </thead>

            <tbody className="text-gray-800">
              {clients.map(client => (
                <tr
                  key={client.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 gap-2">
                    <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {client.nome}
                    </div>
                  </td>

                  <td className="py-3 px-4 gap-2 text-gray-700">
                    <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {client.email}
                    </div>
                  </td>

                  <td className="py-3 px-4 gap-2 text-gray-700">
                    {client.telefone? (
                      <>
                    <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {client.telefone}
                    </div>
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="py-3 px-4 gap-2 text-gray-700">
                    {client.pedido ? (
                      <>
                      <div className="flex items-center gap-2">
                        {client.pedido}
                      </div>
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="py-3 px-4 gap-2 text-gray-700">
                    {client.interacoes ? (
                      <>
                      <div className="flex items-center gap-2">
                        {client.interacoes}
                      </div>
                      </>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}