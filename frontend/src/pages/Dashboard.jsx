import React from 'react';
import { ShoppingCart, FileText, CheckCircle, Clock } from 'lucide-react';

const StatsCard = ({ icon: Icon, title, value, className }) => (
    <div className={`glass rounded-xl p-6 card-hover ${className}`}>
        <div className="flex items-center gap-4">
            <Icon size={24} className="text-white" />
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <h3 className="text-2xl font-semibold">{value}</h3>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="animate-page">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard
                    icon={ShoppingCart}
                    title="Total Orders"
                    value="0"
                    className="bg-gradient-to-br from-blue-500/20 to-blue-600/20"
                />
                <StatsCard
                    icon={FileText}
                    title="Total Invoices"
                    value="0"
                    className="bg-gradient-to-br from-purple-500/20 to-purple-600/20"
                />
                <StatsCard
                    icon={CheckCircle}
                    title="Completed Orders"
                    value="0"
                    className="bg-gradient-to-br from-green-500/20 to-green-600/20"
                />
            </div>

            <div className="mt-8 glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Clock size={48} className="mb-4" />
                    <p>No Orders Found</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
