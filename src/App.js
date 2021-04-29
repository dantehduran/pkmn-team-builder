import { Box, CssBaseline } from '@material-ui/core';
import React from 'react';
import { Nav } from './components/layouts';
import { Content } from './components/layouts/Content';
import { useSelector } from 'react-redux';

const App = () => {
	const colors = useSelector((state) => state.ui.colors);
	const pattern = useSelector((state) => state.ui.pattern);
	return (
		<React.Fragment>
			<CssBaseline />
			<Box style={{ height: '100vh', backgroundColor: colors[0], ...pattern }}>
				<Nav />
				<Content />
			</Box>
		</React.Fragment>
	);
};

export default App;
