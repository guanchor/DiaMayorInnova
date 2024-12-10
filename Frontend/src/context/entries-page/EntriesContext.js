import { createContext, useContext } from 'react';

export const EntriesContext = createContext();

export const useEntries = () => useContext(EntriesContext);

