import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../Context/UserContext";

const SignUp = () => {
  const { signup, logged, error } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <div className="">
      {logged ? (
        <Redirect to={"/"} />
      ) : (
        <form
          id="prueba-tres"
          className="form d-flex  flex-column"
          onSubmit={handleSignup}
          style={{ "background-color": "#f8e12d", width: "500px" }}
        >
          <h5 className="title">Registrarme</h5>
          <span className="form-span">Email</span>
          <input
            type="email"
            className="form-input"
            id="email-signup"
            name="email-singup"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error === "auth/email-already-in-use" && (
            <p className="alert alert-danger">Usuario ya registrado</p>
          )}
          {error === "auth/invalid-email" && (
            <p className="alert alert-danger">Ingrese un email válido</p>
          )}
          <span className="form-span">Contaseña</span>
          <input
            type="password"
            className="form-input"
            id="password-signup"
            name="password-singup"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error === "auth/weak-password" && (
            <p className="alert alert-danger">
              La contraseña debe contener más de 6 caracteres
            </p>
          )}
          <input
            type="submit"
            value="Enviar"
            className="btn btn-primary my-2"
          />
        </form>
      )}
    </div>
  );
};

export default SignUp;
