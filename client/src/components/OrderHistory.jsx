import React from 'react';

const OrderHistory = () => {
  
  const orders = [
    { orderNumber: '12345', date: '2023-04-01', price: '$100.00' },
    { orderNumber: '67890', date: '2023-05-01', price: '$150.00' },
    { orderNumber: '54321', date: '2023-06-01', price: '$200.00' },
  ];

  return (
    <div className="container mx-auto px-4 pt-8 pb-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Order History</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order Number</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-center">{order.orderNumber}</td>
              <td className="py-2 px-4 border-b text-center">{order.date}</td>
              <td className="py-2 px-4 border-b text-center">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
