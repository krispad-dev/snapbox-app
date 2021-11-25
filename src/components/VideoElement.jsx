import React, { useRef, useContext, useEffect } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';
import * as mediaDevices from '../api/mediaDevices';

import {
	useWindowSize,
	useWindowWidth,
	useWindowHeight,
  } from '@react-hook/window-size'
   

export default function VideoElement() {

	const [windowWidth, windowHeight] = useWindowSize();
	
	const { state, dispatch } = useContext(UiContext);

	const videoRef = useRef(null);



	useEffect(async () => {

		dispatch({ type: UI_ACTIONS.SET_CAMERA_IS_LOADING, payload: true });

		if (!state.currentVideoStream) {


			dispatch({ type: UI_ACTIONS.SAVE_VIDEO_STREAM, payload: null });

			const stream = await mediaDevices.getMedia({ facingMode: state.facingMode });
			dispatch({ type: UI_ACTIONS.SAVE_VIDEO_STREAM, payload: stream });
		}

		dispatch({ type: UI_ACTIONS.SET_CAMERA_IS_LOADING, payload: false });

	}, [state.facingMode]);



	useEffect(() => {

		if (state.currentVideoStream && state.currentVideoStream.active) {
			videoRef.current.srcObject = state.currentVideoStream;
			videoRef.current.play();
		}

	}, [state.currentVideoStream]);




	useEffect(() => {

		dispatch({ type: UI_ACTIONS.SET_CURRENT_VIDEO_REF, payload: videoRef });

	}, [state.currentVideoRef]);


	return state.currentVideoStream && <video ref={videoRef} playsInline={true}></video>
		
}
