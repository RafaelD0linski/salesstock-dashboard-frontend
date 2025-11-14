import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";
import { User, Plus, Trash2 } from "lucide-react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    endereco: "",
  });

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  async function adicionarCliente() {
    if (
      !novoCliente.nome ||
      !novoCliente.email ||
      !novoCliente.telefone ||
      !novoCliente.cpf ||
      !novoCliente.endereco
    )
      return alert("Preencha todos os campos!");

    try {
      await api.post("/clientes", novoCliente);
      setNovoCliente({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        endereco: "",
      });
      buscarClientes();
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  }

  async function excluirCliente(id) {
    if (window.confirm("Deseja excluir este cliente?")) {
      try {
        await api.delete(`/clientes/${id}`);
        buscarClientes();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
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
        <User className="w-7 h-7 text-green-600" /> Clientes
      </h1>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
        <input
          type="text"
          placeholder="Nome"
          value={novoCliente.nome}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, nome: e.target.value })
          }
          className="border rounded p-2 w-full"
        />

        <input
          type="email"
          placeholder="Email"
          value={novoCliente.email}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, email: e.target.value })
          }
          className="border rounded p-2 w-full"
        />

        <input
          type="text"
          placeholder="Telefone"
          value={novoCliente.telefone}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, telefone: e.target.value })
          }
          className="border rounded p-2 w-full"
        />

        <input
          type="text"
          placeholder="CPF"
          value={novoCliente.cpf}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, cpf: e.target.value })
          }
          className="border rounded p-2 w-full"
        />

        <input
          type="text"
          placeholder="Endereço"
          value={novoCliente.endereco}
          onChange={(e) =>
            setNovoCliente({ ...novoCliente, endereco: e.target.value })
          }
          className="border rounded p-2 w-full"
        />

        <button
          onClick={adicionarCliente}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 col-span-1"
        >
          <Plus size={18} /> Adicionar
        </button>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clientes.map((c) => (
          <motion.div
            key={c.id}
            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h2 className="text-lg font-semibold">{c.nome}</h2>
              <p className="text-gray-500">{c.email}</p>
              <p className="text-gray-500">{c.telefone}</p>
              <p className="text-gray-500">{c.cpf}</p>
              <p className="text-gray-500">{c.endereco}</p>
            </div>

            <button
              onClick={() => excluirCliente(c.id)}
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
