import { useState } from "react";
import { EntriesContext } from './EntriesContext'; // Asegúrate de que la ruta sea correcta

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([1]);
  const [annotationsItems, setAnnotationsItems] = useState([1]);

  const addAnnotationItem = () => {
    setAnnotationsItems([...annotationsItems, annotationsItems.length + 1])
  }

  const addEntryItem = () => {
    setEntries([...entries, entries.length + 1])
  };

  const deleteAnnotationItem = (itemNumber) => {
    setAnnotationsItems(annotationsItems.filter((item) => item !== itemNumber));
  };

  return (
    <EntriesContext.Provider value={{
      entries,
      annotationsItems,
      addAnnotationItem,
      addEntryItem,
      deleteAnnotationItem
    }}>
      {children}
    </EntriesContext.Provider>
  );
};