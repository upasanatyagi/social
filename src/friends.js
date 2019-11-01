import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers, acceptFriend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.all);

    const friends = useSelector(
        state =>
            state.all && state.all.filter(friend => friend.accepted == true)
    );
    console.log("friends friends", friends);
    const wannabes = useSelector(
        state =>
            state.all && state.all.filter(friend => friend.accepted == false)
    );

    useEffect(() => {
        dispatch(receiveUsers());
    }, []);

    if (!users) {
        return null;
    }

    return (
        <div>
            <div className="friends">
                <h3>My friends!!</h3>
                {friends.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.profilepicture} />
                        <div className="buttons">
                            <button onClick={e => dispatch(unfriend(user.id))}>
                                Unfriend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="wannabes">
                <h3>My wannabes</h3>
                {wannabes.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.profilepicture} />
                        <div className="buttons">
                            <button
                                onClick={e => dispatch(acceptFriend(user.id))}
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
