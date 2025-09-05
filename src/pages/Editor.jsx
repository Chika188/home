import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAgreementStore from "../store/useAgreementStore";
import { saveToLocal, loadFromLocal, clearLocal } from "../utils/storage";

export default function Editor() {
  const nav = useNavigate();
  const { agreement, setAgreement, clearAgreement } = useAgreementStore();
  const [title, setTitle] = useState(agreement?.title || "");
  const [clauses, setClauses] = useState(agreement?.clauses || [""]);
  // 自动保存
  useEffect(() => {
    const data = { ...agreement, title, clauses };
    setAgreement(data);
    saveToLocal("agreement", data);
  }, [title, clauses]);

  useEffect(() => {
    if (!agreement) {
      const local = loadFromLocal("agreement");
      if (local) {
        setAgreement(local);
        setTitle(local.title || "");
        setClauses(local.clauses || [""]);
      }
    }
  }, []);

  const handleAdd = () => setClauses([...clauses, ""]);
  const handleRemove = (i) => setClauses(clauses.filter((_, idx) => idx !== i));
  const handleChange = (i, v) =>
    setClauses(clauses.map((c, idx) => (idx === i ? v : c)));

  const handleClear = () => {
    clearAgreement();
    clearLocal("agreement");
    setTitle("");
    setClauses([""]);
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-xl font-bold text-blue-500 mb-4">编辑协议内容</h2>
      <input
        className="w-full mb-4 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="协议标题（如：家务分工协议）"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mb-4">
        {clauses.map((c, i) => (
          <div key={i} className="flex items-center mb-2">
            <textarea
              className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={c}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder={`条款${i + 1}`}
              rows={2}
            />
            {clauses.length > 1 && (
              <button
                className="ml-2 text-red-400 hover:text-red-600"
                onClick={() => handleRemove(i)}
              >
                删除
              </button>
            )}
          </div>
        ))}
        <button
          className="mt-2 bg-blue-100 text-blue-500 px-3 py-1 rounded-lg hover:bg-blue-200 transition"
          onClick={handleAdd}
        >
          添加条款
        </button>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-orange-400 text-white px-6 py-2 rounded-xl shadow hover:bg-orange-500 active:scale-95 transition"
          onClick={() => nav("/signature")}
        >
          下一步：签名
        </button>
        <button
          className="bg-gray-200 text-gray-600 px-4 py-2 rounded-xl hover:bg-gray-300"
          onClick={handleClear}
        >
          清空内容
        </button>
      </div>
    </main>
  );
}