import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const usePokemons = () => {
	const [ pokemons, setPokemons ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	const getPokemons = useCallback(async () => {
		const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1050`);
		const { results } = data;
		setPokemons(results);
		setLoading(false);
	}, []);

	useEffect(
		() => {
			getPokemons();
		},
		[ getPokemons ]
	);

	return { pokemons, loading };
};

export { usePokemons };
