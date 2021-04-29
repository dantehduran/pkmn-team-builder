import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const EmptyPokemons = () => (
	<Grid
		container
		direction="row"
		justify="flex-start"
		alignItems="flex-start"
		spacing={3}
	>
		{[0, 1, 2, 3, 4, 5].map((i) => (
			<Grid key={i} item xs={12} sm={6}>
				<Skeleton variant="rect" width={327} height={127} />
			</Grid>
		))}
	</Grid>
);

export const EmptyTeam = () => {
	return (
		<Box>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				style={{ paddingBottom: '24px' }}
			>
				<Skeleton variant="rect" width={110} height={40} />
				<Skeleton variant="rect" width={110} height={40} />
			</Grid>
			<EmptyPokemons />
		</Box>
	);
};
