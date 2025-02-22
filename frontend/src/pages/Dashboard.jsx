import React from 'react';
import {
    ShoppingCartIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-100">
                                TOTAL ORDERS
                            </p>
                            <h2 className="text-4xl font-bold">0</h2>
                        </div>
                        <ShoppingCartIcon className="h-12 w-12 text-blue-200" />
                    </div>
                </div>

                <div className="bg-blue-600 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-100">
                                TOTAL INVOICES
                            </p>
                            <h2 className="text-4xl font-bold">0</h2>
                        </div>
                        <DocumentTextIcon className="h-12 w-12 text-blue-200" />
                    </div>
                </div>

                <div className="bg-emerald-500 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-emerald-100">
                                COMPLETED ORDERS
                            </p>
                            <h2 className="text-4xl font-bold">0</h2>
                        </div>
                        <CheckCircleIcon className="h-12 w-12 text-emerald-200" />
                    </div>
                </div>
            </div>

            <div className="bg-amber-500 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-amber-100">PENDING ORDERS</p>
                        <h2 className="text-4xl font-bold">0</h2>
                    </div>
                    <ClockIcon className="h-12 w-12 text-amber-200" />
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Orders</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Create Order
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                    <div className="bg-red-500/20 p-6 rounded-full mb-4">
                        <ClockIcon className="h-12 w-12 text-red-500" />
                    </div>
                    <p className="text-xl text-gray-400">No Orders Found</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
