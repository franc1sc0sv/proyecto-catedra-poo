export interface AssignmentDto {
  employee_id: string;
  title: string;
  start_datetime: string; // ISO 8601
  end_datetime: string; // ISO 8601
  estimated_hours?: number;
  base_cost?: number;
  extra_percentage?: number;
}

export interface AssignmentResponse extends AssignmentDto {
  id: string;
  quote_id: string;
  created_at: string;
  updated_at?: string;
}
