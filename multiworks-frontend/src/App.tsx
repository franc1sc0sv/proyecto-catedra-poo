import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/auth/login"; // Ruta actualizada
import Register from "./pages/auth/register"; // Añadido register
import Home from "./pages/home/home";
import ClientList from "./pages/clients/clients";
import EmployeeList from "./pages/employees/employees";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppContent = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                isAuthenticated={isAuthenticated}
                userName={user?.name}
                onLogout={logout}
            />
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/clients"
                    element={
                        <PrivateRoute>
                            <ClientList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employees"
                    element={
                        <PrivateRoute>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />

                {/* Ruta de fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;