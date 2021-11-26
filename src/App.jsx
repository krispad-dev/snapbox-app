import React, { useContext, useEffect, useState } from 'react';
import { UiContext, UI_ACTIONS } from './context/UiContext';

import styled from 'styled-components';

import CameraPage from './pages/CameraPage';
import CameraHeader from './components/CameraHeader';
import AppMenu from './components/AppMenu';
import StartPageHeader from './components/StartPageHeader';
import StartPage from './pages/StartPage';
import { checkAppSettings } from './utils/helpers';
import OnboadingPage from './pages/OnboadingPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const offlineMessage = 'App is now offline, your location will not be stored'
const onlineMessage = 'App is now online'



function App() {

	const { state, dispatch } = useContext(UiContext);
	const [browserIsOnline, setBrowserIsOnline ] = useState(false)


	const notify = () => toast(state.browserIsOnline ? onlineMessage : offlineMessage );


	useEffect(() => {

		notify()

	}, [state.browserIsOnline])


	

	if (checkAppSettings()) {
		return (
			<StyledAppContainer className='App'>
	
				{state.flashScreen && <FlashElement id={'flash-element'}></FlashElement>}
				{state.counterSeconds && <CounterElement id={'counter-element'}>{state.counterSeconds}</CounterElement>}

				<ToastContainer 
				theme='dark' 
				type='info' 
				autoClose={3000} 
				position="bottom-right"
				hideProgressBar
				
				/>

				<header>{state.cameraPageIsOpen ? <CameraHeader /> : <StartPageHeader />}</header>

				<main>{state.cameraPageIsOpen ? <CameraPage /> : <StartPage />}</main>

				<footer
					style={{
						animation: `${
							state.appMenuIsOpen
								? 'slideIn 0.2s ease-in-out forwards'
								: 'slideOut 0.2s ease-in-out forwards'
						}`,
					}}
				>
					{state.appMenuIsOpen && !state.cameraPageIsOpen && <AppMenu />}
				</footer>
			</StyledAppContainer>
		);
	} else if (!checkAppSettings()) {
		return <OnboadingPage />;
	}
}

export default App;

const StyledAppContainer = styled.div`
	width: 100vw;
	height: 100vh;

	header {
		background-color: ${props => props.theme.colors.backgroundBaseHeader};
		background-position: center;
		background-size: cover;
		height: 3rem;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
	}

	footer {
		background-color: ${props => props.theme.colors.overlayMenu};
		height: auto;
		position: fixed;
		bottom: 0;
		z-index: 10;
		width: 100vw;
		border-radius: 25px 25px 0px 0px;
		box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);

		@keyframes slideIn {
			0% {
				transform: translateY(100vh);
			}
			100% {
				transform: translateY(0vh);
			}
		}
	}

	main {
		background-color: ${props => props.theme.colors.backgroundSurface};
	
		flex-grow: 1;
		width: 100vw;
		flex-direction: column;
		overflow: hidden;
	}
`;

const FlashElement = styled.div`
	transition: 0.2s ease-in-out;
	position: absolute;
	background-color: #fff;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

const CounterElement = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20em;
	position: absolute;
	height: 100vh;
	width: 100vw;
`;
