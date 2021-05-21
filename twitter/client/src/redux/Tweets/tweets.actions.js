import tweetsTypes from './tweets.types';
import socket from '../../utils/socket';

export const addKeyword = (input) => {
	return async (dispatch) => {
		try {
			dispatch({ type: tweetsTypes.ADD_KEYWORD, payload: input });
		} catch (error) {
			console.log(error);
		}
	};
};

export const fetchTweets = () => {
	return async (dispatch) => {
		try {
			socket.on('sendTweet', function ({ tweet }) {
				dispatch({
					type: tweetsTypes.FETCH_TWEETS,
					payload: tweet
				});
			});
		} catch (error) {
			console.error(error);
		}
	};
};

export const deleteKeyword = (i) => {
	return async (dispatch) => {
		dispatch({ type: tweetsTypes.DELETE_KEYWORD, payload: i });
	};
};
