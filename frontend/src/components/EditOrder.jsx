// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// const EditOrder = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [order, setOrder] = useState({
//         title: '',
//         orderType: '',
//         academicLevel: '',
//         writingLevel: '',
//         course: '',
//         service: '',
//         description: '',
//         deadline: '',
//         price: '',
//         amount: 1
//     });
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);

//     useEffect(() => {
//         const fetchOrder = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get(`/orders/${id}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setOrder({
//                     ...response.data,
//                     deadline: response.data.deadline.split('T')[0] // Format date for input
//                 });
//             } catch (error) {
//                 toast.error('Failed to load order details');
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrder();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setOrder((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);

//         try {
//             const token = localStorage.getItem('token');
//             await axios.put(`/orders/${id}`, order, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             toast.success('Order updated successfully!');
//             navigate(`/dashboard/order/${id}`);
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || 'Failed to update order'
//             );
//             console.error(error);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     const handleBack = () => {
//         navigate(`/dashboard/order/${id}`);
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
//                 Back to Order
//             </button>

//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="p-6 border-b">
//                     <h1 className="text-2xl font-bold">Edit Order</h1>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Basic Information */}
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Order Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={order.title}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Order Type
//                                 </label>
//                                 <select
//                                     name="orderType"
//                                     value={order.orderType}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 >
//                                     <option value="">Select type</option>
//                                     <option value="Essay">Essay</option>
//                                     <option value="Research Paper">
//                                         Research Paper
//                                     </option>
//                                     <option value="Case Study">
//                                         Case Study
//                                     </option>
//                                     <option value="Dissertation">
//                                         Dissertation
//                                     </option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Academic Level
//                                 </label>
//                                 <select
//                                     name="academicLevel"
//                                     value={order.academicLevel}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 >
//                                     <option value="">Select level</option>
//                                     <option value="High School">
//                                         High School
//                                     </option>
//                                     <option value="College">College</option>
//                                     <option value="Undergraduate">
//                                         Undergraduate
//                                     </option>
//                                     <option value="Master">Master</option>
//                                     <option value="PhD">PhD</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Writing Level
//                                 </label>
//                                 <select
//                                     name="writingLevel"
//                                     value={order.writingLevel}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 >
//                                     <option value="">Select level</option>
//                                     <option value="Standard">Standard</option>
//                                     <option value="Premium">Premium</option>
//                                     <option value="Platinum">Platinum</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Course Details */}
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Course Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="course"
//                                     value={order.course}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Service Type
//                                 </label>
//                                 <select
//                                     name="service"
//                                     value={order.service}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 >
//                                     <option value="">Select service</option>
//                                     <option value="Writing">Writing</option>
//                                     <option value="Editing">Editing</option>
//                                     <option value="Proofreading">
//                                         Proofreading
//                                     </option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     value={order.description}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     rows="3"
//                                 />
//                             </div>
//                         </div>

//                         {/* Payment & Deadline */}
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Price ($)
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={order.price}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     min="0"
//                                     step="0.01"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Amount
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="amount"
//                                     value={order.amount}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     min="1"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Deadline
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="deadline"
//                                     value={order.deadline}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border rounded"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-8 flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={handleBack}
//                             className="px-4 py-2 border rounded hover:bg-gray-100"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={submitting}
//                             className={`flex items-center px-6 py-2 rounded text-white ${
//                                 submitting
//                                     ? 'bg-blue-400'
//                                     : 'bg-blue-500 hover:bg-blue-600'
//                             }`}
//                         >
//                             {submitting ? (
//                                 'Saving...'
//                             ) : (
//                                 <>
//                                     <CheckCircleIcon className="h-5 w-5 mr-2" />
//                                     Save Changes
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EditOrder;
