// // import React, { useCallback, useEffect, useRef } from 'react';
// // import { useState } from 'react';
// // import { useRouter, withRouter } from 'next/router';
// // import { useTranslation } from 'next-i18next';
// // import { getJwtToken, logOut, updateUserInfo } from '../auth';
// // import { Stack, Box } from '@mui/material';
// // import MenuItem from '@mui/material/MenuItem';
// // import Button from '@mui/material/Button';
// // import { alpha, styled } from '@mui/material/styles';
// // import Menu, { MenuProps } from '@mui/material/Menu';
// // import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// // import { CaretDown } from 'phosphor-react';
// // import useDeviceDetect from '../hooks/useDeviceDetect';
// // import Link from 'next/link';
// // import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// // import { useReactiveVar } from '@apollo/client';
// // import { userVar } from '../../apollo/store';
// // import { Logout } from '@mui/icons-material';
// // import { REACT_APP_API_URL } from '../config';

// // const Top = () => {
// // 	const device = useDeviceDetect();
// // 	const user = useReactiveVar(userVar);
// // 	const { t, i18n } = useTranslation('common');
// // 	const router = useRouter();
// // 	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
// // 	const [lang, setLang] = useState<string | null>('en');
// // 	const drop = Boolean(anchorEl2);
// // 	const [colorChange, setColorChange] = useState(false);
// // 	const [anchorEl, setAnchorEl] = React.useState<any | HTMLElement>(null);
// // 	let open = Boolean(anchorEl);
// // 	const [bgColor, setBgColor] = useState<boolean>(false);
// // 	const [logoutAnchor, setLogoutAnchor] = React.useState<null | HTMLElement>(null);
// // 	const logoutOpen = Boolean(logoutAnchor);

// // 	/** LIFECYCLES **/
// // 	useEffect(() => {
// // 		if (localStorage.getItem('locale') === null) {
// // 			localStorage.setItem('locale', 'en');
// // 			setLang('en');
// // 		} else {
// // 			setLang(localStorage.getItem('locale'));
// // 		}
// // 	}, [router]);

// // 	useEffect(() => {
// // 		switch (router.pathname) {
// // 			case '/property/detail':
// // 				setBgColor(true);
// // 				break;
// // 			default:
// // 				break;
// // 		}
// // 	}, [router]);

// // 	useEffect(() => {
// // 		const jwt = getJwtToken();
// // 		if (jwt) updateUserInfo(jwt);
// // 	}, []);

// // 	/** HANDLERS **/
// // 	const langClick = (e: any) => {
// // 		setAnchorEl2(e.currentTarget);
// // 	};

// // 	const langClose = () => {
// // 		setAnchorEl2(null);
// // 	};

// // 	const langChoice = useCallback(
// // 		async (e: any) => {
// // 			setLang(e.target.id);
// // 			localStorage.setItem('locale', e.target.id);
// // 			setAnchorEl2(null);
// // 			await router.push(router.asPath, router.asPath, { locale: e.target.id });
// // 		},
// // 		[router],
// // 	);

// // 	const changeNavbarColor = () => {
// // 		if (window.scrollY >= 50) {
// // 			setColorChange(true);
// // 		} else {
// // 			setColorChange(false);
// // 		}
// // 	};

// // 	const handleClose = () => {
// // 		setAnchorEl(null);
// // 	};

// // 	const handleHover = (event: any) => {
// // 		if (anchorEl !== event.currentTarget) {
// // 			setAnchorEl(event.currentTarget);
// // 		} else {
// // 			setAnchorEl(null);
// // 		}
// // 	};

