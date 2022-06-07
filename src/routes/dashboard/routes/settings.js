import React from "react";
import { logOut } from "../../../firebase";
import Button3 from "../../../components/buttons/button3";

function Settings(){
    return(
        <Button3 onClick={logOut}>Log Out</Button3>
    )
}

export default Settings;