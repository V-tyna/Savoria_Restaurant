import { FC } from 'react';
import ButtonDot from './ButtonDot';
import classes from './ButtonDotGroup.module.css';

interface ButtonDotGroupProps {
	buttonsQuantity: number;
	activeIndex: number;
	setActiveIndexFn: (i: number) => void;
}

const ButtonDotGroup: FC<ButtonDotGroupProps> = (props) => {
	const buttons = [];

	for (let i = 0; i <= props.buttonsQuantity; i++) {
		buttons.push(
			<ButtonDot
				key={i}
				activeIndex={props.activeIndex}
				currentIndex={i}
				onClickFn={() => props.setActiveIndexFn(i)}
			/>
		);
	}

	return <div className={classes['dots-area']}>{buttons}</div>;
};

export default ButtonDotGroup;
