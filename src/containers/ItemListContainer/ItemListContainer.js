import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemList from "../../components/ItemList/ItemList";
import Loader from "../../components/Loader/Loader";



import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { dataBase } from "../../firebase/config";

function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
   

    //Esto viene de firebase

    //1 armado de referencia

    const productRef = collection(dataBase, "products");

    const queryFilter = categoryId
      ? query(productRef, where("category", "==", categoryId))
      : productRef;

    //2 Petición a la referencia

    getDocs(queryFilter)
      .then((response) => {
        const items = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(items);
        setProducts(items);
      })

      .finally(() => {
        
      });
  }, [categoryId]);

  console.log("Este post viene de la función", products);

  return (
    <div>
     

      {products.length !== 0 ? <ItemList products={products} /> : <Loader />}
    </div>
  );
}

export default ItemListContainer;

