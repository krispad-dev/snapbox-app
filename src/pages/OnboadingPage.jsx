import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../components/logo';
import { Switch } from '@mui/material';

export default function OnboadingPage() {
	
	const [acceptedGeolocation, setAcceptedGeolocaton] = useState(true);
	const [acceptedNotifications, setAcceptedNotifications] = useState(true);

	function acceptHandler(e) {

		e.preventDefault();
		location.reload();

		if (acceptedGeolocation) {
			document.cookie = 'geoLocation=true; SameSite=Strict; Secure';
		} else {
			document.cookie = 'geoLocation=false; SameSite=Strict; Secure';
		}

		if (acceptedNotifications) {
			document.cookie = 'notifications=true; SameSite=Strict; Secure';
		} else {
			document.cookie = 'notifications=false; SameSite=None; Secure';
		}

		document.cookie = 'appSettings=true; SameSite=None; Secure';
	}

	return (
		<OnBoardingPageContainer>
			<StyledWelcomeArticle>
				<h2>Welcome to snapbox</h2>

				<p>
					{' '}
					A simple photo-app using WebRTC-technologies to capture images. read more &nbsp;
					<strong>
						<a target='_blank' href='https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API'>
							HERE
						</a>
					</strong>{' '}
					<br />
				</p>
				<p>
					Images will be stored temporarily in Cloudinary and will be publicly available. in offline mode the
					app will store the images locally on your device.
				</p>
			</StyledWelcomeArticle>

			<form onSubmit={e => acceptHandler(e)}>
				<Logo />

				<StyledOptionsContainer>
					<StyledSwitchContainer>
						<label htmlFor='accept-notifications'>Ask to enable Notifications</label>
						<Switch
							defaultChecked
							onChange={e => setAcceptedNotifications(!acceptedNotifications)}
							id={'accept-notifications'}
						/>
					</StyledSwitchContainer>
					<p>The app may want to notify you when a picture is taken. </p>
				</StyledOptionsContainer>

				<StyledOptionsContainer>
					<StyledSwitchContainer>
						<label htmlFor='accept-geolocation'>Ask to enable Geolocation</label>
						<Switch
							defaultChecked
							onChange={e => setAcceptedGeolocaton(!acceptedGeolocation)}
							id={'accept-geolocation'}
						/>
					</StyledSwitchContainer>
					<p>Makes it possible to let you know where the photo was taken.</p>
				</StyledOptionsContainer>

				<StyledSubmitButton>ACCEPT</StyledSubmitButton>
			</form>

			<small>&copy; Kristofer Padoan 2021</small>
		</OnBoardingPageContainer>
	);
}

const OnBoardingPageContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	height: 100vh;

	small {
		margin: 1rem;
		margin-bottom: 5rem;
	}

	form {
		margin: 0rem 1rem;
		padding: 2em;
		border-radius: 25px;
		background-color: ${props => props.theme.colors.overlayMenu};
		box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);
	}

	h1 {
		font-size: 2em;
	}

	h2 {
		margin: 0.5em;
		@media only screen and (max-width: 600px) {
			font-size: 1.5rem;
			margin: 0.5rem;
		}
	}

	a {
		color: ${props => props.theme.colors.accent};
	}
`;

const StyledSwitchContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledOptionsContainer = styled.div`
	margin: 2em 0em;
	p {
		font-size: 0.8rem;
		margin: 0;
	}
`;

const StyledSubmitButton = styled.button`
	width: 100%;
	height: 3em;
	background-color: ${props => props.theme.colors.accent};
	border: none;
	border-radius: 25px;
`;

const StyledWelcomeArticle = styled.article`
	max-width: 30rem;
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 90%;
	text-align: center;
	p {
		font-size: 1rem;
		@media only screen and (max-width: 600px) {
			font-size: 0.8rem;
			margin-bottom: 1rem;
		}
	}
`;
