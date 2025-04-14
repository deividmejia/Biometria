export function Home({ user }) {
    const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.reload(); // o podés usar setUser(null) si lo pasás por props
    };
  
    return (
      <section>
        <h2>Bienvenido, {user.nombre}</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </section>
    );
  }
  
