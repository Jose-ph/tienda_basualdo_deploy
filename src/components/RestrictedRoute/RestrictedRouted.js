import React from "react";
import { useContext } from "react";
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import { UserContext } from "../../Context/UserContext";

const RestrictedRoute = ({ children }) => {
  const { logged } = useContext(UserContext);

  return logged ? (
    children
  ) : (
    <>
      {" "}
      <h1>Hola para ver esta sección debes Iniciar Sesión o Registrarte</h1>
    </>
  );
};

export default RestrictedRoute;
