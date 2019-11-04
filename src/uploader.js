import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    componentDidMount() {
        console.log("uploader mounted");

        console.log("this.props", this.props);
    }
    handleChange(e) {
        this.setState({
            selectedFile: e.target.files[0]
        });
        console.log("e.target.files[0]", e.target.files[0]);
    }
    muffinMaker() {
        this.props.methodInApp("lots of muffins");
    }
    submit() {
        console.log("in submit");

        var fd = new FormData();
        fd.append("image", this.state.selectedFile);
        axios.post("/upload", fd).then(({ data }) => {
            console.log("upload data", data);
            this.props.methodInApp(data.profilepicture);
        });
    }
    render() {
        return (
            <div className="wrapper">
                <h3 onClick={() => this.muffinMaker()}>
                    {" "}
                    Please uploade your picture here
                </h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>submit</button>
            </div>
        );
    }
}
