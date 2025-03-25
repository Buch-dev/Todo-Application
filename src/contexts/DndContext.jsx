import { createContext, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DndContext = createContext();

export const useDnd = () => useContext(DndContext);

export const DndProviderWrapper = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DndContext.Provider value={{}}>
        {children}
      </DndContext.Provider>
    </DndProvider>
  );
};