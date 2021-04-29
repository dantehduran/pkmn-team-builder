import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RandomPkmn, Pokemon } from '../views/Pokemon';
import { Home } from '../views/TeamBuilder/Home';
import { ProtectedRoute } from './ProtectedRoute';

export const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={RandomPkmn} />
			<ProtectedRoute path="/teams" component={Home} />
			<Route path="/pokemon/:id" component={Pokemon} />
		</Switch>
	);
};
