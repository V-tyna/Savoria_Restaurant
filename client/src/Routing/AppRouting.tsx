import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from '../AdminLayout/AdminLayout';
import { loginAction } from '../AdminLayout/loaders/loginAction';
import AdminDashboardPage from '../AdminLayout/pages/AdminDashboard';
import AdminLoginPage from '../AdminLayout/pages/AdminLoginPage';

import MainLayout from '../MainLayout/MainLayout';
import ErrorPage from '../MainLayout/pages/ErrorPage';
import HomePage from '../MainLayout/pages/HomePage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
		],
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <AdminLoginPage />,
				action: loginAction,
			},
			{
				path: '/admin/dashboard',
				element: <AdminDashboardPage />,
			},
			{
				path: '*',
				// TODO: Create Error page for Admin module
				element: <div>{'Error admin module: Invalid path'}</div>,
			},
		],
	},
]);

const RoutingPage = () => {
	return <RouterProvider router={router} />;
};

export default RoutingPage;
