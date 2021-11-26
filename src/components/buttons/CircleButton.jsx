import React from 'react'
import styled from 'styled-components'

export default function CircleButton({ icon, content, onClick, isActive, disabled, ariaLabel }) {
    
    return (

        <StyledButton 

        aria-label={ariaLabel} 
        name={'circleBtn'} 
        disabled={disabled} 
        onClick={() => onClick()} 
        style={!isActive ? {opacity: '30%'} : {}} 
        
        >
            {content} {icon}
        </StyledButton>
        
    )
}


const StyledButton = styled.button`
    margin: 1rem;
    text-align: center;
    border: none;
	cursor: pointer;
	height: 35px;
	width: 35px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid ${props => props.theme.colors.accent};
    display: flex;
    justify-content: center;
    align-items: center;
    color: 1px solid ${props => props.theme.colors.accent};
    
    :hover {
        opacity: 80%;
        background-color: rgba(9, 9, 9, 0.2);
        transition: ease-in-out 0.1s;
    }

    svg {
        color: ${props => props.theme.colors.accent};
        font-size: 2rem;
    }
    

`;

