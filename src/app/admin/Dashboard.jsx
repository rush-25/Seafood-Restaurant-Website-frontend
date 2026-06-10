import { CalendarRange, Mail, CheckCircle, TrendingUp, Eye, Menu, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

const statCards = [
  { label: "Total Reservations", value: "1,284", growth: "+12.4%", positive: true, icon: CalendarRange, iconBg: "rgba(107,61,30,0.12)", iconColor: "#a0673a" },
  { label: "Unread Emails", value: "47", growth: "+3.2%", positive: false, icon: Mail, iconBg: "rgba(30,60,120,0.1)", iconColor: "#4a7fc1" },
  { label: "Confirmed Reservations", value: "986", growth: "+8.7%", positive: true, icon: CheckCircle, iconBg: "rgba(46,140,67,0.1)", iconColor: "#2e8c43" },
];

const recentReservations = [
  { id: 1, name: "Alexandra Whitmore", date: "Jun 06, 2026", time: "7:30 PM", guests: 4, status: "confirmed" },
  { id: 2, name: "James Harrington", date: "Jun 06, 2026", time: "8:00 PM", guests: 2, status: "pending" },
  { id: 3, name: "Sophia Laurent", date: "Jun 07, 2026", time: "6:45 PM", guests: 6, status: "confirmed" },
  { id: 4, name: "Marcus Reynolds", date: "Jun 07, 2026", time: "9:00 PM", guests: 3, status: "cancelled" },
  { id: 5, name: "Elena Voss", date: "Jun 08, 2026", time: "7:15 PM", guests: 5, status: "pending" },
  { id: 6, name: "Thomas Blackwell", date: "Jun 08, 2026", time: "8:30 PM", guests: 2, status: "confirmed" },
];

const statusBadge = (status) => {
  if (status === "confirmed") return { bg: "rgba(46,140,67,0.1)", color: "#2e8c43", label: "Confirmed" };
  if (status === "pending") return { bg: "rgba(160,103,58,0.12)", color: "#8b5e34", label: "Pending" };
  return { bg: "rgba(192,57,43,0.1)", color: "#c0392b", label: "Cancelled" };
};

export function Dashboard({ onMenuToggle }) {
  const [selectedDate] = useState("Jun 5, 2026");

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#f7f4f0" }}>
      {/* Top Navbar */}
      <header className="flex-shrink-0 flex items-center justify-between px-8 py-4" style={{ background: "#ffffff", borderBottom: "1px solid rgba(107,61,30,0.1)", boxShadow: "0 1px 8px rgba(107,61,30,0.06)" }}>
        <div className="flex items-center gap-4">
          <button onClick={onMenuToggle} className="p-2 rounded-lg transition-colors" style={{ color: "#8c6a4e" }}>
            <Menu size={20} />
          </button>
          <span className="text-xs tracking-[0.22em]" style={{ color: "#a0673a", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>POSEIDON FINE DINING</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg" style={{ color: "#8c6a4e" }}>
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#a0673a" }} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ background: "rgba(107,61,30,0.07)", border: "1px solid rgba(107,61,30,0.15)", color: "#6b3d1e", fontFamily: "'Inter', sans-serif" }}>
            <CalendarRange size={15} />
            {selectedDate}
            <ChevronDown size={14} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: "linear-gradient(135deg, #6b3d1e, #a0673a)", color: "#f7f0e8", fontFamily: "'Inter', sans-serif" }}>A</div>
            <div className="hidden md:block">
              <p className="text-xs font-medium" style={{ color: "#1a1008", fontFamily: "'Inter', sans-serif" }}>Admin User</p>
              <p className="text-[11px]" style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif" }}>Super Admin</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a1008", marginBottom: "0.25rem" }}>Dashboard</h1>
          <p style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>Overview of your restaurant activity</p>
          <div className="mt-3 w-12 h-[2px]" style={{ background: "linear-gradient(90deg, #6b3d1e, transparent)" }} />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {statCards.map(({ label, value, growth, positive, icon: Icon, iconBg, iconColor }) => (
            <div key={label} className="p-6 rounded-xl" style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.1)", boxShadow: "0 4px 20px rgba(107,61,30,0.07)" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: iconBg }}>
                  <Icon size={22} style={{ color: iconColor }} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: positive ? "rgba(46,140,67,0.08)" : "rgba(192,57,43,0.08)", color: positive ? "#2e8c43" : "#c0392b", fontFamily: "'Inter', sans-serif" }}>
                  <TrendingUp size={11} strokeWidth={2} />
                  {growth}
                </div>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a1008", lineHeight: 1 }}>{value}</p>
              <p className="mt-1 text-sm" style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif" }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Reservations */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.1)", boxShadow: "0 4px 20px rgba(107,61,30,0.07)" }}>
          <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(107,61,30,0.08)" }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", color: "#1a1008" }}>Recent Reservations</h2>
              <p className="text-xs mt-0.5" style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif" }}>Latest booking activity</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-xs tracking-wider" style={{ background: "rgba(107,61,30,0.07)", border: "1px solid rgba(107,61,30,0.18)", color: "#6b3d1e", fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}>
              VIEW ALL
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(107,61,30,0.07)" }}>
                  {["Name", "Date", "Time", "Guests", "Status", "Actions"].map((col) => (
                    <th key={col} className="px-6 py-3.5 text-left text-xs tracking-widest" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {col.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentReservations.map((r, i) => {
                  const badge = statusBadge(r.status);
                  return (
                    <tr key={r.id}
                      style={{ borderBottom: i < recentReservations.length - 1 ? "1px solid rgba(107,61,30,0.05)" : "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(107,61,30,0.025)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                      <td className="px-6 py-4">
                        <span style={{ color: "#1a1008", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500 }}>{r.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>{r.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>{r.time}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ color: "#6b3d1e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>{r.guests}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: badge.bg, color: badge.color, fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: "#c9b09a" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#6b3d1e"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#c9b09a"; }}>
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