// // 	const StyledMenu = styled((props: MenuProps) => (
// // 		<Menu
// // 			elevation={0}
// // 			anchorOrigin={{
// // 				vertical: 'bottom',
// // 				horizontal: 'right',
// // 			}}
// // 			transformOrigin={{
// // 				vertical: 'top',
// // 				horizontal: 'right',
// // 			}}
// // 			{...props}
// // 		/>
// // 	))(({ theme }) => ({
// // 		'& .MuiPaper-root': {
// // 			top: '109px',
// // 			borderRadius: 6,
// // 			marginTop: theme.spacing(1),
// // 			minWidth: 160,
// // 			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
// // 			boxShadow:
// // 				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// // 			'& .MuiMenu-list': {
// // 				padding: '4px 0',
// // 			},
// // 			'& .MuiMenuItem-root': {
// // 				'& .MuiSvgIcon-root': {
// // 					fontSize: 18,
// // 					color: theme.palette.text.secondary,
// // 					marginRight: theme.spacing(1.5),
// // 				},
// // 				'&:active': {
// // 					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
// // 				},
// // 			},
// // 		},
// // 	}));

// // 	if (typeof window !== 'undefined') {
// // 		window.addEventListener('scroll', changeNavbarColor);
// // 	}

// // 									<Menu
// // 										id="basic-menu"
// // 										anchorEl={logoutAnchor}
// // 										open={logoutOpen}
// // 										onClose={() => {
// // 											setLogoutAnchor(null);
// // 										}}
// // 										sx={{ mt: '5px' }}
// // 									>
// // 										<MenuItem onClick={() => logOut()}>
// // 											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
// // 											Logout
// // 										</MenuItem>
// // 									</Menu>
// // 								</>
// // 							) : (
// // 								<Link href={'/account/join'}>
// // 									<div className={'join-box'}>
// // 										<AccountCircleOutlinedIcon />
// // 										<span>
// // 											{t('Login')} / {t('Register')}
// // 										</span>
// // 									</div>
// // 								</Link>
// // 							)}

// // 							<div className={'lan-box'}>
// // 								{user?._id && <NotificationsOutlinedIcon className={'notification-icon'} />}
// // 								<Button
// // 									disableRipple
// // 									className="btn-lang"
// // 									onClick={langClick}
// // 									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
// // 								>
// // 									<Box component={'div'} className={'flag'}>
// // 										{lang !== null ? (
// // 											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
// // 										) : (
// // 											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
// // 										)}
// // 									</Box>
// // 								</Button>

// // 								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
// // 									<MenuItem disableRipple onClick={langChoice} id="en">
// // 										<img
// // 											className="img-flag"
// // 											src={'/img/flag/langen.png'}
// // 											onClick={langChoice}
// // 											id="en"
// // 											alt={'usaFlag'}
// // 										/>
// // 										{t('English')}
// // 									</MenuItem>
// // 									<MenuItem disableRipple onClick={langChoice} id="kr">
// // 										<img
// // 											className="img-flag"
// // 											src={'/img/flag/langkr.png'}
// // 											onClick={langChoice}
// // 											id="uz"
// // 											alt={'koreanFlag'}
// // 										/>
// // 										{t('Korean')}
// // 									</MenuItem>
// // 									<MenuItem disableRipple onClick={langChoice} id="ru">
// // 										<img
// // 											className="img-flag"
// // 											src={'/img/flag/langru.png'}
// // 											onClick={langChoice}
// // 											id="ru"
// // 											alt={'russiaFlag'}
// // 										/>
// // 										{t('Russian')}
// // 									</MenuItem>
// // 								</StyledMenu>
// // 							</div>
// // 						</Box>
// // 					</Stack>
// // 				</Stack>
// // 			</Stack>
// // 		);
// // 	}
// // };

// // export default withRouter(Top);

// import React, { useCallback, useEffect, useState } from 'react';
// import { useRouter, withRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
// import { getJwtToken, logOut, updateUserInfo } from '../auth';
// import { Stack, Box } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import { alpha, styled } from '@mui/material/styles';
// import Menu, { MenuProps } from '@mui/material/Menu';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { CaretDown } from 'phosphor-react';
// import useDeviceDetect from '../hooks/useDeviceDetect';
// import Link from 'next/link';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
// import { useReactiveVar, useQuery } from '@apollo/client';
// import { userVar } from '../../apollo/store';
// import { Logout, Search } from '@mui/icons-material';
// import { REACT_APP_API_URL } from '../config';
// import { GET_NOTIFICATIONS } from '../../apollo/user/query';
// import { NotificationDto } from '../types/notification/notification';

