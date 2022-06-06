import React from "react";

// A large button that draws attention to itself.
function Button1(props) {
    const colors = ["#b8e898", "#53bf00", "#00bf6c"];
    return (
        <>
            <style type="text/css">
                {`
                    .button-77 {
                        align-items: center;
                        appearance: none;
                        background-clip: padding-box;
                        background-color: initial;
                        background-image: none;
                        border-style: none;
                        box-sizing: border-box;
                        color: #fff;
                        cursor: pointer;
                        display: inline-block;
                        flex-direction: row;
                        flex-shrink: 0;
                        font-family: Eina01,sans-serif;
                        font-size: 16px;
                        font-weight: 800;
                        justify-content: center;
                        line-height: 24px;
                        margin: 0;
                        min-height: 64px;
                        outline: none;
                        overflow: visible;
                        padding: 19px 26px;
                        pointer-events: auto;
                        position: relative;
                        text-align: center;
                        text-decoration: none;
                        text-transform: none;
                        user-select: none;
                        -webkit-user-select: none;
                        touch-action: manipulation;
                        vertical-align: middle;
                        width: auto;
                        word-break: keep-all;
                        z-index: 0;
                    }
                    
                    @media (min-width: 768px) {
                        .button-77 {
                            padding: 19px 32px;
                        }
                    }
                    
                    .button-77:before,
                    .button-77:after {
                        border-radius: 80px;
                    }
                    
                    .button-77:before {
                        background-color: ${colors[0]};
                        content: "";
                        display: block;
                        height: 100%;
                        left: 0;
                        overflow: hidden;
                        position: absolute;
                        top: 0;
                        width: 100%;
                        z-index: -2;
                    }
                    
                    .button-77:after {
                        background-color: initial;
                        background-image: linear-gradient(92.83deg, ${colors[1]} 0, ${colors[2]} 100%);
                        bottom: 4px;
                        content: "";
                        display: block;
                        left: 4px;
                        overflow: hidden;
                        position: absolute;
                        right: 4px;
                        top: 4px;
                        transition: all 100ms ease-out;
                        z-index: -1;
                        }
                        
                        .button-77:hover:not(:disabled):after {
                        bottom: 0;
                        left: 0;
                        right: 0;
                        top: 0;
                        transition-timing-function: ease-in;
                    }
                    
                    .button-77:active:not(:disabled) {
                        color: #ccc;
                    }
                    
                    .button-77:active:not(:disabled):after {
                        background-image: linear-gradient(0deg, rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), linear-gradient(92.83deg, #53bf00 0, #00bf6c 100%);
                        bottom: 4px;
                        left: 4px;
                        right: 4px;
                        top: 4px;
                    }
                    
                    .button-77:disabled {
                        cursor: default;
                        opacity: .24;
                    }
                `}
            </style>
            <button className="button-77" role="button" {...props}>{props.children}</button>
        </>
    );
}
export default Button1;