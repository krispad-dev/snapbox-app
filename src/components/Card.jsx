import React, { useState, useContext, useRef } from 'react';
import { UiContext, UI_ACTIONS } from '../context/UiContext';
import styled from 'styled-components';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import CardMenu from '../components/CardMenu';
import useOutsideClick from '../hooks/useOutsideClick';

export default function Card({ imageUrl, city, id, address, date, imageBlob, downloadUrl } = {}) {
	const { state, dispatch } = useContext(UiContext);
	const [cardMenuIsOpen, setCardMenuIsOpen] = useState(false);
	const ref = useRef(null);



	useOutsideClick(ref, () => {
		if (cardMenuIsOpen) {
			setCardMenuIsOpen(false);
			dispatch({ type: UI_ACTIONS.SET_CARD_MENU_IS_OPEN, payload: false})
		}
	});

	let imageConvertedBlobUrl = '';

	if (imageBlob) {
		imageConvertedBlobUrl = URL.createObjectURL(imageBlob);
	}


	function cardMenuHandler() {
		if (!state.cardMenuIsOpen) {
			setCardMenuIsOpen(true);
			dispatch({ type: UI_ACTIONS.SET_CARD_MENU_IS_OPEN, payload: true})
			
		}


	}

	return (
		<CardContainer>
			<CardTopContainer className='card-top-container'>
				<StyledDateWrapper>
					{state.showGeoData && (
						<StyledDateFigcaptionGeo>
							<BsFillGeoAltFill style={{ margin: '0rem 0.7rem', fontSize: '0.8rem' }} />
							{address && city ? (
								<strong>
									{city} {address}
								</strong>
							) : (
								'No geoinformation available...'
							)}
						</StyledDateFigcaptionGeo>
					)}

					<StyledDateFigcaptionDate>
						<BsCalendarDate style={{ margin: '0rem 0.7rem', fontSize: '0.8rem' }} />
						{date}
					</StyledDateFigcaptionDate>
				</StyledDateWrapper>

				<button aria-label={'toggle-card-menu'} onMouseDown={() => cardMenuHandler()}>
					<HiOutlineDotsHorizontal />
				</button>
			</CardTopContainer>

			{cardMenuIsOpen && <CardMenu currentRef={ref} id={id} downloadUrl={downloadUrl} />}

			<StyledImage src={imageUrl ? imageUrl : imageConvertedBlobUrl} alt='Gallery photo' />
			{downloadUrl && <a href={downloadUrl}></a>}
		</CardContainer>
	);
}

const CardContainer = styled.li`
	position: relative;
	border-radius: 25px;
	background-color: ${props => props.theme.colors.overlayMenu};
	display: grid;
	box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.3);

	grid-template-rows: auto auto;
	grid-auto-columns: 1fr;

	grid-template-areas:
		'infoContainer'
		'image';

	article {
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 30px;
			height: 30px;
			padding: 0.5rem;
			border-radius: 25px;
		}
	}
`;

const CardTopContainer = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	grid-area: infoContainer;

	button {
		margin-right: 0.5rem;
		font-size: 1.5rem;
		background-color: transparent;
		border: none;
		

		svg {
			padding: 0.6rem;
			color: ${props => props.theme.colors.accent};
			border-radius: 50%;

			:hover {
				background-color: rgba(9, 9, 9, 0.2);
				transition: ease-in-out 0.1s;
			}


		}
	}
`;

const StyledImage = styled.img`
	grid-area: image;
	object-fit: cover;
	border-radius: 25px;
	height: 19rem;
`;

const StyledDateWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.2rem;

	figcaption {
		font-size: 0.8em;
		margin: 0.3rem 0rem;
	}
`;

const StyledDateFigcaptionDate = styled.figcaption`
	opacity: ${props => props.theme.opacity.medium};
`;
const StyledDateFigcaptionGeo = styled.figcaption`
	opacity: ${props => props.theme.opacity.mediumDark};
`;
