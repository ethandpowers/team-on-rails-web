import React from "react";

function Button2(props) {
    return (
        <>
            <style type="text/css">
                {`
                    .button-64 {
                      align-items: center;
                      background-image: linear-gradient(144deg, #53bf00, #00bf6c);
                      border: 0;
                      border-radius: 8px;
                      box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
                      box-sizing: border-box;
                      color: #FFFFFF;
                      display: flex;
                      font-family: Phantomsans, sans-serif;
                      font-size: 20px;
                      justify-content: center;
                      line-height: 1em;
                      max-width: 100%;
                      min-width: 140px;
                      padding: 3px;
                      text-decoration: none;
                      user-select: none;
                      -webkit-user-select: none;
                      touch-action: manipulation;
                      white-space: nowrap;
                      cursor: pointer;
                    }
                    
                    .button-64:active,
                    .button-64:hover {
                      outline: 0;
                    }
                    
                    .button-64 span {
                      background-color: rgb(5, 6, 45);
                      padding: 16px 24px;
                      border-radius: 6px;
                      width: 100%;
                      height: 100%;
                      transition: 300ms;
                    }
                    
                    .button-64:hover span {
                      background: none;
                    }
                    
                    @media (min-width: 768px) {
                      .button-64 {
                        font-size: 24px;
                        min-width: 196px;
                      }
                    }
                `}
            </style>
            <button className="button-64" role="button" {...props}><span className="text">{props.children}</span></button>
        </>
    );
}
export default Button2;