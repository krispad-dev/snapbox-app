import React, { useContext } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';
import styled from 'styled-components';
import Logo from '../components/logo';

export default function StartPageHeader() {

	const { state, dispatch } = useContext(UiContext)

	return (
		<StartPageHeaderContainer >
			<div className='ghost-element'></div>
			<Logo />
			<StyledAppMenuBtn aria-label={'toggle-app-menu'} onClick={() => dispatch({ type: UI_ACTIONS.SET_APP_MENU_IS_OPEN })} ></StyledAppMenuBtn>
		</StartPageHeaderContainer>
	);
}

const StartPageHeaderContainer = styled.section`

	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	:hover {
        opacity: 80%;
        background-color: rgba(9, 9, 9, 0.2);
        transition: ease-in-out 0.1s;
    }

	img {
		width: 5rem;
		position: absolute;
	}


    div {
        width: 3em;
    }
`;


const StyledAppMenuBtn = styled.button`
        background-color: ${props => props.theme.colors.accent};
        border: none;
        width: 3em;
        height: 0.5em;
        margin-right: 2em;
        border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;




`