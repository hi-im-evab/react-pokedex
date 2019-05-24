import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        const axios = require('axios');

        console.log('pre async');

        // return EVERYTHING
        console.log('before axios');
        for (var i = 1; i <= 20; i++) {
            axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/" + i)
                .then(function (response) {
                    console.log(response);
                    setState(response);
                })
        }
        console.log('after axios');

    }

    render() {
        return (
            <div>
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
            </div>

        );
    }
}

ReactDOM.render(
    // <App />,
    <YourComponent />,
    document.getElementById('root')
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
