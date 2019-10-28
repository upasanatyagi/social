import React from "react";
import axios from "./axios";

export default class BioEditior extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioText: "",
            textareaIsVisible: false
        };
    }
    componentDidMount() {
        console.log("uploader mounted");

        console.log("bio editior this.props", this.props);
    }
    toggleBio() {
        this.setState({ textareaIsVisible: !this.state.textareaIsVisible });
    }
    handleChange(e) {
        this.setState({ bioText: e.target.value });
        console.log("jhdgfjhgfuyegruiejhfjk-----", e.target.value);
    }

    save() {
        console.log("in save:", this.state.bioText);
        axios.post("/editBio", { bio: this.state.bioText }).then(({ data }) => {
            console.log("upload data", data);
            this.props.methodInBio(data.bio);
        });
        this.toggleBio();
    }
    render() {
        return (
            <div>
                <h3> bio editor</h3>
                {this.state.textareaIsVisible && (
                    <div>
                        <textarea
                            name="bio"
                            value={this.state.bioText}
                            onChange={e => this.handleChange(e)}
                        ></textarea>
                        <button onClick={() => this.save()}>save</button>
                    </div>
                )}

                <p>{this.props.bio}</p>
                {!this.props.bio && (
                    <button onClick={() => this.toggleBio()}>Add Bio</button>
                )}
                {this.props.bio && (
                    <button onClick={() => this.toggleBio()}>Edit Bio</button>
                )}
            </div>
        );
    }
}
