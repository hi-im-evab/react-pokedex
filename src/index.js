import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const axios = require('axios');

        var pokeboy;

        const that = this
        const setState = this.setState.bind(this);

        console.log('pre async');

        axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?name=Pikachu")
            .then(function (response) {
                // handle success
                that.setState();
                console.log('async');

                console.log(response);

                pokeboy = response.data.data[0];

                //that.setState({pokeboy: pokeboy});

                console.log(pokeboy.id);
                console.log(pokeboy.image);
                console.log(pokeboy.name);
                console.log(pokeboy.types[0]);

                var array = [pokeboy.id, pokeboy.image, pokeboy.name, pokeboy.types[0]];

                setState({ data: array });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

    render() {
        return (<div>
            POKEMON INFO
            {this.state.data === null ?
                <div>Loading</div>
                :
                <div>
                    {this.state.data[0]} <br></br>
                    <img src={this.state.data[1]}></img> <br></br>
                    {this.state.data[2]} <br></br>
                    {this.state.data[3]} <br></br>

                </div>
            }
        </div>);
    }
}

ReactDOM.render(
    // <Game />,
    <YourComponent />,
    document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
