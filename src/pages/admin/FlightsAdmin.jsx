import { useEffect, useState } from "react";
import { flightsApi } from "../../api/flightsApi";
import { airportsApi } from "../../api/airportsApi";
import { airlinesApi } from "../../api/airlinesApi";
import { aircraftApi } from "../../api/aircraftApi";
import { gatesApi } from "../../api/gatesApi";
import FlightForm from "../../components/forms/FlightForm.jsx";

export default function FlightsAdmin() {
  const empty = {
    flightNumber: "",
    type: "ARRIVAL",
    status: "SCHEDULED",
    scheduledTime: "",
    estimatedTime: "",
    airportId: "",
    airlineId: "",
    aircraftId: "",
    gateId: "",
  };

  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [gates, setGates] = useState([]);

  const [airportId, setAirportId] = useState("");
  const [items, setItems] = useState([]);

  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadLookups = async () => {
    const [ap, al, ac] = await Promise.all([
      airportsApi.list(),
      airlinesApi.list(),
      aircraftApi.list(),
    ]);

    setAirports(ap);
    setAirlines(al);
    setAircraft(ac);

    const defaultAirport = ap.length ? String(ap[0].id) : "";
    const defaultAirline = al.length ? String(al[0].id) : "";

    setAirportId(defaultAirport);
    setForm((f) => ({
      ...f,
      airportId: f.airportId || defaultAirport,
      airlineId: f.airlineId || defaultAirline,
    }));
  };

  const loadGatesForAirport = async (aid) => {
    if (!aid) { setGates([]); return; }
    setGates(await gatesApi.list(aid));
  };

  const loadFlightsForAirport = async (aid) => {
    if (!aid) { setItems([]); return; }
    setItems(await flightsApi.list({ airportId: aid }));
  };

  useEffect(() => {
    (async () => {
      try {
        await loadLookups();
      } catch (e) {
        setError(extractApiError(e));
      }
    })();
  }, []);

  useEffect(() => {
    if (!airportId) return;
    setError("");
    loadGatesForAirport(airportId).catch((e) => setError(extractApiError(e)));
    loadFlightsForAirport(airportId).catch((e) => setError(extractApiError(e)));
    setForm((f) => ({ ...f, airportId })); // keep form aligned with selected filter
  }, [airportId]);

  const submit = async () => {
    setError("");
    try {
      const payload = {
        flightNumber: form.flightNumber,
        type: form.type,
        status: form.status,
        scheduledTime: form.scheduledTime,
        estimatedTime: form.estimatedTime || null,
        airportId: Number(form.airportId || airportId),
        airlineId: Number(form.airlineId),
        aircraftId: form.aircraftId ? Number(form.aircraftId) : null,
        gateId: form.gateId ? Number(form.gateId) : null,
      };

      if (!payload.flightNumber) throw new Error("flightNumber is required");
      if (!payload.scheduledTime) throw new Error("scheduledTime is required (ISO like 2025-12-17T14:30:00)");
      if (!payload.airportId) throw new Error("airportId is required");
      if (!payload.airlineId) throw new Error("airlineId is required");

      if (editingId) await flightsApi.update(editingId, payload);
      else await flightsApi.create(payload);

      setEditingId(null);
      setForm((f) => ({
        ...empty,
        airportId: f.airportId || airportId,
        airlineId: f.airlineId || "",
      }));

      await loadFlightsForAirport(airportId);
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  const edit = async (f) => {
    setEditingId(f.id);
    const aid = String(f.airportId);
    setAirportId(aid);
    await loadGatesForAirport(aid);

    setForm({
      flightNumber: f.flightNumber,
      type: f.type,
      status: f.status,
      scheduledTime: f.scheduledTime,
      estimatedTime: f.estimatedTime || "",
      airportId: String(f.airportId),
      airlineId: String(f.airlineId),
      aircraftId: f.aircraftId ? String(f.aircraftId) : "",
      gateId: f.gateId ? String(f.gateId) : "",
    });
  };

  const cancel = () => {
    setEditingId(null);
    setForm((f) => ({ ...empty, airportId: f.airportId || airportId, airlineId: f.airlineId || "" }));
  };

  const remove = async (id) => {
    setError("");
    try {
      await flightsApi.remove(id);
      await loadFlightsForAirport(airportId);
    } catch (e) {
      setError(extractApiError(e));
    }
  };

  return (
    <div className="card">
      <h2>Flights</h2>
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

      <FlightForm
        value={form}
        onChange={setForm}
        onSubmit={submit}
        onCancel={cancel}
        editing={Boolean(editingId)}
        airports={airports}
        airlines={airlines}
        aircraft={aircraft}
        gates={gates}
        selectedAirportId={airportId}
      />

      <div className="spacer" />

      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Type</th>
            <th>Status</th>
            <th>Scheduled</th>
            <th>Estimated</th>
            <th>Airline</th>
            <th>Gate</th>
            <th>Aircraft</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((f) => (
            <tr key={f.id}>
              <td><strong>{f.flightNumber}</strong></td>
              <td>{f.type}</td>
              <td><span className="badge">{f.status}</span></td>
              <td>{fmt(f.scheduledTime)}</td>
              <td>{f.estimatedTime ? fmt(f.estimatedTime) : "-"}</td>
              <td>{f.airlineCode}</td>
              <td>{f.gateCode || "-"}</td>
              <td>{f.aircraftTailNumber || "-"}</td>
              <td className="row">
                <button onClick={() => edit(f)}>Edit</button>
                <button className="danger" onClick={() => remove(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="9" style={{ opacity: 0.7 }}>No flights.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function fmt(iso) {
  return iso?.replace("T", " ") ?? "";
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
