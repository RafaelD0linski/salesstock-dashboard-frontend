import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Trash2 } from "lucide-react";

export default function Vendas() {
  const [vendas, setVendas] = useState([]);
  const [novaVenda, setNovaVenda] = useState({
    cliente: "",
    produto: "",
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
    if (!novaVenda.cliente || !novaVenda.produto || !novaVenda.quantidade) {
      return alert("Preencha todos os campos!");
    }

    try {
      await api.post("/vendas", {
        cliente: novaVenda.cliente,
        produto: novaVenda.produto,
        quantidade: Number(novaVenda.quantidade),
      });

      setNovaVenda({ cliente: "", produto: "", quantidade: 1 });
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

      {/* FORM */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Cliente"
          value={novaVenda.cliente}
          onChange={(e) =>
            setNovaVenda({ ...novaVenda, cliente: e.target.value })
          }
          className="border rounded p-2 flex-1"
        />

        <input
          type="text"
          placeholder="Produto"
          value={novaVenda.produto}
          onChange={(e) =>
            setNovaVenda({ ...novaVenda, produto: e.target.value })
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

      {/* LISTA DE VENDAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendas.map((v) => (
          <motion.div
            key={v.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h2 className="text-lg font-semibold">Venda #{v.id}</h2>
              <p className="text-gray-500">Cliente: {v.cliente}</p>
              <p className="text-gray-500">Produto: {v.produto}</p>
              <p className="text-gray-500">Qtd: {v.quantidade}</p>

              <p className="text-gray-700 font-semibold mt-1">
                Total: R$ {v.valorTotal?.toFixed(2)}
              </p>

              <p className="text-gray-400 text-sm">
                Data: {new Date(v.dataVenda).toLocaleString()}
              </p>
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
