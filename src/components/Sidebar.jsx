import { Home, Package, Users, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/", icon: <Home size={20} />, label: "Dashboard" },
    { to: "/produtos", icon: <Package size={20} />, label: "Produtos" },
    { to: "/clientes", icon: <Users size={20} />, label: "Clientes" },
    { to: "/vendas", icon: <BarChart3 size={20} />, label: "Vendas" },
  ];

  return (
    <aside className="bg-slate-900 text-white w-64 min-h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 text-center">SalesStock</h1>
      <nav className="space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md transition ${
                isActive ? "bg-slate-700" : "hover:bg-slate-800"
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
