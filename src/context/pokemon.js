import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getColor } from '../helpers/getColor';
import { setColors, setPattern } from './ui';

const slice = createSlice({
	name: 'pokemon',
	initialState: {
		current: null,
		description: null
	},
	reducers: {
		setPokemon: (state, action) => {
			state.current = action.payload;
		},
		setDescription: (state, action) => {
			state.description = action.payload;
		}
	}
});

export default slice.reducer;

//Actions
const { setPokemon, setDescription } = slice.actions;

const getPokemon = (id) => async (dispatch) => {
	const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	delete data.sprites.other;
	delete data.sprites.versions;
	delete data.game_indices;
	delete data.moves;
	const { data: details } = await axios.get(data.species.url);
	const newDetails = {
		description: details.flavor_text_entries
			.find((item) => item.language.name === 'en' && (item.version.name === 'shield' || 'omega-ruby'))
			.flavor_text.split('')
			.join(' '),
		altName: details.genera.find((item) => item.language.name === 'en').genus
	};
	const bg = getColor(data.types[0].type.name);
	dispatch(setColors(bg.colors));
	dispatch(setPattern(bg.pattern));
	dispatch(setDescription(newDetails));
	dispatch(setPokemon(data));
};

export { setPokemon, getPokemon };
