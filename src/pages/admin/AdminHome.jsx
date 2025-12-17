export default function AdminHome() {
  return (
    <div className="card">
      <h2>Admin</h2>
      <p>Use the nav links to CRUD Airports, Airlines, Aircraft, Gates, and Flights.</p>
      <p style={{ opacity: 0.75 }}>
        Tip: Create Airports → Airlines → Aircraft → Gates → Flights (in that order).
      </p>
    </div>
  );
}
