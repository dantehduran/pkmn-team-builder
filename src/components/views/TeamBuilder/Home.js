import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { TeamSelected } from './TeamSelected';
import { TeamsList } from './TeamsList';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2)
	},
	teams: {
		color: theme.palette.text.secondary,
		maxHeight: theme.spacing(66),
		overflow: 'auto'
	}
}));
export const Home = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container spacing={3} direction="row" justify="space-around" alignItems="flex-start">
				<Grid item xs={12} md={3}>
					<Paper className={classes.teams}>
						<TeamsList />
					</Paper>
				</Grid>
				<Grid item sm={12} md={9}>
					<TeamSelected />
				</Grid>
			</Grid>
		</div>
	);
};
