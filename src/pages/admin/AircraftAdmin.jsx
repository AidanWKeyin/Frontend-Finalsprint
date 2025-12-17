import { useEffect, useState } from "react";
import { aircraftApi } from "../../api/aircraftApi";
import AircraftForm from "../../components/forms/AircraftForm.jsx";

export default function AircraftAdmin() {
  const empty = { tailNumber: "", model: "", capacity: 1 };

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => setItems(await aircraftApi.list());

  useEffect(() => {
    load().catch((e) => setError(extractApiError(e)));
  }, []);

  const submit = async () => {
    setError("");
    try {
      const payload = { ...form, capacity: Number(form.capacity) };
      if (editingId) await aircraftApi.update(editingId, payload);
      else await aircraftApi.create(payload);
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  const edit = (a) => {
    setEditingId(a.id);
    setForm({ tailNumber: a.tailNumber, model: a.model, capacity: a.capacity });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(empty);
  };

  const remove = async (id) => {
    setError("");
    try {
      await aircraftApi.remove(id);
      await load();
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  return (
    <div className="card">
      <h2>Aircraft</h2>
      {error && <p style={{ color: "#a40000" }}>{error}</p>}

      <AircraftForm
        value={form}
        onChange={setForm}
        onSubmit={submit}
        onCancel={cancel}
        editing={Boolean(editingId)}
      />

      <div className="spacer" />

      <table>
        <thead>
          <tr>
            <th>Tail</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.id}>
              <td><strong>{a.tailNumber}</strong></td>
              <td>{a.model}</td>
              <td>{a.capacity}</td>
              <td className="row">
                <button onClick={() => edit(a)}>Edit</button>
                <button className="danger" onClick={() => remove(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" style={{ opacity: 0.7 }}>No aircraft.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function extractApiError(e) {
  return (
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.response?.data?.errors?.[0]?.message ||
    e.message ||
    "Request failed"
  );
}
