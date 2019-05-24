//https://github.com/MaximeHeckel/react-suspense-example/

import React, { Suspense, Fragment, memo } from "react";
import { unstable_createResource } from "react-cache";

const axios = require('axios');

const Fetcher = unstable_createResource(() =>
    // axios.get("https://intern-pokedex.myriadapps.com/api/v1/pokemon/1")
    fetch("https://jsonplaceholder.typicode.com/todos").then(r => r.json())
);

const List = () => {
    const data = Fetcher.read();
    return (
        <div>fucking hell</div>
        // <ul>
        //     {data.map(item => (
        //         <li style={{ listStyle: "none" }}>
        //             {item}
        //         </li>
        //     ))}
        // </ul>
    );
}

const App = () => (
    <Fragment>
        <h2 style={{ textAlign: "center" }}>{`React: ${React.version} Demo`}</h2>
        <Suspense fallback={<div>Loading...</div>}>
            <List />
        </Suspense>
    </Fragment>
);

const MemoApp = memo(App);

export default MemoApp;