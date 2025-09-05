import { useNavigate } from "react-router-dom";
import useAgreementStore from "../store/useAgreementStore";
import { saveToLocal } from "../utils/storage";

const templates = [
  {
    title: "家务分工协议",
    clauses: [
      "双方约定家务分工，明确责任区域。",
      "每周轮流打扫公共区域。",
      "如有特殊情况可协商调整。",
    ],
  },
  {
    title: "零花钱约定",
    clauses: [
      "每月固定发放零花钱。",
      "零花钱使用自主，但需合理规划。",
      "如有特殊需求可提前沟通。",
    ],
  },
  {
    title: "学习计划协议",
    clauses: [
      "每日完成作业后可自由安排娱乐时间。",
      "每周末复盘学习进度。",
      "遇到困难及时寻求帮助。",
    ],
  },
  {
    title: "电子产品使用协议",
    clauses: [
      "每日使用电子产品不超过2小时。",
      "学习期间不得玩游戏。",
      "合理安排休息，保护视力。",
    ],
  },
  {
    title: "家庭聚会约定",
    clauses: [
      "每月组织一次家庭聚会。",
      "聚会内容由全家共同商议决定。",
      "鼓励积极参与，增进感情。",
    ],
  },
];

export default function Templates() {
  const nav = useNavigate();
  const setAgreement = useAgreementStore((s) => s.setAgreement);

  const handleSelect = (tpl) => {
    const agreement = {
      title: tpl.title,
      clauses: tpl.clauses,
      parties: [{ name: "" }, { name: "" }],
      signatures: [null, null],
      date: "",
    };
    setAgreement(agreement);
    saveToLocal("agreement", agreement);
    nav("/editor");
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-xl font-bold text-blue-500 mb-4">选择协议模板</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((tpl, i) => (
          <div
            key={tpl.title}
            className="bg-white rounded-xl shadow p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
            onClick={() => handleSelect(tpl)}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{tpl.title}</h3>
            <ul className="text-gray-600 text-sm mb-4 list-disc pl-5">
              {tpl.clauses.map((c, j) => (
                <li key={j}>{c}</li>
              ))}
            </ul>
            <button className="self-end bg-orange-400 text-white px-4 py-1 rounded-lg hover:bg-orange-500 transition">
              选择
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}