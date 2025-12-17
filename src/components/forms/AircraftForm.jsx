export default function AircraftForm({ value, onChange, onSubmit, onCancel, editing }) {
  return (
    <div className="row">
      <input
        placeholder="Tail Number (C-FABC)"
        value={value.tailNumber || ""}
        onChange={(e) => onChange({ ...value, tailNumber: e.target.value })}
      />
      <input
        placeholder="Model (A320)"
        value={value.model || ""}
        onChange={(e) => onChange({ ...value, model: e.target.value })}
      />
      <input
        type="number"
        min="1"
        placeholder="Capacity"
        value={value.capacity ?? 1}
        onChange={(e) => onChange({ ...value, capacity: Number(e.target.value) })}
      />

      <button className="primary" onClick={onSubmit}>
        {editing ? "Update" : "Create"}
      </button>

      {editing && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
