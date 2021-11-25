import React, { useContext } from 'react';
import { UiContext, UI_ACTIONS } from '../../context/UiContext';

import styled from 'styled-components';
import CircleButton from '../../components/buttons/CircleButton';
import { HiCamera } from 'react-icons/hi';
import * as Notification from '../../api/notification';
import { checkNotification } from '../../utils/helpers';

export default function ToggleCameraPageBtn() {
	const { dispatch } = useContext(UiContext);

	function cameraPageSwitchBtnHandler(params) {
		if (checkNotification()) {
			Notification.requestNotification();
		}

		dispatch({ type: UI_ACTIONS.SET_CAMERA_PAGE_IS_ON });
	}

	return (
		<SwitchToCameraBtnOverlay id='switch-to-camera-btn-overlay'>

			<CircleButton
				ariaLabel={'switch-to-camera'}
				icon={<HiCamera />}
				isActive={true}
				onClick={() => cameraPageSwitchBtnHandler()}
			/>
            
		</SwitchToCameraBtnOverlay>
	);
}

const SwitchToCameraBtnOverlay = styled.div`
	background-color: ${props => props.theme.colors.overlayMenu};
	position: absolute;
	right: 0;
	bottom: 15em;
	width: 4rem;
	height: 4em;
	border-radius: 25px 0px 0px 25px;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;
