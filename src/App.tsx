import { Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import "antd/dist/reset.css"; // or "antd/dist/antd.css" for older versions

const App = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export default App;
