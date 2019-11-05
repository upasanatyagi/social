import * as io from "socket.io-client";
import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();
        //All our dispatches of actions will go in iAmHere

        socket.on("new chat message from server", newMessage => {
            console.log("This is from the server", newMessage);
        });
    }
};
// socket.on("chatMessages", msgs => store.dispatch(chatMessages(msgs)));

// socket.on("chatMessage", msg => store.dispatch(chatMessage(msg)));
