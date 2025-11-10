import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [novaVenda, setNovaVenda] = useState({
    clienteId: "",
    produtoId: "",
    quantidade: 1,
  });

  useEffect(() => {
    buscarVendas();
  }, []);

  async function buscarVendas() {
    try {
      const response = await api.get("/vendas");
      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
    }
  }

  async function adicionarVenda() {
    try {
      await api.post("/vendas", novaVenda);
      setNovaVenda({ clienteId: "", produtoId: "", quantidade: 1 });
      buscarVendas();
    } catch (error) {
      console.error("Erro ao adicionar venda:", error);
    }
  }

  async function excluirVenda(id) {
    if (window.confirm("Deseja excluir esta venda?")) {
      try {
        await api.delete(`/vendas/${id}`);
        buscarVendas();
      } catch (error) {
        console.error("Erro ao excluir venda:", error);
      }
    }
  }

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="w-7 h-7 text-blue-600" /> Vendas
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Cliente ID"
          value={novaVenda.clienteId}
          onChange={(e) =>
            setNovaVenda({ ...novaVenda, clienteId: e.target.value })
          }
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Produto ID"
          value={novaVenda.produtoId}
          onChange={(e) =>
            setNovaVenda({ ...novaVenda, produtoId: e.target.value })
          }
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Qtd"
          value={novaVenda.quantidade}
          onChange={(e) =>
            setNovaVenda({ ...novaVenda, quantidade: e.target.value })
          }
          className="border rounded p-2 w-20"
        />
        <button
          onClick={adicionarVenda}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} /> Adicionar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendas.map((v) => (
          <motion.div
            key={v.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h2 className="text-lg font-semibold">Venda #{v.id}</h2>
              <p className="text-gray-500">Cliente: {v.clienteId}</p>
              <p className="text-gray-500">Produto: {v.produtoId}</p>
              <p className="text-gray-500">Qtd: {v.quantidade}</p>
            </div>
            <button
              onClick={() => excluirVenda(v.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
