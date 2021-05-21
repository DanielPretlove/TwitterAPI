import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	},
	tweetsScroll: {
		height: 600,
		overflow: 'hidden',
		overflowY: 'scroll',
		padding: 20,
		'& li': {
			background: '#f0f0f0'
		},
		'& li:nth-child(odd)': {
			background: '#ffffff'
		}
	}
}));


export default function LiveTweetsList({ handleDelete, label }) {
	const classes = useStyles();
	const { tweets, keywords } = useSelector((state) => state.tweets);

	let keywordsName = keywords.map((keyword) => keyword.name);

	return (
		<Grid item xs={12} md={label === 'Live Tweets' ? 8 : 4}>
			<Typography variant="h3" className={classes.title}>
				{label}
			</Typography>
			<div className={classes.demo}>
				<List className={classes.tweetsScroll}>
					{/*returns the live tweets user screen name and the tweet */}
					{label === 'Live Tweets' &&
						tweets.length > 0 &&
						tweets.map((tweet, index) => (
							<ListItem key={index}>
								<ListItemText>
									<Grid container>
										<Grid item sm={2}>
											<Avatar
												alt="tweet user"
												src={tweet.user.profile_image_url_https}
												style={{ width: 60, height: 60 }}
											/>
										</Grid>
										<Grid item sm={10}>
											<Highlighter
												highlightClassName="YourHighlightClass"
												searchWords={keywordsName}
												autoEscape={true}
												textToHighlight={`@${tweet.user.screen_name}: ${tweet.text}`}
											/>
										</Grid>
									</Grid>
								</ListItemText>
							</ListItem>
						))}
						{/* stores the live keywords in the live keywords list*/}
					{label === 'Live Keywords' &&
						keywords.map((keyword, i) => (
							<ListItem key={i}>
								<ListItemText primary={keyword.name} />
								{label === 'Live Keywords' && (
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => handleDelete(i)}
										>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								)}
							</ListItem>
						))}
				</List>
			</div>
		</Grid>
	);
}
