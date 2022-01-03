import React from "react";
import { useContext } from "react/cjs/react.development";
import { CartContext } from "../../Context/CartContext";

function CartItem(product) {
  console.log(product);

  const { removeItem } = useContext(CartContext);

  return (
    <div>
      <h3> Titulo: {product.product.title} </h3>
      <img
        src={product.product.image}
        alt="electronic "
        style={{ width: "150px", heigth: "150px" }}
      ></img>
      <p> Precio: {product.product.price} </p>
      <p> Cantidad:{product.product.quantity} </p>

      <button
        className="btn btn-danger"
        onClick={() => removeItem(product.product.id)}
      >
        {" "}
        Borrar Item
      </button>
    </div>
  );
}

export default CartItem;
