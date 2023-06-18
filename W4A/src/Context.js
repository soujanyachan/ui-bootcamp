import {createContext} from "react";

export const MultipleTodosContext = createContext([]);
export const SetMultipleTodosContext = createContext((x) => {});
export const SetShouldDisplayTodosContext = createContext((x) => {});
export const SelectedTodoIdContext = createContext("");
