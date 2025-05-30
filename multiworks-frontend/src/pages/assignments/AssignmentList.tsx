import { useState } from "react";
import Header from "../../components/Header/Header";

const AssignmentList = () => {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header isAuthenticated={true} onLogout={() => {}} />

            <main className="max-w-6xl mx-auto py-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Asignaciones</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        + Nueva Asignación
                    </button>
                </div>

                <section className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Listado de asignaciones por cotización</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Título</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Empleado</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Inicio</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Fin</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3].map((_, idx) => (
                            <tr key={idx}>
                                <td className="px-4 py-2 text-sm text-gray-700">Título #{idx + 1}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">Empleado #{idx + 1}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">2025-06-10</td>
                                <td className="px-4 py-2 text-sm text-gray-700">2025-06-15</td>
                                <td className="px-4 py-2 text-sm space-x-2">
                                    <button
                                        onClick={() => setSelectedAssignmentId(`assignment-${idx}`)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Ver Detalle
                                    </button>
                                    <button className="text-yellow-600 hover:underline text-sm">Editar</button>
                                    <button className="text-red-600 hover:underline text-sm">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

                {selectedAssignmentId && (
                    <section className="mt-8 bg-white shadow rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Detalle de Asignación</h2>
                        <p className="text-sm text-gray-700">
                            Mostrando detalle y subtareas de la asignación: <span className="font-semibold">{selectedAssignmentId}</span>
                        </p>
                        {/* Aquí iría visualización de subtareas */}
                        <div className="mt-4">
                            <p className="text-gray-600 italic">Aquí se mostrarán las subtareas asociadas.</p>
                        </div>
                        <button
                            onClick={() => setSelectedAssignmentId(null)}
                            className="mt-4 text-sm text-blue-600 hover:underline"
                        >
                            Cerrar detalle
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
};

export default AssignmentList;
