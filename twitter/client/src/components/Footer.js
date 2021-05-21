import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles((theme) => ({
	footer: {
		width: '100%',
		backgroundColor: blue[800],
		height: 50
	}
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<Box component="div" className={classes.footer}>
			<Typography variant="h5" color="textSecondary" style={{ paddingTop: 10 }}>
				Tweet Analyser Tool 
			</Typography>
		</Box>
	);
}