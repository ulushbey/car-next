import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const brands = [
	{ imgSrc: 'assets/img/brand/01.png', title: 'Ferrari', delay: '.25s' },
	{ imgSrc: 'assets/img/brand/02.png', title: 'Hyundai', delay: '.50s' },
	{ imgSrc: 'assets/img/brand/03.png', title: 'Mercedes Benz', delay: '.75s' },
	{ imgSrc: 'assets/img/brand/04.png', title: 'Toyota', delay: '1s' },
	{ imgSrc: 'assets/img/brand/05.png', title: 'BMW', delay: '1.25s' },
	{ imgSrc: 'assets/img/brand/06.png', title: 'Nissan', delay: '1.50s' },
];

const CarBrand = () => {
	return (
		<Box className="car-brand py-120">
			<Grid container className="container">
				<Grid item lg={6} xs={12} className="mx-auto">
					<Box className="site-heading text-center">
						<Typography component="span" className="site-title-tagline">
							<i className="flaticon-drive" /> Popular Brands
						</Typography>
						<Typography variant="h2" className="site-title">
							Our Top Quality <span>Brands</span>
						</Typography>
						<Box className="heading-divider" />
					</Box>
				</Grid>
				<Grid container spacing={2} className="brand-list">
					{brands.map((brand, index) => (
						<Grid
							item
							xs={6}
							md={3}
							lg={2}
							key={index}
							className="brand-item wow fadeInUp"
							data-wow-delay={brand.delay}
						>
							<a href="#">
								<Box className="brand-img">
									<img src={brand.imgSrc} alt={brand.title} />
								</Box>
								<Typography variant="h5">{brand.title}</Typography>
							</a>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Box>
	);
};

export default CarBrand;
