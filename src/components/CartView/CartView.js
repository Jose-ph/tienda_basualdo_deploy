import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react/cjs/react.development";
import { CartContext } from "../../Context/CartContext";
import CartItem from "../CartItem/CartItem";

import { UserContext } from "../../Context/UserContext";

function CartView() {
  const { cart, totalPurchase, clearCart } = useContext(CartContext);
  const { push } = useHistory();

  const { logged } = useContext(UserContext);

  if (cart.length === 0 && logged) {
    return (
      <>
        <h3>Carrito Vacio</h3>
        <button className="btn btn-info" onClick={() => push("/")}>
          Volver
        </button>
      </>
    );
  } else if (cart.length > 0 && logged) {
    return (
      <>
        <div id="carrito">
          <h3> Su compra:</h3>

          {cart.map((products) => (
            <CartItem product={products} key={products.id} />
          ))}

          <h2>Total: $ {totalPurchase()} </h2>

          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              clearCart();
            }}
          >
            Borrar carrito
          </button>
          <button className="btn btn-success" onClick={() => push("/checkout")}>
            Finalizar compra
          </button>
        </div>
      </>
    );
  } else {
    return <h1>Para ver el carrito debes estar logueado</h1>;
  }
}

export default CartView;
