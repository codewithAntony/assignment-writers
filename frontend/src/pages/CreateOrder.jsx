import React, { useState } from 'react';

function CreateOrder() {
    const [orderType, setOrderType] = useState('non-technical');
    const [academicLevel, setAcademicLevel] = useState('');

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Select Your Order Type</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                    className={`p-6 rounded-lg text-left ${
                        orderType === 'non-technical'
                            ? 'bg-orange-500'
                            : 'bg-gray-800'
                    }`}
                    onClick={() => setOrderType('non-technical')}
                >
                    <h3 className="text-xl font-bold mb-2">
                        Non-Technical Assignment
                    </h3>
                    <p className="text-sm opacity-80">
                        Essays, research papers, and other written assignments
                    </p>
                </button>

                <button
                    className={`p-6 rounded-lg text-left ${
                        orderType === 'technical'
                            ? 'bg-gray-700'
                            : 'bg-gray-800'
                    }`}
                    onClick={() => setOrderType('technical')}
                >
                    <h3 className="text-xl font-bold mb-2">
                        Technical Assignment
                    </h3>
                    <p className="text-sm opacity-80">
                        Dashboard assignments, quizzes, coding tasks, and
                        technical coursework
                    </p>
                </button>
            </div>

            {orderType === 'non-technical' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">
                        Non Technical Essay
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Select Academic Level
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    'High School',
                                    'Undergraduate',
                                    'Masters',
                                    'PhD'
                                ].map((level) => (
                                    <button
                                        key={level}
                                        className={`px-4 py-2 rounded-lg ${
                                            academicLevel === level
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                        onClick={() => setAcademicLevel(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your Topic"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Select Your Course
                            </label>
                            <select className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg">
                                <option>Choose Subject Area</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Select Service
                            </label>
                            <select className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg">
                                <option>Choose Service</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Paper Description
                            </label>
                            <textarea
                                placeholder="Enter Paper Description"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg h-32"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Deadline
                            </label>
                            <input
                                type="date"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Enter the number of Pages
                            </label>
                            <input
                                type="number"
                                defaultValue={0}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateOrder;
