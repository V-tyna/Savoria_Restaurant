import { FC } from 'react';
import classes from './ButtonArrow.module.css';

interface ButtonArrowProps {
	direction: string;
	onClickFn: () => void;
}

const ButtonArrow: FC<ButtonArrowProps> = (props) => {
	return (
		<button
			className={classes['arrow-button']}
			onClick={() => props.onClickFn()}
		>
			{props.direction === 'left' ? '<' : '>'}
		</button>
	);
};

export default ButtonArrow;
