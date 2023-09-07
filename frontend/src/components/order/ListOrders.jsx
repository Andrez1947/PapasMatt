import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders, clearErrors } from '../../actions/orderActions';

import Loader from '../Loader';

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Id de la orden',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Cantidad de productos',
          field: 'numOfItems',
          sort: 'asc',
        },
        {
          label: 'Valor Total',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Estado del pedido',
          field: 'status',
          sort: 'asc',
        },
        {
          label: 'Acciones',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: order.orderStatus && String(order.orderStatus).includes('Entregado')
          ? <p className="text-green-500">{order.orderStatus}</p>
          : <p className="text-red-500">{order.orderStatus}</p>,
        actions:
          <Link to={`/order/${order._id}`} className='btn btn-primary'>
            <i className='fa fa-eye'></i>
          </Link>,
      });
    });
    return data;
  };

  return (
    <Fragment>
      <h1 className='margin-top-5'>Mis órdenes</h1>

      {loading ? <Loader /> : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {setOrders().columns.map((column, index) => (
                <th key={index} className="border border-gray-300 p-2">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {setOrders().rows.map((row, index) => (
              <tr key={index} className="border border-gray-300">
                {Object.values(row).map((value, index) => (
                  <td key={index} className="border border-gray-300 p-2">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

export default ListOrders;
