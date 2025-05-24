
import { useState } from "react";

export interface ResourceLimits {
  maxSites: number;
  maxKiosks: number;
  maxUsers: number;
}

export function useResourceLimits() {
  // These would typically come from an API based on the tenant's subscription
  const [limits, setLimits] = useState<ResourceLimits>({
    maxSites: 3,
    maxKiosks: 5,
    maxUsers: 10
  });

  const isAtLimit = {
    sites: (currentCount: number) => currentCount >= limits.maxSites,
    kiosks: (currentCount: number) => currentCount >= limits.maxKiosks,
    users: (currentCount: number) => currentCount >= limits.maxUsers
  };

  return {
    limits,
    isAtLimit
  };
}
