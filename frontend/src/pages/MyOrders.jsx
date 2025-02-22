import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

function MyOrders() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Recent Orders</h1>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
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
    );
}

export default MyOrders;
