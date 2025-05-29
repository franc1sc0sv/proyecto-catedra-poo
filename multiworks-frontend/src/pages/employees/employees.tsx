import React, { useEffect, useState } from "react";
import { Card, List, Typography, Button, Row, Tag, Spin, message } from "antd";
import { UserOutlined, ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/use-auth";
import axios from "axios";
import type { EmployeeResponse } from "../../interfaces/employee.interface";

const { Title, Text } = Typography;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, user, logout } = useAuth();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/employees");
      setEmployees(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(
          `Error al cargar empleados: ${
            error.response?.data?.message || error.message
          }`
        );
      } else if (error instanceof Error) {
        message.error(`Error: ${error.message}`);
      } else {
        message.error("Error desconocido al cargar empleados");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getStatusTag = (status?: string) => {
    if (!status) return <Tag>Desconocido</Tag>;

    switch (status) {
      case "ACTIVE":
        return <Tag color="green">Activo</Tag>;
      case "INACTIVE":
        return <Tag color="red">Inactivo</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getContractType = (type?: string) => {
    if (!type) return "No especificado";

    switch (type) {
      case "FULL_TIME":
        return "Tiempo completo";
      case "PART_TIME":
        return "Medio tiempo";
      case "TEMPORARY":
        return "Temporal";
      case "CONTRACTOR":
        return "Contratista";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Row justify="space-between" align="middle" className="mb-6">
          <Title level={2}>Empleados</Title>
          <div className="space-x-2">
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchEmployees}
              disabled={loading}
            >
              Recargar
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Nuevo Empleado
            </Button>
          </div>
        </Row>

        <Card>
          {loading ? (
            <div className="flex justify-center py-12">
              <Spin size="large" />
            </div>
          ) : (
            <List
              itemLayout="vertical"
              dataSource={employees}
              locale={{ emptyText: "No hay empleados registrados" }}
              renderItem={(employee) => (
                <List.Item key={employee.id}>
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={
                      <span className="text-lg font-semibold">
                        {employee.name} {getStatusTag(employee.status)}
                      </span>
                    }
                    description={
                      <>
                        <Text strong>Documento:</Text> {employee.document}{" "}
                        <br />
                        <Text strong>Tipo de Persona:</Text>{" "}
                        {employee.person_type} <br />
                        <Text strong>Tipo de Contrato:</Text>{" "}
                        {getContractType(employee.contract_type)} <br />
                        {employee.email && (
                          <>
                            <Text strong>Email:</Text> {employee.email} <br />
                          </>
                        )}
                        {employee.phone && (
                          <>
                            <Text strong>Teléfono:</Text> {employee.phone}{" "}
                            <br />
                          </>
                        )}
                        {employee.address && (
                          <>
                            <Text strong>Dirección:</Text> {employee.address}
                          </>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default EmployeeList;
