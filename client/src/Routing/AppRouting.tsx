import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
]);

const RoutingPage = () => {
	return <RouterProvider router={router} />;
};

export default RoutingPage;
