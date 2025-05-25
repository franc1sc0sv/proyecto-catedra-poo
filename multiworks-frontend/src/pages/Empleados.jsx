import { useState } from 'react';

function Empleados() {
  const [empleado, setEmpleado] = useState({
    nombre: '',
    tipoPersona: 'Natural',
    documento: '',
    tipoContratacion: 'Tiempo completo',
    telefono: '',
    correo: '',
    direccion: '',
    estado: 'Activo',
    fechaInicio: '',
    fechaFin: '',
    area: '',
    costoHora: ''
  });

  const [empleados, setEmpleados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado({ ...empleado, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEmpleados([...empleados, { ...empleado, id: Date.now() }]);
    setEmpleado({
      nombre: '',
      tipoPersona: 'Natural',
      documento: '',
      tipoContratacion: 'Tiempo completo',
      telefono: '',
      correo: '',
      direccion: '',
      estado: 'Activo',
      fechaInicio: '',
      fechaFin: '',
      area: '',
      costoHora: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Empleado</h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        {[
          { label: 'Nombre', name: 'nombre' },
          { label: 'Documento', name: 'documento' },
          { label: 'Teléfono', name: 'telefono' },
          { label: 'Correo', name: 'correo', type: 'email' },
          { label: 'Dirección', name: 'direccion' },
          { label: 'Área', name: 'area' },
          { label: 'Costo por Hora', name: 'costoHora', type: 'number' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block font-medium">{label}:</label>
            <input type={type} name={name} value={empleado[name]} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
        ))}

        <div>
          <label className="block font-medium">Tipo de Persona:</label>
          <select name="tipoPersona" value={empleado.tipoPersona} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Natural">Natural</option>
            <option value="Jurídica">Jurídica</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tipo de Contratación:</label>
          <select name="tipoContratacion" value={empleado.tipoContratacion} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Tiempo completo">Tiempo completo</option>
            <option value="Por proyecto">Por proyecto</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Fecha de Inicio:</label>
            <input type="date" name="fechaInicio" value={empleado.fechaInicio} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Fecha de Fin:</label>
            <input type="date" name="fechaFin" value={empleado.fechaFin} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Estado:</label>
          <select name="estado" value={empleado.estado} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Guardar Empleado</button>
      </form>

      {empleados.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Empleados Registrados</h3>
          <ul className="list-disc list-inside space-y-1">
            {empleados.map((e) => (
              <li key={e.id}>{e.nombre} - {e.tipoContratacion} - {e.area} - ${e.costoHora}/h</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Empleados;
