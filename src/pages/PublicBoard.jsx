import { useEffect, useMemo, useState } from "react";
import { airportsApi } from "../api/airportsApi";
import { flightsApi } from "../api/flightsApi";
import AirportSelector from "../components/common/AirportSelector";
import FlightsTable from "../components/tables/FlightsTable";

export default function PublicBoard() {
  const [airports, setAirports] = useState([]);
  const [airportId, setAirportId] = useState(null);
  const [tab, setTab] = useState("ARRIVAL");
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState("");

  const airportSelected = useMemo(() => airports.find(a => String(a.id) === String(airportId)), [airports, airportId]);

  useEffect(() => {
    airportsApi.list()
      .then(data => {
        setAirports(data);
        if (data.length && !airportId) setAirportId(String(data[0].id));
      })
      .catch(e => setError(e?.message || "Failed to load airports"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setError("");
    if (!airportId) return;
    flightsApi.list({ airportId, type: tab })
      .then(setFlights)
      .catch(e => setError(e?.message || "Failed to load flights"));
  }, [airportId, tab]);

  return (
    <div className="card">
      <h2>Arrivals & Departures</h2>

      {error && <p style={{ color: "#a40000" }}>{error}</p>}

      <AirportSelector airports={airports} airportId={airportId} setAirportId={setAirportId} />

      <div className="spacer" />

      <div className="row">
        <button className={tab === "ARRIVAL" ? "primary" : ""} onClick={() => setTab("ARRIVAL")}>
          Arrivals
        </button>
        <button className={tab === "DEPARTURE" ? "primary" : ""} onClick={() => setTab("DEPARTURE")}>
          Departures
        </button>
        <span style={{ opacity: 0.7 }}>
          {airportSelected ? `Showing ${tab.toLowerCase()} for ${airportSelected.code}` : "Select an airport"}
        </span>
      </div>

      <div className="spacer" />

      <FlightsTable flights={flights} />
    </div>
  );
}
