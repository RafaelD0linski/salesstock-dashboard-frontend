import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { Package, Plus, Trash2 } from "lucide-react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "" });

  // Carrega produtos
  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  async function adicionarProduto() {
    if (!novoProduto.nome || !novoProduto.preco)
      return alert("Preencha todos os campos!");
    try {
      await api.post("/produtos", novoProduto);
      setNovoProduto({ nome: "", preco: "" });
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }

  async function excluirProduto(id) {
    if (window.confirm("Deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        buscarProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
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
        <Package className="w-7 h-7 text-indigo-600" /> Produtos
      </h1>

      {/* Formulário */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto.nome}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome: e.target.value })
          }
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, preco: e.target.value })
          }
          className="border rounded p-2 w-32"
        />
        <button
          onClick={adicionarProduto}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-indigo-700"
        >
          <Plus size={18} /> Adicionar
        </button>
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map((p) => (
          <motion.div
            key={p.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h2 className="text-lg font-semibold">{p.nome}</h2>
              <p className="text-gray-500">R$ {p.preco.toFixed(2)}</p>
            </div>
            <button
              onClick={() => excluirProduto(p.id)}
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
