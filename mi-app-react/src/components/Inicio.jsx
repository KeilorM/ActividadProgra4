function Inicio() {
  const autor = import.meta.env.VITE_AUTOR;

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Sistema de gestión desarrollado por: <strong>{autor}</strong></p>
    </div>
  );
}

export default Inicio;