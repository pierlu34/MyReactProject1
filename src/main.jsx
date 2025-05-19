import { routes } from "./routes.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";
import { store, persistor } from "./store/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
      </PersistGate>
      </Provider>
  </StrictMode>
);
 