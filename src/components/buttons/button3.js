import React from "react";

// A smaller button that draws less attention
function Button3(props) {
    const colors = ["#FFFFFF", "#53bf00", "#00bf6c"];
    return (
        <>
            <style type="text/css">
                {`
                    .button-41 {
                      background-color: initial;
                      background-image: linear-gradient(-180deg, ${colors[1]}, ${colors[2]});
                      border-radius: 5px;
                      box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                      color: ${colors[0]};
                      cursor: pointer;
                      display: inline-block;
                      font-family: Inter,-apple-system,system-ui,Roboto,"Helvetica Neue",Arial,sans-serif;
                      height: 44px;
                      line-height: 44px;
                      outline: 0;
                      overflow: hidden;
                      padding: 0 20px;
                      pointer-events: auto;
                      position: relative;
                      text-align: center;
                      touch-action: manipulation;
                      user-select: none;
                      -webkit-user-select: none;
                      vertical-align: top;
                      white-space: nowrap;
                    //   width: 100%;
                      z-index: 9;
                      border: 0;
                    }
                `}
            </style>
            <button className="button-41" {...props}>{props.children}</button>
        </>
    );
}
export default Button3;