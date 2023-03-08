import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Modal = () => {
  const { id } = useParams();
  const { data: products } = useSelector(state => state.products);

  const product = products.find(product => product._id === id);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default Modal;


