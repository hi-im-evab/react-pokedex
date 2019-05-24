import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

class YourComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            page: 1,
            startPage: 1,
            endPage: 37
        }
        this.pageFwd = this.pageFwd.bind(this);
        this.pageRev = this.pageRev.bind(this);
    }

    // pageFwd() and pageRev() control which range of pokemon are showing.
    // Currently only works by ID

    pageFwd() {
        // Advance 1 page if not on last page
        if (this.state.page < this.state.endPage) {
            this.setState({ page: this.state.page + 1 },
                () => {
                    this.loadPokemon();
                });
        }
    }

    pageRev() {
        // Go back 1 page if not on first page
        if (this.state.page > this.state.startPage) {
            this.setState({ page: this.state.page - 1 },
                () => {
                    this.loadPokemon();
                });
        }
    }

    // Load in Pokemon
    // range based on ID and page number
    // ex) pg 3 shows IDs 31-45
    loadPokemon() {
        const axios = require('axios');

        var pokeboy;
        var array = [];

        const that = this
        const setState = this.setState.bind(this);

        for (var i = (this.state.page * 15) - 14; i <= (this.state.page * 15); i++) {
            axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/" + i)
                .then(function (response) {
                    // handle success
                    that.setState();

                    pokeboy = response.data.data;

                    // get select attributes from data
                    array.push([pokeboy.id, pokeboy.image, pokeboy.name, pokeboy.types[0]]);

                    // sort array numerically by ID
                    array.sort(function (a, b) {
                        if (a[0] < b[0]) return -1;
                        if (a[0] > b[0]) return 1;
                        return 0;
                    });

                    setState({ data: array });
                })
        }
    }

    componentDidMount() {
        this.loadPokemon();
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

        return (
            <div>
                <button onClick={this.pageRev}>
                    Page Back
                </button>
                <button onClick={this.pageFwd}>
                    Page Forward
                </button>
                {this.state.page}

                <br></br>

                POKEMON INFO
            {this.state.data === null ?
                    <div>Loading</div>
                    :
                    <div>
                        {this.renderList(data)}
                    </div>
                }

                <br></br>

                <button onClick={this.pageRev}>
                    Page Back
                </button>
                <button onClick={this.pageFwd}>
                    Page Forward
                </button>
                {this.state.page}
            </div>
        );
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
