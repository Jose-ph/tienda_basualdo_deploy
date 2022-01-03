import { useHistory } from "react-router";

function Item({ products }) {
  let history = useHistory();

  const seeDetails = () => {
    history.push(`/item/${products.id}`);
  };

  return (
    <div>
      <div
        className="card"
        style={{ width: "18rem", backgroundColor: " #20b9ee " }}
      >
        <div className="card-body">
          <img
            src={products.image}
            alt="logo prueba"
            style={{ width: "200px", height: "200px" }}
          />
          <h5 className="card-title"> {products.title} </h5>
          <p className="card-text"> {products.description} </p>
          <button onClick={seeDetails} className="btn btn-success">
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
