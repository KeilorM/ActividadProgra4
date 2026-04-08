import { useEffect, useState } from 'react';

function EntidadForm({ campos, seleccionado, createFn, updateFn, onSuccess, onCancel, titulo }) {
  const inicial = campos.reduce((acc, c) => ({ ...acc, [c.name]: '' }), {});
  const [form, setForm] = useState(inicial);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (seleccionado) {
      const valores = campos.reduce((acc, c) => ({
        ...acc,
        [c.name]: seleccionado[c.name] ?? '',
      }), {});
      setForm(valores);
    } else {
      setForm(inicial);
    }
  }, [seleccionado]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGuardando(true);
    setError(null);
    try {
      if (seleccionado?.id) {
        await updateFn(seleccionado.id, form);
      } else {
        await createFn(form);
      }
      onSuccess();
      setForm(inicial);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{seleccionado ? `Editar ${titulo}` : `Nuevo ${titulo}`}</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        {campos.map((campo) => (
          <div key={campo.name}>
            <label>
              {campo.label}:
              <input
                type={campo.type ?? 'text'}
                name={campo.name}
                value={form[campo.name]}
                onChange={handleChange}
                required={campo.required ?? true}
              />
            </label>
          </div>
        ))}
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : seleccionado ? 'Actualizar' : 'Crear'}
        </button>
        {seleccionado && (
          <button type="button" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
      </form>
    </div>
  );
}

export default EntidadForm;