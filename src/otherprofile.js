import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";
import FriendButton from "./friendbutton";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("i am mounting");
        console.log("this.props.match.params.id", this.props.match.params.id);

        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(res => {
                console.log(" other profile res", res);
                if (res.data.redirectMe) {
                    this.props.history.push("/");
                } else {
                    this.setState(res.data);
                }
            })
            .catch(e => {
                console.log(e);
                this.history.push("/");
            });
        if (this.props.match.params.id == this.state.id) {
            this.props.history.push("/");
        }
    }
    render() {
        return (
            <div className="otherprofile">
                <div className="op1">
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <div className="otherProfilePic">
                        <ProfilePic imgUrl={this.state.profilepicture} />
                    </div>
                </div>
                <div className="op2">
                    <h2>{this.state.bio}</h2>
                    <div>
                        <FriendButton
                            const
                            userProfileId={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
