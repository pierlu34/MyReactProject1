import styles from "./Header.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../contexts/ThemeProvider.jsx";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, userSelector } from "../../reducers/user.slice.js";

const Header = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  useEffect(() => {
    console.log("IL NOSTRO TEMA", theme);
  }, [theme]);

  return (
    <header className={styles.main_header}>
      <div>
        {user?.displayName ? `Ciao ${user.displayName}` : "Non sei loggato"}
      </div>
      <div>
        <button onClick={switchTheme} style={{ marginRight: 5 }}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {user ? (
          <button onClick={logout} className="button">
            Esci <FaArrowRightFromBracket />
          </button>
        ) : (
          <button onClick={() => navigate("/")} className="button">
            Accedi <FaArrowRightToBracket />
          </button>
          
        )}
      </div>
    </header>
  );
};

export default Header;
