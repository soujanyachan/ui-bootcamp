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
import store from "./redux/store";
import { Provider } from 'react-redux';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Provider store={store}><MultipleTodos/></Provider>,
        errorElement: <p>error 404</p>,
        children: [
            {
                path: "todos/:id",
                element: <Todo/>,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

