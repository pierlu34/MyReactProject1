import { useState, useContext } from "react";
import { login } from "../services/loginService.js";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeProvider.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user.slice.js";

const LoginForm = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const user = await login({
        email: input.email,
        password: input.password,
      });

      if (user) {
        dispatch(setUser(user));
        navigate("/activities");
      } else {
        alert("Login fallito. Credenziali errate?");
      }
    } catch (error) {
      alert("Errore durante il login. Riprova.");
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>Accedi {theme}</h2>
      <h2 className="form-title">Login </h2>

      <form onSubmit={submitForm}>
        <input
          required
          id="email"
          value={input.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />

        <input
          required
          id="password"
          value={input.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />

        <button type="submit">Accedi</button>
      </form>

      <p>Hai dimenticato la password?</p>

      <Link to="/register">
        <button type="button">Sei nuovo? Registrati qui!</button>
      </Link>
    </div>
  );
};

export default LoginForm;
