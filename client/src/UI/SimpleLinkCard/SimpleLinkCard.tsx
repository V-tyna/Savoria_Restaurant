import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './SimpleLinkCard.module.css';

const SimpleLinkCard: FC<{
	link: string;
	name: string;
	marginInRems?: number;
}> = ({ link, name, marginInRems }) => {
	return (
		<div
			className={classes['card-block']}
			style={{ margin: `${marginInRems ? marginInRems : 1}rem` }}
		>
			<div className={classes['left-yellow-large-block']}></div>
			<div className={classes['right-yellow-large-block']}></div>
			<div className={classes['left-yellow-small-block']}></div>
			<div className={classes['right-yellow-small-block']}></div>
			<Link to={link}>{name}</Link>
		</div>
	);
};

export default SimpleLinkCard;
