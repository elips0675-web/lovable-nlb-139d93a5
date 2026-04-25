import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes.tsx";
import InstallPWA from "./app/components/InstallPWA";
import "./styles/index.css";

// Не регистрируем service worker внутри iframe / превью Lovable —
// иначе SW кеширует старые билды и ломает превью-роутинг.
const isInIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

const isPreviewHost =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("id-preview--") ||
    window.location.hostname.includes("lovableproject.com") ||
    window.location.hostname.includes("lovable.app"));

if (isInIframe || isPreviewHost) {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => r.unregister()))
      .catch(() => {});
  }
}

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
    <InstallPWA />
  </>
);