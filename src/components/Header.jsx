import { Link, useLocation } from "react-router-dom";

const navs = [
  { to: "/", label: "首页" },
  { to: "/templates", label: "模板库" },
  { to: "/editor", label: "协议编辑" },
  { to: "/signature", label: "签名录入" },
  { to: "/preview", label: "预览导出" },
];

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-2">
        <span className="text-2xl font-bold text-blue-500">家庭协议生成器</span>
        <nav className="flex gap-2">
          {navs.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                pathname === n.to
                  ? "bg-orange-400 text-white shadow"
                  : "hover:bg-blue-100 text-blue-500"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}