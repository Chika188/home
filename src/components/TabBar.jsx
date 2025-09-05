import { Link, useLocation } from "react-router-dom";

const tabs = [
  { to: "/", label: "首页", icon: "🏠" },
  { to: "/templates", label: "模板库", icon: "📄" },
];

export default function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-20 flex justify-around sm:max-w-md sm:mx-auto">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`flex flex-col items-center flex-1 py-2 text-xs font-medium transition ${
            pathname === tab.to
              ? "text-blue-500"
              : "text-gray-400 hover:text-blue-400"
          }`}
        >
          <span className="text-lg">{tab.icon}</span>
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}