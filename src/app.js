import React from "react";
import Uploader from "./uploader";
import Profile from "./profile";
import { ProfilePic } from "./profile-pic";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { OtherProfile } from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./friends.js";
// import FriendButton from './friendbutton';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "upasana",
            last: "garg",
            img: "",
            profilepicture: "",
            bio: "",
            uploaderIsVisible: false,
            textareaIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
        this.methodInBio = this.methodInBio.bind(this);
    }
    async componentDidMount() {
        console.log("App Mounted");
        console.log("app props", this.props);
        const { data } = await axios.get("/user");

        this.setState(data);
    }
    toggleModal() {
        console.log("i am toggleModal");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    methodInBio(abc) {
        console.log("method in bioedit");
        this.setState({ bio: abc });
    }
    methodInApp(url) {
        console.log("method in app url!", url);
        this.setState({ profilepicture: url });
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div className="profile-pic">
                            <div>
                                <img
                                    id="profilelogo"
                                    src="https://socialbox.agency/wp-content/uploads/2019/09/SB-LOGO.png"
                                />
                            </div>

                            <ProfilePic
                                imgUrl={this.state.profilepicture}
                                toggleModal={this.toggleModal}
                            />
                        </div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstName={this.state.first}
                                    lastName={this.state.last}
                                    imgUrl={this.state.profilepicture}
                                    toggleModal={this.toggleModal}
                                    textareaIsVisible={
                                        this.state.textareaIsVisible
                                    }
                                    methodInBio={this.methodInBio}
                                    bio={this.state.bio}
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={props => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/users"
                            render={props => (
                                <FindPeople
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route
                            path="/friends"
                            render={props => (
                                <Friends
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </div>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </BrowserRouter>
            </div>
        );
    }
}
