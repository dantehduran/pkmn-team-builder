import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useFirestore } from '../../../hooks';
import { getColor } from '../../../helpers/getColor';
import {
	Chip,
	Typography,
	IconButton,
	CardMedia,
	CardContent,
	Card,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-evenly',
		minWidth: '295px',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
		paddingBottom: theme.spacing(0),
	},
	cover: {
		width: 130,
		minWidth: 120,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
	},
	types: {
		display: 'flex',
		justifyContent: 'star-flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.2),
		},
	},
}));

export const PokemonCard = ({ pokemon }) => {
	const classes = useStyles();
	const { deleteDoc } = useFirestore();
	const handleDelete = () => {
		deleteDoc(pokemon.path, pokemon.id);
	};
	return (
		<Card className={classes.root}>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="subtitle1">
						{pokemon.name.toUpperCase()}
					</Typography>
					<div className={classes.types}>
						{pokemon.types.map((type) => (
							<Chip
								label={type}
								key={type}
								style={{
									backgroundColor: getColor(type).colors[0],
									color: '#fff',
								}}
							/>
						))}
					</div>
				</CardContent>
				<div className={classes.controls}>
					<IconButton aria-label="delete" onClick={() => handleDelete()}>
						<Delete />
					</IconButton>
				</div>
			</div>
			<CardMedia
				className={classes.cover}
				image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.order}.png`}
				title={pokemon.name}
			/>
		</Card>
	);
};
