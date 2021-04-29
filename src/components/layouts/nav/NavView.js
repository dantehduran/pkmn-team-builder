import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { LoginModal } from './LoginModal';
import { ExitToApp, ListAlt } from '@material-ui/icons';
import { useFirebaseAuth } from '../../../hooks/useFirebaseAuth';
import { useHistory } from 'react-router-dom';
import { AutocompleteCustom } from './Autocomplete';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		marginBottom: '13px'
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		},
		cursor: 'pointer'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

// #ef5350

export const NavView = () => {
	const { authUser, logout } = useFirebaseAuth();
	const history = useHistory();
	const classes = useStyles();

	return (
		<div className={classes.grow}>
			<AppBar position="sticky" style={{ backgroundColor: '#ef5350' }}>
				<Toolbar variant="dense">
					<Typography className={classes.title} variant="h6" noWrap onClick={() => history.push('/')}>
						Team Builder
					</Typography>
					<AutocompleteCustom />
					<div className={classes.grow} />
					{authUser && authUser ? (
						<React.Fragment>
							<Typography variant="h6" className={classes.title} noWrap style={{ paddingRight: '15px' }}>
								{authUser.email.substring(0, authUser.email.lastIndexOf('@'))}
							</Typography>
							<IconButton color="inherit" onClick={() => history.push('/teams')}>
								<ListAlt />
							</IconButton>
							<IconButton color="inherit" onClick={logout}>
								<ExitToApp />
							</IconButton>
						</React.Fragment>
					) : (
						<LoginModal />
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};
