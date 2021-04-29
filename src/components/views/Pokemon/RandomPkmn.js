import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon } from '../../../context/pokemon';
import { PokemonView } from './PokemonView';

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const RandomPkmn = () => {
	const dispatch = useDispatch();
	const pokemon = useSelector((state) => state.pokemon.current);
	const desc = useSelector((state) => state.pokemon.description);

	useEffect(
		() => {
			dispatch(getPokemon(getRandomInt(1, 800)));
		},
		[ dispatch ]
	);
	return <div>{pokemon ? <PokemonView pokemon={pokemon} desc={desc} /> : null}</div>;
};
