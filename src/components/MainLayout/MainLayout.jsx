import { Outlet } from "react-router";

import Header from "../Header/Header.jsx";


const MainLayout = () => {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Outlet />
    </main>
  );
};
export default MainLayout;
