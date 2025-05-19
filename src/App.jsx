//import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router";
import LoginForm from "./components/login/login.jsx";
import RegistrationForm from "./components/registration/Registration.jsx";


const USER = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {};

function App() {
  return (
    <main className="main_content">
      <Outlet />
    </main>
  );
}

export default App;
