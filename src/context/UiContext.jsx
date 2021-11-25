import React, { createContext, useReducer, useEffect } from 'react';
import { UiReducer } from '../reducers/UiReducer';
import { exampleImages } from '../assets/images/images.js';
import { getGeoData } from '../api/geolocation';
import { runDb } from '../database';
import { checkGeoloaction } from '../utils/helpers'
import { checkIfBrowserIsOnline } from '../utils/helpers'
import { checkAppSettings } from '../utils/helpers';

export const UiContext = createContext();

export const UI_ACTIONS = {

	// Ui Actions
	SET_CAMERA_PAGE_IS_ON: 'SET_CAMERA_PAGE_IS_ON',

	SAVE_VIDEO_STREAM: 'SET_VIDEO_STREAM',
	SET_CURRENT_ERROR_MESSAGE: 'SET_CURRENT_ERROR_MESSAGE',
	SET_CAMERA_IS_LOADING: 'SET_CAMERA_IS_LOADING',

	// Ref's
	SET_CURRENT_CANVAS_REF: 'SET_CURRENT_CANVAS_REF',
	SET_CURRENT_VIDEO_REF: 'SET_CURRENT_VIDEO_REF',

	// Start Frame Actions
	SET_USER_OPTIONS: 'SET_USER_OPTIONS',
	SET_SAVE_USER_SETTINGS: 'SET_SAVE_USER_SETTINGS',

	// App menu cases
	SET_APP_MENU_IS_OPEN: 'SET_APP_MENU_IS_OPEN',
	CLOSE_APP_MENU: 'SET_APP_MENU_IS_OPEN',

	SET_IMAGES: 'SET_IMAGES',
	SET_NEW_DATABASE: 'SET_NEW_DATABASE',
	SET_IMAGES_TRIGGER: 'SET_IMAGES_TRIGGER',
	SET_TOGGLE_TIMER: 'SET_TOGGLE_TIMER',
	SET_TOGGLE_FLASH_SCREEN: 'SET_TOGGLE_FLASH_SCREEN',
	SET_COUNTER_SECONDS: 'SET_COUNTER_SECONDS',
	SET_CURRENT_GEODATA: 'SET_CURRENT_GEODATA',
	SET_BROWSER_IS_ONLINE: 'SET_BROWSER_IS_ONLINE',

	//Permissions
	SET_WEB_API_PERMISSIONS: 'SET_WEB_API_PERMISSIONS',
	CHECK_WEB_API_PERMISSIONS: 'CHECK_WEB_API_PERMISSIONS',

	TOGGLE_SHOW_GEOLOCATION: 'TOGGLE_SHOW_GEOLOCATION',
	TOGGLE_SHOW_NOTIFICATIONS: 'TOGGLE_SHOW_NOTIFICATIONS',

	SET_CARD_MENU_IS_OPEN: 'SET_CARD_MENU_IS_OPEN',
	CLOSE_CARD_MENUS: 'CLOSE_CARD_MENUS'


};

const initialState = {

	// UI
	cardMenuIsOpen: false,
	appMenuIsOpen: false,


	cameraPageIsOpen: false,
	facingMode: 'user',

	streamIsLoading: false,
	currentVideoStream: null,
	browserIsOnline: checkIfBrowserIsOnline(),

	showGeoData: true,
	showNotifications: true,

	currentCanvasRef: {},
	currentVideoRef: {},

	currentGeoData: {},
	geolocationActivated: 'true',

	currentErrorMessage: '',
	saveUserSettings: false,
	timerIsOn: false,
	flashScreen: false,
	counterSeconds: null,

	webApiPermissions: {},
	checkPermissions: false,

	userSettings: {
		saveSettings: false,
		subscribeToUpdates: false,
	},

	images: [],
	upDateImagesTrigger: false,
	database: null,
};



export function UiContextProvider({ children }) {

	const [state, dispatch] = useReducer(UiReducer, initialState);


	// Create local database
	useEffect( async () => {

		try {

			const database = await runDb();
			dispatch({ type: UI_ACTIONS.SET_NEW_DATABASE, payload: database });

		} catch (error) {

			console.log(error);
			return
		
		}

	}, []);


	// Get geodata and place in state variable
	useEffect( async () => {

		if (checkGeoloaction() && checkIfBrowserIsOnline()) {
	
			try {

				const geoData = await getGeoData();
				dispatch({ type: UI_ACTIONS.SET_CURRENT_GEODATA, payload: geoData  });
				
			} catch (error) {

				console.log(error);
				return
				
			}
		} else {
			dispatch({ type: UI_ACTIONS.SET_CURRENT_GEODATA, payload: {}  });
		}

	}, [state.streamIsLoading]);


	// Set images into state variable
	useEffect(async () => {

		if (state.database) {

			try {

				const images = await state.database.getAll('AppImages')

				if (!checkAppSettings()) {

					exampleImages.forEach( async ({ imageUrl, city, downloadUrl, address }) => {

						await state.database.clear('ExampleImages')

						await state.database.add('ExampleImages', {
							imageUrl: imageUrl,
							downloadUrl: downloadUrl,
							city: city,
							date: 'Sun Nov 21 2021 19:14',
							address: address
						});

					});
				}

				dispatch({ 

					type: UI_ACTIONS.SET_IMAGES, 
					payload: [...await state.database.getAll('AppImages'), ...await state.database.getAll('ExampleImages')]});

			} catch (error) {
				return 0
			}
		}
	}, [state.database, state.upDateImagesTrigger]);




	window.addEventListener('offline', () => {

		dispatch({type: UI_ACTIONS.SET_BROWSER_IS_ONLINE, payload: false})
		dispatch({type: UI_ACTIONS.SET_CURRENT_GEODATA, payload: null})

	})

	window.addEventListener('online', () => {

		dispatch({type: UI_ACTIONS.SET_BROWSER_IS_ONLINE, payload: true})

	})


	return <UiContext.Provider value={{ state, dispatch }}>{children}</UiContext.Provider>;
}
