import { useState } from 'react';
import EntidadForm from './components/EntidadForm';
import EntidadList from './components/EntidadList';
import Inicio from './components/Inicio';

import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from './api/usuarios';
import { getProductos, createProducto, updateProducto, deleteProducto } from './api/productos';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from './api/proveedores';
import { getClientes, createCliente, updateCliente, deleteCliente } from './api/clientes';

const MODULOS = {
  usuarios: {
    titulo: 'usuario',
    getFn: getUsuarios,
    createFn: createUsuario,
    updateFn: updateUsuario,
    deleteFn: deleteUsuario,
    campos: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'correo', label: 'Correo', type: 'email' },
    ],
    columnas: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'correo', label: 'Correo' },
    ],
  },
  productos: {
    titulo: 'producto',
    getFn: getProductos,
    createFn: createProducto,
    updateFn: updateProducto,
    deleteFn: deleteProducto,
    campos: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'precio', label: 'Precio', type: 'number' },
    ],
    columnas: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'precio', label: 'Precio' },
    ],
  },
  proveedores: {
    titulo: 'proveedor',
    getFn: getProveedores,
    createFn: createProveedor,
    updateFn: updateProveedor,
    deleteFn: deleteProveedor,
    campos: [
      { name: 'nombre', label: 'Nombre' },
      { name: 'correo', label: 'Correo', type: 'email' },
    ],
    columnas: [
      { key: 'nombre', label: 'Nombre' },
      { key: 'correo', label: 'Correo' },
    ],
  },
  clientes: {
    titulo: 'cliente',
    getFn: getClientes,
    createFn: createCliente,
    updateFn: updateCliente,
    deleteFn: deleteCliente,
    campos: [
      { name: 'nombre',    label: 'Nombre' },
      { name: 'apellido',  label: 'Apellido' },
      { name: 'correo',    label: 'Correo', type: 'email' },
      { name: 'telefono',  label: 'Teléfono', type: 'tel' },
      { name: 'direccion', label: 'Dirección' },
    ],
    columnas: [
      { key: 'nombre',    label: 'Nombre' },
      { key: 'apellido',  label: 'Apellido' },
      { key: 'correo',    label: 'Correo' },
      { key: 'telefono',  label: 'Teléfono' },
      { key: 'direccion', label: 'Dirección' },
    ],
  },
};

function ModuloTab({ modulo }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [recargar, setRecargar] = useState(0);
  const cfg = MODULOS[modulo];

  function handleSuccess() {
    setSeleccionado(null);
    setRecargar((p) => p + 1);
  }

  return (
    <>
      <EntidadForm
        titulo={cfg.titulo}
        campos={cfg.campos}
        seleccionado={seleccionado}
        createFn={cfg.createFn}
        updateFn={cfg.updateFn}
        onSuccess={handleSuccess}
        onCancel={() => setSeleccionado(null)}
      />
      <EntidadList
        key={recargar}
        titulo={cfg.titulo + 's'}
        columnas={cfg.columnas}
        getFn={cfg.getFn}
        deleteFn={cfg.deleteFn}
        onEdit={setSeleccionado}
      />
    </>
  );
}

const PESTANAS = ['inicio', 'usuarios', 'productos', 'proveedores', 'clientes'];

function App() {
  const [pestana, setPestana] = useState('inicio');

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Gestión (React + Express)</h1>

      <nav style={{ marginBottom: '1rem' }}>
        {PESTANAS.map((p) => (
          <button
            key={p}
            onClick={() => setPestana(p)}
            style={{
              marginRight: '0.5rem',
              fontWeight: pestana === p ? 'bold' : 'normal',
              textDecoration: pestana === p ? 'underline' : 'none',
            }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>

      {pestana === 'inicio'
        ? <Inicio />
        : <ModuloTab key={pestana} modulo={pestana} />
      }
    </div>
  );
}

export default App;