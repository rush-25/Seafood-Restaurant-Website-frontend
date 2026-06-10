import { Search, CalendarRange, Check, X, Eye, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const allReservations = [
  { id: 1, name: "Alexandra Whitmore", email: "a.whitmore@email.com", date: "Jun 06, 2026", time: "7:30 PM", guests: 4, status: "confirmed" },
  { id: 2, name: "James Harrington", email: "j.harrington@email.com", date: "Jun 06, 2026", time: "8:00 PM", guests: 2, status: "pending" },
  { id: 3, name: "Sophia Laurent", email: "s.laurent@email.com", date: "Jun 07, 2026", time: "6:45 PM", guests: 6, status: "confirmed" },
  { id: 4, name: "Marcus Reynolds", email: "m.reynolds@email.com", date: "Jun 07, 2026", time: "9:00 PM", guests: 3, status: "cancelled" },
  { id: 5, name: "Elena Voss", email: "e.voss@email.com", date: "Jun 08, 2026", time: "7:15 PM", guests: 5, status: "pending" },
  { id: 6, name: "Thomas Blackwell", email: "t.blackwell@email.com", date: "Jun 08, 2026", time: "8:30 PM", guests: 2, status: "confirmed" },
  { id: 7, name: "Isabella Chen", email: "i.chen@email.com", date: "Jun 09, 2026", time: "7:00 PM", guests: 8, status: "pending" },
  { id: 8, name: "Sebastian Müller", email: "s.muller@email.com", date: "Jun 09, 2026", time: "8:45 PM", guests: 2, status: "confirmed" },
  { id: 9, name: "Natasha Petrov", email: "n.petrov@email.com", date: "Jun 10, 2026", time: "6:30 PM", guests: 4, status: "cancelled" },
  { id: 10, name: "William Ashford", email: "w.ashford@email.com", date: "Jun 10, 2026", time: "9:15 PM", guests: 3, status: "pending" },
];

const statusBadge = (status: string) => {
  if (status === "confirmed") return { bg: "rgba(46,140,67,0.1)", color: "#2e8c43", label: "Confirmed" };
  if (status === "pending") return { bg: "rgba(160,103,58,0.12)", color: "#8b5e34", label: "Pending" };
  return { bg: "rgba(192,57,43,0.1)", color: "#c0392b", label: "Cancelled" };
};

export function Reservations() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 7;

  const filtered = allReservations.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#f7f4f0" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-8 pt-8 pb-6">
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a1008", marginBottom: "0.25rem" }}>Reservations</h1>
        <p style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>Manage and review all booking requests</p>
        <div className="mt-3 w-12 h-[2px]" style={{ background: "linear-gradient(90deg, #6b3d1e, transparent)" }} />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {/* Search and filters */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#c9b09a" }} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-xl outline-none text-sm"
              style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.14)", color: "#1a1008", fontFamily: "'Inter', sans-serif", boxShadow: "0 1px 4px rgba(107,61,30,0.05)" }}
            />
          </div>
          <div className="relative">
            <CalendarRange size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#c9b09a" }} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl outline-none text-sm"
              style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.14)", color: "#8c6a4e", fontFamily: "'Inter', sans-serif", minWidth: "160px", boxShadow: "0 1px 4px rgba(107,61,30,0.05)" }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.14)", color: "#8c6a4e", fontFamily: "'Inter', sans-serif", boxShadow: "0 1px 4px rgba(107,61,30,0.05)" }}>
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.1)", boxShadow: "0 4px 20px rgba(107,61,30,0.07)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(107,61,30,0.08)" }}>
                  {["Name", "Email", "Date", "Time", "Guests", "Status", "Actions"].map((col) => (
                    <th key={col} className="px-5 py-4 text-left text-xs tracking-widest" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {col.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((r, i) => {
                  const badge = statusBadge(r.status);
                  return (
                    <tr key={r.id}
                      style={{ borderBottom: i < paginated.length - 1 ? "1px solid rgba(107,61,30,0.05)" : "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(107,61,30,0.025)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <td className="px-5 py-4">
                        <span style={{ color: "#1a1008", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 500 }}>{r.name}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>{r.email}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>{r.date}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem" }}>{r.time}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span style={{ color: "#6b3d1e", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600 }}>{r.guests}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: badge.bg, color: badge.color, fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {r.status === "pending" && (
                            <>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: "rgba(46,140,67,0.08)", color: "#2e8c43", border: "1px solid rgba(46,140,67,0.2)", fontFamily: "'Inter', sans-serif" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(46,140,67,0.18)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(46,140,67,0.08)"; }}>
                                <Check size={12} strokeWidth={2.5} /> Approve
                              </button>
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: "rgba(192,57,43,0.08)", color: "#c0392b", border: "1px solid rgba(192,57,43,0.2)", fontFamily: "'Inter', sans-serif" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(192,57,43,0.18)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(192,57,43,0.08)"; }}>
                                <X size={12} strokeWidth={2.5} /> Reject
                              </button>
                            </>
                          )}
                          <button className="p-1.5 rounded-lg transition-colors" style={{ color: "#c9b09a" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b3d1e"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9b09a"; }}>
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: "1px solid rgba(107,61,30,0.07)" }}>
            <p className="text-sm" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif" }}>
              Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                style={{ background: page === 1 ? "transparent" : "rgba(107,61,30,0.07)", color: page === 1 ? "#d4c0b0" : "#6b3d1e", border: "1px solid rgba(107,61,30,0.14)", cursor: page === 1 ? "not-allowed" : "pointer" }}
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all"
                  style={{ background: page === p ? "linear-gradient(135deg, #6b3d1e, #a0673a)" : "transparent", color: page === p ? "#ffffff" : "#8c6a4e", border: page === p ? "none" : "1px solid rgba(107,61,30,0.12)", fontFamily: "'Inter', sans-serif", fontWeight: page === p ? 600 : 400 }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                style={{ background: page === totalPages ? "transparent" : "rgba(107,61,30,0.07)", color: page === totalPages ? "#d4c0b0" : "#6b3d1e", border: "1px solid rgba(107,61,30,0.14)", cursor: page === totalPages ? "not-allowed" : "pointer" }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
