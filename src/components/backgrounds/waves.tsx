import React from "react";
import Wave from 'react-wavify'
import { primaryColor } from "../../colorscheme";

function Waves() {
    return (
        <div id="wave-div">
            <style type="text/css">
                {`
                    #wave-div {
                        widrh: 100%;
                        height: 100vh;
                        background-color: #2b3050;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }
                `}
            </style>
            <Wave fill={primaryColor}
                paused={false}
                options={{
                    height: 20,
                    amplitude: 80,
                    speed: 0.15,
                    points: 3
                }}
            />
        </div>
    );
}

export default Waves;