import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, setTeams } from '../../../context/team';
import { useFirestore } from '../../../hooks/useFirestore';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import {
	Divider,
	Collapse,
	ListItemText,
	ListItem,
	List,
	IconButton,
	ListItemSecondaryAction,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
import { AddTeam } from './AddTeam';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

export const TeamsList = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const dispatch = useDispatch();
	const { authUser } = useFirebaseAuth();
	const { getTeams } = useFirestore();
	const selectedTeam = useSelector((state) => state.team.selected);
	const teams = useSelector((state) => state.team.teams);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('md'));

	useEffect(() => {
		let isMounted = true;
		if (!authUser) return;
		getTeams(authUser.uid, (result) => {
			if (!isMounted) return;
			dispatch(
				setTeams(
					result.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				)
			);
		});

		return () => {
			isMounted = false;
		};
	}, [authUser, getTeams, dispatch]);

	//load first team detail of the team list
	const selectFirstTeam = useCallback(() => {
		if (!selectedTeam) {
			dispatch(setSelected(teams[0]));
		}
	}, [selectedTeam, teams, dispatch]);

	useEffect(() => {
		selectFirstTeam();
	}, [teams, selectFirstTeam]);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<List
			component="nav"
			aria-labelledby="list-pokemon-teams"
			className={classes.root}
		>
			<ListItem>
				<ListItemText primary={`Teams ${teams.length}/9`} />
				{!matches && (
					<ListItemSecondaryAction>
						<IconButton edge="end" aria-label="expand" onClick={handleClick}>
							{open ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
					</ListItemSecondaryAction>
				)}
			</ListItem>
			<Collapse in={matches || open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{teams.map((team) => (
						<ListItem
							button
							key={team.id}
							onClick={() => dispatch(setSelected(team))}
							selected={team.id === selectedTeam?.id}
						>
							<ListItemText primary={team.name} />
						</ListItem>
					))}
					{teams.length < 9 && (
						<React.Fragment>
							<Divider />
							<ListItem>
								<AddTeam />
							</ListItem>
						</React.Fragment>
					)}
				</List>
			</Collapse>
		</List>
	);
};
