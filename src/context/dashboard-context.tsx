"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { DateRangeKey } from "@/lib/constants";

interface DashboardContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  dateRange: DateRangeKey;
  setDateRange: (v: DateRangeKey) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangeKey>("d30");

  return (
    <DashboardContext.Provider
      value={{ collapsed, setCollapsed, dateRange, setDateRange }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
