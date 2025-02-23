import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateOrder() {
    const [orderType, setOrderType] = useState('non-technical');
    const [academicLevel, setAcademicLevel] = useState('');
    const [writingLevel, setWritingLevel] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedServices, setSelectedServices] = useState('');
    const [spacing, setSpacing] = useState('');
    const [file, setFile] = useState(null);
    const [deadline, setDeadline] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const preventDefault = (event) => {
        event.preventDefault();
    };

    const handleCreateOrder = () => {
        navigate('/dashboard/create-order');
    };

    const courses = [
        'Select a course',
        'Archaeology',
        'Architecture',
        'Arts',
        'Astronomy',
        'Biology',
        'Business',
        'Chemistry',
        'Childcare',
        'Computers',
        'Counseling',
        'Criminology',
        'Economics',
        'Education',
        'Engineering',
        'Environmental-Studies',
        'Ethics',
        'Ethnic-Studies',
        'Finance',
        'Food-Nutrition',
        'Geography',
        'Healthcare',
        'History',
        'Law',
        'Linguistics',
        'Literature',
        'Management',
        'Mathematics',
        'Medicine',
        'Music',
        'Nursing',
        'Philosophy',
        'Physical-Education',
        'Physics',
        'Political-Science',
        'Programming',
        'Pyschology',
        'Religion',
        'Sociology',
        'Statistics'
    ];

    const services = [
        'Select a services',
        'Powerpoint',
        'Tutor',
        'Online exam and CATS',
        'Assignments',
        'Essays',
        'Discussion Posts',
        'Articles (Any Type)',
        'Assignment',
        'Content (Any Type)',
        'Admission Essay',
        'Annotated Bibliography',
        'Argumentative Essay',
        'Article Review',
        'Book/Movie Review',
        'Business Plan',
        'Capstone Project',
        'Case Study',
        'Coursework',
        'Creative Writing',
        'Critical Thinking',
        'Dissertation',
        'Dissertation Chapter',
        'Lab Report',
        'Math Problem',
        'Research Paper',
        'Research Proposal',
        'Research Summary',
        'Scholarship Essay',
        'Speech',
        'Statistic Project',
        'Term Paper',
        'Thesis/Thesis Chapter',
        'Other',
        'Presentation or Speech',
        'Q&A',
        'Speech Work',
        'Application Paper',
        'Analysis',
        'Outline',
        'Personal Reflection',
        'Presentation/PPT',
        'Report (Any Type)',
        'Response Essay',
        'Acceptance Letter',
        'Online Exam',
        'Revision Paper',
        'Blog Writing',
        'Executive Summary'
    ];

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Select Your Order Type</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <button
                    className={`p-6 rounded-lg text-left ${
                        orderType === 'non-technical'
                            ? 'bg-gray-700'
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
                        Create Essay Order
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
                                placeholder="Enter Your essay title"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Select Your Course
                            </label>
                            <select
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                value={selectedCourse}
                                onChange={(e) =>
                                    setSelectedCourse(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Choose Subject Area
                                </option>
                                {courses.map((course) => (
                                    <option key={course} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Select Service
                            </label>
                            <select
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                value={selectedServices}
                                onChange={(e) =>
                                    setSelectedServices(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Choose Service
                                </option>
                                {services.map((service) => (
                                    <option key={service} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Writing Requirements
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    'APA',
                                    'MLA',
                                    'Havard',
                                    'Chicago',
                                    'Turabian',
                                    'Other'
                                ].map((level) => (
                                    <button
                                        key={level}
                                        className={`px-4 py-2 rounded-lg ${
                                            writingLevel === level
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                        onClick={() => setWritingLevel(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Spacing
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Single Spacing', 'Double Spacing'].map(
                                    (level) => (
                                        <button
                                            key={level}
                                            className={`px-4 py-2 rounded-lg ${
                                                spacing === level
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                            onClick={() => setSpacing(level)}
                                        >
                                            {level}
                                        </button>
                                    )
                                )}
                            </div>
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
                                min={0}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                            <p className="text-white text-sm pt-2">
                                One page is approximately 275 words
                            </p>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Essay Details
                            </label>
                            <p className="text-white text-sm mb-2">
                                Description
                            </p>
                            <textarea
                                placeholder="Describe your essay requirements in details"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg h-32"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-4">
                                Price
                            </label>
                            <input
                                type="number"
                                defaultValue={250}
                                min={250}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                            <p className="text-white text-sm pt-2">
                                Min: KES 250
                            </p>
                        </div>

                        <div className="w-full">
                            <DatePicker
                                selected={deadline}
                                onChange={(date) => setDeadline(date)}
                                minDate={new Date()}
                                dateFormat="yyyy-MM-dd"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                placeholderText="Select deadline"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold my-4">
                                Essay Details
                            </label>
                            <div
                                className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-900 text-white"
                                onDrop={handleDrop}
                                onDragOver={preventDefault}
                                onDragEnter={preventDefault}
                                onDragLeave={preventDefault}
                            >
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="fileInput"
                                    className="block cursor-pointer"
                                >
                                    <p className="text-lg font-semibold">
                                        Drag and Drop your files
                                    </p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        Or Click here to upload
                                    </p>
                                </label>
                                {file && (
                                    <p className="text-green-400 mt-4">
                                        Selected File: {file.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleCreateOrder}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Create Order
                        </button>
                    </div>
                </div>
            )}

            {orderType === 'technical' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">
                        Create Technical Assignment
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold ">
                                Basic Information
                            </label>
                            <p className="text-white text-sm mt-3 mb-1">
                                Title
                            </p>
                            <input
                                type="text"
                                placeholder="Enter Your essay title"
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mt-6 mb-1">
                            Essay Details
                        </label>
                        <p className="text-white text-sm mb-2">Description</p>
                        <textarea
                            placeholder="Describe your essay requirements in details"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg h-32"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mt-6 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            defaultValue={250}
                            min={250}
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                        />
                        <p className="text-white text-sm mt-6 mb-1">
                            Min: KES 250
                        </p>
                    </div>

                    <div className="w-full">
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                            placeholderText="Select deadline"
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mt-6 mb-1">
                            Amount of Assignment
                        </label>
                        <p className="text-white text-sm mb-2">Amount</p>
                        <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold mt-6 mb-1">
                            Essay Details
                        </label>
                        <div
                            className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-900 text-white"
                            onDrop={handleDrop}
                            onDragOver={preventDefault}
                            onDragEnter={preventDefault}
                            onDragLeave={preventDefault}
                        >
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="block cursor-pointer"
                            >
                                <p className="text-lg font-semibold">
                                    Drag and Drop your files
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Or Click here to upload
                                </p>
                            </label>
                            {file && (
                                <p className="text-green-400 mt-4">
                                    Selected File: {file.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleCreateOrder}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Create Assignment
                    </button>
                </div>
            )}
        </div>
    );
}

export default CreateOrder;
