import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'ui',
	initialState: {
		colors: [],
		pattern: {}
	},
	reducers: {
		setColors: (state, action) => {
			state.colors = action.payload;
		},
		setPattern: (state, action) => {
			state.pattern = action.payload;
		}
	}
});

export default slice.reducer;

//Actions
const { setColors, setPattern } = slice.actions;

export { setColors, setPattern };
