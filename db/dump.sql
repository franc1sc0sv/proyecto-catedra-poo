CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role TEXT CHECK (role IN ('ADMIN', 'CLIENT', 'EMPLOYEE')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    document VARCHAR(50) UNIQUE NOT NULL,
    person_type TEXT CHECK (person_type IN ('Natural', 'Legal')) NOT NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    address VARCHAR(255) NULL,
    status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deactivated_at TIMESTAMP NULL,
    CONSTRAINT fk_persons_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE clients (
    id UUID PRIMARY KEY,
    CONSTRAINT fk_clients_persons FOREIGN KEY (id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id UUID PRIMARY KEY,
    contract_type TEXT CHECK (contract_type IN ('Permanent', 'Temporary')) NOT NULL,
    CONSTRAINT fk_employees_persons FOREIGN KEY (id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL,
    status TEXT CHECK (status IN ('In Progress', 'Completed')) DEFAULT 'In Progress',
    tentative_start_date DATE NOT NULL,
    tentative_end_date DATE NOT NULL,
    total_cost DECIMAL(10,2) DEFAULT 0.00,
    CONSTRAINT fk_quotations_clients FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID NOT NULL,
    employee_id UUID NOT NULL,
    area VARCHAR(100) NOT NULL,
    hourly_cost DECIMAL(10,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    estimated_hours INT NOT NULL CHECK (estimated_hours > 0),
    base_cost DECIMAL(10,2) NOT NULL,
    extra_increment DECIMAL(5,2) DEFAULT 0.00,
    CONSTRAINT fk_assignments_quotations FOREIGN KEY (quotation_id) REFERENCES quotations(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_employees FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
