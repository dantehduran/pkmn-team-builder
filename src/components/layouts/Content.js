import { Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { Router } from '../routes/Router';
import { AddToTeam } from '../views/Pokemon/AddToTeam';

export const Content = () => {
	const colors = useSelector((state) => state.ui.colors);
	const pattern = useSelector((state) => state.ui.pattern);
	return (
		<div style={{ backgroundColor: colors[0], ...pattern }}>
			<Container maxWidth="md">
				<Router />
				<AddToTeam />
			</Container>
		</div>
	);
};
