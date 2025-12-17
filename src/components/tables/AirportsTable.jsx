export default function AirportsTable({ airports, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>City</th>
          <th>Timezone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {airports.map((a) => (
          <tr key={a.id}>
            <td><strong>{a.code}</strong></td>
            <td>{a.name}</td>
            <td>{a.city}</td>
            <td>{a.timezone}</td>
            <td className="row">
              <button onClick={() => onEdit(a)}>Edit</button>
              <button className="danger" onClick={() => onDelete(a.id)}>Delete</button>
            </td>
          </tr>
        ))}
        {airports.length === 0 && (
          <tr>
            <td colSpan="5" style={{ opacity: 0.7 }}>No airports.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
