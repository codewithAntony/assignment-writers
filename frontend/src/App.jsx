import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
}

export default App;
