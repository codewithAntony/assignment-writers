import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

function CreateOrder() {
    const [orderType, setOrderType] = useState('non-technical');
    const [academicLevel, setAcademicLevel] = useState('');
    const [writingLevel, setWritingLevel] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedServices, setSelectedServices] = useState('');
    const [spacing, setSpacing] = useState('');
    const [file, setFile] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 250,
        amount: 1
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const sendEmailNotification = async (orderDetails) => {
        try {
        const templateParams = {
            to_name: 'Admin', 
            from_name: 'Order System', 
            order_type: orderType,
            academic_level: academicLevel,
            title: formData.title,
            course: selectedCourse,
            service: selectedServices,
            writing_level: writingLevel,
            spacing: spacing,
            description: formData.description,
            deadline: deadline ? deadline.toLocaleString() : 'Not specified',
            price: formData.price,
            to_email: "antonymurithi51@gmail.com"
        }

        const response = await emailjs.send(
            import.meta.env.VITE_SERVICE_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_PUBLIC_KEY
        );

        if (response.status === 200) {
            console.log('Email notification sent successfully');
        }
    } catch (error) {
        console.error('Failed to send email notification:', error);
        toast.warning('Order created but email notification failed'); 
    }
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('orderType', orderType);
        formDataToSend.append('academicLevel', academicLevel);
        formDataToSend.append('writingLevel', writingLevel);
        formDataToSend.append('course', selectedCourse);
        formDataToSend.append('service', selectedServices);
        formDataToSend.append('spacing', spacing);
        formDataToSend.append(
            'deadline',
            deadline ? deadline.toISOString() : ''
        );

        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        if (file) {
            formDataToSend.append('file', file);
        }

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:3001/orders',
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                await sendEmailNotification(response.data);
                toast.success('Order created Successfully!');
                navigate('/dashboard/my-orders');
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Failed to create order'
            );
        } finally {
            setLoading(false);
        }
    };

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

    // const handleCreateOrder = () => {
    //     navigate('/dashboard/create-order');
    // };

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
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <button
                        type="button"
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
                            Essays, research papers, and other written
                            assignments
                        </p>
                    </button>

                    <button
                        type="button"
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
                                            type="button"
                                            key={level}
                                            className={`px-4 py-2 rounded-lg ${
                                                academicLevel === level
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                            onClick={() =>
                                                setAcademicLevel(level)
                                            }
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
                                    name="title"
                                    placeholder="Enter Your essay title"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
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
                                    required
                                >
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
                                    required
                                >
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
                                        'Harvard',
                                        'Chicago',
                                        'Turabian',
                                        'Other'
                                    ].map((level) => (
                                        <button
                                            type="button"
                                            key={level}
                                            className={`px-4 py-2 rounded-lg ${
                                                writingLevel === level
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-800 hover:bg-gray-700'
                                            }`}
                                            onClick={() =>
                                                setWritingLevel(level)
                                            }
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
                                                type="button"
                                                key={level}
                                                className={`px-4 py-2 rounded-lg ${
                                                    spacing === level
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-800 hover:bg-gray-700'
                                                }`}
                                                onClick={() =>
                                                    setSpacing(level)
                                                }
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
                                    name="description"
                                    placeholder="Enter Paper Description"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg h-32"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-lg font-semibold mb-4">
                                    Deadline
                                </label>
                                <DatePicker
                                    selected={deadline}
                                    onChange={(date) => setDeadline(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minDate={new Date()}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    placeholderText="Select deadline"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Price (KES)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    min="250"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="text-white text-sm pt-2">
                                    Min: KES 250
                                </p>
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Upload Files
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
                                <label className="block text-lg font-semibold mb-4">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter assignment title"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Describe your technical assignment requirements"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg h-32"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="w-full">
                                <label className="block text-lg font-semibold mb-4">
                                    Deadline
                                </label>
                                <DatePicker
                                    selected={deadline}
                                    onChange={(date) => setDeadline(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minDate={new Date()}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    placeholderText="Select deadline"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Price (KES)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    min="250"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="text-white text-sm pt-2">
                                    Min: KES 250
                                </p>
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Amount of Tasks
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    min="1"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Upload Files
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
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
                        loading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Creating Order...' : 'Create Order'}
                </button>
            </form>
        </div>
    );
}

export default CreateOrder;
