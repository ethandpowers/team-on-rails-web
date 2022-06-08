import React from "react";

function ElementBG(props) {
    return (
        <>
            <style type="text/css">
                {`
                    .element-bg{
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                    }
                `}
            </style>
            <div className="element-bg">
                {/* all background elements go here */}
                {props.children}
            </div>
        </>
    );
}

export default ElementBG;