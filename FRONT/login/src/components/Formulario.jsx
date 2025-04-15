// Formulario.jsx
import "./Formulario.css";
import { useState } from "react";

export function Formulario({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (nombre.trim() === "" || contraseña.trim() === "") {
      setError(true);
      return;
    }

    setError(false);
    setUser({ nombre });
    console.log("Inicio de sesión exitoso:", nombre);
  };

  return (
    <section className="login-container">
      <h1>User login</h1>

      <form className="formulario" onSubmit={manejarEnvio}>
        {error && <p className="error">Todos los campos son obligatorios</p>}

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </section>
  );
}






