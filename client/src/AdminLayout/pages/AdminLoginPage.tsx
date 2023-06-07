import { Form, useActionData, useSearchParams } from 'react-router-dom';
import ButtonSubmit from '../../UI/ButtonSubmit/ButtonSubmit';
import { LoginErrors } from '../models/loginErrors';

import classes from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
	const [searchParams] = useSearchParams();
	const isTokenExpired = !!searchParams.get('isExp');

	const errors = useActionData() as LoginErrors;

	return (
		<div className={classes['login-page-layer']}>
			<h1>Admin access</h1>
			{isTokenExpired ? (
				<h3>'The token has expired. Please login again.'</h3>
			) : null}
			<Form method='post'>
				<div className={classes['form-block']}>
					<label htmlFor='email'>Email: </label>
					<input type='email' id='email' name='email' required />
					<small>{errors?.email}</small>
				</div>
				<div className={classes['form-block']}>
					<label htmlFor='password'>Password: </label>
					<input type='password' id='password' name='password' required />
					<small>{errors?.password}</small>
				</div>
				<div className={classes['button-block']}>
					<ButtonSubmit buttonName={'Login'} buttonStyle={'yellow'} />
				</div>
			</Form>
		</div>
	);
};

export default AdminLoginPage;
