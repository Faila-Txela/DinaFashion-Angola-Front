import { useEffect, useState } from "react";
import axios from "../../services/lib/axios";
import { getClients } from "../../services/api/clients";
import { getProducts } from "../../services/api/products";
import { getUserAdmins } from "../../services/api/userAdmin";
import { getInterations } from "../../services/api/interation";
import type { Clients } from "../../services/types/clients";
import type { products } from "../../services/types/products";
import type { userAdmin } from "../../services/types/userAdmin";
import type { Interation, StatusType } from "../../services/types/interation";

export default function Dashboard() {
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<products[]>([]);
  const [admins, setAdmins] = useState<userAdmin[]>([]);
  const [interacoes, setInteracoes] = useState<Interation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clientsData, productsData, adminsData, interData] = await Promise.all([
          getClients(),
          getProducts(),
          getUserAdmins(),
          getInterations(),
        ]);
        setClients(clientsData);
        setProducts(productsData);
        setAdmins(adminsData);
        setInteracoes(interData);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleStatusChange = async (id: string, novoStatus: StatusType) => {
    await axios.put(`/api/interacao/:${id}`, { status: novoStatus });
    setInteracoes((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: novoStatus } : i))
    );
  };

  if (loading) return <p className="p-4">Carregando Dashboard...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard de Vendas e Clientes
      </h1>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <DashboardCard title="Clientes" value={clients.length} />
        <DashboardCard title="Produtos" value={products.length} />
        <DashboardCard title="Admins" value={admins.length} />
        <DashboardCard title="Interações" value={interacoes.length} />
      </div>

      {/* Tabela de Interações */}
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Interações Recentes</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Cliente</th>
              <th className="p-2">Produto</th>
              <th className="p-2">Status</th>
              <th className="p-2">Data</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {interacoes.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{i.cliente.nome}</td>
                <td className="p-2">{i.produto.name}</td>
                <td className="p-2">{i.status}</td>
                <td className="p-2">{new Date(i.dataInteration).toLocaleString()}</td>
                <td className="p-2">
                  <select
                    title="status"
                    value={i.status}
                    onChange={(e) => handleStatusChange(i.id, e.target.value as StatusType)}
                    className="border p-1 rounded"
                  >
                    <option value="NOVO_LEAD">Novo Lead</option>
                    <option value="VENDA_FEITA">Venda Feita</option>
                    <option value="PERDIDO">Perdido</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Subcomponente para os Cards */
type DashboardCardProps = { title: string; value: number };

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-green-600">{value}</h3>
    </div>
  );
}