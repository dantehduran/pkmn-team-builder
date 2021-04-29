import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputBase } from '@material-ui/core';
import { usePokemons } from '../../../hooks/usePokemons';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
	}
}));

export const AutocompleteCustom = () => {
	const classes = useStyles();
	const history = useHistory();
	const [ value, setValue ] = React.useState(null);
	const [ inputValue, setInputValue ] = React.useState('');
	const { pokemons } = usePokemons();

	return (
		<Autocomplete
			value={value}
			onChange={(event, newValue) => {
				if (!newValue) return;
				setValue(newValue);
				history.push(`/pokemon/${newValue.name}`);
			}}
			inputValue={inputValue}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			getOptionLabel={(option) => option.name.split('-').join(' ')}
			id="controllable-states-demo"
			options={pokemons}
			// style={{ width: 300 }}
			renderInput={(params) => (
				<div ref={params.InputProps.ref} className={classes.search}>
					<div className={classes.searchIcon}>
						<Search />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput
						}}
						inputProps={params.inputProps}
					/>
				</div>
			)}
		/>
	);
};
