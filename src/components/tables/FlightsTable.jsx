export default function FlightsTable({ flights }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Flight</th>
          <th>Airline</th>
          <th>Status</th>
          <th>Scheduled</th>
          <th>Estimated</th>
          <th>Gate</th>
          <th>Aircraft</th>
        </tr>
      </thead>
      <tbody>
        {flights.map(f => (
          <tr key={f.id}>
            <td><strong>{f.flightNumber}</strong></td>
            <td>{f.airlineCode}</td>
            <td><span className="badge">{f.status}</span></td>
            <td>{fmt(f.scheduledTime)}</td>
            <td>{f.estimatedTime ? fmt(f.estimatedTime) : "-"}</td>
            <td>{f.gateCode || "-"}</td>
            <td>{f.aircraftTailNumber || "-"}</td>
          </tr>
        ))}
        {flights.length === 0 && (
          <tr><td colSpan="7" style={{ opacity: 0.7 }}>No flights found.</td></tr>
        )}
      </tbody>
    </table>
  );
}

function fmt(iso) {
  // backend returns ISO LocalDateTime like "2025-12-17T14:30:00"
  return iso?.replace("T", " ") ?? "";
}
