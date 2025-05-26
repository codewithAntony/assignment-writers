// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import {
//     ArrowLeftIcon,
//     ClockIcon,
//     CheckCircleIcon,
//     PencilIcon,
//     DocumentTextIcon,
//     AcademicCapIcon,
//     CurrencyDollarIcon,
//     CalendarIcon
// } from '@heroicons/react/24/outline';

// const OrderDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [order, setOrder] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`/orders/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrder(response.data);
//             } catch (error) {
//                 toast.error('Failed to load order details');
//                 console.error(error);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     const handleEdit = () => {
//         navigate(`/dashboard/order/${id}/edit`);
//     };

//     const handleBack = () => {
//         navigate('/dashboard/my-orders');
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//         );
//     }

//     if (!order) {
//         return (
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <p className="text-xl text-gray-500">Order not found</p>
//                 <button
//                     onClick={handleBack}
//                     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 >
//                     Back to Orders
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <button
//                 onClick={handleBack}
//                 className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
//             >
//                 <ArrowLeftIcon className="h-5 w-5 mr-2" />
//                 Back to Orders
//             </button>

//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 {/* Order Header */}
//                 <div className="p-6 border-b">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <h1 className="text-2xl font-bold">
//                                 {order.title}
//                             </h1>
//                             <div
//                                 className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
//                                     order.status === 'completed'
//                                         ? 'bg-green-100 text-green-800'
//                                         : order.status === 'in-progress'
//                                           ? 'bg-blue-100 text-blue-800'
//                                           : 'bg-yellow-100 text-yellow-800'
//                                 }`}
//                             >
//                                 {order.status === 'completed' ? (
//                                     <CheckCircleIcon className="h-4 w-4 mr-1" />
//                                 ) : (
//                                     <ClockIcon className="h-4 w-4 mr-1" />
//                                 )}
//                                 {order.status}
//                             </div>
//                         </div>
//                         <button
//                             onClick={handleEdit}
//                             className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
//                         >
//                             <PencilIcon className="h-5 w-5 mr-2" />
//                             Edit Order
//                         </button>
//                     </div>
//                 </div>

//                 {/* Order Progress */}
//                 <div className="p-6 border-b">
//                     <h2 className="font-semibold mb-4">Order Progress</h2>
//                     <div className="flex justify-between text-sm text-gray-600 mb-2">
//                         <span>1 Submitted</span>
//                         <span>2 Payment</span>
//                         <span>3 Assigned</span>
//                         <span>4 Approval</span>
//                         <span>5 Completed</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2.5">
//                         <div
//                             className="bg-blue-600 h-2.5 rounded-full"
//                             style={{
//                                 width: `${order.status === 'completed' ? '100%' : '25%'}`
//                             }}
//                         ></div>
//                     </div>
//                 </div>

//                 {/* Order Details */}
//                 <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <h3 className="font-semibold text-lg mb-4 flex items-center">
//                             <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-500" />
//                             Order Details
//                         </h3>
//                         <div className="space-y-3">
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Order Type
//                                 </p>
//                                 <p className="font-medium">{order.orderType}</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Academic Level
//                                 </p>
//                                 <p className="font-medium">
//                                     {order.academicLevel}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Writing Level
//                                 </p>
//                                 <p className="font-medium">
//                                     {order.writingLevel}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Service Type
//                                 </p>
//                                 <p className="font-medium">{order.service}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="font-semibold text-lg mb-4 flex items-center">
//                             <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
//                             Course Details
//                         </h3>
//                         <div className="space-y-3">
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Course Name
//                                 </p>
//                                 <p className="font-medium">{order.course}</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Description
//                                 </p>
//                                 <p className="font-medium">
//                                     {order.description}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="font-semibold text-lg mb-4 flex items-center">
//                             <CurrencyDollarIcon className="h-5 w-5 mr-2 text-gray-500" />
//                             Payment Details
//                         </h3>
//                         <div className="space-y-3">
//                             <div>
//                                 <p className="text-sm text-gray-500">Price</p>
//                                 <p className="font-medium">
//                                     ${order.price?.toFixed(2)}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Amount</p>
//                                 <p className="font-medium">
//                                     {order.amount || 1}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Payment Status
//                                 </p>
//                                 <p className="font-medium">
//                                     {order.paymentStatus || 'Pending'}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h3 className="font-semibold text-lg mb-4 flex items-center">
//                             <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
//                             Timeline
//                         </h3>
//                         <div className="space-y-3">
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Deadline
//                                 </p>
//                                 <p className="font-medium">
//                                     {new Date(
//                                         order.deadline
//                                     ).toLocaleDateString()}{' '}
//                                     at{' '}
//                                     {new Date(
//                                         order.deadline
//                                     ).toLocaleTimeString()}
//                                 </p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">
//                                     Created At
//                                 </p>
//                                 <p className="font-medium">
//                                     {new Date(
//                                         order.createdAt
//                                     ).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Attachments */}
//                 {order.fileUrl && (
//                     <div className="p-6 border-t">
//                         <h3 className="font-semibold text-lg mb-4">
//                             Attachments
//                         </h3>
//                         <a
//                             href={`http://localhost:3001/${order.fileUrl}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:underline"
//                         >
//                             Download Attached File
//                         </a>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default OrderDetails;
