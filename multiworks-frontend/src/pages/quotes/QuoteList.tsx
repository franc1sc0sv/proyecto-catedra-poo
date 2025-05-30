import React, { useState } from "react";
import Header from "../../components/Header/Header";
import type { QuoteResponse } from "../../interfaces/quote.interface";
import { QuoteStatus } from "../../enums/quote-status.enum";

const mockQuotes: QuoteResponse[] = [
    {
        id: "1",
        client_id: "Cliente A",
        estimated_hours: 10,
        start_date: "2025-06-01",
        end_date: "2025-06-10",
        additional_costs: 50,
        status: QuoteStatus.EnProceso,
        created_at: "2025-06-01",
    },
    {
        id: "2",
        client_id: "Cliente B",
        estimated_hours: 20,
        start_date: "2025-06-02",
        end_date: "2025-06-12",
        additional_costs: 100,
        status: QuoteStatus.Finalizada,
        created_at: "2025-06-02",
    },
];

const QuoteList: React.FC = () => {
    const [selectedQuote, setSelectedQuote] = useState<QuoteResponse | null>(null);
    const [creatingNew, setCreatingNew] = useState(false);

    const handleSelect = (quote: QuoteResponse) => setSelectedQuote(quote);
    const handleCreate = () => setCreatingNew(true);
    const handleCancel = () => {
        setSelectedQuote(null);
        setCreatingNew(false);
    };

    return (
        <div>
            <Header isAuthenticated={true} onLogout={() => {}} />
            <main className="p-6 max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Cotizaciones</h1>

                {creatingNew ? (
                    <NewQuoteForm onCancel={handleCancel} />
                ) : selectedQuote ? (
                    <QuoteDetail quote={selectedQuote} onBack={handleCancel} />
                ) : (
                    <>
                        <button
                            onClick={handleCreate}
                            className="mb-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow"
                        >
                            Crear nueva cotización
                        </button>

                        <div className="overflow-hidden rounded-lg shadow">
                            <table className="w-full bg-white">
                                <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                    <th className="p-3 text-left">Cliente</th>
                                    <th className="p-3 text-left">Horas estimadas</th>
                                    <th className="p-3 text-left">Estado</th>
                                    <th className="p-3 text-left">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {mockQuotes.map((quote) => (
                                    <tr key={quote.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">{quote.client_id}</td>
                                        <td className="p-3">{quote.estimated_hours}</td>
                                        <td className="p-3">{quote.status}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleSelect(quote)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Ver detalle
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default QuoteList;

// Subcomponentes

const NewQuoteForm: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nueva Cotización</h2>
            <form className="space-y-4 bg-white p-6 rounded-lg shadow max-w-md">
                <input className="w-full border border-gray-300 p-2 rounded-lg" placeholder="ID del Cliente" />
                <input className="w-full border border-gray-300 p-2 rounded-lg" type="number" placeholder="Horas estimadas" />
                <input className="w-full border border-gray-300 p-2 rounded-lg" type="date" placeholder="Fecha de inicio" />
                <input className="w-full border border-gray-300 p-2 rounded-lg" type="date" placeholder="Fecha de fin" />
                <input className="w-full border border-gray-300 p-2 rounded-lg" type="number" placeholder="Costos adicionales" />
                <select className="w-full border border-gray-300 p-2 rounded-lg">
                    <option value={QuoteStatus.EnProceso}>En proceso</option>
                    <option value={QuoteStatus.Finalizada}>Finalizada</option>
                    <option value={QuoteStatus.Cancelada}>Cancelada</option>
                </select>
                <div className="flex gap-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow">
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 shadow"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

const QuoteDetail: React.FC<{ quote: QuoteResponse; onBack: () => void }> = ({ quote, onBack }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Detalle de Cotización</h2>
            <div className="bg-white p-6 rounded-lg shadow space-y-2 max-w-md">
                <p><strong>Cliente:</strong> {quote.client_id}</p>
                <p><strong>Horas estimadas:</strong> {quote.estimated_hours}</p>
                <p><strong>Fechas:</strong> {quote.start_date} a {quote.end_date}</p>
                <p><strong>Costos adicionales:</strong> ${quote.additional_costs}</p>
                <p><strong>Estado:</strong> {quote.status}</p>
                <p><strong>Creado el:</strong> {quote.created_at}</p>
            </div>
            <div className="mt-4 flex gap-3">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 shadow">
                    Finalizar
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow">
                    Cancelar
                </button>
                <button
                    onClick={onBack}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 shadow"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};
