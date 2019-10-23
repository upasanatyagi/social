import React from "react";
import ReactDOM from "react-dom";
// import HelloWorld from "./helloworld";

import Welcome from "./welcome";

//part 1
let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = (
        <img src="https://socialbox.agency/wp-content/uploads/2019/09/SB-LOGO.png" />
    );
}

ReactDOM.render(elem, document.querySelector("main"));
