export default function AirlineForm({ value, onChange, onSubmit, onCancel, editing }) {
  return (
    <div className="row">
      <input
        placeholder="Code (AC)"
        value={value.code || ""}
        onChange={(e) => onChange({ ...value, code: e.target.value })}
      />
      <input
        placeholder="Name"
        value={value.name || ""}
        onChange={(e) => onChange({ ...value, name: e.target.value })}
      />

      <button className="primary" onClick={onSubmit}>
        {editing ? "Update" : "Create"}
      </button>

      {editing && <button onClick={onCancel}>Cancel</button>}
    </div>
  );
}
