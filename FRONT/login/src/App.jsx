import { Formulario } from './components/Formulario';
import { Home } from './components/Home';
import { useState, useEffect } from 'react';
import './App.css';

/**
 * Componente raíz de la aplicación.
 * Muestra el formulario de login si no hay usuario, o el dashboard si el usuario ya inició sesión.
 */
function App() {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Guardar el usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className='App'>
      {/* Si hay usuario, mostrar Home, si no, mostrar Formulario */}
      {user ? <Home user={user} /> : <Formulario setUser={setUser} />}
    </div>
  );
}

export default App;





