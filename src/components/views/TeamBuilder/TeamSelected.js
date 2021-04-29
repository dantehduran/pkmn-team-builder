import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../../../context/team';
import { useFirestore } from '../../../hooks';
import { EmptyPokemons, EmptyTeam } from './EmptyTeam';
import { PokemonCard } from './PokemonCard';

export const TeamSelected = () => {
	const selected = useSelector((state) => state.team.selected);
	const teams = useSelector((state) => state.team.teams);
	const dispatch = useDispatch();
	const { getCollection, deleteDoc } = useFirestore();
	const [pokemons, setPokemons] = useState([]);

	useEffect(() => {
		let isMounted = true;
		if (!selected) return;
		getCollection(`teams/${selected.id}/pokemons`, (result) => {
			if (!isMounted) return;
			setPokemons(
				result.docs.map((doc) => ({
					id: doc.id,
					path: `teams/${selected.id}/pokemons`,
					...doc.data(),
				}))
			);
		});
		return () => {
			isMounted = false;
		};
	}, [selected, getCollection]);

	const handleRemove = () => {
		deleteDoc('teams', selected.id);
		dispatch(setSelected(teams[0]));
	};

	if (!selected) {
		return <EmptyTeam />;
	}

	return (
		<Box justifyContent="center">
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				style={{ paddingBottom: '24px' }}
			>
				<Grid item>
					<Typography variant="h4">{selected?.name.toUpperCase()}</Typography>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<Delete />}
						onClick={() => handleRemove()}
					>
						Delete
					</Button>
				</Grid>
			</Grid>
			{pokemons.length !== 0 ? (
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					spacing={3}
				>
					{pokemons.map((pokemon, index) => (
						<Grid key={index} item xs={12} sm={6}>
							<PokemonCard
								pokemon={pokemon}
								index={index}
								teamId={selected.id}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<EmptyPokemons />
			)}
		</Box>
	);
};
