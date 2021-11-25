import React, { useState, useContext, } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';
import styled from 'styled-components'


import { BsDownload } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import CircleButton from '../components/buttons/CircleButton';
export default function cardMenu({ id, downloadUrl, currentRef, imageConvertedBlobUrl }) {

	const { state, dispatch } = useContext(UiContext);



	function downloadHandler(e) {
		const link = document.createElement('a');

		if (downloadUrl) {
			link.href = downloadUrl;
		} else {
			link.href = imageConvertedBlobUrl;
		}

		link.setAttribute('download', 'image.jpg');
		link.click();
	}

	function deleteHandler() {
		state.database.delete('AppImages', id);
		dispatch({ type: UI_ACTIONS.SET_IMAGES_TRIGGER });
	}

	return (
		<CardMenuContainer ref={currentRef} id={'card-menu'}>
			<CircleButton isActive={true} icon={<MdDeleteOutline />} onClick={() => deleteHandler()} />
			{ imageConvertedBlobUrl && <CircleButton isActive={true} icon={<BsDownload />} onClick={() => downloadHandler()} />}
		</CardMenuContainer>
	);
}


const CardMenuContainer = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: auto;
	height: auto;
	right: 0;
	top: 3rem;
	border-radius: 0px 0px 0px 25px;
	background-color: ${props => props.theme.colors.overlayMenu};
	animation: fade ease-in-out 0.1s;

	@keyframes fade {
		from {
			opacity: 0%;
		}

		to {
			opacity: 100%;
		}
	}
`;