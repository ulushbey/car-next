import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const AboutUs = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div className="about-card">ABOUT US</div>;
	} else {
		return (
			<Box className="about-area pb-120" component={'div'}>
				<Grid container className="container">
					<Grid container alignItems="center">
						<Grid item lg={6}>
							<Box className="about-left wow fadeInLeft" data-wow-delay=".25s" component={'div'}>
								<Box className="about-img" component={'div'}>
									<img src="assets/img/about/01.png" alt="About Us" />
								</Box>
								<Box className="about-experience" component={'div'}>
									<Box className="about-experience-icon" component={'div'}>
										<i className="flaticon-car" />
									</Box>
									<Typography variant="body1" component="b">
										30 Years Of <br /> Quality Service
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item lg={6}>
							<Box className="about-right wow fadeInRight" data-wow-delay=".25s" component={'div'}>
								<Box className="site-heading mb-3" component={'div'}>
									<Typography variant="subtitle1" className="site-title-tagline justify-content-start">
										<i className="flaticon-drive" /> About Us
									</Typography>
									<Typography variant="h2" className="site-title">
										World Largest <span>Car Dealer</span> Marketplace.
									</Typography>
								</Box>
								<Typography variant="body1" className="about-text">
									There are many variations of passages of Lorem Ipsum available, but the majority have suffered
									alteration in some form, by injected humour.
								</Typography>
								<Box className="about-list-wrapper" component={'div'}>
									<ul className="about-list list-unstyled">
										<li>At vero eos et accusamus et iusto odio.</li>
										<li>Established fact that a reader will be distracted.</li>
										<li>Sed ut perspiciatis unde omnis iste natus sit.</li>
									</ul>
								</Box>
								<Button
									href="about.html"
									className="theme-btn mt-4"
									endIcon={<i className="fas fa-arrow-right-long" />}
								>
									Discover More
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		);
	}
};

export default AboutUs;
