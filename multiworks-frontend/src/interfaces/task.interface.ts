export interface TaskDto {
  title: string;
  description?: string;
}

export interface TaskResponse extends TaskDto {
  id: string;
  assignment_id: string;
  created_at: string;
  updated_at?: string;
}
