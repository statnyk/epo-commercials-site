import { useState, useEffect } from "react";
import Site from "./pages/Site.tsx";
import PartsPage from "./pages/PartsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";

export default function App() {
  const [route, setRoute] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectedPath = params.get("p");
    if (redirectedPath) {
      window.history.replaceState(null, "", redirectedPath);
      return redirectedPath;
    }
    return window.location.hash || window.location.pathname;
  });

  useEffect(() => {
    const h = () => setRoute(window.location.hash || window.location.pathname);
    window.addEventListener("hashchange", h);
    window.addEventListener("popstate", h);
    return () => {
      window.removeEventListener("hashchange", h);
      window.removeEventListener("popstate", h);
    };
  }, []);

  if (route === "#admin") return <AdminPanel />;

  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = route.startsWith(base) ? route.slice(base.length) || "/" : route;

  if (path === "/parts") return <PartsPage />;

  const knownPaths = ["/", "/index.html", ""];
  if (!path.startsWith("#") && !knownPaths.includes(path)) return <NotFound />;

  return <Site />;
}
