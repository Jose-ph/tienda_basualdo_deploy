
export const getPost = (idPost) =>{


    return new Promise((resolve,reject)=>{

        fetch(` https://fakestoreapi.com/products/${idPost}`)
        .then((response) => response.json())
        .then( data => resolve(data))
        .catch(err => {
            console.log("Falló la comunicación API")
            reject(err.message)
        })
        

})}

export const getPosts = () =>{


    return new Promise((resolve,reject)=>{

        fetch('https://fakestoreapi.com/products?limit=20')
        .then((response) => response.json())
        .then( data => resolve(data))
        .catch(err => {
            console.log("Falló la comunicación API")
            reject(err.message)
        })
        

})}

export const getPostsByCategory = (categoryId) =>{


    return new Promise((resolve,reject)=>{

        fetch(`https://fakestoreapi.com/products/category/${categoryId}`)
        .then((response) => response.json())
        .then( data => resolve(data))
        .catch(err => {
            console.log("Falló la comunicación API")
            reject(err.message)
        })
        

})}