// const Top = () => {
// 	const device = useDeviceDetect();
// 	const user = useReactiveVar(userVar);
// 	const { t, i18n } = useTranslation('common');
// 	const router = useRouter();
// 	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
// 	const [lang, setLang] = useState<string | null>('en');
// 	const drop = Boolean(anchorEl2);
// 	const [colorChange, setColorChange] = useState(false);
// 	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// 	const open = Boolean(anchorEl);
// 	const [bgColor, setBgColor] = useState<boolean>(false);
// 	const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
// 	const logoutOpen = Boolean(logoutAnchor);

// 	// Notification state
// 	const [notificationAnchorEl, setNotificationAnchorEl] = useState<HTMLElement | null>(null);
// 	const [notifications, setNotifications] = useState<NotificationDto[]>([]); // Assuming notifications data structure
// 	const notificationOpen = Boolean(notificationAnchorEl);

// 	const [hasNewNotification, setHasNewNotification] = useState(false);

// 	// Apollo useQuery hook for notifications
// 	const {
// 		loading: notificationsLoading,
// 		data: notificationsData,
// 		error: notificationsError,
// 		refetch: refetchNotifications,
// 	} = useQuery(GET_NOTIFICATIONS, {
// 		fetchPolicy: 'cache-and-network',
// 		variables: { input: { page: 1, limit: 100, search: { receiverId: '' } } },
// 		skip: !notificationOpen,
// 		notifyOnNetworkStatusChange: true,
// 		onCompleted: (data) => {
// 			if (data?.getNotifications?.list) {
// 				console.log('Notifications data:', data.getNotifications.list);
// 				setNotifications(data?.getNotifications?.list);
// 				setHasNewNotification(true);
// 			}
// 		},
// 	});
// 	useEffect(() => {
// 		if (!notificationOpen) {
// 			refetchNotifications();
// 		}
// 	}, [notificationOpen, refetchNotifications]);

// 	useEffect(() => {
// 		if (localStorage.getItem('locale') === null) {
// 			localStorage.setItem('locale', 'en');
// 			setLang('en');
// 		} else {
// 			setLang(localStorage.getItem('locale'));
// 		}
// 	}, [router]);

// 	useEffect(() => {
// 		switch (router.pathname) {
// 			case '/property/detail':
// 				setBgColor(true);
// 				break;
// 			default:
// 				break;
// 		}
// 	}, [router]);

// 	useEffect(() => {
// 		const jwt = getJwtToken();
// 		if (jwt) updateUserInfo(jwt);
// 	}, []);

// 	const langClick = (e: React.MouseEvent<HTMLElement>) => {
// 		setAnchorEl2(e.currentTarget);
// 	};

// 	const langClose = () => {
// 		setAnchorEl2(null);
// 	};

// 	const langChoice = useCallback(
// 		async (e: React.MouseEvent<HTMLElement>) => {
// 			setLang(e.currentTarget.id);
// 			localStorage.setItem('locale', e.currentTarget.id);
// 			setAnchorEl2(null);
// 			await router.push(router.asPath, router.asPath, { locale: e.currentTarget.id });
// 		},
// 		[router],
// 	);

// 	const changeNavbarColor = () => {
// 		if (window.scrollY >= 50) {
// 			setColorChange(true);
// 		} else {
// 			setColorChange(false);
// 		}
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};

// 	const handleHover = (event: React.MouseEvent<HTMLElement>) => {
// 		if (anchorEl !== event.currentTarget) {
// 			setAnchorEl(event.currentTarget);
// 		} else {
// 			setAnchorEl(null);
// 		}
// 	};

// 	const handleNotificationClick = (event: React.MouseEvent<SVGSVGElement>) => {
// 		setHasNewNotification(false);
// 		setNotificationAnchorEl(event.currentTarget as unknown as HTMLElement);
// 	};

// 	const handleNotificationClose = () => {
// 		setNotificationAnchorEl(null);
// 	};

