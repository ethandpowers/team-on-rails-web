import React from "react";

function Button(props){
    return (
        <button className="rounded-full" {...props}>
            {props.children}
        </button>
    );
}
export default Button;