import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Editor from "./pages/Editor";
import Signature from "./pages/Signature";
import Preview from "./pages/Preview";
import TabBar from "./components/TabBar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 font-sans pb-16">
        <header className="py-4 text-center bg-white shadow-sm sticky top-0 z-10">
          <span className="text-2xl font-bold text-blue-500">家庭协议生成器</span>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
        <TabBar />
      </div>
    </BrowserRouter>
  );
}
export default App;