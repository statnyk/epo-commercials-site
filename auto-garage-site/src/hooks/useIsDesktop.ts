import { useState, useEffect } from "react";

export function useIsDesktop(bp = 768) {
  const [ok, setOk] = useState(() => window.innerWidth >= bp);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${bp}px)`);
    const h = (e: MediaQueryListEvent) => setOk(e.matches);
    mq.addEventListener("change", h);
    setOk(mq.matches);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return ok;
}
