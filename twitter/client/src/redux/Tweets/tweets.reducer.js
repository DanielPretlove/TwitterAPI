import tweetsTypes from './tweets.types';

const INITIAL_STATE = {
	tweets: [],
	error: null,
	keywords: []
};

const tweetsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case tweetsTypes.FETCH_TWEETS:
			let data = state.keywords;
			data.filter((keyword, i) => {
				let str = action.payload.text;
				let search = keyword.name;
				// If you use unicode characters then this might be a better expression
				// thank you @Touffy
				let isMatch = new RegExp('(?:^|\\s)'+search, 'i').test(str); // i is case insensitive
				console.log(isMatch);

				if(isMatch){
					return keyword[action.payload.sentiment] +=1;
				} else
				{
					return null;
				}	
			});

			return {
				...state,
				tweets: [
					{ text: action.payload.text, user: action.payload.user },
					...state.tweets
				],
				keywords: data
			};

		case tweetsTypes.ADD_KEYWORD:
			return {
				...state,
				keywords: [
					...state.keywords,
					{ name: action.payload, positive: 0, negative: 0, neutral: 0 }
				]
			};

		case tweetsTypes.DELETE_KEYWORD:
			return {
				...state,
				keywords: state.keywords.filter((k, i) => i !== action.payload)
			};

		default:
			return state;
	}
};

export default tweetsReducer;