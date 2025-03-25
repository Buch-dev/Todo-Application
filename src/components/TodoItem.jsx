import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTheme } from "../contexts";
import CustomCheckbox from "./CustomCheckbox";

const ItemType = "TODO";

function TodoItem({ todo, index, moveTodo, className }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const ref = useRef(null);

  const { updateTodo, deleteTodo, toggleComplete, themeMode } = useTheme();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`border-b border-[#E3E4F1] dark:border-[#393A4B] flex bg-white dark:bg-[#25273D] px-5 py-4 items-center ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CustomCheckbox
        id={`checkbox`}
        checked={todo.completed}
        onChange={toggleCompleted}
        themeMode={themeMode}
      />
      <label
        type="text"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditable}
        className={`w-full ml-3 text-xs text-[#494C6B] dark:text-[#C8CBE7] cursor-pointer ${
          todo.completed && "line-through text-[#D1D2DA] dark:text-[#4D5067]"
        }`}
      >
        {todoMsg}
      </label>
      <button className="ml-3" onClick={() => deleteTodo(todo.id)}>
        <img src="./icon-cross.svg" alt="icon-cross" />
      </button>
    </div>
  );
}

export default TodoItem;
