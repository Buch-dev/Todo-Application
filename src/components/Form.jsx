import React, { useState } from "react";
import { useTheme } from "../contexts";

function Form() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTheme();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="mb-4 mt-6 max-w-[540px] mx-auto">
      <input
        type="text"
        className="w-full rounded-[5px] text-xs text-[#393A4B] h-12 bg-white dark:bg-[#25273D] pl-[52px] caret-[#3A7CFD] outline-none dark:placeholder:text-[#767992] "
        placeholder="Create a new todo…"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <div className="w-5 h-5 rounded-full border border-[#E3E4F1] absolute top-[74px] left-[44px] md:left-[380px]" />
    </form>
  );
}

export default Form;
