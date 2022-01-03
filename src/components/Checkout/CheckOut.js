import {
  collection,
  addDoc,
  Timestamp,
  writeBatch,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore/lite";

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CartContext } from "../../Context/CartContext";
import { dataBase } from "../../firebase/config";
import Loader from "../Loader/Loader";

import { Formik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const initialValues = {
  nombre: "",
  email: "",
  tel: "",
};

const endPurchaseSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("Este campo es obligatorio")
    .min(4, "El nombre es muy corto")
    .max(30, "El nombre supera el límite de caracteres"),
  email: Yup.string()
    .required("El mail es obligatorio, nos comunicamos por este medio!")
    .email("Email inválido"),

  tel: Yup.string()
    .matches(phoneRegExp, "Número de teléfono sólo pueden ser números")
    .required("Este campo es obligatorio")
    .min(8, "El teléfono no es válido")
    .max(12, "El teléfono tiene demasiados dígitos"),
});

function Checkout() {
  const { cart, totalPurchase, clearCart } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  const [loading, setLoading] = useState(false);

  const {logged} = useContext(UserContext);



  const handleSubmit = (values) => {
    const order = {
      buyer: values,
      items: cart,
      total: totalPurchase(),
      date: Timestamp.fromDate(new Date()),
    };

    console.log(order);

    const batch = writeBatch(dataBase);

    const ordersRef = collection(dataBase, "orders");

    //actualizar documento en base de datos

    const productsRef = collection(dataBase, "products");

    const q = query(
      productsRef,
      where(
        documentId(),
        "in",
        cart.map((el) => el.id)
      )
    );

    //Esto es una serie de cambios en conjunto en vez de a uno.

    const oufOfStock = [];
    getDocs(q).then((resp) => {
      resp.docs.forEach((doc) => {
        const item = cart.find((prod) => prod.id === doc.id);
        if (doc.data().stock >= item.quantity) {
          batch.update(doc.ref, {
            stock: doc.data().stock - item.quantity,
          });
        } else {
          oufOfStock.push(item);
        }
      });

      if (oufOfStock.length === 0) {
        setLoading(true);
        addDoc(ordersRef, order)
          .then((resp) => {
            console.log(resp.id);
            batch.commit();
            setOrderId(resp.id);
            clearCart();
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        alert("Productos sin stock en el carrito!!");
      }
     
    });

   
  };

  

  if (loading) {
    return <Loader></Loader>;
  }

  if (orderId) {
    return (
      <>
        <h2>Compra registrada con éxito !</h2>
        <hr></hr>
        <p>Tu número de orden es: {orderId} </p>
        <Link to="/" className="btn btn-warning">
          {" "}
          Ir al inicio
        </Link>
      </>
    );
  }

  if (!orderId && logged && cart.length > 0 ) {
    return (
      <div className="container w-50">
        <h2>Checkout</h2>

        <hr />

        <Formik
          initialValues={initialValues}
          validationSchema={endPurchaseSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <input
                name="nombre"
                onChange={formik.handleChange}
                value={formik.values.nombre}
                className="form-control my-2"
                type="text"
                placeholder="Nombre"
              />
              {formik.errors.nombre && (
                <p className="alert alert-danger">{formik.errors.nombre}</p>
              )}

              <input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form-control my-2"
                type="email"
                placeholder="Email"
              />
              {formik.errors.email && (
                <p className="alert alert-danger">{formik.errors.email}</p>
              )}

              <input
                name="tel"
                onChange={formik.handleChange}
                value={formik.values.tel}
                className="form-control my-2"
                type="text"
                placeholder="Teléfono"
              />
              {formik.errors.tel && (
                <p className="alert alert-danger">{formik.errors.tel}</p>
              )}

              <button type="submit" className="btn btn-success">
                Enviar
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  if(!logged){
    return(

      <h2>Debes estar logueado</h2>
    )
  }

  if(logged && cart.length === 0){

    return( 

      <h2>Debes agregar productos al carrito para ver el checkout</h2>
      
    )

   
  }
 
}

export default Checkout;


