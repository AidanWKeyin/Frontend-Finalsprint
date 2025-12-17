export default function GateForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  editing,
  airports,
  defaultAirportId,
}) {
  return (
    <div className="row">
      <input
        placeholder="Gate Code (A12)"
        value={value.gateCode || ""}
        onChange={(e) => onChange({ ...value, gateCode: e.target.value })}
      />
      <input
        placeholder="Terminal (T1)"
        value={value.terminal || ""}
        onChange={(e) => onChange({ ...value, terminal: e.target.value })}
      />

      <select
        value={value.airportId || ""}
        onChange={(e) => onChange({ ...value, airportId: e.target.value })}
      >
        <option value="">{defaultAirportId ? "Use selected airport" : "-- choose airport --"}</option>
        {airports.map((a) => (
          <option key={a.id} value={a.id}>
            {a.code} — {a.city}
          </option>
        ))}
      </select>

      <button className="primary" onClick={onSubmit}>
        {editing ? "Update" : "Create"}
      </button>

      {editing && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
