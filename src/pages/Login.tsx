import React from "react";
import { Card, Typography, Grid, Flex, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useGeneratedAntForm, FieldConfig } from "../hooks/useGeneratedAntForm";
import { useThemeToggle } from "../providers/AppThemeProvider";
import ThemeToggle from "../components/utils/ThemeToggle";
import LanguageSwitcher from "../components/utils/LanguageChanger";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "input",
    required: true,
    placeholder: "your@email.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Your password",
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { darkMode } = useThemeToggle();

  const { GeneratedForm } = useGeneratedAntForm({
    fields: loginFields,
    buttonLabel: "Login",
    onSubmit: (values) => {
      console.log("Login submitted:", values);
      // TODO: handle real login logic
      navigate("/");
    },
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: darkMode ? "#1e1e2f" : "#f3f4f6",
        transition: "background-color 0.3s ease",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 420,
          padding: screens.xs ? "1.5rem" : "2.5rem",
          borderRadius: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          backgroundColor: darkMode ? "#2a2a3b" : "#ffffff",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 24 }}
        >
          <Space>
            <LanguageSwitcher />
            <ThemeToggle />
          </Space>
        </Flex>

        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          🎨 Welcome to e-Gallery
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: 24, textAlign: "center" }}
        >
          Login to discover and manage your art collection
        </Text>

        <GeneratedForm />
      </Card>
    </div>
  );
};

export default LoginPage;
