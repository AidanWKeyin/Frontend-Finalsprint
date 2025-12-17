const FLIGHT_TYPES = ["ARRIVAL", "DEPARTURE"];
const FLIGHT_STATUSES = ["SCHEDULED", "BOARDING", "DEPARTED", "LANDED", "DELAYED", "CANCELLED"];

export default function FlightForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  editing,
  airports,
  airlines,
  aircraft,
  gates,
  selectedAirportId,
}) {
  return (
    <>
      <div className="row">
        <input
          placeholder="Flight Number (AC123)"
          value={value.flightNumber || ""}
          onChange={(e) => onChange({ ...value, flightNumber: e.target.value })}
        />

        <select value={value.type || "ARRIVAL"} onChange={(e) => onChange({ ...value, type: e.target.value })}>
          {FLIGHT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select value={value.status || "SCHEDULED"} onChange={(e) => onChange({ ...value, status: e.target.value })}>
          {FLIGHT_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={value.airportId || selectedAirportId || ""}
          onChange={(e) => onChange({ ...value, airportId: e.target.value })}
        >
          <option value="">-- airport --</option>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.code} — {a.city}
            </option>
          ))}
        </select>

        <select value={value.airlineId || ""} onChange={(e) => onChange({ ...value, airlineId: e.target.value })}>
          <option value="">-- airline --</option>
          {airlines.map((a) => (
            <option key={a.id} value={a.id}>
              {a.code} — {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row">
        <select value={value.gateId || ""} onChange={(e) => onChange({ ...value, gateId: e.target.value })}>
          <option value="">No gate</option>
          {gates.map((g) => (
            <option key={g.id} value={g.id}>
              {g.gateCode} ({g.terminal})
            </option>
          ))}
        </select>

        <select value={value.aircraftId || ""} onChange={(e) => onChange({ ...value, aircraftId: e.target.value })}>
          <option value="">No aircraft</option>
          {aircraft.map((a) => (
            <option key={a.id} value={a.id}>
              {a.tailNumber} — {a.model}
            </option>
          ))}
        </select>

        <input
          style={{ minWidth: 260 }}
          placeholder="Scheduled (ISO) 2025-12-17T14:30:00"
          value={value.scheduledTime || ""}
          onChange={(e) => onChange({ ...value, scheduledTime: e.target.value })}
        />

        <input
          style={{ minWidth: 260 }}
          placeholder="Estimated (ISO) optional"
          value={value.estimatedTime || ""}
          onChange={(e) => onChange({ ...value, estimatedTime: e.target.value })}
        />
      </div>

      <div className="row">
        <button className="primary" onClick={onSubmit}>
          {editing ? "Update" : "Create"}
        </button>
        {editing && <button onClick={onCancel}>Cancel</button>}
        <span style={{ opacity: 0.7 }}>
          Times must be ISO like <code>2025-12-17T14:30:00</code>
        </span>
      </div>
    </>
  );
}
