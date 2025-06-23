import App from "./App";
import ErrorPage from "./components/errorpage/errorPage.jsx";
import LoginForm from "./components/login/login.jsx";
import RegistrationForm from "./components/registration/Registration.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AuthLayout from "./components/AuthLayout/AuthLayout.jsx";
import MainLayout from "./components/MainLayout/MainLayout.jsx";
import ActivitiesPage from "./components/Activities/ActivitiesPage/ActivitiesPage.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LoginForm />,
          },

          {
            path: "register",
            element: <RegistrationForm />,
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: 'Activities',
                element: <ActivitiesPage/>,
              },
            ],
          },
        ],
      },
    ],
  },
];
