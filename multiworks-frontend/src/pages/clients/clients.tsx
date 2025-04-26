import React, { useEffect, useState } from "react";
import {
    Card,
    List,
    Typography,
    Button,
    Row,
    Tag,
    Spin,
    message,
} from "antd";
import {
    UserOutlined,
    ReloadOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/use-auth";
import axios from "axios";
import type { ClientResponse } from "../../interfaces/client.interface";

const { Title, Text } = Typography;

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<ClientResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { isAuthenticated, user, logout } = useAuth();

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/clients");
            setClients(response.data.data);
        } catch (err) {
            message.error(`Error al cargar clientes: ${err instanceof Error ? err.message : 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                isAuthenticated={isAuthenticated}
                userName={user?.name}
                onLogout={logout}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Row justify="space-between" align="middle" className="mb-6">
                    <Title level={2}>Clientes</Title>
                    <div className="space-x-2">
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchClients}
                            disabled={loading}
                        >
                            Recargar
                        </Button>
                        <Button type="primary" icon={<PlusOutlined />}>
                            Nuevo Cliente
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
                            dataSource={clients}
                            locale={{ emptyText: "No hay clientes registrados." }}
                            renderItem={(client) => (
                                <List.Item key={client.id}>
                                    <List.Item.Meta
                                        avatar={<UserOutlined />}
                                        title={
                                            <span className="text-lg font-semibold">
                                                {client.name} {getStatusTag(client.status)}
                                            </span>
                                        }
                                        description={
                                            <>
                                                <Text strong>Documento:</Text> {client.document} <br />
                                                <Text strong>Tipo de Persona:</Text> {client.person_type} <br />
                                                {client.email && (
                                                    <>
                                                        <Text strong>Email:</Text> {client.email} <br />
                                                    </>
                                                )}
                                                {client.phone && (
                                                    <>
                                                        <Text strong>Teléfono:</Text> {client.phone} <br />
                                                    </>
                                                )}
                                                {client.address && (
                                                    <>
                                                        <Text strong>Dirección:</Text> {client.address}
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

export default ClientList;