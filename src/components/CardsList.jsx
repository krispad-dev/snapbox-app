import React, { useEffect, useState, useContext } from 'react';
import { UiContext } from '../context/UiContext';

import Card from './Card';
import styled from 'styled-components';
import { isImageInCache } from '../utils/helpers';
import { exampleImages } from '../assets/images/images.js'

export default function CardsList() {

	const [ imagesArray, setImagesArray ] = useState([])
	const { state } = useContext(UiContext)

	return (
		<CardsListContainer>
			{state && state.images && state.images.map((image, index) => <Card  key={index} {...image}  />)}
		</CardsListContainer>
	);
}

const CardsListContainer = styled.ul`
	padding-top: 1rem;
	width: 100%;
	display: grid;
	gap: 1.5rem;
	grid-auto-rows: 450px;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	overflow-y: scroll;
	height: 85vh;
	padding: 1rem;

	::-webkit-scrollbar {
  display: none;
}
`;
