import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const categories = [
	{ imgSrc: 'assets/img/category/01.png', title: 'Sedan', delay: '.25s' },
	{ imgSrc: 'assets/img/category/02.png', title: 'Compact', delay: '.50s' },
	{ imgSrc: 'assets/img/category/03.png', title: 'Convertible', delay: '.75s' },
	{ imgSrc: 'assets/img/category/04.png', title: 'SUV', delay: '1s' },
	{ imgSrc: 'assets/img/category/05.png', title: 'Crossover', delay: '1.25s' },
	{ imgSrc: 'assets/img/category/06.png', title: 'Wagon', delay: '1.50s' },
	{ imgSrc: 'assets/img/category/07.png', title: 'Sports', delay: '.25s' },
	{ imgSrc: 'assets/img/category/08.png', title: 'Pickup', delay: '.50s' },
	{ imgSrc: 'assets/img/category/09.png', title: 'Family MPV', delay: '.75s' },
	{ imgSrc: 'assets/img/category/10.png', title: 'Coupe', delay: '1s' },
	{ imgSrc: 'assets/img/category/11.png', title: 'Electric', delay: '1.25s' },
	{ imgSrc: 'assets/img/category/12.png', title: 'Luxury', delay: '1.50s' },
];

const CarCategory = () => {
	return (
		<Box className="car-category py-120" component="div">
			<Grid container className="container">
				<Grid item lg={6} xs={12} className="mx-auto">
					<Box className="site-heading text-center" component="div">
						<Typography component="span" className="site-title-tagline">
							<i className="flaticon-drive" /> Car Category
						</Typography>
						<Typography variant="h2" className="site-title">
							Car By Body <span>Types</span>
						</Typography>
						<Box className="heading-divider" component="div" />
					</Box>
				</Grid>
				<Grid container spacing={2} className="category-list">
					{categories.map((category, index) => (
						<Grid
							item
							xs={6}
							md={4}
							lg={2}
							key={index}
							className="category-item wow fadeInUp"
							data-wow-delay={category.delay}
						>
							<a href="#">
								<Box className="category-img" component="div">
									<img src={category.imgSrc} alt={category.title} />
								</Box>
								<Typography variant="h5">{category.title}</Typography>
							</a>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Box>
	);
};

export default CarCategory;
