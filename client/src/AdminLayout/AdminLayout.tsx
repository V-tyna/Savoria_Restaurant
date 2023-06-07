import { Outlet } from 'react-router-dom';

import classes from './AdminLayout.module.css';

const AdminLayout = () => {
	return (
		<div className={classes['admin-layout-root']}>
			<Outlet />
		</div>
	);
};

export default AdminLayout;
