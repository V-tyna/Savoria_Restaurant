import { Fragment } from 'react';

import { useDateFormat } from '../../../hooks/useDateFormat';
import { CarouselCard } from '../../models/Carousel.models';
import classes from './CarouselSlide.module.css';

interface CarouselSlideProps {
	card: CarouselCard;
	key: string;
}

const CarouselSlide = ({ card }: CarouselSlideProps) => {
	const tags = card.tags.map((tag: any, idx: number) => {
		return idx === card.tags.length - 1 ? (
			<Fragment key={tag}>{tag}</Fragment>
		) : (
			<Fragment key={tag}>{tag} - </Fragment>
		);
	});

	const eventDates = useDateFormat(card.date);

	return (
		<div className={classes.slide}>
			<img src={card.link} alt={card.event} />
			<div className={classes['slide-info']}>
				<p>{card.event}</p>
				<span>{eventDates}</span>
			</div>
			<div className={classes.tags}>{tags}</div>
		</div>
	);
};

export default CarouselSlide;
