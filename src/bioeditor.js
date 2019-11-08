import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bioText: "",
            textareaIsVisible: false
        };
    }
    componentDidMount() {
        console.log("uploader mounted");

        console.log("bio editor this.props", this.props);
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
            <div className="bioMain">
                <h3> Bio Editor :</h3>
                {this.state.textareaIsVisible && (
                    <div>
                        <textarea
                            id="textarea"
                            name="bio"
                            rows="8"
                            cols="42"
                            placeholder="bio here"
                            value={this.state.bioText}
                            onChange={e => this.handleChange(e)}
                        ></textarea>
                        <button
                            className="btnSubmit"
                            onClick={() => this.save()}
                        >
                            save
                        </button>
                    </div>
                )}

                <p className="txt">{this.props.bio}</p>
                {!this.props.bio && (
                    <button
                        className="btnSubmit"
                        onClick={() => this.toggleBio()}
                    >
                        Add Bio
                    </button>
                )}
                {this.props.bio && (
                    <button
                        className="btnSubmit"
                        onClick={() => this.toggleBio()}
                    >
                        Edit Bio
                    </button>
                )}
            </div>
        );
    }
}
