# Tienda_basualdo
## Proyecto e-commerce 

Este proyecto se realiza como parte del curso de React en CoderHouse.

## ¿Como instalarlo?

- Descargar/clonar código del proyecto.
- Abrir una terminal.
- Dentro de la terminal navegar a la ruta del proyecto.
- Ejecutar el comando 'npm install' o 'npm i'
- Finalizada la instalación ejecutar el comando 'npm start'.

## Características.
El objetivo de este proyecto es crear un e-commerce con funcionalidad real. 

Los datos de los productos se obtienen,de una base de datos, en este caso Firebase.
Además cuenta con Inicio de Sesión mediante mail y contraseña o mediante cuenta de google utilizando la funcionalidad Authentication de Firebase.

La validación de los diferentes formularios se llevó a cabo mediante la librería Formik + Yup.

## Tecnologías

En este proyecto se utiliza: 

- React Js.
- Boostrap
- Firebase
-Formik


## Rutas
En este proyecto se utiliza React router para el enrutado.
Sus rutas son:
- "/" navega a la Home.
- "/category/:categoryId" navega a la categoría por id.
- "/item/:id" navega al detalle del item por id.
- "/cart" navega al carrito de compras del usuario.Ruta restringida,solo visible al iniciar sesión.
-"/checkout" navega al fin de la operación de compra.




## Licencia

MIT


