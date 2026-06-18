'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  CalendarDays,
  MessageSquare,
  Users,
  Clock,
  LogOut,
  ShieldCheck,
  RefreshCw,
  Mail,
  Phone,
  CalendarCheck,
  LayoutDashboard,
  Lock,
  Trash2,
  Send,
  CheckCircle2,
  Reply,
  Edit,
  X,
} from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

const API_BASE = `${API_BASE_URL}/api/admin`;

function getAdminToken() {
  return localStorage.getItem('adminToken');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAdminToken()}`,
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin');
    }
  }, [navigate]);

  // Fetch all data
  const fetchData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setIsLoading(true);

    try {
      const [statsRes, resRes, conRes, usersRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers: authHeaders() }),
        fetch(`${API_BASE}/reservations`, { headers: authHeaders() }),
        fetch(`${API_BASE}/contacts`, { headers: authHeaders() }),
        fetch(`${API_BASE}/users`, { headers: authHeaders() }),
      ]);

      const statsData = await statsRes.json();
      const resData = await resRes.json();
      const conData = await conRes.json();
      const usersData = await usersRes.json();

      if (statsData.success) setStats(statsData.data);
      if (resData.success) setReservations(resData.data);
      if (conData.success) setContacts(conData.data);
      if (usersData.success) setUsers(usersData.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (getAdminToken()) {
      fetchData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u._id !== userId));
      } else {
        alert("Failed to delete user: " + data.message);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('An error occurred while deleting the user.');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE}/users/${editingUser._id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(editFormData),
      });

      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        // This happens if the server returns HTML (e.g., 404 or 502 page) instead of JSON
        alert(`Server returned an invalid response (${res.status} ${res.statusText}). It might still be deploying.`);
        return;
      }

      if (data.success) {
        setUsers(users.map(u => u._id === editingUser._id ? data.data : u));
        setEditingUser(null);
      } else {
        alert("Failed to update user: " + data.message);
      }
    } catch (err) {
      console.error('Error updating user:', err);
      alert('An error occurred while communicating with the server.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm("Are you sure you want to delete this reservation? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`${API_BASE}/reservations/${reservationId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data.success) {
        setReservations(reservations.filter(r => r._id !== reservationId));
      } else {
        alert("Failed to delete reservation: " + data.message);
      }
    } catch (err) {
      console.error('Error deleting reservation:', err);
      alert('An error occurred while deleting the reservation.');
    }
  };

  const handleSendReply = async (contactId) => {
    if (!replyText.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch(`${API_BASE}/contacts/${contactId}/reply`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ reply: replyText }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map(c => c._id === contactId ? data.data : c));
        setReplyingId(null);
        setReplyText('');
      } else {
        alert('Failed to send reply: ' + data.message);
      }
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('An error occurred while sending the reply.');
    } finally {
      setSendingReply(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-white/50 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-white/40">Ocean Fresh Restaurant</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/50 hover:text-white"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-1.5 mb-8 w-fit">
          {[
            { key: 'overview', label: 'Overview', icon: LayoutDashboard },
            { key: 'users', label: 'Users', icon: Users },
            { key: 'reservations', label: 'Reservations', icon: CalendarDays },
            { key: 'messages', label: 'Messages', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: 'Total Reservations',
                  value: stats?.totalReservations ?? 0,
                  icon: CalendarDays,
                  gradient: 'from-blue-500 to-cyan-500',
                  bgGlow: 'bg-blue-500/10',
                },
                {
                  label: 'Total Messages',
                  value: stats?.totalContacts ?? 0,
                  icon: MessageSquare,
                  gradient: 'from-purple-500 to-pink-500',
                  bgGlow: 'bg-purple-500/10',
                },
                {
                  label: "Today's Reservations",
                  value: stats?.todayReservations ?? 0,
                  icon: CalendarCheck,
                  gradient: 'from-amber-400 to-orange-500',
                  bgGlow: 'bg-amber-500/10',
                },
                {
                  label: "Today's Messages",
                  value: stats?.todayContacts ?? 0,
                  icon: Clock,
                  gradient: 'from-emerald-400 to-teal-500',
                  bgGlow: 'bg-emerald-500/10',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${card.bgGlow} flex items-center justify-center`}>
                      <card.icon className={`w-5 h-5 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`} style={{ color: card.gradient.includes('blue') ? '#3b82f6' : card.gradient.includes('purple') ? '#a855f7' : card.gradient.includes('amber') ? '#f59e0b' : '#34d399' }} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                  <p className="text-sm text-white/40 mt-1">{card.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Reservations */}
              <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-amber-400" />
                  Recent Reservations
                </h3>
                {reservations.length === 0 ? (
                  <p className="text-white/30 text-sm py-8 text-center">No reservations yet</p>
                ) : (
                  <div className="space-y-3">
                    {reservations.slice(0, 5).map((r) => (
                      <div key={r._id} className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{r.name}</span>
                          <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg">
                            {r.guests} guests
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" /> {r.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {r.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Messages */}
              <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  Recent Messages
                </h3>
                {contacts.length === 0 ? (
                  <p className="text-white/30 text-sm py-8 text-center">No messages yet</p>
                ) : (
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map((c) => (
                      <div key={c._id} className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{c.name}</span>
                          <span className="text-xs text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded-lg">
                            {c.subject}
                          </span>
                        </div>
                        <p className="text-xs text-white/40 line-clamp-2">{c.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-amber-400" />
                All Reservations
                <span className="text-sm text-white/30 font-normal ml-2">({reservations.length})</span>
              </h2>
            </div>

            {reservations.length === 0 ? (
              <div className="py-16 text-center">
                <CalendarDays className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30">No reservations found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Name</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Contact</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Date</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Time</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Guests</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Special Requests</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Submitted</th>
                      <th className="text-right px-6 py-4 text-white/40 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-medium">{r.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-white/50">
                              <Mail className="w-3 h-3" />
                              <span className="text-xs">{r.email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-white/50">
                              <Phone className="w-3 h-3" />
                              <span className="text-xs">{r.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/70">{r.date}</td>
                        <td className="px-6 py-4 text-white/70">{r.time}</td>
                        <td className="px-6 py-4">
                          <span className="bg-amber-400/10 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-medium">
                            {r.guests}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/40 max-w-[200px] truncate">
                          {r.specialRequests || '—'}
                        </td>
                        <td className="px-6 py-4 text-white/30 text-xs whitespace-nowrap">
                          {formatDate(r.createdAt)}
                          <br />
                          {formatTime(r.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteReservation(r._id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                            title="Delete Reservation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                Contact Messages
                <span className="text-sm text-white/30 font-normal ml-2">({contacts.length})</span>
              </h2>
            </div>

            {contacts.length === 0 ? (
              <div className="py-16 text-center">
                <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30">No messages found</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {contacts.map((c) => (
                  <div key={c._id} className="p-6 hover:bg-white/[0.02] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="font-medium text-base">{c.name}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {c.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {c.phone}
                          </span>
                          {c.date && (
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" /> {c.date}
                            </span>
                          )}
                          {c.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {c.time}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-purple-400 bg-purple-400/10 px-3 py-1 rounded-lg font-medium">
                          {c.subject}
                        </span>
                        <span className="text-xs text-white/25">
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4">
                      <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                    </div>

                    {c.reply && (
                      <div className="mt-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2 text-xs text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Replied {c.repliedAt ? `on ${formatDate(c.repliedAt)}` : ''}
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">{c.reply}</p>
                      </div>
                    )}

                    {replyingId === c._id ? (
                      <div className="mt-3 space-y-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          rows={4}
                          className="w-full bg-zinc-950/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50 resize-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSendReply(c._id)}
                            disabled={sendingReply || !replyText.trim()}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <Send className="w-4 h-4" />
                            {sendingReply ? 'Sending...' : 'Send Reply'}
                          </button>
                          <button
                            onClick={() => { setReplyingId(null); setReplyText(''); }}
                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <button
                          onClick={() => { setReplyingId(c._id); setReplyText(''); }}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                          {c.reply ? 'Reply Again' : 'Reply'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Registered Users
                <span className="text-sm text-white/30 font-normal ml-2">({users.length})</span>
              </h2>
            </div>

            {users.length === 0 ? (
              <div className="py-16 text-center">
                <Users className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30">No registered users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-4 text-white/40 font-medium">#</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Full Name</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Email Address</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Phone Number</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Password (Hashed)</th>
                      <th className="text-left px-6 py-4 text-white/40 font-medium">Joined On</th>
                      <th className="text-right px-6 py-4 text-white/40 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => (
                      <tr key={u._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 text-white/30 text-xs">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                              {u.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-white/50">
                            <Mail className="w-3 h-3" />
                            <span className="text-xs">{u.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {u.phone ? (
                            <div className="flex items-center gap-1.5 text-white/50">
                              <Phone className="w-3 h-3" />
                              <span className="text-xs">{u.phone}</span>
                            </div>
                          ) : (
                            <span className="text-white/20 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-white/40">
                            <Lock className="w-3 h-3 flex-shrink-0" />
                            <span className="text-xs font-mono max-w-[180px] truncate" title={u.password}>
                              {u.password}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/30 text-xs whitespace-nowrap">
                          {formatDate(u.createdAt)}
                          <br />
                          {formatTime(u.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingUser(u);
                                setEditFormData({ name: u.name, email: u.email, phone: u.phone || '', password: '' });
                              }}
                              className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center py-8 px-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingUser(null)}
          ></div>
          <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/50">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-400" />
                Edit User
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400/50 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400/50 text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400/50 text-white placeholder:text-white/30"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">New Password</label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl focus:outline-none focus:border-amber-400/50 text-white placeholder:text-white/30"
                  placeholder="Leave blank to keep current password"
                />
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-black text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
