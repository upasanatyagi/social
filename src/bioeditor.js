import React from "react";
import axios from "./axios";

export default class BioEditior extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioText: ""
        };
    }
    componentDidMount() {
        console.log("uploader mounted");

        console.log("this.props", this.props);
    }
    handleChange(e) {
        this.setState({ bioText: e.target.value });
        console.log("jhdgfjhgfuyegruiejhfjk-----", e.target.value);
    }

    save() {
        console.log("in save:", this.state.bioText);
        //
        // var fd = new FormData();
        // fd.append("text", this.state.bioText);
        // console.log("fdfdfdfdfdfdf/////////", fd);
        axios.post("/editBio", { bio: this.state.bioText }).then(({ data }) => {
            console.log("upload data", data);
            this.props.methodInBio(data.bio);
        });
        this.props.toggleBio();
    }
    render() {
        return (
            <div>
                <h3> bio editor</h3>
                <textarea
                    name="bio"
                    value={this.state.bioText}
                    onChange={e => this.handleChange(e)}
                ></textarea>
                <button onClick={() => this.save()}>save</button>
            </div>
        );
    }
}
