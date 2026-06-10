'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess?: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Login successful! (Backend integration ready)");
            onLoginSuccess?.();
            onClose();
        }, 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[110] py-8 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-zinc-900 border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="relative p-8 pb-4">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                        <span className="text-3xl">🐚</span>
                                    </div>
                                    <h2 className="text-3xl font-serif text-white">Sign in to your account</h2>
                                    <p className="text-white/60 mt-2">Welcome back to Ocean's Pearl</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="text-amber-400 hover:text-amber-500 text-sm mt-2 float-right"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Sign In Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-semibold text-lg rounded-2xl transition-all disabled:opacity-70 mt-4"
                                >
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </button>

                                {/* Divider */}
                                <div className="relative flex items-center py-2">
                                    <div className="flex-1 h-px bg-white/10"></div>
                                    <span className="px-4 text-white/50 text-sm">Or continue with</span>
                                    <div className="flex-1 h-px bg-white/10"></div>
                                </div>

                                {/* Social Logins */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-colors"
                                    >
                                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                                        <span className="text-white text-sm font-medium">Google</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-colors"
                                    >
                                        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                                        <span className="text-white text-sm font-medium">Facebook</span>
                                    </button>
                                </div>

                                {/* Create Account */}
                                <p className="text-center text-white/60 text-sm mt-6">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => alert("Create Account flow coming soon!")}
                                        className="text-amber-400 hover:text-amber-500 font-medium"
                                    >
                                        Create Account
                                    </button>
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}