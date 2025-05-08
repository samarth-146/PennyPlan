import { useRoutes, useNavigate } from 'react-router-dom'
import { useAuth } from './authContext';
import Signup from './components/auth/Signup';
import { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Signin from './components/auth/Signin';
import Onboard from './components/auth/Onboard';
import DashboardHome from './components/Home/Dashboardhome';
import ExpenseTracker from './components/Home/ExpenseTracker';
import UserProfile from './components/Home/UserProfile';
import NotificationCenter from './components/Home/NotificationCenter';

const ProjectRouter = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useAuth();
    useEffect(() => {
        const userIdStorage = localStorage.getItem("userId");
        if (userIdStorage && !currentUser) {
            setCurrentUser(userIdStorage);
        }
        if (!userIdStorage && !["/auth", "/signup","/dashboard"].includes(window.location.pathname)) {
            navigate('/auth');
        }
        if (userIdStorage && ['/auth', '/signup'].includes(window.location.pathname)) {
            navigate('/dashboard');
        }

    }, [currentUser, navigate, setCurrentUser]);

    let route = useRoutes([
        {
            path: '/auth',
            element: <Signin />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/onboard',
            element: <Onboard />
        },
        {
            path:'/',
            element:<DashboardHome/>
        },
        {
            path:'/expense',
            element:<ExpenseTracker/>
        },
        {
            path:'/profile',
            element:<UserProfile/>
        },
        {
            path:'/warnings',
            element:<NotificationCenter/>
        }
    ]);
    return route;

}

export default ProjectRouter;