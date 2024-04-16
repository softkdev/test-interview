import "./App.css";
import GlobalModal from "./components/container";
import NextProgress from "./components/next-progress";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <NextProgress />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <GlobalModal />
    </>
  );
}

export default App;
