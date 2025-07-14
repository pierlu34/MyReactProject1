import { useState } from "react";
import { signUp } from "./registration.service.js";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log("Dati inviati al server:", formJson);

    // Validazione lato client
    if (!formJson.email.includes("@")) {
      setError("Email non valida!");
      return;
    }

    if (formJson.password !== formJson.confirmPassword) {
      setError("Le password non coincidono!");
      return;
    }

    const payload = {
      //username: formJson.username
      email: formJson.email,
      password: formJson.password,
    };

    try {
      const response = await signUp(payload);
      console.log("REGISTRAZIONE AVVENUTA", response);
      // eventualmente fai un redirect o pulisci il form
    } catch (error) {
      console.error("Errore nella registrazione:", error);
      setError("Registrazione fallita. Riprova.");
    }
  }

  return (
    <div className="card">
      <h2 className="form-title">Registrazione</h2>
      <form method="post" onSubmit={handleSubmit}>
        

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={input.email}
          name="email"
          onChange={handleChange}
          type="text"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={input.password}
          name="password"
          onChange={handleChange}
          type="password"
        />
        <label htmlFor="confirmPassword">Conferma Password</label>
        <input
          id="confirmPassword"
          value={input.confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          type="password"
        />

        <button type="submit">Registrati</button>
      </form>
      {error && <p>{error}</p>}

      <Link to="/">
        <button type="button">Già registrato? Accedi</button>
      </Link>
    </div>
  );
};

export default RegistrationForm;
