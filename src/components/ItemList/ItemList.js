import React from 'react'
import Item from '../Items/Item'

function ItemList({products}) {

  

    return (
        <div className= 'd-flex flex-wrap' id='prueba'>

            {products.map(productsElement => {

                return  <Item products = {productsElement}  key={productsElement.id.toString()}  /> 
            } )}

           
        </div>
    )
}

export default ItemList
