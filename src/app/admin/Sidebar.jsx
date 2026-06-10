import { LayoutDashboard, CalendarRange, Mail, LogOut, Shell } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reservations", label: "Reservations", icon: CalendarRange },
  { id: "messages", label: "Emails / Messages", icon: Mail },
];

export function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="flex flex-col h-full w-64 flex-shrink-0" style={{ background: "#120b04", borderRight: "1px solid rgba(201,144,106,0.14)" }}>
      {/* Logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #6b3d1e, #a0673a)", boxShadow: "0 4px 16px rgba(107,61,30,0.45)" }}>
            <Shell size={20} color="#f7f0e8" strokeWidth={1.5} />
          </div>
          <div>
            <p className="tracking-[0.2em] text-[10px] leading-tight" style={{ color: "#c9906a", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>POSEIDON</p>
            <p className="text-[10px] leading-tight tracking-wider" style={{ color: "#7a5a40", fontFamily: "'Inter', sans-serif" }}>FINE DINING</p>
          </div>
        </div>
        <div className="mt-5 h-[1px]" style={{ background: "linear-gradient(90deg, rgba(160,103,58,0.5), transparent)" }} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-3 mb-3 text-[10px] tracking-[0.25em]" style={{ color: "#3d2010", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>NAVIGATION</p>
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left"
              style={{
                background: isActive ? "linear-gradient(135deg, rgba(107,61,30,0.3), rgba(160,103,58,0.15))" : "transparent",
                border: isActive ? "1px solid rgba(160,103,58,0.3)" : "1px solid transparent",
                color: isActive ? "#c9906a" : "#7a5a40",
              }}
            >
              <Icon size={17} strokeWidth={isActive ? 2 : 1.5} style={{ color: isActive ? "#c9906a" : "#5a3a20" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: isActive ? 500 : 400, letterSpacing: "0.01em" }}>
                {label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#c9906a" }} />
              )}
            </button>
          );
        })}

        <div className="my-4 h-[1px]" style={{ background: "rgba(201,144,106,0.08)" }} />
      </nav>

      {/* Seafood illustration */}
      <div className="px-6 py-4">
        <svg width="100%" viewBox="0 0 180 80" fill="none" style={{ opacity: 0.14 }}>
          <path d="M10 50 Q45 30 80 50 Q115 70 150 50 Q165 42 175 48" stroke="#a0673a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M10 60 Q45 40 80 60 Q115 80 150 60 Q165 52 175 58" stroke="#a0673a" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M80 20 Q90 10 100 20 Q110 30 90 35 Q70 30 80 20Z" stroke="#a0673a" strokeWidth="1" fill="none" />
          <line x1="90" y1="10" x2="90" y2="35" stroke="#a0673a" strokeWidth="0.5" />
          <line x1="80" y1="20" x2="100" y2="20" stroke="#a0673a" strokeWidth="0.5" />
          <ellipse cx="35" cy="25" rx="14" ry="7" stroke="#a0673a" strokeWidth="1" fill="none" />
          <path d="M49 25 L58 18 L58 32 Z" stroke="#a0673a" strokeWidth="1" fill="none" strokeLinejoin="round" />
          <circle cx="28" cy="23" r="1.5" fill="#a0673a" />
          <circle cx="145" cy="20" r="4" stroke="#a0673a" strokeWidth="1" fill="none" />
          <line x1="145" y1="24" x2="145" y2="38" stroke="#a0673a" strokeWidth="1" />
          <line x1="138" y1="38" x2="152" y2="38" stroke="#a0673a" strokeWidth="1" />
          <path d="M138 38 Q138 42 141 40" stroke="#a0673a" strokeWidth="1" fill="none" />
          <path d="M152 38 Q152 42 149 40" stroke="#a0673a" strokeWidth="1" fill="none" />
          <line x1="138" y1="30" x2="152" y2="30" stroke="#a0673a" strokeWidth="1" />
        </svg>
      </div>

      {/* Logout */}
      <div className="px-4 pb-6">
        <div className="h-[1px] mb-4" style={{ background: "rgba(201,144,106,0.08)" }} />
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200"
          style={{ color: "#5a3a20" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#e85555"; e.currentTarget.style.background = "rgba(200,60,60,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#5a3a20"; e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut size={17} strokeWidth={1.5} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
