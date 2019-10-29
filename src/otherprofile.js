import React from "react";
import axios from "./axios";
import { ProfilePic } from "./profile-pic";

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
    }
    render() {
        return (
            <div className="otherprofile">
                <h1>
                    {this.state.first} {this.state.last}
                </h1>
                <h2>{this.state.bio}</h2>
                <ProfilePic imgUrl={this.state.profilepicture} />
            </div>
        );
    }
}
