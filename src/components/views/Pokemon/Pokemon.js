import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemon } from '../../../context/pokemon';
import { PokemonView } from './PokemonView';

export const Pokemon = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const pokemon = useSelector((state) => state.pokemon.current);
	const desc = useSelector((state) => state.pokemon.description);

	useEffect(
		() => {
			dispatch(getPokemon(id));
		},
		[ id, dispatch ]
	);

	// if (loading) <div>Loading data</div>;
	return <div>{pokemon ? <PokemonView pokemon={pokemon} desc={desc} /> : null}</div>;
};