// 	const StyledMenu = styled((props: MenuProps) => (
// 		<Menu
// 			elevation={0}
// 			anchorOrigin={{
// 				vertical: 'bottom',
// 				horizontal: 'right',
// 			}}
// 			transformOrigin={{
// 				vertical: 'top',
// 				horizontal: 'right',
// 			}}
// 			{...props}
// 		/>
// 	))(({ theme }) => ({
// 		'& .MuiPaper-root': {
// 			top: '109px',
// 			borderRadius: 6,
// 			marginTop: theme.spacing(1),
// 			minWidth: 160,
// 			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
// 			boxShadow:
// 				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// 			'& .MuiMenu-list': {
// 				padding: '4px 0',
// 			},
// 			'& .MuiMenuItem-root': {
// 				'& .MuiSvgIcon-root': {
// 					fontSize: 18,
// 					color: theme.palette.text.secondary,
// 					marginRight: theme.spacing(1.5),
// 				},
// 				'&:active': {
// 					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
// 				},
// 			},
// 		},
// 	}));

// 	if (typeof window !== 'undefined') {
// 		window.addEventListener('scroll', changeNavbarColor);
// 	}

// if (device == 'mobile') {
// 	return (
// 		<Stack className={'top'}>
// 			<Link href={'/'}>
// 				<div>{t('Home')}</div>
// 			</Link>
// 			<Link href={'/car'}>
// 				<div>{t('Cars')}</div>
// 			</Link>
// 			<Link href={'/agent'}>
// 				<div> {t('Agents')} </div>
// 			</Link>
// 			<Link href={'/community?articleCategory=FREE'}>
// 				<div> {t('Community')} </div>
// 			</Link>
// 			<Link href={'/cs'}>
// 				<div> {t('CS')} </div>
// 			</Link>
// 		</Stack>
// 	);
// } else {
// 	return (
// 		<Stack className={'navbar'}>
// 			<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
// 				<Stack className={'container'}>
// 					<Box component={'div'} className={'logo-box'}>
// 						<Link href={'/'}>
// 							<img
// 								src="/img/logo/car8.png"
// 								alt=""
// 								style={{
// 									height: '50px',
// 									objectFit: 'contain',
// 								}}
// 							/>
// 						</Link>
// 					</Box>
// 					<Box component={'div'} className={'router-box'}>
// 						<Link href={'/'}>
// 							<div>{t('Home')}</div>
// 						</Link>
// 						<Link href={'/property'}>
// 							<div>{t('Car')}</div>
// 						</Link>
// 						<Link href={'/agent'}>
// 							<div> {t('Agents')} </div>
// 						</Link>
// 						<Link href={'/community?articleCategory=FREE'}>
// 							<div> {t('Article')} </div>
// 						</Link>
// 						{user?._id && (
// 							<Link href={'/mypage'}>
// 								<div> {t('My Page')} </div>
// 							</Link>
// 						)}
// 						<Link href={'/cs'}>
// 							<div> {t('FAQ')} </div>
// 						</Link>
// 					</Box>
// 					<Box component={'div'} className={'user-box'}>
// 							{user?._id ? (
// 								<>
// 									<div className={'login-user'} onClick={(event: any) => setLogoutAnchor(event.currentTarget)}>
// 										<img
// 											src={
// 												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
// 											}
// 											alt=""
// 										/>
// 									</div>

// 									<Menu
// 										id="basic-menu"
// 										anchorEl={logoutAnchor}
// 										open={logoutOpen}
// 										onClose={() => {
// 											setLogoutAnchor(null);
// 										}}
// 										sx={{ mt: '5px' }}
// 									>
// 										<MenuItem onClick={() => logOut()}>
// 											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
// 											Logout
// 										</MenuItem>
// 									</Menu>
// 								</>
// 							) : (
// 								<Link href={'/account/join'}>
// 									<div className={'join-box'}>
// 										<AccountCircleOutlinedIcon />
// 										<span>
// 											{t('SignIn')} / {t('SignUp')}
// 										</span>
// 									</div>
// 								</Link>
// 							)}

