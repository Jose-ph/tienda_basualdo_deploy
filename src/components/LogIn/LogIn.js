import React, { useState, useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../Context/UserContext";

const LogIn = () => {
  const { login, logged, error, googleAuth } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      {logged ? (
        <Redirect to={"/"} />
      ) : (
        <form id="prueba-cuatro" className="form">
          <h5 className="title">Iniciar Sesión</h5>
          <span className="form-span">Email</span>
          <input
            className="form-input"
            type="text"
            id="emailSI"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {error === "auth/invalid-email" && (
            <p className="alert alert-danger">Mail inválido</p>
          )}

          {error === "auth/user-not-found" && (
            <p className="alert alert-danger">Usuario no encontrado</p>
          )}

          <span className="form-span">Contraseña</span>
          <input
            className="form-input"
            type="password"
            id="passwordSI"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error === "auth/weak-password" && (
            <p className="form-message form-message-error">
              La contraseña debe contener más de 6 caracteres
            </p>
          )}
          {error === "auth/internal-error" && (
            <p className="form-message form-message-error">
              Debe ingresar una contraseña
            </p>
          )}
          {error === "auth/wrong-password" && (
            <p className="form-message form-message-error">
              Contraseña inválida
            </p>
          )}
          {error === "auth/too-many-requests" && (
            <p className="form-message form-message-error">
              Has superado el límite de intentos, prueba nuevamente en unos
              minutos
            </p>
          )}

          <button
            type="button"
            className="btn-login"
            onClick={() => login(email, password)}
          >
            Iniciar Sesión
          </button>

          <span className="form-span form-span-google">
            O iniciar sesión con:
          </span>
          <button type="button" className="btn-login" onClick={googleAuth}>
            Google
          </button>
        </form>
      )}
    </div>
  );
};

export default LogIn;
