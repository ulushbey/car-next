import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const CounterArea = () => {
	const device = useDeviceDetect();

	const counters = [
		{
			imageSrc: '/img/icons/faliton.svg',
			count: 500,
			title: '+ Available Cars',
			delay: '.25s',
		},
		{
			icon: 'flaticon-car-key',
			count: 900,
			title: '+ Happy Clients',
			delay: '.50s',
		},
		{
			icon: 'flaticon-screwdriver',
			count: 1500,
			title: '+ Team Workers',
			delay: '.75s',
		},
		{
			icon: 'flaticon-review',
			count: 30,
			title: '+ Years Of Experience',
			delay: '1s',
		},
	];

	return (
		<Box className="counter-area pt-30 pb-30" component={'div'}>
			<Grid container className="container" style={{ gap: '30px' }}>
				{counters.map((counter, index) => (
					<Grid
						item
						lg={3}
						sm={6}
						xs={12}
						key={index}
						className="counter-box wow fadeInUp"
						data-wow-delay={counter.delay}
					>
						<Box className="icon" component={'div'}>
							<i className={counter.icon} />
						</Box>
						<Box component={'div'}>
							<Typography
								variant="h4"
								component="span"
								className="counter"
								data-count="+"
								data-to={counter.count}
								data-speed={3000}
							>
								{counter.count}
							</Typography>
							<Typography variant="h6" className="title">
								{counter.title}
							</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default CounterArea;
