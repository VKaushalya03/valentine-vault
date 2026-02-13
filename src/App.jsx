// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateVault from "./pages/CreateVault";
import ViewVault from "./pages/ViewVault";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateVault />} />
        {/* This is the magic link: domain.com/v/some-unique-id */}
        <Route path="/v/:id" element={<ViewVault />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
