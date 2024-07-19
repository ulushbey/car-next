import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Checkbox, CircularProgress, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import { NextPage } from 'next';
import Review from '../../libs/components/property/Review';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import PropertyBigCard from '../../libs/components/common/PropertyBigCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { Property } from '../../libs/types/property/property';
import moment from 'moment';
import { formatterStr } from '../../libs/utils';
import { REACT_APP_API_URL } from '../../libs/config';
import { userVar } from '../../apollo/store';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { CommentGroup } from '../../libs/enums/comment.enum';
import { Pagination as MuiPagination } from '@mui/material';
import Link from 'next/link';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import 'swiper/css';
import 'swiper/css/pagination';
import { GET_COMMENTS, GET_PROPERTIES, GET_PROPERTY } from '../../apollo/user/query';
import { Direction, Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';
import { CREATE_COMMENT, CREATE_MESSAGE, LIKE_TARGET_PROPERTY } from '../../apollo/user/mutation';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import KeyIcon from '@mui/icons-material/Key';
import NearMeIcon from '@mui/icons-material/NearMe';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import SpaIcon from '@mui/icons-material/Spa';

type PropertyOptionKey = keyof typeof PropertyOption;

export enum PropertyOption {
	SUNROOF = 'SUNROOF',
	HEADLAMP = 'HEADLAMP',
	PARKING_DETECTION_SENSOR = 'PARKING_DETECTION_SENSOR',
	REAR_CAMERA = 'REAR_CAMERA',
	AIR_CONDITIONER = 'AIR_CONDITIONER',
	SMART_KEY = 'SMART_KEY',
	NAVIGATION = 'NAVIGATION',
	HEATED_SEAT = 'HEATED_SEAT',
	VENTILATED_SEAT = 'VENTILATED_SEAT',
	LEATHER_SEAT = 'LEATHER_SEAT',
}
// Map property options to their corresponding icons and names
const PROPERTY_OPTION_DETAILS: { [key in PropertyOptionKey]: { icon: JSX.Element; name: string } } = {
	SUNROOF: { icon: <AcUnitIcon />, name: 'Sunroof' },
	HEADLAMP: { icon: <EmojiObjectsOutlinedIcon />, name: 'Headlamp' }, // Placeholder icon
	PARKING_DETECTION_SENSOR: { icon: <LocalParkingIcon />, name: 'Parking Detection Sensor' },
	REAR_CAMERA: { icon: <FlipCameraIosIcon />, name: 'Rear Camera' }, // Placeholder icon
	AIR_CONDITIONER: { icon: <AcUnitIcon />, name: 'Air Conditioner' },
	SMART_KEY: { icon: <KeyIcon />, name: 'Smart Key' }, // Placeholder icon
	NAVIGATION: { icon: <NearMeIcon />, name: 'Navigation' }, // Placeholder icon
	HEATED_SEAT: { icon: <AirlineSeatReclineExtraIcon />, name: 'Heated Seat' }, // Placeholder icon
	VENTILATED_SEAT: { icon: <SpaIcon />, name: 'Ventilated Seat' }, // Placeholder icon
	LEATHER_SEAT: { icon: <AirlineSeatReclineExtraIcon />, name: 'Leather Seat' }, // Placeholder icon
};

SwiperCore.use([Autoplay, Navigation, Pagination]);

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const PropertyDetail: NextPage = ({ initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [propertyId, setPropertyId] = useState<string | null>(null);
	const [property, setProperty] = useState<Property | null>(null);
	const [slideImage, setSlideImage] = useState<string>('');
	const [destinationProperties, setDestinationProperties] = useState<Property[]>([]);
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>(initialComment);
	const [propertyComments, setPropertyComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.PROPERTY,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [likeTargetProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const [createComment] = useMutation(CREATE_COMMENT);
	const [sendMessage, { data, loading, error }] = useMutation(CREATE_MESSAGE);

	const {
		loading: getPropertyLoading,
		data: getPropertyData,
		error: getPropertyError,
		refetch: getPropertyRefetch,
	} = useQuery(GET_PROPERTY, {
		fetchPolicy: 'network-only',
		variables: { input: propertyId },
		skip: !propertyId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProperty) setProperty(data?.getProperty);
			if (data?.getProperty) setSlideImage(data?.getProperty?.propertyImages[0]);
		},
	});

	const {
		loading: getPropertiesLoading,
		data: getPropertiesData,
		error: getPropertiesError,
		refetch: getPropertiesRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'createdAt',
				direction: Direction.DESC,
				search: {
					locationList: property?.propertyLocation ? [property?.propertyLocation] : [],
				},
			},
		},
		skip: !propertyId && !property,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getProperties?.list) setDestinationProperties(data?.getProperties?.list);
		},
	});

	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: initialComment,
		},
		skip: !commentInquiry.search.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getComments?.list) setPropertyComments(data?.getComments?.list);
			setCommentTotal(data?.getComments?.metaCounter[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.id) {
			setPropertyId(router.query.id as string);
			setCommentInquiry({
				...commentInquiry,
				search: {
					commentRefId: router.query.id as string,
				},
			});
			setInsertCommentData({
				...insertCommentData,
				commentRefId: router.query.id as string,
			});
		}
	}, [router]);

	useEffect(() => {
		if (commentInquiry.search.commentRefId) {
			getCommentsRefetch({ input: commentInquiry });
		}
	}, [commentInquiry]);

	/** HANDLERS **/

	const changeImageHandler = (image: string) => {
		setSlideImage(image);
	};

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProperty({
				variables: { input: id },
			});
			await getPropertyRefetch({ input: id });
			await getPropertiesRefetch({
				input: {
					page: 1,
					limit: 4,
					sort: 'createdAt',
					direction: Direction.DESC,
					search: {
						locationList: [property?.propertyLocation],
					},
				},
			});
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likePropertyHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await sendMessage({
				variables: {
					input: {
						name,
						phone,
						email,
						message,
						propertyId,
					},
				},
			});
			setName('');
			setPhone('');
			setEmail('');
			setMessage('');
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.error('Error , send message', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const commentPaginationChangeHandler = async (event: ChangeEvent<unknown>, value: number) => {
		commentInquiry.page = value;
		setCommentInquiry({ ...commentInquiry });
	};

	const createCommentHandler = async () => {
		try {
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await createComment({ variables: { input: insertCommentData } });

			setInsertCommentData({ ...insertCommentData, commentContent: '' });
			await getCommentsRefetch({ input: commentInquiry });
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (getPropertyLoading) {
		return (
			<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '1080px' }}>
				<CircularProgress size={'4rem'} />
			</Stack>
		);
	}
	const option = property?.propertyOption || [];
	if (device === 'mobile') {
		return <div>CAR DETAIL PAGE</div>;
	} else {
		return (
			<div id={'property-detail-page'}>
				<div className={'container'}>
					<Stack className={'property-detail-config'}>
						<Stack className={'property-info-config'}>
							<Stack className={'info'}>
								<Stack className={'left-box'}>
									<Typography className={'title-main'}>{property?.propertyTitle}</Typography>
									<Stack className={'top-box'}>
										<Typography className={'city'}>{property?.propertyLocation}</Typography>
										<Stack className={'divider'}></Stack>
										<Stack className={'buy-rent-box'}>
											{property?.propertyBarter && (
												<>
													<Stack className={'circle'}>
														<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
															<circle cx="3" cy="3" r="3" fill="#EB6753" />
														</svg>
													</Stack>
													<Typography className={'buy-rent'}>Barter </Typography>
												</>
											)}

											{property?.propertyRent && (
												<>
													<Stack className={'circle'}>
														<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
															<circle cx="3" cy="3" r="3" fill="#EB6753" />
														</svg>
													</Stack>
													<Typography className={'buy-rent'}>rent</Typography>
												</>
											)}
										</Stack>
										<Stack className={'divider'}></Stack>
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
											<g clipPath="url(#clip0_6505_6282)">
												<path
													d="M7 14C5.61553 14 4.26216 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303297 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303297 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9498 11.9498C10.637 13.2625 8.85652 14 7 14ZM7 0.931878C5.79984 0.931878 4.62663 1.28777 3.62873 1.95454C2.63084 2.62132 1.85307 3.56903 1.39379 4.67783C0.934505 5.78664 0.814336 7.00673 1.04848 8.18384C1.28262 9.36094 1.86055 10.4422 2.70919 11.2908C3.55783 12.1395 4.63907 12.7174 5.81617 12.9515C6.99327 13.1857 8.21337 13.0655 9.32217 12.6062C10.431 12.1469 11.3787 11.3692 12.0455 10.3713C12.7122 9.37337 13.0681 8.20016 13.0681 7C13.067 5.39099 12.4273 3.84821 11.2895 2.71047C10.1518 1.57273 8.60901 0.933037 7 0.931878Z"
													fill="#181A20"
												/>
												<path
													d="M9.0372 9.7275C8.97153 9.72795 8.90643 9.71543 8.84562 9.69065C8.7848 9.66587 8.72948 9.62933 8.68282 9.58313L6.68345 7.58375C6.63724 7.53709 6.6007 7.48177 6.57592 7.42096C6.55115 7.36015 6.53863 7.29504 6.53907 7.22938V2.7275C6.53907 2.59464 6.59185 2.46723 6.6858 2.37328C6.77974 2.27934 6.90715 2.22656 7.04001 2.22656C7.17287 2.22656 7.30028 2.27934 7.39423 2.37328C7.48817 2.46723 7.54095 2.59464 7.54095 2.7275V7.01937L9.39595 8.87438C9.47462 8.9425 9.53001 9.03354 9.55436 9.13472C9.57871 9.2359 9.5708 9.34217 9.53173 9.43863C9.49266 9.53509 9.4244 9.61691 9.3365 9.67264C9.24861 9.72836 9.14548 9.75519 9.04157 9.74938L9.0372 9.7275Z"
													fill="#181A20"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6505_6282">
													<rect width="14" height="14" fill="white" />
												</clipPath>
											</defs>
										</svg>
										<Typography className={'date'}>{moment().diff(property?.createdAt, 'days')} days ago</Typography>
									</Stack>
									<Stack className={'bottom-box'}>
										<Stack className="option">
											<img src="/img/icons/car.svg" alt="" style={{ gap: '1em' }} />
											<Typography>{property?.propertyType}</Typography>
										</Stack>
										<Stack className="option">
											<img src="/img/icons/fuel.svg" alt="" />
											<Typography>{property?.propertyFuel}</Typography>
										</Stack>
										<Stack className="option">
											<img src="/img/icons/manual.svg" alt="" />
											<Typography>{property?.propertyTransmission}</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'right-box'}>
									<Stack className="buttons">
										<Stack className="button-box">
											<RemoveRedEyeIcon fontSize="medium" />
											<Typography>{property?.propertyViews}</Typography>
										</Stack>
										<Stack className="button-box">
											{property?.meLiked && property?.meLiked[0]?.myFavorite ? (
												<FavoriteIcon color="primary" fontSize={'medium'} />
											) : (
												<FavoriteBorderIcon
													fontSize={'medium'}
													// @ts-ignore
													onClick={() => likePropertyHandler(user, property?._id)}
												/>
											)}
											<Typography>{property?.propertyLikes}</Typography>
										</Stack>
									</Stack>
									<Typography>${formatterStr(property?.propertyPrice)}</Typography>
								</Stack>
							</Stack>
							<Stack className={'images'}>
								<Stack className={'main-image'}>
									<img
										src={slideImage ? `${REACT_APP_API_URL}/${slideImage}` : '/img/property/bigImage.png'}
										alt={'main-image'}
									/>
								</Stack>
								<Stack className={'sub-images'}>
									{property?.propertyImages.map((subImg: string) => {
										const imagePath: string = `${REACT_APP_API_URL}/${subImg}`;
										return (
											<Stack className={'sub-img-box'} onClick={() => changeImageHandler(subImg)} key={subImg}>
												<img src={imagePath} alt={'sub-image'} />
											</Stack>
										);
									})}
								</Stack>
							</Stack>
						</Stack>
						<Stack className={'property-desc-config'}>
							<Stack className={'left-config'}>
								<Stack className={'options-config'}>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<img src={'/img/icons/car.svg'} />
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Car type</Typography>
											<Typography className={'option-data'}>{property?.propertyType}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<img src={'/img/icons/fuel.svg'} />
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Fuel type</Typography>
											<Typography className={'option-data'}>{property?.propertyFuel}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20" fill="none">
												<path
													d="M20.0464 2.29271H16.7196V1.10938H15.3839V2.29271H8.73021V1.10938H7.39448V2.29271H4.06766C3.53793 2.29271 3.0299 2.48001 2.65532 2.81341C2.28075 3.14681 2.07031 3.59899 2.07031 4.07049V17.1094C2.07031 17.5809 2.28075 18.0331 2.65532 18.3665C3.0299 18.6999 3.53793 18.8872 4.06766 18.8872H20.0464C20.5761 18.8872 21.0842 18.6999 21.4587 18.3665C21.8333 18.0331 22.0438 17.5809 22.0438 17.1094V4.07049C22.0438 3.59899 21.8333 3.14681 21.4587 2.81341C21.0842 2.48001 20.5761 2.29271 20.0464 2.29271ZM4.06766 3.4816H7.39448V4.66493H8.72397V3.4816H15.3839V4.66493H16.7133V3.4816H20.0464C20.2235 3.4816 20.3934 3.54423 20.5187 3.65571C20.6439 3.76719 20.7143 3.91839 20.7143 4.07604V7.03715H3.39979V4.07049C3.40144 3.91379 3.47253 3.76402 3.5976 3.65374C3.72267 3.54346 3.8916 3.48159 4.06766 3.4816ZM20.0464 17.7038H4.06766C3.89053 17.7038 3.72066 17.6412 3.59541 17.5297C3.47016 17.4182 3.39979 17.267 3.39979 17.1094V8.22049H20.7143V17.1094C20.7143 17.267 20.6439 17.4182 20.5187 17.5297C20.3934 17.6412 20.2235 17.7038 20.0464 17.7038Z"
													fill="#181A20"
												/>
												<path
													d="M15.1397 11.8023L13.6042 11.2801L12.5744 10.1412C12.5117 10.0727 12.4327 10.0174 12.3431 9.97949C12.2535 9.94156 12.1555 9.92188 12.0563 9.92188C11.9571 9.92188 11.8591 9.94156 11.7695 9.97949C11.6798 10.0174 11.6009 10.0727 11.5382 10.1412L10.5083 11.2801L8.97289 11.8023C8.88037 11.8343 8.79703 11.8842 8.72892 11.9485C8.66081 12.0127 8.60965 12.0897 8.57916 12.1738C8.54868 12.2578 8.53962 12.3469 8.55267 12.4345C8.56571 12.5221 8.60052 12.606 8.65456 12.6801L9.55961 13.8912L9.64075 15.3523C9.64596 15.4408 9.67332 15.5271 9.72083 15.6049C9.76835 15.6828 9.83482 15.7502 9.91539 15.8023C9.99685 15.8535 10.0898 15.8884 10.1878 15.9047C10.2858 15.921 10.3866 15.9183 10.4834 15.8967L12.0563 15.5245L13.6417 15.9078C13.7387 15.9304 13.8401 15.9332 13.9385 15.9161C14.0369 15.8991 14.1297 15.8625 14.21 15.8091C14.2903 15.7558 14.3562 15.687 14.4026 15.6079C14.449 15.5288 14.4748 15.4414 14.4781 15.3523L14.553 13.8912L15.4518 12.6634C15.5058 12.5893 15.5406 12.5054 15.5537 12.4178C15.5667 12.3302 15.5577 12.2412 15.5272 12.1571C15.4967 12.073 15.4455 11.9961 15.3774 11.9318C15.3093 11.8675 15.226 11.8176 15.1334 11.7856L15.1397 11.8023ZM13.3483 13.3912C13.2844 13.4793 13.2478 13.5808 13.2422 13.6856L13.1923 14.5745L12.2311 14.3412C12.1166 14.3138 11.996 14.3138 11.8815 14.3412L10.9203 14.5745L10.8704 13.6856C10.8648 13.5808 10.8282 13.4793 10.7643 13.3912L10.2212 12.6467L11.1512 12.3301C11.2614 12.2921 11.3584 12.2289 11.4321 12.1467L12.0563 11.4523L12.6805 12.1467C12.7542 12.2289 12.8511 12.2921 12.9613 12.3301L13.8913 12.6467L13.3483 13.3912Z"
													fill="#181A20"
												/>
											</svg>
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Year Build</Typography>
											<Typography className={'option-data'}>{moment(property?.createdAt).format('YYYY')}</Typography>
										</Stack>
									</Stack>
									<Stack className={'option'}>
										<Stack className={'svg-box'}>
											<img src={'/img/icons/expand.png'} />
										</Stack>
										<Stack className={'option-includes'}>
											<Typography className={'title'}>Car transmission</Typography>
											<Typography className={'option-data'}>{property?.propertyTransmission}</Typography>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'prop-desc-config'}>
									<Stack className={'top'}>
										<Typography className={'title'}>Brief Description</Typography>
										<Typography className={'desc'}>{property?.propertyDesc ?? 'No Description!'}</Typography>
									</Stack>
									<Stack className={'bottom'}>
										<Typography className={'title'}>Car Details</Typography>
										<Stack className={'info-box'}>
											<Stack className={'left'}>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Price</Typography>
													<Typography className={'data'}>${formatterStr(property?.propertyPrice)}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Car Transmission</Typography>
													<Typography className={'data'}>{property?.propertyTransmission}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Fuel</Typography>
													<Typography className={'data'}>{property?.propertyFuel}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Car type</Typography>
													<Typography className={'data'}>{property?.propertyType}</Typography>
												</Box>
											</Stack>
											<Stack className={'right'}>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Year Built</Typography>
													<Typography className={'data'}>{moment(property?.createdAt).format('YYYY')}</Typography>
												</Box>
												<Box component={'div'} className={'info'}>
													<Typography className={'title'}>Car Options</Typography>
													<Typography className={'data'}>
														For {property?.propertyBarter && 'Barter'} {property?.propertyRent && 'Rent'}
													</Typography>
												</Box>
											</Stack>
										</Stack>
									</Stack>
								</Stack>
								<Stack className={'floor-plans-config'}>
									<Typography className={'title'}>Car options</Typography>
									<Stack className="amenity-box" style={{ gap: '1em' }} flexDirection="column">
										{option.map((option, index) => (
											<Box component="div" className="amenity-info" key={index} display="flex" alignItems="center">
												{PROPERTY_OPTION_DETAILS[option as PropertyOptionKey]?.icon}
												<Typography variant="body1" style={{ marginLeft: '40px' }}>
													{PROPERTY_OPTION_DETAILS[option as PropertyOptionKey]?.name || option.toLowerCase()}
												</Typography>
											</Box>
										))}
									</Stack>
								</Stack>
								<Stack className={'floor-plans-config'}>
									<Typography className={'title'}>Why I reccomend this car</Typography>
									<Stack className={'image-box'}>
										<img src={'/img/icons/skelet.jpg'} alt={'image'} />
									</Stack>
									<Stack className={'image-box'}>
										<img src={'/img/icons/2.webp'} alt={'image'} />
									</Stack>
								</Stack>
								{/* <Stack className={'address-config'}>
									<Typography className={'title'}>Address</Typography>
									<Stack className={'map-box'}>
										<iframe
											src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25867.098915951767!2d128.68632810247993!3d35.86402299180927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35660bba427bf179%3A0x1fc02da732b9072f!2sGeumhogangbyeon-ro%2C%20Dong-gu%2C%20Daegu!5e0!3m2!1suz!2skr!4v1695537640704!5m2!1suz!2skr"
											width="100%"
											height="100%"
											style={{ border: 0 }}
											allowFullScreen={true}
											loading="lazy"
											referrerPolicy="no-referrer-when-downgrade"
										></iframe>
									</Stack>
								</Stack> */}
								{commentTotal !== 0 && (
									<Stack className={'reviews-config'}>
										<Stack className={'filter-box'}>
											<Stack className={'review-cnt'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
													<g clipPath="url(#clip0_6507_7309)">
														<path
															d="M15.7183 4.60288C15.6171 4.3599 15.3413 4.18787 15.0162 4.16489L10.5822 3.8504L8.82988 0.64527C8.7005 0.409792 8.40612 0.257812 8.07846 0.257812C7.7508 0.257812 7.4563 0.409792 7.32774 0.64527L5.57541 3.8504L1.14072 4.16489C0.815641 4.18832 0.540363 4.36035 0.438643 4.60288C0.337508 4.84586 0.430908 5.11238 0.676772 5.28084L4.02851 7.57692L3.04025 10.9774C2.96794 11.2275 3.09216 11.486 3.35771 11.636C3.50045 11.717 3.66815 11.7575 3.83643 11.7575C3.98105 11.7575 4.12577 11.7274 4.25503 11.667L8.07846 9.88098L11.9012 11.667C12.1816 11.7979 12.5342 11.7859 12.7992 11.636C13.0648 11.486 13.189 11.2275 13.1167 10.9774L12.1284 7.57692L15.4801 5.28084C15.7259 5.11238 15.8194 4.84641 15.7183 4.60288Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_7309">
															<rect width="15.36" height="12" fill="white" transform="translate(0.398438)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'reviews'}>{commentTotal} reviews</Typography>
											</Stack>
										</Stack>
										<Stack className={'review-list'}>
											{propertyComments?.map((comment: Comment) => {
												return <Review comment={comment} key={comment?._id} />;
											})}
											<Box component={'div'} className={'pagination-box'}>
												<MuiPagination
													page={commentInquiry.page}
													count={Math.ceil(commentTotal / commentInquiry.limit)}
													onChange={commentPaginationChangeHandler}
													shape="circular"
													color="primary"
												/>
											</Box>
										</Stack>
									</Stack>
								)}
								<Stack className={'leave-review-config'}>
									<Typography className={'main-title'}>Write Comment</Typography>
									<Typography className={'review-title'}>Comments</Typography>
									<textarea
										onChange={({ target: { value } }: any) => {
											setInsertCommentData({ ...insertCommentData, commentContent: value });
										}}
										value={insertCommentData.commentContent}
									></textarea>
									<Box className={'submit-btn'} component={'div'}>
										<Button
											className={'submit-review'}
											disabled={insertCommentData.commentContent === '' || user?._id === ''}
											onClick={createCommentHandler}
										>
											<Typography className={'title'}>Send Comment</Typography>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_3642)">
													<path
														d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
														fill="#181A20"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_3642">
														<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Box>
								</Stack>
							</Stack>
							<Stack className={'right-config'}>
								<Stack className={'info-box'}>
									<Typography className={'main-title'}>Get More Information</Typography>
									<Stack className={'image-info'}>
										<img
											className={'member-image'}
											src={
												property?.memberData?.memberImage
													? `${REACT_APP_API_URL}/${property?.memberData?.memberImage}`
													: '/img/profile/defaultUser.svg'
											}
										/>
										<Stack className={'name-phone-listings'}>
											<Link href={`/member?memberId=${property?.memberData?._id}`}>
												<Typography className={'name'}>{property?.memberData?.memberNick}</Typography>
											</Link>
											<Stack className={'phone-number'}>
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
													<g clipPath="url(#clip0_6507_6774)">
														<path
															d="M16.2858 10.11L14.8658 8.69C14.5607 8.39872 14.1551 8.23619 13.7333 8.23619C13.3115 8.23619 12.9059 8.39872 12.6008 8.69L12.1008 9.19C11.7616 9.528 11.3022 9.71778 10.8233 9.71778C10.3444 9.71778 9.88506 9.528 9.54582 9.19C9.16082 8.805 8.91582 8.545 8.67082 8.29C8.42582 8.035 8.17082 7.76 7.77082 7.365C7.43312 7.02661 7.24347 6.56807 7.24347 6.09C7.24347 5.61193 7.43312 5.15339 7.77082 4.815L8.27082 4.315C8.41992 4.16703 8.53822 3.99099 8.61889 3.79703C8.69956 3.60308 8.741 3.39506 8.74082 3.185C8.739 2.76115 8.57012 2.35512 8.27082 2.055L6.85082 0.625C6.44967 0.225577 5.9069 0.000919443 5.34082 0C5.06197 0.000410905 4.78595 0.0558271 4.52855 0.163075C4.27116 0.270322 4.03745 0.427294 3.84082 0.625L2.48582 1.97C1.50938 2.94779 0.960937 4.27315 0.960938 5.655C0.960937 7.03685 1.50938 8.36221 2.48582 9.34C3.26582 10.12 4.15582 11 5.04082 11.92C5.92582 12.84 6.79582 13.7 7.57082 14.5C8.5484 15.4749 9.87269 16.0224 11.2533 16.0224C12.6339 16.0224 13.9582 15.4749 14.9358 14.5L16.2858 13.15C16.6828 12.7513 16.9073 12.2126 16.9108 11.65C16.9157 11.3644 16.8629 11.0808 16.7555 10.8162C16.6481 10.5516 16.4884 10.3114 16.2858 10.11ZM15.5308 12.375L15.3858 12.5L13.9358 11.045C13.8875 10.99 13.8285 10.9455 13.7623 10.9142C13.6961 10.8829 13.6243 10.8655 13.5511 10.8632C13.478 10.8608 13.4051 10.8734 13.337 10.9003C13.269 10.9272 13.2071 10.9678 13.1554 11.0196C13.1036 11.0713 13.0631 11.1332 13.0361 11.2012C13.0092 11.2693 12.9966 11.3421 12.999 11.4153C13.0014 11.4884 13.0187 11.5603 13.05 11.6265C13.0813 11.6927 13.1258 11.7517 13.1808 11.8L14.6558 13.275L14.2058 13.725C13.4279 14.5005 12.3743 14.936 11.2758 14.936C10.1774 14.936 9.12372 14.5005 8.34582 13.725C7.57582 12.955 6.70082 12.065 5.84582 11.175C4.99082 10.285 4.06582 9.37 3.28582 8.59C2.51028 7.81209 2.0748 6.75845 2.0748 5.66C2.0748 4.56155 2.51028 3.50791 3.28582 2.73L3.73582 2.28L5.16082 3.75C5.26027 3.85277 5.39648 3.91182 5.53948 3.91417C5.68247 3.91651 5.82054 3.86196 5.92332 3.7625C6.02609 3.66304 6.08514 3.52684 6.08748 3.38384C6.08983 3.24084 6.03527 3.10277 5.93582 3L4.43582 1.5L4.58082 1.355C4.67935 1.25487 4.79689 1.17543 4.92654 1.12134C5.05619 1.06725 5.19534 1.03959 5.33582 1.04C5.61927 1.04085 5.89081 1.15414 6.09082 1.355L7.51582 2.8C7.61472 2.8998 7.6704 3.0345 7.67082 3.175C7.67088 3.24462 7.65722 3.31358 7.63062 3.37792C7.60403 3.44226 7.56502 3.50074 7.51582 3.55L7.01582 4.05C6.47844 4.58893 6.17668 5.31894 6.17668 6.08C6.17668 6.84106 6.47844 7.57107 7.01582 8.11C7.43582 8.5 7.66582 8.745 7.93582 9C8.20582 9.255 8.43582 9.53 8.83082 9.92C9.36974 10.4574 10.0998 10.7591 10.8608 10.7591C11.6219 10.7591 12.3519 10.4574 12.8908 9.92L13.3908 9.42C13.4929 9.32366 13.628 9.26999 13.7683 9.26999C13.9087 9.26999 14.0437 9.32366 14.1458 9.42L15.5658 10.84C15.6657 10.9387 15.745 11.0563 15.7991 11.1859C15.8532 11.3155 15.8809 11.4546 15.8808 11.595C15.8782 11.7412 15.8459 11.8853 15.7857 12.0186C15.7255 12.1518 15.6388 12.2714 15.5308 12.37V12.375Z"
															fill="#181A20"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6507_6774">
															<rect width="16" height="16" fill="white" transform="translate(0.9375)" />
														</clipPath>
													</defs>
												</svg>
												<Typography className={'number'}>{property?.memberData?.memberPhone}</Typography>
											</Stack>
											<Typography className={'listings'}>View Listings</Typography>
										</Stack>
									</Stack>
								</Stack>
								<form onSubmit={handleSubmit}>
									<Stack className={'info-box'}>
										<Typography className={'sub-title'}>Name</Typography>
										<input
											type={'text'}
											placeholder={'Enter your name'}
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Stack>
									<Stack className={'info-box'}>
										<Typography className={'sub-title'}>Phone</Typography>
										<input
											type={'text'}
											placeholder={'Enter your phone'}
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</Stack>
									<Stack className={'info-box'}>
										<Typography className={'sub-title'}>Email</Typography>
										<input
											type={'text'}
											placeholder={'Enter your email'}
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Stack>
									<Stack className={'info-box'}>
										<Typography className={'sub-title'}>Message</Typography>
										<textarea
											placeholder={'Hello, I am interested in \n[Renovated property at floor]'}
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										></textarea>
									</Stack>
									<Stack className={'info-box'}>
										<Button className={'send-message'} type="submit" disabled={loading}>
											<Typography className={'title'}>Send Message</Typography>
											<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
												<g clipPath="url(#clip0_6975_593)">
													<path
														d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0_6975_593">
														<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
													</clipPath>
												</defs>
											</svg>
										</Button>
									</Stack>
								</form>
								{/* <Stack className={'info-box'}>
									<Typography className={'sub-title'}>Name</Typography>
									<input type={'text'} placeholder={'Enter your name'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Phone</Typography>
									<input type={'text'} placeholder={'Enter your phone'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Email</Typography>
									<input type={'text'} placeholder={'creativelayers088'} />
								</Stack>
								<Stack className={'info-box'}>
									<Typography className={'sub-title'}>Message</Typography>
									<textarea placeholder={'Hello, I am interested in \n' + '[Renovated property at  floor]'}></textarea>
								</Stack>
								<Stack className={'info-box'}>
									<Button className={'send-message'}>
										<Typography className={'title'}>Send Message</Typography>
										<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
											<g clipPath="url(#clip0_6975_593)">
												<path
													d="M16.0556 0.5H6.2778C6.03214 0.5 5.83334 0.698792 5.83334 0.944458C5.83334 1.19012 6.03214 1.38892 6.2778 1.38892H14.9827L0.630219 15.7413C0.456594 15.915 0.456594 16.1962 0.630219 16.3698C0.71701 16.4566 0.83076 16.5 0.944469 16.5C1.05818 16.5 1.17189 16.4566 1.25872 16.3698L15.6111 2.01737V10.7222C15.6111 10.9679 15.8099 11.1667 16.0556 11.1667C16.3013 11.1667 16.5001 10.9679 16.5001 10.7222V0.944458C16.5 0.698792 16.3012 0.5 16.0556 0.5Z"
													fill="white"
												/>
											</g>
											<defs>
												<clipPath id="clip0_6975_593">
													<rect width="16" height="16" fill="white" transform="translate(0.5 0.5)" />
												</clipPath>
											</defs>
										</svg>
									</Button>
								</Stack> */}
							</Stack>
						</Stack>
						{destinationProperties.length !== 0 && (
							<Stack className={'similar-properties-config'}>
								<Stack className={'title-pagination-box'}>
									<Stack className={'title-box'}>
										<Typography className={'main-title'}>Destination Car</Typography>
										<Typography className={'sub-title'}>Aliquam lacinia diam quis lacus euismod</Typography>
									</Stack>
									<Stack className={'pagination-box'}>
										<WestIcon className={'swiper-similar-prev'} />
										<div className={'swiper-similar-pagination'}></div>
										<EastIcon className={'swiper-similar-next'} />
									</Stack>
								</Stack>
								<Stack className={'cards-box'}>
									<Swiper
										className={'similar-homes-swiper'}
										slidesPerView={'auto'}
										spaceBetween={35}
										modules={[Autoplay, Navigation, Pagination]}
										navigation={{
											nextEl: '.swiper-similar-next',
											prevEl: '.swiper-similar-prev',
										}}
										pagination={{
											el: '.swiper-similar-pagination',
										}}
									>
										{destinationProperties.map((property: Property) => {
											return (
												<SwiperSlide className={'similar-homes-slide'} key={property.propertyTitle}>
													<PropertyBigCard
														property={property}
														likePropertyHandler={likePropertyHandler}
														key={property?._id}
													/>{' '}
												</SwiperSlide>
											);
										})}
									</Swiper>
								</Stack>
							</Stack>
						)}
					</Stack>
				</div>
			</div>
		);
	}
};

PropertyDetail.defaultProps = {
	initialComment: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			commentRefId: '',
		},
	},
};

export default withLayoutFull(PropertyDetail);

function likeTargetProperty(arg0: { variables: { input: string } }) {
	throw new Error('Function not implemented.');
}
