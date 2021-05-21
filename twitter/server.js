require('dotenv').config();
const express = require('express');
const http = require('http');
const Twit = require('twit');
const cors = require('cors');
const app = express();
const socketio = require('socket.io');
const sentiment = require('./sentiment');
const redis = require('redis');
const path = require('path');

app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// access selected resources from different origins 
app.use(cors({
	origin: [
	  'http://localhost:3001/', '*',
	],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
  }))


/* gets the build path of the react app direction, when running npm run build which 
 * builds the client application onto the server application within the same port
*/
 if (process.env.PORT) {
	app.use(express.static('./client/build'));
}
 
if (process.env.PORT) {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

/* setting up socket io onto the http server */
const server = http.createServer(app);

const io = socketio(server);

let connections = [];


const redisClient = redis.createClient();

redisClient.on('error', (err) => {
	console.log("Error" + err);
}) 

/* twitter api keys */
const twitter_client = new Twit({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


let keywords = [];
const redisKey = `hashtag:${keywords}`;

/* 
 * server socket connection, which connects to a web page, 
 * and creates a redis client with the appending rediskey
*/
io.on('connection', (socket) => {
	//redisClient.get(redisKey, () => {
		connections.push(socket);
		console.log(socket.id + ' has been connected and ' + connections.length + " sockted are currently connected to the server");

		let twitterStream = twitter_client;
		let lastTimestamp = Date.now();
		const speedLimiter = 200;
		/* gets the s3 object, which is the bucketName and the s3Key */
				/* searches for the keyword */
				socket.on('search', (keyword) => {
					console.log('keywords: ' + keyword);

					// if (keywords.filter((k) => k.name === input).length > 0) {
					if(keywords.includes(keyword)){
						try {
							twitterStream.stop();
							socket.emit('my error', 'the keyword is already being tracked in the live tweets');
						}
						catch {
							console.log("the keyword is already being tracked in the live tweets");
						}
					}

					else {
						try {	
							keywords.push(keyword);
							if (keywords.length > 1) {
								twitterStream.stop();
								console.log('stream has stopped for ' + keyword);
							}
						}
						
						catch {
							console.log("error has occured trying to stop the stream for the keyword of " + keyword);
						}
					}
					/* twitter stream endpoint */
					twitterStream = twitter_client.stream('statuses/filter', {
						language: 'en',
						track: keywords
					});
					/* 
					 * gets the latest tweet stream data within the certain keyword, and setting a timer, 
					 * for the tweets to get returned in an approximate time
					*/
					twitterStream.on('tweet', (tweet) => {
			
						if (tweet.timestamp_ms - lastTimestamp > speedLimiter) {
							const body = JSON.stringify(sentiment.getSentiment(tweet, socket));
	
							console.log("Caching tweets for keyword: " + keywords);
							
							redisClient.setex(redisKey, 3600, body, (error) => {
								if (error) {
									console.log(error);
								}
	
								else {
									console.log("Successfully cached data from the " + redisKey)
								}
							}); 

							lastTimestamp = Date.now();
							/*
							 * analyze the tweets text to determine if it is positive, negative or a neutral tweet
							 * and getting the user data for each tweet that gets returned once the socket getting emitted 
							*/
							socket.emit('sendTweet', {
								tweet: sentiment.getSentiment(tweet, socket)
							});
						}
					});
				});

				/* 
				 * deletes the appending keyword from the stream
				*/
				socket.on('delete', (i) => {
					try {
							twitterStream.stop();
							console.log(`keyword ${keywords[i]} has been disconnected`);
							keywords.splice(i, 1);

						if (keywords.length !== 0) {
							console.log('keywords ' + keywords);
							twitterStream = twitter_client.stream('statuses/filter', {
								language: 'en',
								track: keywords
							});

							twitterStream.on('tweet', function (tweet) {
								if (tweet.timestamp_ms - lastTimestamp > speedLimiter) {
									lastTimestamp = Date.now();
									socket.emit('sendTweet', {
										tweet: sentiment.getSentiment(tweet, socket)
									});
								}
							});
						}
					}

					catch {
						console.log("tried deleting an element that hasn't been added to the current tracking live tweets");
					}
				});

				/*
				 * disconnects the keyword from the stream
				*/
				socket.on('disconnect', () => {
					try {
						connections.splice(connections.indexOf(socket), 1);
						socket.disconnect();
						if (keywords.length > 1) {
							twitterStream.stop();
						}
						console.log("Disconnected " + connections.length + " socket from the server");
					}

					catch {
						console.log("Error disconnecting the socket from the server");
					}
				
				});
		})
	//})


server.listen(port, console.log(`server is listening on: ${port}`));