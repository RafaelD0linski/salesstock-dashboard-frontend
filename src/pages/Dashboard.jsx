import { useEffect, useState } from "react";
import { api } from "../api";
import Card from "../components/Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ produtos: 0, clientes: 0, vendas: 0 });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [produtos, clientes, vendas] = await Promise.all([
        api.get("/produtos"),
        api.get("/clientes"),
        api.get("/vendas"),
      ]);

      setStats({
        produtos: produtos.data.length,
        clientes: clientes.data.length,
        vendas: vendas.data.length,
      });

      const data = vendas.data.map((v) => ({
        name: v.produtoNome,
        valor: v.valorTotal,
      }));
      setChartData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Produtos" value={stats.produtos} />
        <Card title="Clientes" value={stats.clientes} />
        <Card title="Vendas" value={stats.vendas} />
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Vendas Recentes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
