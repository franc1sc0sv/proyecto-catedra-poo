import { ContractType } from "../enums/contract-type.enum";
import { PersonType } from "../enums/person-type.enum";
import type { Status } from "../enums/status.enum";

export interface EmployeeDto {
  name: string;
  document: string;
  person_type: PersonType;
  contract_type: ContractType;
  phone: string;
  email: string;
  address: string;
  status?: Status;
}

export interface EmployeeResponse extends EmployeeDto {
  id: string;
  created_at: string;
  updated_at: string;
  deactivated_at: string;
}
