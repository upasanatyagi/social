import React from "react";
import axious from "axios";

export default class CuteAnimals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "upasana"
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // axios.get('/some-route-that-doesnt-exists')
        //     .then(({data})=>{
        //
        //     })
        setTimeout(() => {
            this.setState({
                name: "pete"
            });
        }, 1000);
    }

    handleClick() {
        console.log("handleClick running");
        this.setState({
            name: "david"
        });
    }
    render() {
        return (
            <div>
                <h1>Cute Animals</h1>
                <p onClick={() => this.handleClick()}>{this.state.name}</p>
                <p>{this.props.cuteAnimal}</p>
            </div>
        );
    }
}
