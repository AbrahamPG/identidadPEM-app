import { createContext, useContext, useState, type ReactNode } from "react";

type PlanContextType = {
  isPro: boolean;
  activateProDemo: () => void;
};

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  // Simulación temporal: todos comienzan con el plan gratuito.
  const [isPro, setIsPro] = useState(false);

  function activateProDemo() {
    setIsPro(true);
  }

  return (
    <PlanContext.Provider value={{ isPro, activateProDemo }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan debe usarse dentro de PlanProvider");
  }

  return context;
}
