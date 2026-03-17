import { useState, useEffect } from "react";
import Site from "./pages/Site.tsx";
import PartsPage from "./pages/PartsPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import AdminPanel from "./admin/AdminPanel.tsx";
import CookieConsent from "./components/ui/CookieConsent.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

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

  let page;
  if (path === "/parts") page = <PartsPage />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === "/privacy") page = <PrivacyPolicy />;
  else if (!path.startsWith("#") && !["/", "/index.html", ""].includes(path)) page = <NotFound />;
  else page = <Site />;

  return (
    <ErrorBoundary>
      {page}
      <CookieConsent />
    </ErrorBoundary>
  );
}
