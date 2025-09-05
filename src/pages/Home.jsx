import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 sm:px-0">
      <h1 className="text-3xl font-bold text-blue-500 mb-2">家庭协议生成器</h1>
      <p className="text-gray-500 mb-8 text-center">
        简约、现代、移动优先的家庭协议工具，支持协议编辑、签名、PDF导出，数据本地存储，保护你的隐私。
      </p>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 active:scale-95 transition"
          onClick={() => nav("/templates")}
        >
          使用模板
        </button>
        <button
          className="bg-orange-400 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-500 active:scale-95 transition"
          onClick={() => nav("/editor")}
        >
          从空白开始
        </button>
      </div>
    </main>
  );
}