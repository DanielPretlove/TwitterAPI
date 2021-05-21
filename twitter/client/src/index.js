import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './utils/theme';
import { ThemeProvider } from '@material-ui/core/styles';
//react-redux
import { Provider } from 'react-redux';
import store from './redux/createStore';

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
