import { FC } from 'react';
import classes from './ButtonDot.module.css';

interface ButtonDotProps {
	activeIndex: number;
	currentIndex: number;
	onClickFn: () => void;
}

const ButtonDot: FC<ButtonDotProps> = (props) => {
	return (
		<button
			className={
				props.activeIndex === props.currentIndex
					? `${classes.dot} ${classes.active}`
					: classes.dot
			}
			onClick={props.onClickFn}
		></button>
	);
};

export default ButtonDot;
