import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useFirebaseAuth } from '../../hooks';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { authUser } = useFirebaseAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				if (authUser) return <Component />;
				else return <Redirect to="/" />;
			}}
		/>
	);
};
