import React from 'react';

const OrderHistory = () => {
  


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
      </table>
    </div>
  );
};

export default OrderHistory;
