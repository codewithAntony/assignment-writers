import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import Home from './components/Home';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallet from './pages/Wallet';
import MyOrders from './pages/MyOrders';
import Messages from './pages/Messages';
import CreateOrder from './pages/CreateOrder';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
// import EditOrder from './components/EditOrder';
// import OrderDetails from './components/OrderDetails';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen bg-white">
                    <ToastContainer />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Home />} />

                        <Route element={<ProtectedRoute />}>
                            <Route element={<Layout />}>
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route
                                    path="/dashboard/wallet"
                                    element={<Wallet />}
                                />
                                <Route
                                    path="/dashboard/my-orders"
                                    element={<MyOrders />}
                                />
                                {/* <Route
                                    path="/dashboard/orders/:id"
                                    element={<OrderDetails />}
                                />
                                <Route
                                    path="/dashboard/order/:id/edit"
                                    element={<EditOrder />}
                                /> */}
                                <Route
                                    path="/dashboard/create-order"
                                    element={<CreateOrder />}
                                />
                                <Route
                                    path="/dashboard/messages"
                                    element={<Messages />}
                                />
                            </Route>

                            <Route
                                path="/admin/dashboard"
                                element={<AdminDashboard />}
                            />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
