import React, { FC } from "react";
import Header from "../components/header";

const Home: FC = () => {
    return (
        <>
            <Header />
            <div id="notice">
                <h5>Notice</h5>
                <p>
                    This site is no longer actively maintained and may contain
                    outdated information, so please do not use this site for anything
                    critical to personal or business operation.  I built this site during the summer
                    of 2022, and I have since moved on to other projects.
                </p>
            </div>
            <style>
                {`
                    #notice {
                        margin: 40px;
                        width: 400px;
                    }
                `}
            </style>
        </>
    );
}

export default Home;