import React from "react";
import axios from "./axios";

export class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        console.log("i am mounting");
        console.log("this.props.match.params.id", this.props.match.params.id);

        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
            })
            .catch(e => {
                console.log(e);
                this.history.push("/");
            });
        //make an axios req asking the server for info about the this.props.match.params.id
        //if there is no  user with that id..redirect them back to /.
        //and the user is trying to visit their main page redirect them back to /.
        //if (this.props.match.params.id == 6) {
        //imagin i am logged in as user 6
        //this.props.history.push("/");
        //}
    }
    render() {
        return (
            <div className="profile">
                <h1>Hello from other Profile</h1>
            </div>
        );
    }
}
