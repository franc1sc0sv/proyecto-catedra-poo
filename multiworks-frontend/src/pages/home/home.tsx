import React from "react";

import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "../../components/Buttons/Button";

const Home: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-[#eaf1fb]">
      <Header
        isAuthenticated={isAuthenticated}
        userName={isAuthenticated ? user?.name ?? "" : ""}
        onLogout={logout}
      />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-[#7da2c1] to-[#eaf1fb]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#7da2c1]/80 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow mb-4 font-cursive">
            Bienvenido a <span className="text-cyan-200">HyperClass</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 drop-shadow">
            Eslógan que inspire a tus usuarios
          </p>
          <div className="flex justify-center">
            <Button>
              <Link className="!text-white" to="/register">
                Comienza Ahora
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
          <span className="text-white text-3xl animate-bounce">⌄</span>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section id="about" className="py-16 text-center">
        <h2 className="text-3xl font-bold text-[#3a506b] mb-4">
          Sobre Nosotros
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      {/* Ventajas */}
      <section
        id="benefits"
        className="py-12 bg-gradient-to-b from-[#eaf1fb] to-white"
      >
        <h2 className="text-3xl font-bold text-[#3a506b] mb-8 text-center">
          Ventajas
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {[
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white/80 rounded-xl shadow-lg p-8 max-w-xs text-gray-700 border border-blue-100 hover:shadow-2xl transition"
            >
              {text}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
