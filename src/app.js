import React from "react";
// import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import Profile from "./profile";
import axios from "./axios";

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
        this.toggleBio = this.toggleBio.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
        this.methodInBio = this.methodInBio.bind(this);
    }
    componentDidMount() {
        console.log("App Mounted");
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
    toggleBio() {
        this.setState({ textareaIsVisible: !this.state.textareaIsVisible });
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
                {
                    // <h1 onClick={this.toggleModal}>Hello from App!!</h1>
                }
                <Profile
                    firstName={this.state.first}
                    lastName={this.state.last}
                    imgUrl={this.state.url}
                    toggleModal={this.toggleModal}
                    toggleBio={this.toggleBio}
                    textareaIsVisible={this.state.textareaIsVisible}
                    methodInBio={this.methodInBio}
                    bio={this.state.bio}
                />
                {console.log("arararrarabio==>", this.state.bio)}
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
