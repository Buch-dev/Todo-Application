import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
  todos: [
    {
      id: 1,
      todo: "todo message",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => {
  return useContext(ThemeContext);
};
