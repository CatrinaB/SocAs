import { createMuiTheme } from '@material-ui/core/styles';

const uiTheme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#26a69a',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: '#ef6694',
			main: '#ec407a',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#ffffff',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
		error: {
			main: "#b00020"
		}
	},
	status: {
		danger: 'orange',
	},
});

export default uiTheme;
