import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Reservations } from "./components/Reservations";
import { Messages } from "./components/Messages";

type Page = "dashboard" | "reservations" | "messages";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "#0a0c10", fontFamily: "'Inter', sans-serif" }}>
      {/* MARKER-MAKE-KIT-INVOKED */}
      {/* Sidebar */}
      <div
        className="flex-shrink-0 transition-all duration-300 overflow-hidden"
        style={{ width: sidebarOpen ? "256px" : "0px" }}
      >
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={() => setIsLoggedIn(false)}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {activePage === "dashboard" && <Dashboard onMenuToggle={() => setSidebarOpen((s) => !s)} />}
        {activePage === "reservations" && <Reservations />}
        {activePage === "messages" && <Messages />}
      </main>
    </div>
  );
}
