import { Outlet } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

const App = () => (
  <AppLayout >
    <Outlet />
  </AppLayout>
);

export default App;
