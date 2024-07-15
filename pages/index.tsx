import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import PopularProperties from '../libs/components/homepage/PopularProperties';
import TopAgents from '../libs/components/homepage/TopAgents';
import Events from '../libs/components/homepage/Events';
import TrendProperties from '../libs/components/homepage/TrendProperties';
import TopProperties from '../libs/components/homepage/TopProperties';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TopBrands from '../libs/components/homepage/CarCategory';
import AboutUs from '../libs/components/homepage/aboutUs';
import CounterArea from '../libs/components/homepage/CounterArea';
import CarCategory from '../libs/components/homepage/CarCategory';
import CarBrand from '../libs/components/homepage/CarBrand';
import ChooseArea from '../libs/components/homepage/ChooseArea';
import BlogArea from '../libs/components/homepage/BlogArea';
import HeaderFilter from '../libs/components/homepage/HeaderFilter';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TrendProperties />
				<PopularProperties />
				<Advertisement />
				<TopProperties />
				<TopAgents />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<CarBrand />
				<HeaderFilter />
				<AboutUs />
				<TrendProperties />
				<CarCategory />
				<ChooseArea />
				<PopularProperties />
				<BlogArea />
				{/* <Advertisement /> */}
				<TopAgents />
				<CounterArea />
				<TopProperties />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
