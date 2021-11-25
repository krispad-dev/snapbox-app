import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ThemeProvider } from 'styled-components';
import { UiContextProvider } from './context/UiContext';
import { theme } from './theme';
import { registerServiceWorker } from './utils/registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
	<React.StrictMode>
		<UiContextProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</UiContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

registerServiceWorker({ mode: 'prod' });



