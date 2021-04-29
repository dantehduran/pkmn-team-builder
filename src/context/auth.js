import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'auth',
	initialState: {
		user: null
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state, action) => {
			state.user = null;
		}
	}
});
export default slice.reducer;
// Actions
export const { login, logout } = slice.actions;
