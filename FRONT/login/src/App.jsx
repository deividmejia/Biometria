import { Formulario } from './components/Formulario';
import { Home } from './components/Home';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage cuando se monta la app
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Guardar usuario en localStorage cada vez que cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div className='App'>
      {user ? <Home user={user} /> : <Formulario setUser={setUser} />}
    </div>
  );
}

export default App;



