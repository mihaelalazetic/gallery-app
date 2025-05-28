import { Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "antd/dist/reset.css"; // or "antd/dist/antd.css" for older versions
import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <AuthProvider>
    <AppLayout>
      <Outlet />
    </AppLayout>
  </AuthProvider>
);

export default App;
