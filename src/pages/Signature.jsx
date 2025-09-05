
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAgreementStore from "../store/useAgreementStore";
import { saveToLocal } from "../utils/storage";
import SignaturePad from "../components/SignaturePad";

export default function Signature() {
  const nav = useNavigate();
  const { agreement, setAgreement } = useAgreementStore();
  const [names, setNames] = useState(
    agreement?.parties?.map((p) => p.name) || ["", ""]
  );
  const [date, setDate] = useState(agreement?.date || "");
  const [signatures, setSignatures] = useState(agreement?.signatures || [null, null]);
  const [error, setError] = useState("");
  const sigPadRefs = [useRef(), useRef()];

  const validate = () => {
    if (!names[0] || !names[1]) return "请填写双方姓名";
    if (!signatures[0] || !signatures[1]) return "请完成双方签名";
    if (!date) return "请选择签署日期";
    return "";
  };

  const handleSave = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const data = {
      ...agreement,
      parties: [{ name: names[0] }, { name: names[1] }],
      date,
      signatures,
    };
    setAgreement(data);
    saveToLocal("agreement", data);
    nav("/preview");
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 mb-20">
      <h2 className="text-xl font-bold text-blue-500 mb-4 text-center">签名录入</h2>
      <div className="mb-4 grid gap-4">
        {[0, 1].map((idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="mb-2 flex items-center gap-2 w-full justify-center">
              <span className="text-blue-500 font-semibold">签署方{idx + 1}姓名：</span>
              <input
                className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200 max-w-xs text-center"
                value={names[idx]}
                onChange={(e) =>
                  setNames(names.map((n, i) => (i === idx ? e.target.value : n)))
                }
                placeholder="请输入姓名"
              />
            </div>
            <SignaturePad
              ref={sigPadRefs[idx]}
              value={signatures[idx]}
              onEnd={(dataUrl) =>
                setSignatures(signatures.map((s, i) => (i === idx ? dataUrl : s)))
              }
            />
          </div>
        ))}
        <div className="flex items-center gap-2 justify-center">
          <span className="text-blue-500 font-semibold">签署日期：</span>
          <input
            type="date"
            className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-200 max-w-xs text-center"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      {error && (
        <div className="text-center text-red-500 mb-2">{error}</div>
      )}
      <div className="flex justify-center">
        <button
          className="bg-orange-400 text-white px-8 py-2 rounded-xl shadow hover:bg-orange-500 active:scale-95 transition w-full max-w-xs text-center"
          onClick={handleSave}
        >
          下一步：预览导出
        </button>
      </div>
    </main>
  );
}