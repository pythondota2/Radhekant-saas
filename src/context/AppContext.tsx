"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Persona } from "@/components/Navbar";

interface AppContextType {
  persona: Persona;
  setPersona: (p: Persona) => void;
  agentWallet: number;
  deductWallet: (amount: number) => boolean;
  addWallet: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [persona, setPersona] = useState<Persona>("CUSTOMER");
  const [agentWallet, setAgentWallet] = useState<number>(65400);

  const deductWallet = (amount: number): boolean => {
    if (agentWallet >= amount) {
      setAgentWallet((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const addWallet = (amount: number) => {
    setAgentWallet((prev) => prev + amount);
  };

  return (
    <AppContext.Provider
      value={{
        persona,
        setPersona,
        agentWallet,
        deductWallet,
        addWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
