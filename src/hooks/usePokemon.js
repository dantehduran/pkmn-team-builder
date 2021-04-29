import Axios from 'axios';
import { useEffect, useState } from 'react';

const usePokemon = (id) => {
	const [ pokemon, setPokemon ] = useState(null);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(
		() => {
			if (!id) return;
			const fetchData = async () => {
				try {
					const { data } = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
					setPokemon(data);
					setLoading(false);
				} catch (e) {
					setError(true);
				}
			};
			fetchData();
		},
		[ id ]
	);

	return { pokemon, loading, error };
};

export { usePokemon };
