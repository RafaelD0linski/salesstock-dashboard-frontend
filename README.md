# 💻 SalesStock Dashboard + API (.NET)

Projeto completo composto por **SalesStockAPI** (backend em .NET + PostgreSQL) e **SalesStock Dashboard** (frontend em React + TailwindCSS).  
O objetivo do sistema é gerenciar produtos, clientes e vendas de forma simples e visual, com dashboard dinâmico e API RESTful.

---

## 🧩 1️⃣ SalesStockAPI (.NET + PostgreSQL)

### 🚀 Tecnologias Utilizadas

- **.NET 8**
- **ASP.NET Core Web API**
- **Entity Framework Core**
- **PostgreSQL (via Docker)**
- **CORS (Cross-Origin Resource Sharing)**
- **Render / Docker** (para deploy)

### 🧱 Estrutura do Projeto

```
SalesStockAPI/
│
├── Domain/
│   └── Entities/
│       ├── Produto.cs
│       ├── Cliente.cs
│       └── Venda.cs
│
├── Infrastructure/
│   └── Data/
│       └── SalesStockDbContext.cs
│
├── Controllers/
│   ├── ProdutosController.cs
│   ├── ClientesController.cs
│   └── VendasController.cs
│
├── appsettings.json
└── Program.cs
```

### 🐳 Configuração do Banco via Docker

```bash
docker run --name salesstock_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_DB=salesstockdb -p 5432:5432 -d postgres:15
```

### ⚙️ String de Conexão

Arquivo **appsettings.json**:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=salesstockdb;Username=postgres;Password=123456"
}
```

### 🧰 Migrações do Banco

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### ▶️ Executando a API

```bash
dotnet run
```

API disponível em **http://localhost:5000**.

### 🌐 Rotas Principais

| Método | Rota      | Descrição      |
| ------ | --------- | -------------- |
| GET    | /produtos | Lista produtos |
| POST   | /produtos | Cria produto   |
| GET    | /clientes | Lista clientes |
| POST   | /clientes | Cria cliente   |
| GET    | /vendas   | Lista vendas   |
| POST   | /vendas   | Cria venda     |

### ☁️ Deploy

Hospedada em **Render**:

```
https://salesstockapi.onrender.com
```

---

## 💻 2️⃣ SalesStock Dashboard (React + TailwindCSS)

### 🚀 Tecnologias Utilizadas

- **React + Create React App**
- **Tailwind CSS**
- **Axios**
- **Recharts**
- **Lucide React (ícones)**
- **Framer Motion (animações)**
- **React Router DOM**

### ⚙️ Instalação

```bash
git clone https://github.com/RafaelD0linski/salesstock-dashboard-FrontEnd
cd salesstock-dashboard-FrontEnd
npm install
```

### 🔗 Configuração da API

Arquivo **src/api.js**:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ou sua URL hospedada
});

export default api;
```

### ▶️ Executando o Projeto

```bash
npm start
```

Rodará em **http://localhost:3000**.

### 📊 Funcionalidades

- Dashboard com estatísticas em tempo real
- Gráfico de vendas recentes (Recharts)
- CRUD de produtos, clientes e vendas
- Interface moderna e responsiva com TailwindCSS
- Animações com Framer Motion

### ☁️ Deploy

Frontend hospedado em **Vercel**  
Exemplo de URL:

```
https://salesstock-dashboard.vercel.app
```

### 🧠 Estrutura do Projeto

```
src/
├── api.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Produtos.jsx
│   ├── Clientes.jsx
│   └── Vendas.jsx
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   └── Card.jsx
└── App.js
```

### 📦 Scripts Disponíveis

| Comando         | Descrição                   |
| --------------- | --------------------------- |
| `npm start`     | Inicia o app no modo dev    |
| `npm run build` | Gera build de produção      |
| `npm test`      | Executa testes              |
| `npm run eject` | Remove configurações do CRA |

---

## 👨‍💻 Autor

Desenvolvido por **Rafael Dolinski**  
🔗 [GitHub](https://github.com/RafaelD0linski)
