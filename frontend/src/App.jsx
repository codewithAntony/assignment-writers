import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    BrowserRouter
} from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
// import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Wallet from './pages/Wallet';

const queryClient = new QueryClient();

function App() {
    <QueryClientProvider client={queryClient}>
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />

                <Route>
                    <Route
                        index
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/wallet" element={<Wallet />} />
                </Route>
            </Routes>
        </Router>
    </QueryClientProvider>;
}

export default App;
