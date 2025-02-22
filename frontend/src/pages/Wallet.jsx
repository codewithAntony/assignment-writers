import React, { useState } from 'react';

function Wallet() {
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFilter, setTimeFilter] = useState('This week');

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Total Balance</h2>
                    <p className="text-3xl font-bold text-emerald-500">
                        KES 0.00
                    </p>
                </div>
                <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600">
                    Add Funds
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Transactions</h3>

                <div className="flex justify-between items-center mb-6">
                    <input
                        type="text"
                        placeholder="Search for transactions"
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option>This week</option>
                        <option>This month</option>
                        <option>This year</option>
                    </select>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-400">
                            <th className="pb-4">DESCRIPTION</th>
                            <th className="pb-4">DATE</th>
                            <th className="pb-4 text-right">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>{/* Add transaction rows here */}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Wallet;
