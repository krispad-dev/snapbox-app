import React, { useContext, useState, useEffect, useRef } from 'react';
import { UiContext, UI_ACTIONS } from '../../context/UiContext';
import styled from 'styled-components';
import { parseDate } from '../../utils/helpers';

import { notifyMe } from '../../api/notification';
import { checkIfBrowserIsOnline } from '../../utils/helpers'

const svg = "data:image/svg+xml,%3Csvg width='68' height='68' viewBox='0 0 68 68' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='34' cy='34' r='34' fill='%23222222'/%3E%3Crect x='34' y='4.76268' width='41.3478' height='41.3478' rx='3.5' transform='rotate(45 34 4.76268)' stroke='%2376EAD7' stroke-width='3'/%3E%3Ccircle cx='34' cy='34' r='19.5' stroke='%2376EAD7' stroke-width='3'/%3E%3C/svg%3E%0A"



const notificationTitle = 'Hello from camera!'
const notificationsObject = {
		body: 'Photo taken :)',
		icon: svg
	}


export default function TakePhotoBtn() {

	const { state, dispatch } = useContext(UiContext);
	const [ geoData, setGeoData ] = useState({});
	const [ timerIsRunning, setTimerIsRunning ] = useState(false)

	const canvasRef = useRef(null)

	

	async function takePhoto({ videoRef }) {

		const canvasContext = canvasRef.current.getContext('2d');
	
		async function createBlob() {

			canvasContext.drawImage(videoRef.current, 0, 0, 1080, 1080);
			const base64Data = canvasRef.current.toDataURL('image/jpeg');

			try {
				const base64 = await fetch(base64Data);
				dispatch({type: UI_ACTIONS.SET_IMAGES_TRIGGER})
				return { blob: await base64.blob(), base64data: base64Data };
				
			} catch (error) {
				console.log(error);
				return
				
			}
	
		}


		async function postImageToCloud(params) {

			const imageDataObject = await createBlob()
 			const formData = new FormData();

			formData.append('file', imageDataObject.base64data);
			formData.append('upload_preset', import.meta.env.VITE_SECRET_CLOUDINARY_TEMPLATE);

			const res = await fetch(import.meta.env.VITE_SECRET_CLOUDINARY_URL, {
				method: 'post',
				body: formData
			})

			const data = await res.json()
			console.log(data);
			return data

		}


		async function saveImage(params) {

			let secureUrl = ''

			if (checkIfBrowserIsOnline()) {
				const res = await postImageToCloud();
				secureUrl = res.secure_url;
			}


			
			const imageDataObject = await createBlob()
			
			await state.database.add('AppImages', {
				imageUrl: secureUrl ? secureUrl : null,
				imageBlob: imageDataObject.blob, 
				city: state.currentGeoData ? state.currentGeoData.city : null,
				address: state.currentGeoData ? state.currentGeoData.address : null,
				date: parseDate()
			})
			
		}

		try {

			if(state.timerIsOn && state.currentVideoStream) {

				setTimerIsRunning(true)

				let seconds = 3
	
					const interval = setInterval( async () => {
	
					dispatch({type: UI_ACTIONS.SET_COUNTER_SECONDS, payload: seconds})
	
				if (seconds === 0) {
	
					dispatch({type: UI_ACTIONS.SET_COUNTER_SECONDS, payload: null})
					
					saveImage()
	
					setTimeout(()=> {
						dispatch({type: UI_ACTIONS.SET_TOGGLE_FLASH_SCREEN})
	
					}, 100)
					
					dispatch({type: UI_ACTIONS.SET_TOGGLE_FLASH_SCREEN})

					if (state.showNotifications) {
						notifyMe(notificationTitle, notificationsObject)
					}
				
					
	
					clearInterval(interval); 
					setTimerIsRunning(false)
				}
	
				seconds--;
				}, 1000);
	
	
				
			} else if(!state.timerIsOn && state.currentVideoStream) {
	
				setTimeout(()=> {
					dispatch({type: UI_ACTIONS.SET_TOGGLE_FLASH_SCREEN})
	
				}, 100)
				
				dispatch({type: UI_ACTIONS.SET_TOGGLE_FLASH_SCREEN})
	
				saveImage()
			}
			
		} catch (error) {

			console.log(error);
			
		}

	
	}

	return (
		<>
			<StyledPhotoBtn
				disabled={timerIsRunning}
				onClick={() => takePhoto({ canvasRef: state.currentCanvasRef, videoRef: state.currentVideoRef })}
				style={state.streamIsLoading ? { animation: 'spin ease-in-out 1.5s infinite' } : {} }
				type='image'
				src={svg}
			/>
			<canvas width='1080' height='1080' ref={canvasRef}></canvas>
		</>
	);
}

const StyledPhotoBtn = styled.input`
	position: absolute;
	bottom: 2em;

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
