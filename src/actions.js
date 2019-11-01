import axios from "./axios";

export async function receiveUsers() {
    const { data } = await axios.get("/receivefriendswannabes");
    console.log("action data", data);
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data
    };
}
