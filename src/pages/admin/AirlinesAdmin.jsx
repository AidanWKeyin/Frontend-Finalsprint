import { useEffect, useState } from "react";
import { airlinesApi } from "../../api/airlinesApi";

export default function AirlinesAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ code: "", name: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => airlinesApi.list().then(setItems);
  useEffect(() => { load().catch(e => setError(e.message)); }, []);

  const submit = async () => {
    setError("");
    try {
      if (editingId) await airlinesApi.update(editingId, form);
      else await airlinesApi.create(form);
      setForm({ code: "", name: "" });
      setEditingId(null);
      await load();
    } catch (e) { setError(extractApiError(e)); }
  };

  const edit = (a) => { setEditingId(a.id); setForm({ code: a.code, name: a.name }); };
  const remove = async (id) => { try { await airlinesApi.remove(id); await load(); } catch (e) { setError(extractApiError(e)); } };

  return (
    <div className="card">
      <h2>Airlines</h2>
      {error && <p style={{ color: "#a40000" }}>{error}</p>}

      <div className="row">
        <input placeholder="Code (AC)" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} />
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <button className="primary" onClick={submit}>{editingId ? "Update" : "Create"}</button>
        {editingId && <button onClick={() => { setEditingId(null); setForm({ code: "", name: "" }); }}>Cancel</button>}
      </div>

      <div className="spacer" />

      <table>
        <thead><tr><th>Code</th><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}>
              <td><strong>{a.code}</strong></td>
              <td>{a.name}</td>
              <td className="row">
                <button onClick={() => edit(a)}>Edit</button>
                <button className="danger" onClick={() => remove(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan="3" style={{ opacity: 0.7 }}>No airlines.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function extractApiError(e) {
  return e?.response?.data?.message || e?.response?.data?.error || (e?.response?.data?.errors?.[0]?.message) || e.message || "Request failed";
}
