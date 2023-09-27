import React, { Fragment, useEffect, useState  } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { clearErrors, getOrderDetails } from '../../actions/orderActions';

const OrdeningComponent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.orderDetails);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/order/${params.id}`);
                setOrder(response.data);
            } catch (error) {
                alert.error('No se pudo obtener la información de la orden');
            }
        };

        fetchOrderDetails();
    }, [alert, params.id]);

    if (loading || order === null) {
        return <p>Cargando información de la orden...</p>;
    }

    const { shippingInfo, items, pagoInfo, user, precioTotal, estado } = order;


  return (
    <Fragment>           
            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Pedido # {order._id}</h1>

                            <h4 className="mb-4">Datos de envio</h4>
                            <p><b>Nombre:</b> {user && user.name}</p>
                            <p><b>Telefono:</b> {shippingInfo && shippingInfo.phone}</p>
                            <p className="mb-4"><b>Dirección:</b>{shippingInfo.city}</p>
                            <p><b>Pago Total:</b> ${precioTotal}</p>

                            <hr />

                            <h4 className="my-4">Pago</h4>
                            

                            <h4 className="my-4">Estado del pedido:</h4>
                            <p className={order.estado && String(order.estado).includes('Entregado') ? "greenColor" : "redColor"} ><b>{estado}</b></p>

                            <h4 className="my-4">Productos Comprados:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {items && items.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.imagen} alt={item.nombre} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/producto/${item.product}`}>{item.nombre}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.precio}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.cantidad} Unidad(es)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Atrás</button>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
  )
}

export default OrdeningComponent;