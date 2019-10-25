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
    }
    componentDidMount() {
        console.log("App Mounted");
        axios.get("/user").then(({ data }) => {
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
    methodInApp(muffin) {
        console.log("i am a method running in app!!!");
        console.log("muffin!!", muffin);
    }
    render() {
        return (
            <div>
                <h1 onClick={this.toggleModal}>Hello from App!!</h1>
                <ProfilePic
                    firstName={this.state.first}
                    lastName={this.state.last}
                    imgUrl={this.state.img}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
