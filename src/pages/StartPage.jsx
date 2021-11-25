import React, { useContext, useState } from 'react';
import { UiContext } from '../context/UiContext';

import styled from 'styled-components';
import CardsList from '../components/CardsList';
import ToggleCameraPageBtn from '../components/buttons/ToggleCameraPageBtn';



export default function StartPage() {


	const { state } = useContext(UiContext)

	return (
		<StartPageContainer>
			<CardsList />
			{ !state.cardMenuIsOpen && <ToggleCameraPageBtn /> }
		</StartPageContainer>
	);
}

const StartPageContainer = styled.section`
	display: flex;
	flex-grow: 1;
`;
