import { useEffect, useState } from 'react';
import ButtonArrow from '../../../UI/ButtonArrow/ButtonArrow';
import ButtonDotGroup from '../../../UI/ButtonDot/ButtonDotGroup';
import { CarouselCard } from '../../models/Carousel.models';
import classes from './Carousel.module.css';
import CarouselSlide from './CarouselSlide';

const Carousel = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const CAROUSEL_DATA: CarouselCard[] = [
		{
			event: 'Grill party',
			date: new Date(2023, 5, 7),
			tags: ['FRIENDS', 'MEAT', 'MUSIC', 'TASTE'],
			link: 'https://images.unsplash.com/photo-1558030137-a56c1b004fa3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80',
		},
		{
			event: 'Burger festival',
			date: { from: new Date(2023, 5, 12), to: new Date(2023, 5, 17) },
			tags: ['BURGERS', 'MUSIC', 'TASTE', 'FUN'],
			link: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		},
		{
			event: 'Sushi week',
			date: { from: new Date(2023, 5, 19), to: new Date(2023, 5, 26) },
			tags: ['FRIENDS', 'SUSHI', 'MUSIC', 'FUN'],
			link: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
		},
	];

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (activeIndex < CAROUSEL_DATA.length - 1) {
				setActiveIndex((prev) => prev + 1);
			} else {
				setActiveIndex(0);
			}
		}, 5000);
		return () => clearInterval(intervalId);
	}, [CAROUSEL_DATA.length, activeIndex]);

	const card = CAROUSEL_DATA.find(
		(_card, idx) => idx === activeIndex
	) as CarouselCard;

	const decreaseActiveSlide = () => {
		if (activeIndex > 0) {
			setActiveIndex((prev) => prev - 1);
		} else {
			setActiveIndex(CAROUSEL_DATA.length - 1);
		}
	};

	const increaseActiveSlide = () => {
		if (activeIndex < CAROUSEL_DATA.length - 1) {
			setActiveIndex((prev) => prev + 1);
		} else {
			setActiveIndex(0);
		}
	};

	const setActiveIndexFn = (i: number) => {
		setActiveIndex(i);
	};

	return (
		<div className={classes['carousel-container']}>
			<div className={classes['arrow-button-left']}>
				<ButtonArrow direction={'left'} onClickFn={decreaseActiveSlide} />
			</div>
			<CarouselSlide card={card} key={card?.event} />
			<ButtonDotGroup
				buttonsQuantity={CAROUSEL_DATA.length - 1}
				activeIndex={activeIndex}
				setActiveIndexFn={setActiveIndexFn}
			/>
			<div className={classes['arrow-button-right']}>
				<ButtonArrow direction={'right'} onClickFn={increaseActiveSlide} />
			</div>
		</div>
	);
};

export default Carousel;
