import React from "react";
import Register from "./register";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

export default function Welcome() {
    return (
        <div>
            <p id="welcome">Welcome to</p>
            <div>
                <img
                    id="welcome1"
                    src="https://socialbox.agency/wp-content/uploads/2019/09/SB-LOGO.png"
                />
            </div>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
