'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, CalendarDays, ClockIcon } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";
    const email = localStorage.getItem("userEmail") || "";
    const phone = localStorage.getItem("userPhone") || "";

    if (name || email || phone) {
      setFormData(prev => ({
        ...prev,
        name: name,
        email: email,
        phone: phone,
      }));
    }
  }, []);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const formatted = value.replace(/[^\d\s+()-]/g, "");
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+94\s?\d{2}\s?\d{3}\s?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Sri Lankan number (e.g. +94 77 123 4567)";
    }

    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.time) newErrors.time = "Please select a time";

    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', subject: '', message: '' });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4">Get in Touch</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            We’d love to hear from you. Reach out for reservations, inquiries, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-8 md:p-12">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-4xl">✉️</span>
                  </div>
                  <h3 className="text-3xl font-medium mb-3">Thank You!</h3>
                  <p className="text-white/70 text-lg">Your message has been received. We’ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${errors.name ? "border-red-500" : "border-white/10"
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${errors.email ? "border-red-500" : "border-white/10"
                          }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={15}
                      className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-white/10"
                        }`}
                      placeholder="+94 77 123 4567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1.5">{errors.phone}</p>}
                  </div>

                  {/* Date & Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Preferred Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-white [color-scheme:dark] ${errors.date ? "border-red-500" : "border-white/10"
                          }`}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1.5">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">Preferred Time <span className="text-red-500">*</span></label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        min="18:00"
                        max="23:00"
                        className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-white [color-scheme:dark] ${errors.time ? "border-red-500" : "border-white/10"
                          }`}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1.5">{errors.time}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Subject <span className="text-red-500">*</span></label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 bg-zinc-950 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all text-white ${errors.subject ? "border-red-500" : "border-white/10"
                        }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Reservation">Table Reservation</option>
                      <option value="Private Event">Private Dining / Events</option>
                      <option value="Menu Inquiry">Menu Inquiry</option>
                      <option value="Feedback">Feedback / Compliments</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-sm mt-1.5">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-white/70 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={7}
                      className={`w-full px-6 py-4 bg-zinc-950 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y min-h-[180px] transition-all ${errors.message ? "border-red-500" : "border-white/10"
                        }`}
                      placeholder="How can we help you today?"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1.5">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold text-lg rounded-2xl transition-all duration-300 disabled:opacity-70 mt-4"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-medium mb-8">Visit Us</h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-medium">123 Ocean Drive</p>
                    <p className="text-white/60">Galle Face, Colombo 03</p>
                    <p className="text-white/60">Sri Lanka</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-medium">+94 77 555 8888</p>
                    <p className="text-white/60">Reservations & Inquiries</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-medium">hello@oceanspearl.lk</p>
                    <p className="text-white/60">General Enquiries</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-amber-400 mt-1" />
                  <div>
                    <p className="font-medium">Opening Hours</p>
                    <p className="text-white/60">Tuesday - Sunday: 6:00 PM - 11:00 PM</p>
                    <p className="text-white/60">Closed on Mondays</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-white/50 text-center lg:text-left">
              We typically respond within 2-4 hours during business hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}