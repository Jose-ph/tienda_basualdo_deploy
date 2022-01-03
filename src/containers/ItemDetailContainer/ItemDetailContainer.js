import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../../components/ItemDetail/ItemDetail";


import { dataBase } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore/lite";
import Loader from "../../components/Loader/Loader";

function ItemDetailContainer() {
  const [products, setProducts] = useState([]);

  //Con esto obtengo el id del producto para el detalle
  const { id } = useParams();

  useEffect(() => {
    

    //1 referencia al documento de firebase

    const documentRef = doc(dataBase, "products", id);

    // 2 Peticion a la referencia

    getDoc(documentRef)
      .then((doc) => {
        const item = {
          id: doc.id,
          ...doc.data(),
        };

        console.log(item);
        setProducts(item);
      })

      .finally(() => {
        
      });
  }, [id]);

  return (
    <div>
      {products.length === 0 ? <Loader /> : <ItemDetail products={products} />}
    </div>
  );
}

export default ItemDetailContainer;

