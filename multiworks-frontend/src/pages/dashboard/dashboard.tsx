import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Typography,
  Button,
} from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/use-auth";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  // Mock data - replace with real data from your API
  const stats = {
    totalProjects: 12,
    completedProjects: 8,
    inProgressProjects: 3,
    pendingProjects: 1,
  };

  const { isAuthenticated, user, logout } = useAuth();

  const recentProjects = [
    { id: 1, name: "Project Alpha", status: "Completed", progress: 100 },
    { id: 2, name: "Project Beta", status: "In Progress", progress: 75 },
    { id: 3, name: "Project Gamma", status: "In Progress", progress: 45 },
    { id: 4, name: "Project Delta", status: "Pending", progress: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isAuthenticated={isAuthenticated}
        userName={user?.name}
        onLogout={logout}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Title level={2} className="mb-8">
          Dashboard
        </Title>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Projects"
                value={stats.totalProjects}
                prefix={<ProjectOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Completed"
                value={stats.completedProjects}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="In Progress"
                value={stats.inProgressProjects}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending"
                value={stats.pendingProjects}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent Projects */}
        <Card title="Recent Projects" className="mb-8">
          <List
            itemLayout="horizontal"
            dataSource={recentProjects}
            renderItem={(project) => (
              <List.Item>
                <List.Item.Meta
                  title={project.name}
                  description={
                    <div>
                      <div className="mb-2">Status: {project.status}</div>
                      <Progress
                        percent={project.progress}
                        status={project.progress === 100 ? "success" : "active"}
                        size="small"
                      />
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        {/* Quick Actions */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Quick Actions" className="h-full">
              <div className="space-y-4">
                <Button type="primary" block>
                  Create New Project
                </Button>
                <Button block>View All Projects</Button>
                <Button block>Generate Report</Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Activity Feed" className="h-full">
              <List
                size="small"
                dataSource={[
                  "Project Alpha was completed",
                  "New task added to Project Beta",
                  "Project Gamma updated",
                  "New comment on Project Delta",
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
