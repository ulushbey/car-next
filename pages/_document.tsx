import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				{/* SEO */}
				<meta name="keyword" content={'car, car.uz, devex mern, mern nestjs fullstack'} />
				<meta
					name={'description'}
					content={
						'Buy and sell cars anywhere anytime in South Korea. Best Cars at Best prices on cars.uz | ' +
						'Покупайте и продавайте легковые автомобили в любой точке Южной Кореи в любое время. Лучшая легковые автомобили по лучшим ценам на nestar.uz | ' +
						'대한민국 언제 어디서나 자동차을 사고팔 수 있습니다. cars.uz에서 최적의 가격으로 최고의 자동차을 만나보세요'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
