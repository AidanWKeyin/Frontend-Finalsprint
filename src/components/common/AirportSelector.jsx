export default function AirportSelector({ airports, airportId, setAirportId }) {
  return (
    <div className="row">
      <label><strong>Airport:</strong></label>
      <select value={airportId || ""} onChange={(e) => setAirportId(e.target.value || null)}>
        <option value="">-- select --</option>
        {airports.map(a => (
          <option key={a.id} value={a.id}>
            {a.code} — {a.city}
          </option>
        ))}
      </select>
    </div>
  );
}
