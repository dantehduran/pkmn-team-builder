import React, { useState } from 'react';
import { LoginModalView } from './LoginModalView';
import { IconButton } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';

export const LoginModal = () => {
	const [ open, setOpen ] = useState(false);
	const [ values, setValues ] = useState({
		email: '',
		password: ''
	});
	const { login } = useFirebaseAuth();

	const handleChange = (e) => {
		const { id, value } = e.currentTarget;
		setValues((prevState) => ({
			...prevState,
			[id]: value
		}));
	};

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(values);
		login(values.email, values.password);
		setOpen(false);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton aria-label="show 17 new notifications" color="inherit" onClick={handleClickOpen}>
				<Lock />
			</IconButton>
			<LoginModalView
				open={open}
				handleClose={handleClose}
				handleLogin={handleLogin}
				handleChange={handleChange}
				values={values}
			/>
		</div>
	);
};
