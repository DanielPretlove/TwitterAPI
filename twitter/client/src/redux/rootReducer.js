//root of all reducers(function)
import { combineReducers } from 'redux';

import tweetsReducer from './Tweets/tweets.reducer';

//pass as an function
export default combineReducers({
	tweets: tweetsReducer
});
