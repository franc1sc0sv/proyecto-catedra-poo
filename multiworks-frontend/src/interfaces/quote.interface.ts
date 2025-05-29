import { QuoteStatus } from "../enums/quote-status.enum";

export interface QuoteDto {
  client_id: string;
  estimated_hours?: number;
  start_date?: string; // YYYY-MM-DD
  end_date?: string; // YYYY-MM-DD
  additional_costs?: number;
  status?: QuoteStatus;
}

export interface QuoteResponse extends QuoteDto {
  id: string;
  created_at: string;
  updated_at?: string;
}
