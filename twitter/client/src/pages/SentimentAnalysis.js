import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DropDownMenu from '../components/DropDownMenu';

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

export default function SentimentAnalysis() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.title}>
				The graph below show the total number of positive and negative tweets
				about a topic selected from the drop down button.
			</Typography>
			<DropDownMenu />
		</div>
	);
}