// 							<div className={'lan-box'}>
// 								{user?._id && (
// 									<div>
// 										<NotificationsOutlinedIcon onClick={handleNotificationClick} />
// 										<Menu
// 											anchorEl={notificationAnchorEl}
// 											open={Boolean(notificationAnchorEl)}
// 											onClose={handleNotificationClose}
// 											PaperProps={{
// 												style: {
// 													maxHeight: '300px', // Adjust max height as needed
// 													width: '30rem', // Adjust width as needed
// 												},
// 											}}
// 										>
// 											{' '}
// 											{notificationsLoading && <MenuItem>Loading...</MenuItem>}
// 											{notifications &&
// 												notifications.map((notification) => {
// 													console.log('Notification:', notification);
// 													console.log('Member Data:', notification.memberData);

// 													return (
// 														<MenuItem key={notification._id}>
// 															<div>
// 																<div>{notification.notificationTitle}</div>
// 																<p>{notification.notificationDesc}</p>
// 															</div>
// 														</MenuItem>
// 													);
// 												})}
// 										</Menu>
// 									</div>
// 								)}
// 								<Button
// 									disableRipple
// 									className="btn-lang"
// 									onClick={langClick}
// 									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
// 								>
// 									<Box component={'div'} className={'flag'}>
// 										{lang !== null ? (
// 											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
// 										) : (
// 											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
// 										)}
// 									</Box>
// 								</Button>

// 								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
// 									<MenuItem disableRipple onClick={langChoice} id="en">
// 										<img
// 											className="img-flag"
// 											src={'/img/flag/langen.png'}
// 											onClick={langChoice}
// 											id="en"
// 											alt={'usaFlag'}
// 										/>
// 										{t('English')}
// 									</MenuItem>
// 									<MenuItem disableRipple onClick={langChoice} id="kr">
// 										<img
// 											className="img-flag"
// 											src={'/img/flag/langkr.png'}
// 											onClick={langChoice}
// 											id="kr"
// 											alt={'koreanFlag'}
// 										/>
// 										{t('Korean')}
// 									</MenuItem>
// 									<MenuItem disableRipple onClick={langChoice} id="ru">
// 										<img
// 											className="img-flag"
// 											src={'/img/flag/langru.png'}
// 											onClick={langChoice}
// 											id="ru"
// 											alt={'russiaFlag'}
// 										/>
// 										{t('Russian')}
// 									</MenuItem>
// 								</StyledMenu>
// 							</div>
// 						</Box>
// 					</Stack>
// 				</Stack>
// 			</Stack>
// 		);
// 	}
// };

// export default withRouter(Top);

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useReactiveVar, useQuery, useMutation } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout, Search } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { NotificationDto } from '../types/notification/notification';
import { T } from '../types/common';
import { NotificationStatus } from '../enums/notification.enum';
import { UPDATE_NOTIFICATION } from '../../apollo/user/mutation';
import { NotificationUpdate } from '../types/notification/notification.update';
import { NextPage } from 'next';
import { sweetErrorHandling } from '../sweetAlert';

