import React from "react";
import StoresDirectoryClient from "@/components/StoresDirectoryClient";
import { getAgents } from "@/lib/dataService";

export const revalidate = 60;

export default async function StoresPage() {
  const agents = await getAgents();
  return <StoresDirectoryClient agents={agents} />;
}
