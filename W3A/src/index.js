import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Todo from './Todo';
import MultipleTodos from './MultipleTodos';
import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MultipleTodos/>,
        errorElement: <p>error 404</p>,
    },
    {
        path: "/todos/:id",
        element: <Todo />,
    },
    {
        path: "/about",
        element: <p>about me</p>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
