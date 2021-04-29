import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { capitalize } from '../../../helpers/capitalize';
import { TypeBox } from './TypeBox';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		transform: 'translateZ(0px)',
	},
	paper: {
		// padding: theme.spacing(2),
		textAlign: 'center',
		marginBottom: theme.spacing(1),
	},
	order: {
		color: theme.palette.text.secondary,
		paddingRight: theme.spacing(1),
	},
	altName: {
		color: 'rgba(255, 255, 255, 0.7)',
	},
	forms: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: theme.spacing(1),
	},
	sprite: {
		maxWidth: '70px',
		maxHeight: '60px',
		display: 'flex',
		// justifyContent: 'center'
		margin: '0',
	},
	ilustration: {
		maxWidth: '350px',
		maxHeight: '350px',
		display: 'flex',
		// justifyContent: 'center'
		margin: 'auto',
	},
	image: {
		maxWidth: '100%',
		verticalAlign: 'middle',
		border: '0',
		margin: '0',
	},
	typeGroup: {
		display: 'table',
		width: '100%',
		tableLayout: 'fixed',
		borderCollapse: 'separate',
	},
	desc: {
		borderLeftStyle: 'solid',
		borderLeftColor: 'rgba(0,0,0,.2)',
		borderLeft: '5px solid #eee',
		flexBasis: 'auto',
	},
}));

export const PokemonView = ({ pokemon, desc }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Box clone order={{ xs: 2, sm: 1 }}>
					<Grid item xs={12} sm={6}>
						<div className={classes.paper}>
							<Typography
								variant="h5"
								display="inline"
								className={classes.order}
							>
								#{pokemon.id}
							</Typography>
							<Typography variant="h3" display="inline">
								{capitalize(pokemon.name.split('-').join(' '))}
							</Typography>
							<Typography variant="subtitle1" className={classes.altName}>
								{desc.altName}
							</Typography>
						</div>
						<div className={classes.forms}>
							{pokemon.sprites.front_default && (
								<div className={classes.sprite}>
									<img
										src={pokemon.sprites.front_default}
										alt="front sprite"
										className={classes.image}
									/>
								</div>
							)}
							{pokemon.sprites.back_default && (
								<div className={classes.sprite}>
									<img
										src={pokemon.sprites.back_default}
										alt="back sprite"
										className={classes.image}
									/>
								</div>
							)}
							{pokemon.sprites.front_shiny && (
								<div className={classes.sprite}>
									<img
										src={pokemon.sprites.front_shiny}
										alt="front shiny"
										className={classes.image}
									/>
								</div>
							)}
							{pokemon.sprites.back_shiny && (
								<div className={classes.sprite}>
									<img
										src={pokemon.sprites.back_shiny}
										alt="back shiny"
										className={classes.image}
									/>
								</div>
							)}
						</div>
						<div className={classes.typeGroup}>
							{pokemon.types.map((item) => (
								<TypeBox key={item.type.name} type={item.type.name} badge="" />
							))}
						</div>
					</Grid>
				</Box>
				<Box clone order={{ xs: 1, sm: 2 }}>
					<Grid item xs={12} sm={6}>
						<div className={classes.ilustration}>
							<img
								className={classes.image}
								src={`https://megadexter.com/uploads/dex/pkmn/official/${pokemon.name
									.split('-')
									.join('')}.png`}
								alt={pokemon.name}
							/>
						</div>
					</Grid>
				</Box>
			</Grid>
			<Grid
				container
				spacing={3}
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12} className={classes.desc}>
					<Typography variant="body1">{desc.description}</Typography>
				</Grid>
			</Grid>
		</div>
	);
};
