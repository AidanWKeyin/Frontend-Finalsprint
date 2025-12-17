export default function AirportForm({ value, onChange, onSubmit, onCancel, editing }) {
  return (
    <div className="row">
      <input
        placeholder="Code (YHZ)"
        value={value.code || ""}
        onChange={(e) => onChange({ ...value, code: e.target.value })}
      />
      <input
        placeholder="Name"
        value={value.name || ""}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />
      <input
        placeholder="City"
        value={value.city || ""}
        onChange={(e) => onChange({ ...value, city: e.target.value })}
      />
      <input
        placeholder="Timezone (America/Halifax)"
        value={value.timezone || ""}
        onChange={(e) => onChange({ ...value, timezone: e.target.value })}
      />

      <button className="primary" onClick={onSubmit}>
        {editing ? "Update" : "Create"}
      </button>

      {editing && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
