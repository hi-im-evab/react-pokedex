import React, { Component } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            page: 1,
            startPage: 1,
            endPage: 36
        }
        this.pageFwd = this.pageFwd.bind(this);
        this.pageRev = this.pageRev.bind(this);
    }

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

        var array = [];

        const setState = this.setState.bind(this);

        axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" + this.state.page)
            .then(function (response) {
                for (var i = 0; i < 15; i++) {
                    var pokeboy = response.data.data[i];

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
            <div>
                {data.map(item => (
                    <div className="pokemon" onClick={this.loadDetails} key={item[0]}>
                        {item[0]}
                        <img src={item[1]}></img>
                        {item[2]} 
                    </div>
                ))}
            </div>
        )
    }

    render() {
        const { data } = this.state;

        return (
            <div>
                <div className="nav" id="top-nav">
                    <button onClick={this.pageRev}>
                        Page Back
                    </button>
                    <button onClick={this.pageFwd}>
                        Page Forward
                    </button>
                    {this.state.page}
                </div>

                POKEMON!
                {this.state.data === null ?
                    <div>Loading</div>
                    :
                    <div className="pokemon-list">
                        {this.renderList(data)}
                    </div>
                }

                <div className="nav" id="bottom-nav">
                    <button onClick={this.pageRev}>
                        Page Back
                    </button>
                    <button onClick={this.pageFwd}>
                        Page Forward
                    </button>
                    {this.state.page}
                </div>
            </div>
        );
    }
}

export default App;