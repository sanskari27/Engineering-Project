import './App.css';

import { Flex } from '@chakra-ui/react';
import { Route } from './config/const';
import useRoute from './hooks/useRoute';
import ContributePage from './views/contribute';
import PredictPage from './views/predict';

export default function App() {
	const route = useRoute();

	return (
		<Flex>
			{route === Route.PREDICT && <PredictPage />}
			{route === Route.CONTRIBUTE && <ContributePage />}
		</Flex>
	);
}
