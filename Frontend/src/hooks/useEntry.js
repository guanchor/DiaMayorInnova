import { useState } from "react";

const useEntry = () => {

  const [entries, setEntries] = useState([]);


  const addEntry = () => {
    const defaultEntry = {
      entry_number: entries.length + 1,
      entry_date: "2024-10-10",
    }
    setEntries([...entries, defaultEntry])
  }

  const removeEntry = (entryNumber) => {
    const updatedEntries = entries.filter(entry => entry.entry_number !== entryNumber);
    setEntries(updatedEntries);
    setAnnotations(annotations.filter(annotation => annotation.student_entry_id !== entryNumber));
  };

  return {
    addEntry,
    removeEntry,
    entries,
  }
}

export default useEntry
