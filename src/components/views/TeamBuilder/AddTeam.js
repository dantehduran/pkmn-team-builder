import { Button, IconButton, InputBase, makeStyles } from '@material-ui/core';
import { Add, Check, Close } from '@material-ui/icons';
import React, { useState } from 'react';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import { useFirestore } from '../../../hooks/useFirestore';

const useStyles = makeStyles((theme) => ({
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 5
	}
}));

export const AddTeam = () => {
	const classes = useStyles();
	const [ edit, setEdit ] = useState(false);
	const [ name, setName ] = useState('');
	const { saveDoc } = useFirestore();
	const { authUser } = useFirebaseAuth();

	const add = () => {
		saveDoc(`teams`, { name, user: authUser.uid });
		close();
	};

	const close = () => {
		setName('');
		setEdit(false);
	};

	if (!edit) {
		return (
			<Button variant="contained" color="primary" fullWidth endIcon={<Add />} onClick={() => setEdit(true)}>
				Add new
			</Button>
		);
	}

	return (
		<React.Fragment>
			<InputBase
				className={classes.input}
				placeholder="Team Name"
				inputProps={{ 'aria-label': 'inset team name' }}
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
			/>
			<IconButton
				type="submit"
				color="primary"
				className={classes.iconButton}
				aria-label="search"
				onClick={() => add()}
			>
				<Check />
			</IconButton>
			<IconButton
				color="secondary"
				className={classes.iconButton}
				aria-label="directions"
				onClick={() => close()}
			>
				<Close />
			</IconButton>
		</React.Fragment>
	);
};
