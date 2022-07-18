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
    margin: 4px;
`

const TimeBlockSelector: FC = () => {
    const [timeBlock, setTimeBlock] = React.useState<TimeBlock>({ start: '', end: '' });
    return (
        <HorizontalDiv>
            From <TimePicker type="time" /> to <TimePicker type="time" />
        </HorizontalDiv>
    );
}

export default TimeBlockSelector;