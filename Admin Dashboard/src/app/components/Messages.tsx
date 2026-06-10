import { Search, Eye, Trash2, Mail, MailOpen } from "lucide-react";
import { useState } from "react";

const allMessages = [
  { id: 1, name: "Victoria Sterling", email: "v.sterling@email.com", subject: "Special Dietary Requirements", date: "Jun 05, 2026", read: false },
  { id: 2, name: "Henri Fontaine", email: "h.fontaine@email.com", subject: "Anniversary Dinner Inquiry", date: "Jun 05, 2026", read: false },
  { id: 3, name: "Robert Ashworth", email: "r.ashworth@email.com", subject: "Corporate Event Booking", date: "Jun 04, 2026", read: true },
  { id: 4, name: "Amelia Worthington", email: "a.worthington@email.com", subject: "Table for 12 — Private Dining", date: "Jun 04, 2026", read: false },
  { id: 5, name: "Lucas Bergström", email: "l.bergstrom@email.com", subject: "Wine Pairing Menu Request", date: "Jun 03, 2026", read: true },
  { id: 6, name: "Cecilia Montague", email: "c.montague@email.com", subject: "Allergy Information — Shellfish", date: "Jun 03, 2026", read: true },
  { id: 7, name: "Marco Delacroix", email: "m.delacroix@email.com", subject: "Chef's Table Availability", date: "Jun 02, 2026", read: false },
  { id: 8, name: "Penelope Ashford", email: "p.ashford@email.com", subject: "Feedback — Exceptional Service", date: "Jun 02, 2026", read: true },
  { id: 9, name: "Oliver Castlemore", email: "o.castlemore@email.com", subject: "Birthday Celebration Setup", date: "Jun 01, 2026", read: false },
  { id: 10, name: "Genevieve Moreau", email: "g.moreau@email.com", subject: "Reservation Modification Request", date: "Jun 01, 2026", read: true },
];

export function Messages() {
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState(allMessages);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleView(id: number) {
    setSelectedId(id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  function handleDelete(id: number) {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: "#f7f4f0" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-8 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#1a1008", marginBottom: "0.25rem" }}>Messages</h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(107,61,30,0.1)", color: "#6b3d1e", fontFamily: "'Inter', sans-serif", marginTop: "-0.5rem" }}>
              {unreadCount} unread
            </span>
          )}
        </div>
        <p style={{ color: "#8c6a4e", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>Manage guest inquiries and correspondence</p>
        <div className="mt-3 w-12 h-[2px]" style={{ background: "linear-gradient(90deg, #6b3d1e, transparent)" }} />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#c9b09a" }} />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl outline-none text-sm"
            style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.14)", color: "#1a1008", fontFamily: "'Inter', sans-serif", boxShadow: "0 1px 4px rgba(107,61,30,0.05)" }}
          />
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(107,61,30,0.1)", boxShadow: "0 4px 20px rgba(107,61,30,0.07)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(107,61,30,0.08)" }}>
                  {["", "Name", "Email", "Subject", "Received", "Status", "Actions"].map((col, i) => (
                    <th key={i} className="px-5 py-4 text-left text-xs tracking-widest" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                      {col ? col.toUpperCase() : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
                      No messages found
                    </td>
                  </tr>
                )}
                {filtered.map((m, i) => (
                  <tr
                    key={m.id}
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(107,61,30,0.05)" : "none", background: selectedId === m.id ? "rgba(107,61,30,0.04)" : "transparent", cursor: "pointer" }}
                    onMouseEnter={(e) => { if (selectedId !== m.id) (e.currentTarget as HTMLElement).style.background = "rgba(107,61,30,0.02)"; }}
                    onMouseLeave={(e) => { if (selectedId !== m.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Read indicator */}
                    <td className="pl-5 pr-2 py-4 w-10">
                      <div className="w-2 h-2 rounded-full" style={{ background: m.read ? "transparent" : "#a0673a", border: m.read ? "1px solid #d4c0b0" : "none" }} />
                    </td>
                    <td className="px-4 py-4">
                      <span style={{ color: m.read ? "#8c6a4e" : "#1a1008", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: m.read ? 400 : 500 }}>{m.name}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>{m.email}</span>
                    </td>
                    <td className="px-4 py-4" style={{ maxWidth: "240px" }}>
                      <span style={{ color: m.read ? "#8c6a4e" : "#3d1e0a", fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: m.read ? 400 : 500 }}>{m.subject}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>{m.date}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{
                        background: m.read ? "rgba(107,61,30,0.06)" : "rgba(107,61,30,0.12)",
                        color: m.read ? "#c9b09a" : "#6b3d1e",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500
                      }}>
                        {m.read ? <MailOpen size={11} /> : <Mail size={11} />}
                        {m.read ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(m.id)}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color: "#c9b09a" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b3d1e"; (e.currentTarget as HTMLElement).style.background = "rgba(107,61,30,0.07)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9b09a"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-1.5 rounded-lg transition-colors"
                          style={{ color: "#c9b09a" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c0392b"; (e.currentTarget as HTMLElement).style.background = "rgba(192,57,43,0.07)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9b09a"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderTop: "1px solid rgba(107,61,30,0.07)" }}>
            <p className="text-xs" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif" }}>
              {filtered.length} message{filtered.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs" style={{ color: "#c9b09a", fontFamily: "'Inter', sans-serif" }}>
              {unreadCount} unread · {messages.length - unreadCount} read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
