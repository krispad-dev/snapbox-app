
import React, { useContext, useState } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';

import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import { VscChromeClose } from 'react-icons/vsc';

export default function AppMenu() {

	const { state, dispatch } = useContext(UiContext)

	


	function showGeoDataHandler() {
		dispatch({type: UI_ACTIONS.TOGGLE_SHOW_GEOLOCATION })
		

	}

	function toggleNotifications() {
		dispatch({type: UI_ACTIONS.TOGGLE_SHOW_NOTIFICATIONS })
		
	}


	return (
		<AppMenuContainer id='app-menu-container'>


			<menu id='app-menu-options-list'>

				<StyledListItem>
					<Switch  checked={state.showGeoData} id='geolocation-switch' color='secondary' onChange={() => showGeoDataHandler()} />
					<label htmlFor='geolocation-switch'>Show geo info</label>
				</StyledListItem>

				<StyledListItem>
					<Switch  checked={state.showNotifications}  id='notification-switch' color='secondary' onChange={() => toggleNotifications()} />
					<label htmlFor='notification-switch'>Notifications</label>
				</StyledListItem>

			</menu>

			<VscChromeClose onClick={() => dispatch({type: UI_ACTIONS.CLOSE_APP_MENU })} />


		</AppMenuContainer>
	);
}

const AppMenuContainer = styled.div`
	animation: slideIn 0.5s ease-in-out;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	svg {
		margin-top: 2rem;
		opacity: ${props => props.theme.opacity.mediumDark};
		margin-right: 1rem;
		font-size: 1.5rem;
	
	}	
`;

const StyledListItem = styled.ul`
	margin: 1em 0em;

	label {
		opacity: ${props => props.theme.opacity.mediumDark};
	}
`;
