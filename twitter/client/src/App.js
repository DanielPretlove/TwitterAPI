import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import AnalyzeTool from './pages/AnalyzeTool';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Footer from './components/Footer';
import socket from './utils/socket';
import { fetchTweets } from './redux/Tweets/tweets.actions';
import { useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connect to server');
		});
		dispatch(fetchTweets());
		socket.on('connect_timeout', function () {
			window.alert('Connection time out');
		});
		socket.on('reconnect_failed', function () {
			window.alert('Reconnection failed');
		});

		socket.on('connect_error', function () {
			console.log('Connection failed');
		});

		return () => {
			socket.emit('disconnect');
			socket.off();
			console.log('Disconnect'); // false
		};
	}, []);

	return (
		<div className="App">
			<Router>
				<Header />
				<div className="layout">
					<Switch>
						<Route path="/sentiment-analysis">
							<SentimentAnalysis />
						</Route>
						<Route path="/">
							<AnalyzeTool />
						</Route>
					</Switch>
				</div>
				<Footer />
			</Router>
		</div>
	);
}

export default App;