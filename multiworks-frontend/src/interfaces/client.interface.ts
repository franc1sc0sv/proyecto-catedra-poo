import { PersonType } from "../enums/person-type.enum";
import type { Status } from "../enums/status.enum";

export interface ClientDto {
  name: string;
  document: string;
  person_type: PersonType;
  phone?: string;
  email?: string;
  address?: string;
  status?: Status;
}

export interface ClientResponse extends ClientDto {
  id: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
  deactivated_at?: string;
}
