import React from 'react';
import { Grid, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const TopBrands = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div className="event-card">EVENT CARD</div>;
	} else {
		return (
			<Grid container className="car-brand" spacing={2}>
				<Grid item xs={12}>
					<div className="container">
						<div className="site-heading text-center">
							<span className="site-title-tagline">
								<i className="flaticon-drive" /> Popular Brands
							</span>
							<Typography variant="h2" className="site-title">
								Our Top Quality <span>Brands</span>
							</Typography>
							<div className="heading-divider" />
						</div>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2} className="brand-list">
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay=".25s">
								<div className="brand-img">
									<img src="assets/img/brand/01.png" alt="Ferrari" />
								</div>
								<Typography variant="h5">Ferrari</Typography>
							</a>
						</Grid>
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay=".50s">
								<div className="brand-img">
									<img src="assets/img/brand/02.png" alt="Hyundai" />
								</div>
								<Typography variant="h5">Hyundai</Typography>
							</a>
						</Grid>
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay=".75s">
								<div className="brand-img">
									<img src="assets/img/brand/03.png" alt="Mercedes Benz" />
								</div>
								<Typography variant="h5">Mercedes Benz</Typography>
							</a>
						</Grid>
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay="1s">
								<div className="brand-img">
									<img src="assets/img/brand/04.png" alt="Toyota" />
								</div>
								<Typography variant="h5">Toyota</Typography>
							</a>
						</Grid>
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.25s">
								<div className="brand-img">
									<img src="assets/img/brand/05.png" alt="BMW" />
								</div>
								<Typography variant="h5">BMW</Typography>
							</a>
						</Grid>
						<Grid item xs={6} sm={3} lg={2}>
							<a href="#" className="brand-item wow fadeInUp" data-wow-delay="1.50s">
								<div className="brand-img">
									<img src="assets/img/brand/06.png" alt="Nissan" />
								</div>
								<Typography variant="h5">Nissan</Typography>
							</a>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
};

export default TopBrands;
