import React from "react";
import { ProfilePic } from "./profile-pic";
import Uploader from "./uploader";
import axios from "./axios";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "upasana",
            last: "garg",
            img: "",
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.methodInApp = this.methodInApp.bind(this);
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
    methodInApp(url) {
        console.log("method in app url!", url);
        this.setState({ url: url });
    }
    render() {
        return (
            <div>
                <h1 onClick={this.toggleModal}>Hello from App!!</h1>
                <ProfilePic
                    firstName={this.state.first}
                    lastName={this.state.last}
                    imgUrl={this.state.url}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
