import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LiveTweetsList from '../components/LiveTweetsList';
import socket from '../utils/socket';
import { useDispatch } from 'react-redux';
import { deleteKeyword, addKeyword } from '../redux/Tweets/tweets.actions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 20
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	centerDiv: {
		margin: 'auto'
	},
	margin: { marginTop: 20 },
	btn: { margin: '10px 0 10px 20px' },
	input: { width: 300 }
}));

/*
 * handles the keywords in the live streams, 
 * once you submit a keyword, it'll get added to the list
 *  and by pressing the delete icon, it'll then stop the current keyword 
 *  stream
*/
export default function AnalyzeTool() {
	const classes = useStyles();
	const [error, setError] = useState('');
	const [input, setInput] = useState('');
	const dispatch = useDispatch();
	const { keywords } = useSelector((state) => state.tweets);

	const clearAll = () => {
		setError('');
		setInput('');
	};

	const handleDelete = (i) => {
		dispatch(deleteKeyword(i));
		socket.emit('delete', i);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		if (!input) {
			setError('Please input valid keyword.');
		} else if (keywords.filter((k) => k.name === input).length > 0) {
			setError('Keyword has been tracking already');
		} else {
			socket.emit('search', input, clearAll());
			dispatch(addKeyword(input));
		}
	};

	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.title}>
				Search for live tweets here to get a sentiment of a specific keyword
			</Typography>
			<form
				className={classes.margin}
				onSubmit={handleSubmit}
				noValidate
				autoComplete="off"
			>
				<TextField
					className={classes.input}
					variant="outlined"
					helperText={error}
					error={error ? true : false}
					value={input}
					onChange={({ target }) => setInput(target.value)}
					required
				/>
				<Button
					color="secondary"
					variant="contained"
					className={classes.btn}
					type="submit"
				>
					Search
				</Button>
			</form>
			<Grid container>
				<LiveTweetsList label="Live Tweets" />
				<LiveTweetsList
					keywords={keywords}
					handleDelete={handleDelete}
					label="Live Keywords"
				/>
			</Grid>
		</div>
	);
}
