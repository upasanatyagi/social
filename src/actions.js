import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/receivefriendswannabes");
    console.log("action data", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data
    };
}
export async function acceptfriendrequest(id) {
    await axios.post(`/acceptfriendrequest/${id}`);

    return {
        type: "MAKE_FRIENDS",
        id: id
    };
}
export async function unfriend(id) {
    await axios.post(`/endfriendship/${id}`);

    return {
        type: "UNFRIEND",
        id: id
    };
}

export async function chatMessage(newMessage) {
    return {
        type: "POST_MSG",
        message: newMessage
    };
}

export async function chatMessages(msgs) {
    return {
        type: "GET_ALL_MESSAGES",
        messages: msgs
    };
}
