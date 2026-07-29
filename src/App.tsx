import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Trabajos from "./pages/Trabajos";
import Contacto from "./pages/Contacto";
import TrabajoDetalle from "./pages/TrabajoDetalle";
import Nosotras from "./pages/Nosotras";
import CraftLab from "./pages/CraftLab";
import LabDetalle from "./pages/LabDetalle";
import Sumate from "./pages/Sumate";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/trabajos" element={<Trabajos />} />
        <Route path="/nosotras" element={<Nosotras />} />
        <Route path="/craft-lab" element={<CraftLab />} />
        <Route path="/craft-lab/:slug" element={<LabDetalle />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sumate" element={<Sumate />} />
        <Route path="/trabajos/:slug" element={<TrabajoDetalle />} />
      </Route>
    </Routes>
  );
}
