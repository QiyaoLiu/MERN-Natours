import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function usePreviousLocation() {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    setPreviousLocation(location.pathname);
  }, [location]);

  return previousLocation;
}
