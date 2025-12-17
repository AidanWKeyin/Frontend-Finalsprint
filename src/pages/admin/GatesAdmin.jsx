import { useEffect, useState } from "react";
import { gatesApi } from "../../api/gatesApi";
import { airportsApi } from "../../api/airportsApi";
import GateForm from "../../components/forms/GateForm.jsx";

export default function GatesAdmin() {
  const empty = { gateCode: "", terminal: "", airportId: "" };

  const [airports, setAirports] = useState([]);
  const [airportId, setAirportId] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadAirports = async () => {
    const ap = await airportsApi.list();
    setAirports(ap);
    if (ap.length) setAirportId(String(ap[0].id));
  };

  const load = async (aid) => {
    const data = await gatesApi.list(aid || null);
    setItems(data);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadAirports();
      } catch (e) {
        setError(extractApiError(e));
      }
    })();
  }, []);

  useEffect(() => {
    if (!airportId) return;
    load(airportId).catch((e) => setError(extractApiError(e)));
  }, [airportId]);

  const submit = async () => {
    setError("");
    try {
      const payload = {
        gateCode: form.gateCode,
        terminal: form.terminal,
        airportId: Number(form.airportId || airportId),
      };
      if (editingId) await gatesApi.update(editingId, payload);
      else await gatesApi.create(payload);

      setForm(empty);
      setEditingId(null);
      await load(airportId);
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  const edit = (g) => {
    setEditingId(g.id);
    setForm({ gateCode: g.gateCode, terminal: g.terminal, airportId: String(g.airportId) });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(empty);
  };

  const remove = async (id) => {
    setError("");
    try {
      await gatesApi.remove(id);
      await load(airportId);
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  return (
    <div className="card">
      <h2>Gates</h2>
      {error && <p style={{ color: "#a40000" }}>{error}</p>}

      <div className="row">
        <label><strong>Filter airport:</strong></label>
        <select value={airportId} onChange={(e) => setAirportId(e.target.value)}>
          {airports.map((a) => (
            <option key={a.id} value={a.id}>
              {a.code} — {a.city}
            </option>
          ))}
        </select>
      </div>

      <div className="spacer" />

      <GateForm
        value={form}
        onChange={setForm}
        onSubmit={submit}
        onCancel={cancel}
        editing={Boolean(editingId)}
        airports={airports}
        defaultAirportId={airportId}
      />

      <div className="spacer" />

      <table>
        <thead>
          <tr>
            <th>Gate</th>
            <th>Terminal</th>
            <th>Airport</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((g) => (
            <tr key={g.id}>
              <td><strong>{g.gateCode}</strong></td>
              <td>{g.terminal}</td>
              <td>{g.airportCode}</td>
              <td className="row">
                <button onClick={() => edit(g)}>Edit</button>
                <button className="danger" onClick={() => remove(g.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="4" style={{ opacity: 0.7 }}>No gates.</td>
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
