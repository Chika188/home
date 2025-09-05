import useAgreementStore from "../store/useAgreementStore";
import { exportToPDF } from "../utils/pdf";
import { useNavigate } from "react-router-dom";
import { clearLocal } from "../utils/storage";

export default function Preview() {
  const { agreement, clearAgreement } = useAgreementStore();
  const nav = useNavigate();


  const handleExport = async () => {
    await exportToPDF("pdf-content");
    clearAgreement();
    clearLocal("agreement");
    // 可选：弹窗提示或跳转首页
    setTimeout(() => {
      alert("导出成功，已清除缓存！");
      nav("/");
    }, 500);
  };

  if (!agreement) {
    return (
      <main className="max-w-2xl mx-auto py-8 px-4">
        <p className="text-gray-500">暂无协议内容，请先编辑协议。</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => nav("/editor")}
        >
          去编辑
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-xl font-bold text-blue-500 mb-4 justify-center">协议预览</h2>
      <div
        id="pdf-content"
        className="bg-white rounded-xl shadow p-6 mb-6"
        style={{ minHeight: 400 }}
      >
        <h3 className="text-lg font-semibold text-blue-600 mb-2 text-center">
          {agreement.title}
        </h3>
        <ol className="text-gray-700 mb-4 list-decimal pl-5">
          {agreement.clauses?.map((c, i) => (
            <li key={i} className="mb-2">{c}</li>
          ))}
        </ol>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
          {[0, 1].map((idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-gray-600 text-sm mb-1">
                签署方{idx + 1}：{agreement.parties?.[idx]?.name || "——"}
              </span>
              {agreement.signatures?.[idx] ? (
                <img
                  src={agreement.signatures[idx]}
                  alt="签名"
                  className="w-32 h-12 object-contain border-b"
                />
              ) : (
                <span className="text-gray-400">未签名</span>
              )}
            </div>
          ))}
        </div>
        <div className="text-right text-gray-500 mt-4">
          日期：{agreement.date || "——"}
        </div>
      </div>
      <button
        className="bg-orange-400 text-white px-6 py-2 rounded-xl shadow hover:bg-orange-500 active:scale-95 transition justify-center"
        onClick={handleExport}
      >
        导出为 PDF
      </button>
    </main>
  );
}