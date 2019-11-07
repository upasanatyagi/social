import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, acceptfriendrequest, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    // const users = useSelector(state => state.users);
    // console.log("friends state", users);

    const friends = useSelector(
        state => state.users && state.users.filter(user => user.accepted)
    );
    console.log("friends friends", friends);
    const wannabes = useSelector(
        state => state.users && state.users.filter(user => !user.accepted)
    );
    console.log("friends wannabes", wannabes);

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    if (!friends) {
        return null;
    }
    if (!wannabes) {
        return null;
    }

    return (
        <div className="friendsMain">
            <div className="friends">
                <h3>My friends!!</h3>
                {friends.map(friend => (
                    <div className="user" key={friend.id}>
                        <img src={friend.profilepicture} />
                        <div className="buttons">
                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                Unfriend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="wannabes">
                <h3>My wannabes</h3>
                {wannabes.map(wannabe => (
                    <div className="user-wannabes" key={wannabe.id}>
                        <img src={wannabe.profilepicture} />
                        <div className="buttons">
                            <button
                                onClick={() =>
                                    dispatch(acceptfriendrequest(wannabe.id))
                                }
                            >
                                Accept Friend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
// <Link to="/hot">See who&apos;s hot</Link>
// <Link to="/not">See who&apos;s not</Link>
