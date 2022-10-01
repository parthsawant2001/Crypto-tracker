// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import CoinsPage from "./Pages/CoinsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#00052e] overflow-x-hidden	 min-h-screen">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
