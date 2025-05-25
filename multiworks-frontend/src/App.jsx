import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Empleados from './pages/Empleados';
import Clientes from './pages/Clientes';
import Proyectos from './pages/Proyectos';

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();

  // Ocultar el menú si estamos en la página de login
  const mostrarMenu = location.pathname !== '/';

  return (
    <div>
     {mostrarMenu && (
        <>
          <h1 className="text-3xl font-bold text-center mt-4">Multi-Works Group</h1>
          <nav className="mt-4 mb-8 text-center">
            <ul className="flex justify-center gap-4">
              <li><Link className="text-blue-600 hover:underline" to="/empleados">Empleados</Link></li>
              <li><Link className="text-blue-600 hover:underline" to="/clientes">Clientes</Link></li>
              <li><Link className="text-blue-600 hover:underline" to="/proyectos">Proyectos</Link></li>
            </ul>
          </nav>
        </>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/proyectos" element={<Proyectos />} />
      </Routes>
    </div>
  );
}

export default App;
