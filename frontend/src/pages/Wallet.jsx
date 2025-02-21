import { Search } from 'lucide-react';
import React from 'react';

const Wallet = () => {
    return (
        <div className="animate-page">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Total Balance</h1>
                    <p className="text-4xl font-bold text-teal-200 mt-2">
                        KES 0.00
                    </p>
                </div>
                <button className="bg-teal-200 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Add Funds
                </button>
            </div>

            <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Transactions</h2>
                <div className="mb-4">
                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 transform translate-y-1/2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search transactions"
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-50"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <p>No transactions found</p>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
