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
        var array = [];

        const that = this
        const setState = this.setState.bind(this);

        console.log('pre async');

        for (var i = 1; i <= 555; i++) {
            axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/" + i)
                .then(function (response) {
                    // handle success
                    that.setState();
                    console.log(response.data.data);

                    pokeboy = response.data.data;

                    console.log(pokeboy.id);
                    console.log(pokeboy.image);
                    console.log(pokeboy.name);
                    console.log(pokeboy.types[0]);

                    array.push([pokeboy.id, pokeboy.image, pokeboy.name, pokeboy.types[0]]);

                    setState({ data: array });
                })
        }



    }

    renderList = data => {
        return (
            <ul>
                {data.map(item => (
                    <li style={{ listStyle: "none" }} key={item[0]}>
                        {item[0]} <br></br>
                        <img src={item[1]}></img> <br></br>
                        {item[2]} <br></br>
                        {item[3]} <br></br>
                        <br></br>
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        const { data } = this.state;

        return (<div>
            POKEMON INFO
            {this.state.data === null ?
                <div>Loading</div>
                :
                <div>
                    {this.renderList(data)}
                </div>
            }
        </div>);
    }
}

ReactDOM.render(
    <YourComponent />,
    document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
