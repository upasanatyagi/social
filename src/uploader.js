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
    uploadImg() {}
    render() {
        return (
            <div>
                <h3 onClick={() => this.muffinMaker()}> this is uploader</h3>
                <input type="file" accept="image/*" />;
            </div>
        );
    }
}
