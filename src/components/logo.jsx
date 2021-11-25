import { fontSize } from '@mui/system';
import React from 'react';
import styled from 'styled-components';

export default function logo({ large }) {
	return <StyledLogo style={large ? {fontSize: '3rem'} : {}}>.snapbox</StyledLogo>;
}

const StyledLogo = styled.h1`

	background: rgb(118, 234, 215);
	background: -webkit-linear-gradient(0deg, rgba(118, 234, 215, 1) 0%, rgba(174, 177, 221, 1) 75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

	opacity: ${props => props.theme.opacity.mediumDark};
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
`;
