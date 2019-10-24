import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("uploader mounted");
        console.log("this.props", this.props);
    }
    muffinMaker() {
        this.props.methodInApp("lots of muffins");
    }
    render() {
        return (
            <div>
                <h3 onClick={() => this.muffinMaker()}> this is uploader</h3>
            </div>
        );
    }
}
