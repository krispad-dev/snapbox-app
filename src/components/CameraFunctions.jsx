import React from 'react'
import styled from 'styled-components'
import ToolsBtn from './ToolsBtn'
import { RiRepeatFill } from 'react-icons/ri'

export default function CameraFunctions() {
    return (
        <ToolsContainerWrapper>
            <ToolsBtn icon={<RiRepeatFill/>} />
        </ToolsContainerWrapper>
    )
}


const ToolsContainerWrapper = styled.div`

    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


`