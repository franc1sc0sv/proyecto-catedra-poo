import { useState } from "react";
import type { QuoteDto } from "../../interfaces/quote.interface";
import { createQuote } from "../../api/quote";
import { Button } from "../../components/Buttons/Button";

export const CreateQuote = ({ onCreated }: { onCreated?: () => void }) => {
  const [clientId, setClientId] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [additionalCosts, setAdditionalCosts] = useState<number>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newQuote: QuoteDto = {
      client_id: clientId,
      estimated_hours: estimatedHours,
      start_date: startDate,
      end_date: endDate,
      additional_costs: additionalCosts,
    };

    try {
      await createQuote(newQuote);
      setClientId("");
      setEstimatedHours(undefined);
      setStartDate("");
      setEndDate("");
      setAdditionalCosts(undefined);
      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creando cotización", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Cotización</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">ID del Cliente</label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Horas Estimadas</label>
        <input
          type="number"
          value={estimatedHours ?? ""}
          onChange={(e) => setEstimatedHours(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Fecha de Inicio</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Fecha de Fin</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Costos Adicionales</label>
        <input
          type="number"
          value={additionalCosts ?? ""}
          onChange={(e) => setAdditionalCosts(Number(e.target.value))}
          className="w-full border rounded p-2"
        />
      </div>

      <Button type="submit" className="w-full">
        {loading ? "Creando..." : "Crear Cotización"}
      </Button>
    </form>
  );
};
