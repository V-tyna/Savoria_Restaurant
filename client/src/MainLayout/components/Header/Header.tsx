import classes from './Header.module.css';
import logo from '../../../assets/logo-savoria-main.png';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className={classes['header-block']}>
			<div>
				<img className={classes.logo} src={logo} alt='logo-savoria' />
			</div>
			<div className={classes['links-area']}>
				<NavLink
					className={({ isActive }) => (isActive ? classes.active : '')}
					to='/home'
				>
					Home
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? classes.active : '')}
					to='/menu'
				>
					Menu
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? classes.active : '')}
					to='/'
				>
					Specials
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? classes.active : '')}
					to='/about'
				>
					About
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? classes.active : '')}
					to='/user-profile'
				>
					Cabinet
				</NavLink>
			</div>
		</header>
	);
};

export default Header;
