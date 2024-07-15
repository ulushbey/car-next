import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const chooseItems = [
	{
		count: '01',
		iconClass: 'flaticon-car',
		title: 'Best Quality Cars',
		description:
			'There are many variations of the passages available but the majo have suffered fact that reader will be dist alteration.',
		delay: '.25s',
	},
	{
		count: '02',
		iconClass: 'flaticon-chauffeur',
		title: 'Certified Mechanics',
		description:
			'There are many variations of the passages available but the majo have suffered fact that reader will be dist alteration.',
		delay: '.25s',
	},
	{
		count: '03',
		iconClass: 'flaticon-drive-thru',
		title: 'Popular Brands',
		description:
			'There are many variations of the passages available but the majo have suffered fact that reader will be dist alteration.',
		delay: '.25s',
	},
	{
		count: '04',
		iconClass: 'flaticon-online-payment',
		title: 'Reasonable Price',
		description:
			'There are many variations of the passages available but the majo have suffered fact that reader will be dist alteration.',
		delay: '.25s',
	},
];

const ChooseArea = () => {
	return (
		<Box className="choose-area py-120">
			<Grid container className="container">
				<Grid container alignItems="center">
					<Grid item lg={6} xs={12}>
						<Box className="choose-content">
							<Box className="site-heading wow fadeInDown" data-wow-delay=".25s">
								<Typography component="span" className="site-title-tagline text-white justify-content-start">
									<i className="flaticon-drive" /> Why Choose Us
								</Typography>
								<Typography variant="h2" className="site-title text-white mb-10">
									We are dedicated <span>to provide</span> quality service
								</Typography>
								<Typography className="text-white">
									There are many variations of passages available but the majority have suffered alteration in some form
									going to use a passage by injected humour randomised words which don't look even slightly believable.
								</Typography>
							</Box>
							<Box className="choose-img wow fadeInUp" data-wow-delay=".25s">
								<img src="assets/img/choose/01.png" alt="" />
							</Box>
						</Box>
					</Grid>
					<Grid item lg={6} xs={12}>
						<Box className="choose-content-wrapper wow fadeInRight" data-wow-delay=".25s">
							<Grid container spacing={2}>
								{chooseItems.map((item, index) => (
									<Grid item xs={12} md={6} key={index} className="mt-lg-5">
										<Box className="choose-item">
											<span className="choose-count">{item.count}</span>
											<Box className="choose-item-icon">
												<i className={item.iconClass} />
											</Box>
											<Box className="choose-item-info">
												<Typography variant="h3">{item.title}</Typography>
												<Typography>{item.description}</Typography>
											</Box>
										</Box>
									</Grid>
								))}
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default ChooseArea;
