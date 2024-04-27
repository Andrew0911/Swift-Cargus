import { Navigate, createBrowserRouter } from "react-router-dom"
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import AWB from "./components/AWB";
import Tracking from "./components/Tracking";
import Profile from "./components/Profile";
import FinalizeAWB from "./components/FinalizeAWB";
import PrintAWB from "./components/PrintAWB";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Navigate to='/'/>
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'awb',
                element: <AWB />
            },
            {
                path: 'tracking',
                element: <Tracking />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'awb-finalize',
                element: <FinalizeAWB />
            },
            {
                path: 'print',
                element: <PrintAWB />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
])

export default router;