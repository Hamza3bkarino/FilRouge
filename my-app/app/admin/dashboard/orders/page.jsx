'use client'
import { useSelector, useDispatch } from "react-redux";
import { removeOrder } from "@/app/lib/Redux/orderSlice"; // adjust path if needed

export default function Orders() {
  const orders = useSelector((state) => state.orders.items);
  const dispatch = useDispatch();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 rounded-xl border border-white/10">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Cart Items</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Total</th>
                <th className="px-4 py-2 text-left text-xs font-bold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t border-white/10 hover:bg-gray-800 transition">
                  <td className="px-4 py-2 text-sm text-white">{order.customer?.name || "Unknown"}</td>
                  <td className="px-4 py-2 text-sm text-gray-400">{order.customer?.email || "N/A"}</td>
                  <td className="px-4 py-2 text-sm text-white">
                    <ul className="space-y-2">
                      {order.cart.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-md border border-white/10"
                            />
                          )}
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className="text-gray-400 text-xs">
                              Quantity: {item.quantity} | Price: ${item.price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-green-500">${order.total}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => dispatch(removeOrder(index))}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-400 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
