const Sentiment = require('sentiment');

let twitter_sentiment = new Sentiment();
let sentiment = {};

/*
 * gets the sentiment from tweet text, and determine if it is a negative, positive or a neutral tweet 
*/
sentiment.getSentiment = (tweets, socket) => {
	
	let result = twitter_sentiment.analyze(tweets.text);
	
	if (result.score < 0) {
		result = 'negative';
	} 
	
	else if (result.score > 0) {
		result = 'positive';
	} 
	
	else {
		result = 'neutral';
	}

	return sentiment.appendSentiment(tweets, result, socket);
};

/* append the sentiment tweet, which gets the twtter data of the user name, profile image, text and the sentiment of the tweet */
sentiment.appendSentiment =  (tweets, sentiment, socket) => {
	
	let twitter_data = {
		user: {
			screen_name: tweets.user.screen_name,
			profile_image_url_https: tweets.user.profile_image_url_https
		},
		text: tweets.text,
		sentiment: sentiment
	};

	return twitter_data;
};

module.exports = sentiment;
