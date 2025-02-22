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

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                <Route path="/dashboard" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="my-orders" element={<MyOrders />} />
                    <Route path="create-order" element={<CreateOrder />} />
                    <Route path="messages" element={<Messages />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
