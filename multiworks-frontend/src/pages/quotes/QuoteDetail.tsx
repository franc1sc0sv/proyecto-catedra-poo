import React, { useEffect, useState } from "react";
import { Card, Button, Tag, message, Modal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById, finishQuote, cancelQuote } from "../../api/quote";
import type { QuoteResponse } from "../../interfaces/quote.interface";
import { QuoteStatus } from "../../enums/quote-status.enum";

const QuoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchQuote(id);
  }, [id]);

  const fetchQuote = async (quoteId: string) => {
    setLoading(true);
    try {
      const res = await getQuoteById(quoteId);
      setQuote(res.data);
    } catch (e) {
      message.error("Error al cargar la cotización");
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    Modal.confirm({
      title: "¿Finalizar cotización?",
      content: "Esta acción marcará la cotización como finalizada.",
      onOk: async () => {
        if (!id) return;
        try {
          await finishQuote(id);
          message.success("Cotización finalizada");
          fetchQuote(id);
        } catch {
          message.error("Error al finalizar");
        }
      },
    });
  };

  const handleCancel = async () => {
    Modal.confirm({
      title: "¿Cancelar cotización?",
      content: "Esta acción marcará la cotización como cancelada.",
      onOk: async () => {
        if (!id) return;
        try {
          await cancelQuote(id);
          message.success("Cotización cancelada");
          fetchQuote(id);
        } catch {
          message.error("Error al cancelar");
        }
      },
    });
  };

  if (!quote) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <main className="p-6 max-w-screen-md mx-auto">
      <Card
        title={
          <span className="text-2xl font-bold text-gray-800">
            Detalle de Cotización
          </span>
        }
        className="mb-6"
        loading={loading}
      >
        <div className="space-y-2">
          <p>
            <strong>Cliente:</strong> {quote.client_id}
          </p>
          <p>
            <strong>Horas estimadas:</strong> {quote.estimated_hours}
          </p>
          <p>
            <strong>Fechas:</strong> {quote.start_date} a {quote.end_date}
          </p>
          <p>
            <strong>Costos adicionales:</strong> ${quote.additional_costs}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <Tag
              color={
                quote.status === QuoteStatus.Finalizada
                  ? "green"
                  : quote.status === QuoteStatus.Cancelada
                  ? "red"
                  : "blue"
              }
            >
              {quote.status}
            </Tag>
          </p>
          <p>
            <strong>Creado el:</strong> {quote.created_at}
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <Button
            type="primary"
            disabled={quote.status !== QuoteStatus.EnProceso}
            onClick={handleFinish}
          >
            Finalizar
          </Button>
          <Button
            danger
            disabled={quote.status !== QuoteStatus.EnProceso}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button onClick={() => navigate("/dashboard/quotes")}>Volver</Button>
        </div>
      </Card>
    </main>
  );
};

export default QuoteDetail;
