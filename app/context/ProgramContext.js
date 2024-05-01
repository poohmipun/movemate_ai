"use client"
// context/ProgramContext.js
import React, { createContext, useState } from "react";

// Create the context
export const ProgramContext = createContext();

// Create the provider component
export const ProgramProvider = ({ children }) => {
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  return (
    <ProgramContext.Provider value={{ selectedPrograms, setSelectedPrograms }}>
      {children}
    </ProgramContext.Provider>
  );
};
