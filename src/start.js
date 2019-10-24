import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
// import HelloWorld from "./helloworld";

import Welcome from "./welcome";

//part 1
let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
