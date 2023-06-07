import SimpleLinkCard from '../../UI/SimpleLinkCard/SimpleLinkCard';

import classes from './AdminDashboard.module.css';

const AdminDashboardPage = () => {
	return (
		<div className={classes['admin-dashboard-layout']}>
			<h1>Admin Dashboard</h1>
			<div className={classes['categories-block']}>
				<SimpleLinkCard link={'/admin/dashboard/menu'} name={'Menu updating'} />
				<SimpleLinkCard
					link={'/admin/dashboard/statistic'}
					name={'Statistic'}
				/>
				<SimpleLinkCard
					link={'/admin/dashboard/accounting'}
					name={'Accounting'}
				/>
			</div>
		</div>
	);
};

export default AdminDashboardPage;