const Top: NextPage = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	// Notification state
	const [notificationAnchorEl, setNotificationAnchorEl] = useState<HTMLElement | null>(null);
	const [notifications, setNotifications] = useState<NotificationDto[]>([]);
	const notificationOpen = Boolean(notificationAnchorEl);
	const [updateData, setUpdateData] = useState<NotificationUpdate>(initialValues);
	// Apollo useQuery hook for notifications

	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
	const {
		loading: notificationsLoading,
		data: notificationsData,
		error: notificationsError,
		refetch: refetchNotifications,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 100, search: { receiverId: '' } } },
		skip: !notificationOpen,
		notifyOnNetworkStatusChange: true,

		onCompleted: (data) => {
			if (data?.getNotifications?.list) {
				console.log('Notifications data:', data.getNotifications.list);
				setNotifications(data?.getNotifications?.list);
			}
		},
	});
	useEffect(() => {
		if (notificationsData) {
			console.log('Fetched notifications:', notificationsData.getNotifications.list);
		}
	}, [notificationsData]);

	useEffect(() => {
		if (notificationsData?.getNotifications?.list) {
			setNotifications(notificationsData.getNotifications.list);
			notificationsData.getNotifications.list.forEach((notification: { _id: any }) => {
				console.log('Notification _id:', notification._id); // Check if _id is present
			});
		}
	}, [notificationsData]);
	useEffect(() => {
		if (!notificationOpen) {
			refetchNotifications();
		}
	}, [notificationOpen, refetchNotifications]);

	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/property/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	const langClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: React.MouseEvent<HTMLElement>) => {
			setLang(e.currentTarget.id);
			localStorage.setItem('locale', e.currentTarget.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.currentTarget.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const handleNotificationClick = (event: React.MouseEvent<SVGSVGElement>) => {
		setNotificationAnchorEl(event.currentTarget as unknown as HTMLElement);
	};

	const handleMenuItemClick = (notification: NotificationDto) => {
		console.log('Notification:', notification); // Check if _id is present
		if (notification.articleId) {
			router.push(`/community/detail?id=${notification.articleId}`);
		} else if (notification.propertyId) {
			router.push(`/property/detail?id=${notification.propertyId}`);
		}

		if (!notification._id) {
			console.error('Notification _id is missing');
			return;
		}

		const updatedNotification: NotificationUpdate = {
			_id: notification._id,
			notificationStatus: NotificationStatus.READ,
		};

		updateNotificationHandler(updatedNotification);
	};
	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
	};

	const updateNotificationHandler = async (updateData: NotificationUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			await updateNotification({
				variables: {
					input: updateData,
				},
			});

			await refetchNotifications;
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/car'}>
					<div>{t('Cars')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Agents')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Community')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
						<Box component={'div'} className={'logo-box'}>
							<Link href={'/'}>
								<img
									src="/img/logo/car8.png"
									alt=""
									style={{
										height: '50px',
										objectFit: 'contain',
									}}
								/>
							</Link>
						</Box>
						<Box component={'div'} className={'router-box'}>
							<Link href={'/'}>
								<div>{t('Home')}</div>
							</Link>
							<Link href={'/property'}>
								<div>{t('Car')}</div>
							</Link>
							<Link href={'/agent'}>
								<div> {t('Agents')} </div>
							</Link>
							<Link href={'/community?articleCategory=FREE'}>
								<div> {t('Article')} </div>
							</Link>
							{user?._id && (
								<Link href={'/mypage'}>
									<div> {t('My Page')} </div>
								</Link>
							)}
							<Link href={'/cs'}>
								<div> {t('FAQ')} </div>
							</Link>
						</Box>
						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div
										className={'login-user'}
										onClick={(event: React.MouseEvent<HTMLElement>) => setLogoutAnchor(event.currentTarget)}
									>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('SignIn')} / {t('SignUp')}
										</span>
									</div>
								</Link>
							)}

							<div className={'lan-box'}>
								{user?._id && (
									<div>
										<NotificationsOutlinedIcon onClick={handleNotificationClick} style={{ color: 'white' }} />
										<Menu
											anchorEl={notificationAnchorEl}
											open={Boolean(notificationAnchorEl)}
											onClose={handleNotificationClose}
											PaperProps={{
												style: {
													marginTop: '40px',
													minHeight: '400px',
													minWidth: '400px',
													maxHeight: '400px',
													width: '400px',
													whiteSpace: 'normal',
													wordWrap: 'break-word',
													borderRadius: '22px',
													background: '#f9e7f7',
												},
											}}
										>
											{' '}
											<strong>Notification</strong>
											{!notificationsLoading && (!notifications || notifications.length === 0) && (
												<MenuItem style={{ margin: 100 }}>No notifications available</MenuItem>
											)}
											{notificationsLoading && <MenuItem>Loading...</MenuItem>}
											{notifications &&
												notifications.map((notification) => {
													const isRead = notification.notificationStatus === NotificationStatus.READ;
													return (
														<MenuItem
															key={notification._id}
															onClick={() => handleMenuItemClick(notification)}
															style={{
																whiteSpace: 'normal',
																wordWrap: 'break-word',
																backgroundColor: isRead ? 'lightgray' : 'white',
															}}
														>
															<div>
																<strong>{notification.notificationTitle}</strong>
																<p>{notification.notificationDesc}</p>
															</div>
														</MenuItem>
													);
												})}
										</Menu>
									</div>
								)}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="kr"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
