import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Todo from './Todo';
import MultipleTodos from './MultipleTodos';

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
