import { FC } from 'react';

import classes from './ButtonSubmit.module.css';

const ButtonSubmit: FC<{
	buttonName: string;
	buttonStyle?: 'black' | 'yellow';
}> = ({ buttonName, buttonStyle }) => {
	return (
		<button
			type='submit'
			className={classes[buttonStyle ? buttonStyle : 'black']}
		>
			{buttonName}
		</button>
	);
};

export default ButtonSubmit;
