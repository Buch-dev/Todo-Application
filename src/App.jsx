import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { ThemeProvider, useTheme } from "./contexts";
import ThemeSwitcher from "./components/ThemeSwitcher";
import TodoItem from "./components/TodoItem";
import { DndProviderWrapper } from "./contexts/DndContext";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filterTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);

      default:
        return todos;
    }
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    const draggedTodo = todos[dragIndex];
    const updatedTodos = [...todos];
    updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, draggedTodo);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleComplete,
        themeMode,
        darkTheme,
        lightTheme,
      }}
    >
      <DndProviderWrapper>
        <main className="relative">
          {/* Mobile background */}
          <img
            src={`./bg-mobile-${themeMode}.jpg`}
            alt={`bg-mobile-${themeMode}`}
            className="w-full md:hidden"
          />

          <img
            src={`./bg-desktop-${themeMode}.jpg`}
            alt={`bg-desktop-${themeMode}`}
            className="hidden md:block"
          />

          <div className="w-full px-6 absolute inset-0 top-12">
            <div className="flex items-center justify-between top-12 w-full mx-auto max-w-[540px]">
              <h2 className="text-3xl text-white font-bold tracking-[10px]">
                TODO
              </h2>
              <ThemeSwitcher />
            </div>
            <Form />
            {/* Todo Items */}
            <div className="todo-list max-w-[540px] mx-auto">
              {filterTodos().map((todo, index) => (
                <div
                  className={index === 0 && "rounded-t-[5px] overflow-hidden"}
                >
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    moveTodo={moveTodo}
                    className={``}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between h-12 bg-white dark:bg-[#25273D] px-5 text-[#9495A5] text-xs rounded-b-[5px] max-w-[540px] mx-auto md:hidden">
              <p className="">{todos.length} items left</p>
              <button className="cursor-pointer hover:text-[#494C6B] hover:dark:text-[#E3E4F1]" onClick={handleClearCompleted}>Clear Completed</button>
            </div>

            <div className="flex items-center justify-center md:justify-between bg-white dark:bg-[#25273D] p-[15px] gap-[19px] text-[#9495A5] text-xs mt-4 md:mt-0 rounded-[5px] md:rounded-b-[5px] md:rounded-t-none max-w-[540px] mx-auto">
              <p className="hidden md:block">{todos.length} items left</p>
              <div className="flex gap-[19px]">
                <button
                  className={`${filter === "all" && "text-[#3A7CFD]"} cursor-pointer hover:text-[#494C6B] hover:dark:text-[#E3E4F1]`}
                  onClick={() => handleFilterChange("all")}
                >
                  All
                </button>
                <button
                  className={`${filter === "active" && "text-[#3A7CFD]"} cursor-pointer hover:text-[#494C6B] hover:dark:text-[#E3E4F1]`}
                  onClick={() => handleFilterChange("active")}
                >
                  Active
                </button>
                <button
                  className={`${filter === "completed" && "text-[#3A7CFD]"} cursor-pointer hover:text-[#494C6B] hover:dark:text-[#E3E4F1]`}
                  onClick={() => handleFilterChange("completed")}
                >
                  Completed
                </button>
              </div>
              <button className="hidden md:block cursor-pointer hover:text-[#494C6B] hover:dark:text-[#E3E4F1]" onClick={handleClearCompleted}>Clear Completed</button>
            </div>

            <p className="mt-10 pb-[72px] text-xs text-[#9495A5] text-center">
              Drag and drop to reorder list
            </p>
          </div>
        </main>
      </DndProviderWrapper>
    </ThemeProvider>
  );
}

export default App;
