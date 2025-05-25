import { useState } from 'react';

function Clientes() {
  const [cliente, setCliente] = useState({
    nombre: '',
    tipoPersona: 'Natural',
    documento: '',
    tipo: 'Recurrente',
    telefono: '',
    correo: '',
    direccion: '',
    estado: 'Activo',
    fechaInicio: '',
    fechaFin: ''
  });

  const [clientes, setClientes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setClientes([...clientes, { ...cliente, id: Date.now() }]);
    setCliente({
      nombre: '',
      tipoPersona: 'Natural',
      documento: '',
      tipo: 'Recurrente',
      telefono: '',
      correo: '',
      direccion: '',
      estado: 'Activo',
      fechaInicio: '',
      fechaFin: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Cliente</h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        {[
          { label: 'Nombre', name: 'nombre' },
          { label: 'Documento', name: 'documento' },
          { label: 'Teléfono', name: 'telefono' },
          { label: 'Correo', name: 'correo', type: 'email' },
          { label: 'Dirección', name: 'direccion' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name}>
            <label className="block font-medium">{label}:</label>
            <input type={type} name={name} value={cliente[name]} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
        ))}

        <div>
          <label className="block font-medium">Tipo de Persona:</label>
          <select name="tipoPersona" value={cliente.tipoPersona} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Natural">Natural</option>
            <option value="Jurídica">Jurídica</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tipo de Cliente:</label>
          <select name="tipo" value={cliente.tipo} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Recurrente">Recurrente</option>
            <option value="Por Proyecto">Por Proyecto</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Fecha de Inicio:</label>
            <input type="date" name="fechaInicio" value={cliente.fechaInicio} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex-1">
            <label className="block font-medium">Fecha de Fin:</label>
            <input type="date" name="fechaFin" value={cliente.fechaFin} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block font-medium">Estado:</label>
          <select name="estado" value={cliente.estado} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Guardar Cliente</button>
      </form>

      {clientes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Clientes Registrados</h3>
          <ul className="list-disc list-inside space-y-1">
            {clientes.map((c) => (
              <li key={c.id}>{c.nombre} - {c.tipo} - {c.documento}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Clientes;
