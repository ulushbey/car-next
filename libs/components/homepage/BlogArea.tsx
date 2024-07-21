import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	blogArea: {
		paddingTop: '120px',
		paddingBottom: '120px',
		backgroundColor: '#f0f4f8', // Soft blue background for a calming effect
	},
	siteHeading: {
		marginBottom: '40px',
		paddingLeft: '40px',
		textAlign: 'center',
	},
	siteTitleTagline: {
		display: 'flex',
		alignItems: 'start',
		marginBottom: '20px',
		fontSize: '24px',
		color: '#333',
	},
	siteTitle: {
		fontSize: '36px',
		color: '#333',
		textAlign: 'start',
		marginBottom: '10px',
		'& span': {
			color: '#ef1d26', // Adjust as per your design
		},
	},
	headingDivider: {
		width: '60px',
		height: '3px',
		textAlign: 'start',
		backgroundColor: '#ef1d26',
		// margin: '0 auto',
		marginBottom: '30px',
	},
	blogItem: {
		marginBottom: '30px',
		paddingRight: '20px',
		paddingLeft: '20px',

		transition: 'transform 0.3s ease',
		'&:hover': {
			transform: 'translateY(-10px)',
		},
	},
	blogItemImg: {
		marginBottom: '10px',
		paddingRight: '20px',
		paddingLeft: '40px',

		'& img': {
			width: '100%',
			borderRadius: '8px',
		},
	},
	blogItemMeta: {
		listStyle: 'none',
		padding: 0,
		marginBottom: '10px',
		marginLeft: '40px',
		'& li': {
			display: 'inline-block',
			marginRight: '10px',
			fontSize: '14px',
			color: '#666',
			'& a': {
				color: '#666',
				textDecoration: 'none',
				'&:hover': {
					color: '#ef1d26',
				},
			},
		},
	},
	blogTitle: {
		fontSize: '24px',
		marginBottom: '10px',
		marginLeft: '40px',
		'& a': {
			color: '#333',
			textDecoration: 'none',
			'&:hover': {
				color: '#ef1d26',
			},
		},
	},
	themeBtn: {
		marginLeft: '40px',
		paddingLeft: '20px',
		display: 'inline-block',
		padding: '10px 10px',
		backgroundColor: '#ef1d26',
		color: '#fff',
		borderRadius: '4px',
		textDecoration: 'none',
		transition: 'background-color 0.3s ease',
		'&:hover': {
			backgroundColor: '#c70039',
		},
		'& i': {
			marginLeft: '5px',
		},
	},
});

const BlogArea = () => {
	const classes = useStyles();

	// Example blog items data (replace with your actual data)
	const blogItems = [
		{
			id: 1,
			imgSrc: 'assets/img/blog/01.jpg',
			author: 'Alicia Davis',
			date: 'January 29, 2023',
			title: 'There are many variations of passage available.',
			link: '#',
		},
		{
			id: 2,
			imgSrc: 'assets/img/blog/02.jpg',
			author: 'Alicia Davis',
			date: 'January 29, 2023',
			title: 'There are many variations of passage available.',
			link: '#',
		},
		{
			id: 3,
			imgSrc: 'assets/img/blog/03.jpg',
			author: 'Alicia Davis',
			date: 'January 29, 2023',
			title: 'There are many variations of passage available.',
			link: '#',
		},
	];

	return (
		<Box className={classes.blogArea} component={'div'}>
			<Grid container justifyContent="center">
				<Grid item xs={12} className={classes.siteHeading}>
					<Box className={classes.siteTitleTagline} component={'div'}>
						<i className="flaticon-drive" /> Our Blog
					</Box>
					<Typography variant="h2" className={classes.siteTitle}>
						Latest News &amp; <span>Blog</span>
					</Typography>
					<Box className={classes.headingDivider} component={'div'} />
				</Grid>
			</Grid>
			<Grid container spacing={4} justifyContent="center">
				{blogItems.map((blog) => (
					<Grid item key={blog.id} xs={12} md={6} lg={4}>
						<Box className={`${classes.blogItem} wow fadeInUp`} data-wow-delay=".25s" component={'div'}>
							<Box className={classes.blogItemImg} component={'div'}>
								<img src={blog.imgSrc} alt="Thumbnail" />
							</Box>
							<Box className="blog-item-info" component={'div'}>
								<Box className={classes.blogItemMeta} component={'div'}>
									<ul>
										<li>
											<a href="#">
												<i className="far fa-user-circle" /> By {blog.author}
											</a>
										</li>
										<li>
											<a href="#">
												<i className="far fa-calendar-alt" /> {blog.date}
											</a>
										</li>
									</ul>
								</Box>
								<Typography variant="h4" className={classes.blogTitle}>
									<a href={blog.link}>{blog.title}</a>
								</Typography>
								<a className={classes.themeBtn} href={blog.link}>
									Read More
									<i className="fas fa-arrow-right-long" />
								</a>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default BlogArea;
