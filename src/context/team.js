import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
	name: 'team',
	initialState: {
		selected: null,
		teams: [],
	},
	reducers: {
		setTeamsSerialize: (state, action) => {
			state.teams = action.payload;
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
	},
});

export default slice.reducer;

//Actions
const { setTeamsSerialize, setSelected } = slice.actions;

const setTeams = (teams) => (dispatch) => {
	dispatch(
		setTeamsSerialize(
			teams.map((team) => {
				delete team.createdAt;
				return { ...team };
			})
		)
	);
};

export { setTeams, setSelected };
