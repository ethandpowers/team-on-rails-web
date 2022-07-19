import React, { FC } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    align-items: center;
`

const TimePicker = styled(Form.Control)`
    margin: 8px;
`

interface TimeBlockSelectorProps {
    timeBlock: TimeBlock;
    setTimeBlock: (timeBlock: TimeBlock) => void;
}

const TimeBlockSelector: FC<TimeBlockSelectorProps> = ({timeBlock, setTimeBlock}) => {
    return (
        <HorizontalDiv>
            From <TimePicker type="time" value={timeBlock.start} onChange={(event:any)=>{
                setTimeBlock({ ...timeBlock, start: event.target.value });
            }}/> to <TimePicker value={timeBlock.end} type="time" onChange={(event:any)=>{
                setTimeBlock({ ...timeBlock, end: event.target.value });
            }}/>
        </HorizontalDiv>
    );
}

export default TimeBlockSelector;