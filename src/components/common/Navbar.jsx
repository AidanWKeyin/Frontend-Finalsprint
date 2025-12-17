import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const active = (p) => (pathname === p ? { textDecoration: "underline" } : null);

  return (
    <div className="nav">
      <Link to="/" style={active("/")}>Board</Link>
      <Link to="/admin" style={active("/admin")}>Admin</Link>
      <span style={{ opacity: 0.6 }}>•</span>
      <Link to="/admin/airports">Airports</Link>
      <Link to="/admin/airlines">Airlines</Link>
      <Link to="/admin/aircraft">Aircraft</Link>
      <Link to="/admin/gates">Gates</Link>
      <Link to="/admin/flights">Flights</Link>
    </div>
  );
}
