import React from "react";
import Uploader from "./uploader";
import Profile from "./profile";
import { ProfilePic } from "./profile-pic";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import { OtherProfile } from "./otherprofile";
import FindPeople from "./findpeople";
// import FriendButton from './friendbutton';

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "upasana",
            last: "garg",
            img: "",
            bio: "",
            uploaderIsVisible: false,
            textareaIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
        this.methodInBio = this.methodInBio.bind(this);
    }
    componentDidMount() {
        console.log("App Mounted");
        console.log("app props", this.props);
        axios.get("/user").then(({ data }) => {
            console.log("app data:", data);
            this.setState(data);
        });

        //this is where we want to make an axios request
        //a GET request to a route callled '/user'
        //into state
        //this.setState()
    }
    toggleModal() {
        console.log("i am toggleModal");
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });

        // if(this.uploaderIsVisible){
        //     this.setState({uploaderIsVisible:false});
        // }else{
        //     this.setState({uploaderIsVisible:true});
        // }
    }

    methodInBio(abc) {
        console.log("method in bioedit");
        this.setState({ bio: abc });
    }
    methodInApp(url) {
        console.log("method in app url!", url);
        this.setState({ url: url });
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <ProfilePic imgUrl={this.state.url} />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstName={this.state.first}
                                    lastName={this.state.last}
                                    imgUrl={this.state.url}
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
                    </div>
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </BrowserRouter>
            </div>
        );
    }
}
