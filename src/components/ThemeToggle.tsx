import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useThemeToggle } from "../providers/AppThemeProvider";

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useThemeToggle();

  return (
    <Switch
      checked={darkMode}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
    />
  );
};

export default ThemeToggle;
