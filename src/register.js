import React from "react";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }
    handleChange({ target }) {
        //let target = e.target;
        // this[target.name] = target.value
        this.setState({
            //square bracket to create object
            [target.name]: target.value
        });
    }
    submit() {
        if (this.state.email.index("@") == -1) {
            return this.setState({
                error: true
            });
        }
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log(data);
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div id="registration">
                {this.state.error && (
                    <div className="error">oops! That was your fault</div>
                )}

                <input
                    name="first"
                    // placeholder="firstname"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="last"
                    // placeholder="lastname"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="email"
                    // placeholder="email"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="password"
                    // placeholder="password"
                    onChange={e => this.handleChange(e)}
                />

                <button onClick={() => this.submit()}>submit</button>
            </div>
        );
    }
}
