import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Add, Close } from '@material-ui/icons';
import { useFirestore, useFirebaseAuth } from '../../../hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTeams } from '../../../context/team';

const useStyles1 = makeStyles((theme) => ({
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	tooltip: {
		maxWidth: 'none',
		fontSize: 30,
	},
	staticTooltipLabel: {
		maxWidth: 'none',
		width: '100px',
	},
}));

const useStyles2 = makeStyles((theme) => ({
	staticTooltipLabel: {
		maxWidth: 'none',
		width: '100px',
	},
}));

export const AddToTeam = () => {
	const classes = useStyles1();
	const classesTooltip = useStyles2();
	const [open, setOpen] = useState(false);
	const { getTeamsList, saveDoc } = useFirestore();
	const { authUser } = useFirebaseAuth();
	const history = useHistory();
	const pokemon = useSelector((state) => state.pokemon.current);
	const teams = useSelector((state) => state.team.teams);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!authUser) return;
		getTeamsList(authUser.uid, (result) => {
			dispatch(
				setTeams(
					result.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				)
			);
		});
	}, [authUser, getTeamsList, dispatch]);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAdd = (teamId) => {
		const { name, id, types } = pokemon;
		saveDoc(`teams/${teamId}/pokemons`, {
			name,
			order: id,
			types: types.map((item) => item.type.name),
		});
		setOpen(false);
	};

	if (!authUser || history.location.pathname === '/teams') return null;

	return (
		<SpeedDial
			ariaLabel="SpeedDial openIcon example"
			className={classes.speedDial}
			icon={<SpeedDialIcon openIcon={<Close />} />}
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
		>
			{teams &&
				teams.map((team) => (
					<SpeedDialAction
						key={team.id}
						icon={<Add />}
						tooltipTitle={team.name}
						tooltipOpen
						onClick={() => handleAdd(team.id)}
						classes={classesTooltip}
					/>
				))}
		</SpeedDial>
	);
};
