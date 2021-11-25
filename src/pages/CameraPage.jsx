import React from 'react';

import styled from 'styled-components';
import VideoElement from '../components/VideoElement';
import TakePhotoBtn from '../components/buttons/TakePhotoBtn'; 

export default function CameraPage() {


	return (
		<CameraPageContainer>
			<VideoElement />
			<TakePhotoBtn />
		</CameraPageContainer>
	);
	
}

const CameraPageContainer = styled.section`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
overflow: hidden;


`