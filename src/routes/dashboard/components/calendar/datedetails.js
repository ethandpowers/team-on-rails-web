import React from "react";

function DateDetails() {
    return (
        <>
            <style>
                {`
                    #date-details {
                        width: 40%;
                        height: 100%;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        border-left: 1px solid #e6e6e6;
                    }

                    @media screen and (max-width: 900px) {
                        #date-details {
                            width: 100%;
                            border-left: none;
                            border-top: 1px solid #e6e6e6;
                        }
                    }
                `}
                </style>
            <div id="date-details">
                
            </div>
        </>
    );
}

export default DateDetails;