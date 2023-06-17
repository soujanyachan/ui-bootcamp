import React from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import {getMultipleTodos} from "./requests";
import {useEffect, useState} from "react";

function MultipleTodos() {
    const params = useParams();
    const [multipleTodos, setMultipleTodos] = useState({})
    useEffect(() => {
        getMultipleTodos().then((response) => {
            console.log("getMultipleTodos", response.data)
            setMultipleTodos(response.data);
        });
    }, []);
    let [searchParams] = useSearchParams();
    console.log(params, searchParams, "params");
    let multipleTodosView = null;
    if (multipleTodos && multipleTodos.length) {
        multipleTodosView = multipleTodos.map((x) => {
            return (<div>
                <a href={`/todos/${x.id}`}>{x.title || x.text || "sample"}</a>
            </div>)
        })
    }
    return (
        <div>
            <p>hello there from multiple todos</p>
            {/*get list of todos and render the list, paginated*/}
            {multipleTodosView}
        </div>);
}

export default MultipleTodos;