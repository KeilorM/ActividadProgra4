import { useEffect, useState } from 'react';

function EntidadList({ onEdit, getFn, deleteFn, columnas, titulo }) {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  async function cargar() {
    try {
      setCargando(true);
      setError(null);
      const data = await getFn();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => { cargar(); }, []);

  async function handleDelete(id) {
    if (!confirm(`¿Seguro que deseas eliminar este registro?`)) return;
    try {
      await deleteFn(id);
      await cargar();
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  }

  if (cargando) return <p>Cargando {titulo}...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de {titulo}</h2>
      {items.length === 0 ? (
        <p>No hay {titulo} registrados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>Id</th>
              {columnas.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {columnas.map((col) => (
                  <td key={col.key}>{item[col.key]}</td>
                ))}
                <td>
                  <button onClick={() => onEdit(item)}>Editar</button>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={cargar}>Recargar</button>
    </div>
  );
}

export default EntidadList;