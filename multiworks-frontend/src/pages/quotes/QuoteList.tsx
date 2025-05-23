import { useEffect, useState } from "react";
import type { QuoteResponse } from "../../interfaces/quote.interface";
import { getAllQuotations } from "../../api/quote";


const QuoteList = () => {
  const [quotes, setQuotes] = useState<QuoteResponse[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await getAllQuotations();
        setQuotes(response.data);
      } catch (error) {
        console.error("Error al cargar cotizaciones:", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Cotizaciones</h2>
      <table className="table-auto w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Horas</th>
            <th className="p-2 border">Inicio</th>
            <th className="p-2 border">Estado</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id}>
              <td className="p-2 border">{quote.id}</td>
              <td className="p-2 border">{quote.client_id}</td>
              <td className="p-2 border">{quote.estimated_hours}</td>
              <td className="p-2 border">{quote.start_date}</td>
              <td className="p-2 border">{quote.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteList;
