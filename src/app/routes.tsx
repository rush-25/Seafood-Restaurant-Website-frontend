import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "about", Component: About },
      { path: "gallery", Component: Gallery },
      { path: "contact", Component: Contact },
    ],
  },
  // Admin routes — no navbar/footer
  { path: "/admin", Component: AdminLogin },
  { path: "/admin/dashboard", Component: AdminDashboard },
]);
