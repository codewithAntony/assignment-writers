import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Fetching prders with token:', token);

                const response = await axios.get(
                    'http://localhost:3001/admin/orders',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                console.log('Orders data:', response.data);

                setOrders(response.data);
            } catch (error) {
                console.error(
                    'Error fetching orders:',
                    error.response?.data || error.message
                );
                toast.error('Failed to fetch orders');
                console.error(error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `http://localhost:3001/admin/orders/${orderId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(
                orders.map((order) =>
                    order._id === orderId ? { ...order, status } : order
                )
            );
            toast.success('Order updated successfully');
        } catch (error) {
            toast.error('Failed to update order');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-black container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">
                Admin Dashboard - All Orders
            </h1>
            {orders.length === 0 ? (
                <p>No order found</p>
            ) : (
                <div className="overflow-x-auto ">
                    <table className="min-w-full bg-black">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 border">User</th>
                                <th className="py-3 px-4 border">Order Type</th>
                                <th className="py-3 px-4 border">
                                    Academic Level
                                </th>
                                <th className="py-3 px-4 border">
                                    Writing Level
                                </th>
                                <th className="py-3 px-4 border">Title</th>
                                <th className="py-3 px-4 border">
                                    Description
                                </th>
                                <th className="py-3 px-4 border">Deadline</th>
                                <th className="py-3 px-4 border">Price</th>
                                <th className="py-3 px-4 border">Amount</th>
                                <th className="py-3 px-4 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="py-2 px-4 border">
                                        {order.user?.name || 'N/A'} (
                                        {order.user?.email || 'N/A'})
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.orderType || 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.academicLevel || 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.writingLevel || 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.title || 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border max-w-xs truncate">
                                        {order.description || 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.deadline
                                            ? new Date(
                                                  order.deadline
                                              ).toLocaleString()
                                            : 'N/A'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        ${order.price?.toFixed(2) || '0.00'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {order.amount || '1'}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <select
                                            value={order.status || 'pending'}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            className="border p-1 rounded"
                                        >
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="in-progress">
                                                In Progress
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="rejected">
                                                Rejected
                                            </option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
