//https://github.com/MaximeHeckel/react-suspense-example/

import React, { Suspense, Fragment } from "react";
import { unstable_createResource } from "react-cache";

const axios = require('axios');


const Fetcher = unstable_createResource(() =>
    axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/1")
        .then(function (response) {
            console.log(response);
        })
);

const List = () => {
    const data = Fetcher.read();
    return (
        <ul>
            {data.map(item => (
                <li style={{ listStyle: "none" }} key={item.id}>
                    {item.title}
                </li>
            ))}
        </ul>
    );
}

const App = () => (
    <div>test</div>
    // <Suspense fallback={<div>Loading...</div>}>
    //     <List />
    // </Suspense>
    // <Fragment>
    //     <h2 style={{ textAlign: "center" }}>{`React: ${React.version} Demo`}</h2>
    //     <Suspense fallback={<div>Loading...</div>}>
    //         <List />
    //     </Suspense>
    // </Fragment>
);

export default App;