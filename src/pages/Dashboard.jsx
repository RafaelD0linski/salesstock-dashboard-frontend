import { useEffect, useState } from "react";
import api from "../api";
import Card from "../components/Card";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f97316",
  "#ef4444",
  "#3b82f6",
  "#14b8a6",
];

export default function Dashboard() {
  const [stats, setStats] = useState({ produtos: 0, clientes: 0, vendas: 0 });
  const [chartData, setChartData] = useState([]);

  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  // Carrega os dados ao iniciar
  useEffect(() => {
    fetchData();
  }, []);

  // Buscar dados totais
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
      name: v.produto,
      value: v.valorTotal,
    }));

    setChartData(data);
  }

  // Buscar vendas filtradas
  async function buscarFiltrado() {
    if (!inicio || !fim) {
      alert("Selecione as duas datas!");
      return;
    }

    try {
      const response = await api.get("/vendas/por-periodo", {
        params: { inicio, fim },
      });

      const data = response.data.map((v) => ({
        name: v.produtoNome,
        value: v.valorTotal,
      }));

      setChartData(data);
    } catch (error) {
      console.error("Erro ao filtrar:", error);
      alert("Erro ao buscar dados filtrados.");
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Produtos" value={stats.produtos} />
        <Card title="Clientes" value={stats.clientes} />
        <Card title="Vendas" value={stats.vendas} />
      </div>

      {/* FILTRO POR PERÍODO */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-4">Filtrar por período</h2>

        <div className="flex gap-4 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Data inicial:</label>
            <input
              type="date"
              className="border rounded p-2"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium">Data final:</label>
            <input
              type="date"
              className="border rounded p-2"
              value={fim}
              onChange={(e) => setFim(e.target.value)}
            />
          </div>

          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded self-end"
            onClick={buscarFiltrado}
          >
            Filtrar
          </button>
        </div>

        {/* GRÁFICO EM PIZZA */}
        <h2 className="text-lg font-semibold mb-4">Vendas por Produto</h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
