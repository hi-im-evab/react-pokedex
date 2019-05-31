import React, { Component } from 'react';
import './app.css';
import './loadDetails';

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
        this.selectPokemon = null;
    }

    /**
     * Main pokemon loading function.
     * Runs an axios request for current page number
     * The 15 pokemons' info is then converted from
     * JSON to an array that can be used by React's
     * Array.map function.
     */
    loadPokemon() {
        const setState = this.setState.bind(this);
        const axios = require('axios');

        // Pokemon objects put into this array
        var array = [];

        // Axios request for current page number
        axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon?page=" + this.state.page)
            .then(function (response) {
                // convert from JSON response to a usable array
                // for loop iterates through each pokemon in response
                for (var i = 0; i < response.data.data.length; i++) {
                    var pokemon = response.data.data[i];
                    var types = [];

                    // get pokemon's types
                    for (var index in pokemon.types) {
                        types.push(pokemon.types[index]);
                    }

                    //  push all attributes and types to array
                    array.push([pokemon.id, pokemon.image, pokemon.name, types]);
                }

                setState({ data: array });
            });
    }

    loadDetails(id) {
        const setState = this.setState.bind(this);
        const axios = require('axios');

        var array = [];

        axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/" + id)
            .then(function (response) {
                var pokemon = response.data.data;

                for (var i in pokemon) {
                    if (i === 'stats') {
                        var stats = ['stats'];
                        for (var x in pokemon[i]) {
                            stats.push([x, pokemon[i][x]]);
                        }

                        array.push(stats);

                    } else {
                        array.push([i, pokemon[i]]);
                    }
                }

                setState({ selectPokemon: array });
            });
    }

    /**
     * Moves page forward 1
     * if not on last page
     */
    pageFwd() {
        if (this.state.page < this.state.endPage) {
            this.setState({ page: this.state.page + 1 },
                () => {
                    this.loadPokemon();
                });
        }
    }

    /**
     * Moves page back 1
     * if not on first page
     */
    pageRev() {
        if (this.state.page > this.state.startPage) {
            this.setState({ page: this.state.page - 1 },
                () => {
                    this.loadPokemon();
                });
        }
    }

    componentDidMount() {
        this.loadPokemon();
    }

    renderList = data => {
        return (
            <div>
                {data.map(item => (
                    <div className="pokemon" onClick={(e) => this.loadDetails(item[0])} key={item[0]}>
                        {item[0]}
                        <img src={item[1]}></img>
                        {item[2]}
                    </div>
                ))}
            </div>
        )
    }

    renderDetails = selectPokemon => {
        console.log(selectPokemon);

        /**
         * TODO: Automate this mess
         */
        return (
            <div>
                {/* id */}
                {selectPokemon[0][0]}: {selectPokemon[0][1]}
                <br></br>

                {/* name */}
                {selectPokemon[1][0]}: {selectPokemon[1][1]}
                <br></br>

                {/* image */}
                <img src={selectPokemon[2][1]}></img>
                <br></br>

                {/* types */}
                {selectPokemon[3][0]}
                {selectPokemon[3][1].map(item => (
                    <li key={item[0]}>
                        {item}
                    </li>
                ))}
                <br></br>

                {/* height */}
                {selectPokemon[4][0]}: {selectPokemon[4][1]}
                <br></br>

                {/* weight */}
                {selectPokemon[5][0]}: {selectPokemon[5][1]}
                <br></br>

                {/* abilities */}
                {selectPokemon[6][0]}
                {selectPokemon[6][1].map(item => (
                    <li key={item}>
                        {item}
                    </li>
                ))}
                <br></br>

                {/* egg groups */}
                {selectPokemon[7][0]}
                {selectPokemon[7][1].map(item => (
                    <li key={item}>
                        {item}
                    </li>
                ))}
                <br></br>

                {/* stats */}
                {selectPokemon[8][0]}
                {selectPokemon[8].slice(1).map(item => (
                    <li key={item}>
                        {item[0]}: {item[1]}
                    </li>
                ))}
                <br></br>

                {/* genus */}
                {selectPokemon[9][0]}: {selectPokemon[9][1]}
                <br></br>

                {/* desc */}
                {selectPokemon[10][0]}:
                <p>
                    {selectPokemon[10][1]}
                </p>
                <br></br>
            </div>
        )
    }

    render() {
        const { data } = this.state;

        if (this.state.selectPokemon != null) {
            var selectPokemon = this.state.selectPokemon;
        }

        return (
            <div>
                <div className="main">


                    <div className="nav" id="top-nav">
                        <button onClick={this.pageRev}>
                            Page Back
                    </button>
                        <button onClick={this.pageFwd}>
                            Page Forward
                    </button>
                        {this.state.page}
                    </div>

                    <h1>
                        POKEMON LIST!
                </h1>
                    {this.state.data === null ?
                        <div>Loading</div>
                        :
                        <div className="pokemon-list">
                            {/* RENDER LIST CALLED TWICE ON PAGE CHANGE
                            TODO: Block first render on state change?
                        */}
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

                <div className="pokemon_details">
                    {
                        selectPokemon != null ? (
                            <h1>
                                POKEMON DETAILS!
                            </h1>
                        ) : null
                    }

                    {
                        selectPokemon != null ? (

                            this.renderDetails(selectPokemon)
                        ) : null
                    }
                </div>
            </div>
        );
    }
}

export default App;