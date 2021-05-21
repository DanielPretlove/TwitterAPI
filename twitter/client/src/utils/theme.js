import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

let theme = createMuiTheme({
	palette: {
		primary: {
			main: blue[800]
		},
		secondary: {
			main: green[500]
		},
		text: {
			secondary: '#ffffff',
			primary: '#00000'
		}
	},
	typography: {
		h1: {
			fontSize: '3rem'
		},
		h3: {
			fontSize: '2rem'
		}
	}
});

theme = responsiveFontSizes(theme);

export default theme;
