import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	centerDiv: {
		margin: 'auto'
	}
}));

export default function Header() {
	const classes = useStyles();
	let location = useLocation();

	if (location.pathname === '/sentiment-analysis') {
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<div className={classes.centerDiv}>
							<Typography variant="h1" className={classes.title}>
								Tweet Analyser Tool
							</Typography>
							<Link to="/">
								<Button color="inherit">Back to search</Button>
							</Link>
							<Link to="/sentiment-analysis">
								<Button color="inherit">Sentiment Analysis</Button>
							</Link>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	} else {
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<div className={classes.centerDiv}>
							<Typography variant="h1" className={classes.title}>
								Tweet Analyser Tool
							</Typography>
							<Link to="/">
								<Button color="inherit">Home</Button>
							</Link>
							<Link to="/sentiment-analysis">
								<Button color="inherit">Sentiment Analysis</Button>
							</Link>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
