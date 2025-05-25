import { useState } from 'react';

const empleadosMock = [
  { id: 1, nombre: 'Juan Pérez', costoHora: 25 },
  { id: 2, nombre: 'María Gómez', costoHora: 30 }
];

const clientesMock = [
  { id: 1, nombre: 'Empresa Alfa' },
  { id: 2, nombre: 'Cliente Beta' }
];

function Proyectos() {
  const [proyecto, setProyecto] = useState({
    nombre: '',
    clienteId: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const [asignaciones, setAsignaciones] = useState([]);
  const [empleadoId, setEmpleadoId] = useState('');
  const [horas, setHoras] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto({ ...proyecto, [name]: value });
  };

  const agregarEmpleado = () => {
    const empleado = empleadosMock.find(e => e.id === parseInt(empleadoId));
    if (empleado && horas) {
      setAsignaciones([
        ...asignaciones,
        {
          empleadoId: empleado.id,
          nombre: empleado.nombre,
          horas: parseFloat(horas),
          costoHora: empleado.costoHora
        }
      ]);
      setEmpleadoId('');
      setHoras('');
    }
  };

  const calcularCostoTotal = () => {
    return asignaciones.reduce((total, e) => total + (e.horas * e.costoHora), 0);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    alert('Proyecto registrado correctamente');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Proyecto / Cotización</h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block font-medium">Nombre del Proyecto</label>
          <input type="text" name="nombre" value={proyecto.nombre} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Cliente</label>
          <select name="clienteId" value={proyecto.clienteId} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Seleccione un cliente</option>
            {clientesMock.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Fecha Inicio</label>
            <input type="date" name="fechaInicio" value={proyecto.fechaInicio} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Fecha Fin</label>
            <input type="date" name="fechaFin" value={proyecto.fechaFin} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mt-6">Asignar Empleados</h3>
          <div className="flex gap-2 mt-2">
            <select value={empleadoId} onChange={(e) => setEmpleadoId(e.target.value)} className="flex-1 p-2 border rounded">
              <option value="">Seleccione un empleado</option>
              {empleadosMock.map(e => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
            <input type="number" placeholder="Horas" value={horas} onChange={(e) => setHoras(e.target.value)} className="w-24 p-2 border rounded" />
            <button type="button" onClick={agregarEmpleado} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Agregar</button>
          </div>
        </div>

        {asignaciones.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Empleados Asignados</h4>
            <ul className="list-disc list-inside space-y-1">
              {asignaciones.map((a, i) => (
                <li key={i}>
                  {a.nombre} - {a.horas}h - ${a.costoHora}/h
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Costo total: ${calcularCostoTotal().toFixed(2)}</p>
          </div>
        )}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Guardar Proyecto</button>
      </form>
    </div>
  );
}

export default Proyectos;
