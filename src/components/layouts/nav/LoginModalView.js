import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		// marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	form: {
		width: '100%' // Fix IE 11 issue.
		// marginTop: theme.spacing(1)
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export const LoginModalView = ({ open, handleClose, handleLogin, handleChange, values }) => {
	const classes = useStyles();

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			{/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
			<DialogContent>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<form className={classes.form} noValidate onSubmit={handleLogin}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={values.email}
							onChange={handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={values.password}
							onChange={handleChange}
						/>
						<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
							Log In
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
