import React, { Component } from 'react';
import './app.css';

class App extends Component {
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

    loadDetails() {
        alert('hoy');
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

        axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" + this.state.page)
            .then(function (response) {
                for (var i = 0; i < 15; i++) {
                    pokeboy = response.data.data[i];

                    // get select attributes from data
                    array.push([pokeboy.id, pokeboy.image, pokeboy.name]);
                }

                setState({ data: array });
            })
    }

    componentDidMount() {
        this.loadPokemon();
    }

    renderList = data => {
        return (
            <ul>
                {data.map(item => (
                    <li onClick={this.loadDetails} style={{ listStyle: "none" }} key={item[0]}>
                        {item[0]} <br></br>
                        <img src={item[1]}></img> <br></br>
                        {item[2]} <br></br>
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

export default App;