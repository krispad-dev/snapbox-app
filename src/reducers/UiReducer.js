import { UI_ACTIONS } from '../context/UiContext';

export function UiReducer(state, action) {
	switch (action.type) {
		case UI_ACTIONS.SAVE_VIDEO_STREAM:
			return {
				...state,
				currentVideoStream: action.payload,
			};
		case UI_ACTIONS.SET_SAVE_USER_SETTINGS:
			return {
				...state,
				saveUserSettings: !state.saveUserSettings,
			};
		case UI_ACTIONS.SET_CAMERA_IS_LOADING:
			return {
				...state,
				streamIsLoading: action.payload,
			};
		case UI_ACTIONS.SET_CURRENT_CANVAS_REF:
			return {
				...state,
				currentCanvasRef: action.payload,
			};

		// App menu cases

		case UI_ACTIONS.SET_APP_MENU_IS_OPEN:
			return {
				...state,
				appMenuIsOpen: !state.appMenuIsOpen,
			};

		case UI_ACTIONS.CLOSE_APP_MENU:
			return {
				...state,
				appMenuIsOpen: false,
			};

		case UI_ACTIONS.CLOSE_APP_MENU:
			return {
				...state,
				appMenuIsOpen: false,
			};

		case UI_ACTIONS.SET_CAMERA_PAGE_IS_ON:
			return {
				...state,
				cameraPageIsOpen: !state.cameraPageIsOpen,
			};
		case UI_ACTIONS.SET_CURRENT_VIDEO_REF:
			return {
				...state,
				currentVideoRef: action.payload,
			};

		case UI_ACTIONS.SET_IMAGES:
			return {
				...state,
				images: action.payload,
			};

		case UI_ACTIONS.SET_IMAGES_TRIGGER:
			return {
				...state,
				upDateImagesTrigger: !state.upDateImagesTrigger,
			};

		case UI_ACTIONS.SET_NEW_DATABASE:
			return {
				...state,
				database: action.payload,
			};

		case UI_ACTIONS.SET_TOGGLE_TIMER:
			return {
				...state,
				timerIsOn: !state.timerIsOn,
			};

		case UI_ACTIONS.SET_TOGGLE_FLASH_SCREEN:
			return {
				...state,
				flashScreen: !state.flashScreen,
			};

		case UI_ACTIONS.SET_COUNTER_SECONDS:
			return {
				...state,
				counterSeconds: action.payload,
			};

		case UI_ACTIONS.SET_CURRENT_GEODATA:
			return {
				...state,
				currentGeoData: action.payload,
			};


			//Permissions
		case UI_ACTIONS.SET_WEB_API_PERMISSIONS:
			return {
				...state,
				webApiPermissions: action.payload,
			};
		case UI_ACTIONS.CHECK_WEB_API_PERMISSIONS:
			return {
				...state,
				checkPermissions: !state.checkPermissions,
			};
		case UI_ACTIONS.SET_BROWSER_IS_ONLINE:
			return {
				...state,
				browserIsOnline: action.payload,
			};




			// APP - menu
		case UI_ACTIONS.TOGGLE_SHOW_GEOLOCATION:
			return {
				...state,
				showGeoData: !state.showGeoData,
			};
		case UI_ACTIONS.TOGGLE_SHOW_NOTIFICATIONS:
			return {
				...state,
				showNotifications: !state.showNotifications,
			};

		case UI_ACTIONS.SET_FACINGMODE:
			return {
				...state,
				showNotifications: !state.showNotifications,
			};

		case UI_ACTIONS.SET_CARD_MENU_IS_OPEN:
			return {
				...state,
				cardMenuIsOpen: action.payload,
			};
		

	}
}
