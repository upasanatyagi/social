import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import Welcome from "./welcome";
import { init } from "./socket";

// const socket = io.connect();

// socket.emitt("iAmHere", {
//     message: "Hello"
// });
//
// socket.on;

//Redux middleware
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducer";
import { Provider } from "react-redux";

import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

//part 1
let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
