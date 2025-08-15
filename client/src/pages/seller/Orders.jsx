import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { assets, dummyOrders } from '../../assets/assets';

function Orders() {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gray-50">
      <div className="md:p-10 p-4 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">📦 Orders List</h2>

        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[1fr_2fr_auto_auto] md:items-center gap-6 p-6 max-w-5xl rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Product Image + Items */}
            <div className="flex items-start gap-4">
              <img
                className="w-14 h-14 object-cover bg-gray-100 p-2 rounded-lg"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="font-medium text-gray-800">
                    {item.product.name}{' '}
                    <span className="text-primary font-semibold">
                      x {item.quantity}
                    </span>
                  </p>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="text-sm md:text-base text-gray-600 leading-relaxed">
              <p className="text-gray-800 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p className="mt-1">📞 {order.address.phone}</p>
            </div>

            {/* Amount */}
            <p className="font-bold text-lg text-green-600 text-center">
              {currency}{order.amount}
            </p>

            {/* Order Info */}
            <div className="text-sm md:text-base text-gray-600 space-y-1 text-center md:text-right">
              <p><span className="font-medium">Method:</span> {order.paymentType}</p>
              <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>
                <span className="font-medium">Payment:</span>{' '}
                <span className={order.isPaid ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
