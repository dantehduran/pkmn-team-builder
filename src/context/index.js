import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import ui from './ui';
import auth from './auth';
import pokemon from './pokemon';
import team from './team';

const rootReducer = combineReducers({
	ui,
	auth,
	pokemon,
	team
});

const store = configureStore({
	reducer: rootReducer
});

export default store;
