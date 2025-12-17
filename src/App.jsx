import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar.jsx";
import PublicBoard from "./pages/PublicBoard.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import AirportsAdmin from "./pages/admin/AirportsAdmin.jsx";
import AirlinesAdmin from "./pages/admin/AirlinesAdmin.jsx";
import AircraftAdmin from "./pages/admin/AircraftAdmin.jsx";
import GatesAdmin from "./pages/admin/GatesAdmin.jsx";
import FlightsAdmin from "./pages/admin/FlightsAdmin.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<PublicBoard />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/airports" element={<AirportsAdmin />} />
          <Route path="/admin/airlines" element={<AirlinesAdmin />} />
          <Route path="/admin/aircraft" element={<AircraftAdmin />} />
          <Route path="/admin/gates" element={<GatesAdmin />} />
          <Route path="/admin/flights" element={<FlightsAdmin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
