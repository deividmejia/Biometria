// Home.jsx
import React from "react";
import Sidebar from "./Sidebar";

export function Home({ user }) {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <h2>Bienvenido, {user.nombre}</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
        
        {/* Aquí puedes agregar más contenido según lo que seleccione el usuario */}
        <div className="dashboard-content">
          <h3>Contenido de Dashboard o Selección</h3>
          <p>Elige una opción del menú de la izquierda para mostrar contenido aquí.</p>
        </div>
      </div>
    </div>
  );
}






  
