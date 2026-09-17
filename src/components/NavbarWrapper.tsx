"use client";

import React from "react";
import Navbar from "./Navbar";
import { useApp } from "@/context/AppContext";

export default function NavbarWrapper() {
  const { persona, setPersona } = useApp();

  return (
    <Navbar
      currentPersona={persona}
      onPersonaChange={setPersona}
    />
  );
}
