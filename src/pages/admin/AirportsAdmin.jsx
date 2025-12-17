import { useEffect, useState } from "react";
import { airportsApi } from "../../api/airportsApi";
import AirportForm from "../../components/forms/AirportForm.jsx";
import AirportsTable from "../../components/tables/AirportsTable.jsx";

export default function AirportsAdmin() {
  const empty = { code: "", name: "", city: "", timezone: "" };

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => setItems(await airportsApi.list());

  useEffect(() => {
    load().catch((e) => setError(extractApiError(e)));
  }, []);

  const submit = async () => {
    setError("");
    try {
      if (editingId) await airportsApi.update(editingId, form);
      else await airportsApi.create(form);
      setForm(empty);
      setEditingId(null);
      await load();
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  const edit = (a) => {
    setEditingId(a.id);
    setForm({ code: a.code, name: a.name, city: a.city, timezone: a.timezone });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(empty);
  };

  const remove = async (id) => {
    setError("");
    try {
      await airportsApi.remove(id);
      await load();
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  return (
    <div className="card">
      <h2>Airports</h2>
      {error && <p style={{ color: "#a40000" }}>{error}</p>}

      <AirportForm
        value={form}
        onChange={setForm}
        onSubmit={submit}
        onCancel={cancel}
        editing={Boolean(editingId)}
      />

      <div className="spacer" />

      <AirportsTable airports={items} onEdit={edit} onDelete={remove} />
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
