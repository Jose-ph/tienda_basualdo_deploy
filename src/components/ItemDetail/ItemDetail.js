import React, { useState, useContext } from "react";
import ItemCount from "../../containers/ItemCount/ItemCount";
import { useHistory } from "react-router";
import { CartContext } from "../../Context/CartContext";

function ItemDetail({ products }) {
  const { addItem } = useContext(CartContext);

  const { isInCart } = useContext(CartContext);

  const [buy, setBuy] = useState(false);

  const [qty, setqty] = useState(1);

  let stock = 20;

  const initial = 0;

  let history = useHistory();

  const handleAddCart = () => {
    if (isInCart(products.id)) {
      setBuy(true);

      alert("Producto existente");
    } else {
      if (qty > 0) {
        setBuy(true);
        console.log(buy);
        const newProduct = { ...products, quantity: qty };
        addItem(newProduct);
      }
    }
  };

  const goBack = () => {
    history.push("/");
  };
  const goCart = () => {
    history.push("/cart");
  };

  return (
    <div>
      <div className="d-flex justify-content-center" id="prueba-dos">
        <div
          className="card "
          style={{ width: "50rem", backgroundColor: " #20b9ee " }}
        >
          <div className="card-body d-flex flex-column justify-content-around">
            <img
              className="align-self-center"
              src={products.image}
              alt="logo prueba"
              style={{ width: "100px" }}
            />
            <h5 className="card-title align-self-center"> {products.title} </h5>
            <p className="card-text align-self-center">
              {" "}
              Precio :$ {products.price}{" "}
            </p>
            <p className="card-text align-self-center">
              {" "}
              Descripción: {products.description}{" "}
            </p>

            {!buy ? (
              <>
                <ItemCount
                  quantity={qty}
                  modifyQuantity={setqty}
                  stock={stock}
                  initial={initial}
                  onAdd={handleAddCart}
                >
                  {" "}
                </ItemCount>
                <button onClick={goBack} className="btn btn-success mt-2">
                  Volver
                </button>
              </>
            ) : (
              <>
                <button onClick={goBack} className="btn btn-success mt-2">
                  Volver
                </button>
                <button onClick={goCart} className="btn btn-success mt-2">
                  Terminar compra
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
