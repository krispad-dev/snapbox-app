import React, { useContext } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';
import styled from 'styled-components';
import CircleButton from './buttons/CircleButton';
import { MdOutlineTimer3 } from 'react-icons/md';
import { FiRepeat } from 'react-icons/fi';
import { VscChromeClose } from 'react-icons/vsc';

export default function CameraHeader() {
	const { state, dispatch } = useContext(UiContext);

	function closeCameraHandler() {
		if (state.currentVideoStream || state.currentVideoStream === !undefined) {
			setTimeout(() => {
				const currentTracks = state.currentVideoStream.getTracks();
				currentTracks.forEach(track => {
					track.stop();
				});
				dispatch({ type: UI_ACTIONS.SAVE_VIDEO_STREAM, payload: null });
				dispatch({ type: UI_ACTIONS.SET_CAMERA_PAGE_IS_ON });
			}, 500);

			dispatch({ type: UI_ACTIONS.SET_IMAGES_TRIGGER });
		}
	}

	function toggleTimerHandler() {
		dispatch({ type: UI_ACTIONS.SET_TOGGLE_TIMER });
	}

	return (
		<CameraPageHeaderContainer>
			<GhostElement id='ghost-element'></GhostElement>

			<CircleBtnWrapper>
				<CircleButton
					ariaLabel={'toggle-timer'}
					isActive={state.timerIsOn}
					icon={<MdOutlineTimer3 />}
					onClick={() => toggleTimerHandler()}
				/>

			</CircleBtnWrapper>

			<VscChromeClose onClick={() => closeCameraHandler()} style={{ fontSize: '2rem', marginRight: '1rem' }} />
		</CameraPageHeaderContainer>
	);
}

const CameraPageHeaderContainer = styled.section`
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	img {
		width: 5rem;
		position: absolute;
	}

	svg {
		cursor: pointer;
	}
`;

const CircleBtnWrapper = styled.div`
	display: flex;
`;

const GhostElement = styled.div`
	margin-right: 4rem;
`;
