import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    onSignup: (name: string, email: string, password: string, phone: string) => Promise<{ success: boolean; message?: string }>;
    initialMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, onLogin, onSignup, initialMode }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lock body scroll and set mode when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if (initialMode) {
                setMode(initialMode);
            }
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, initialMode]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        if (mode === "signup") {
            if (formData.name.trim().length < 2) {
                newErrors.name = "Name must be at least 2 characters long.";
            }
            if (formData.phone && !/^\+?[0-9\s\-]{7,15}$/.test(formData.phone)) {
                newErrors.phone = "Please enter a valid phone number.";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            let res;
            if (mode === "login") {
                res = await onLogin(formData.email, formData.password);
            } else {
                res = await onSignup(formData.name, formData.email, formData.password, formData.phone);
            }

            if (res && res.success) {
                setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
                setErrors({});
                onClose();
            } else {
                setSubmitError(res?.message || "An authentication error occurred.");
            }
        } catch (err) {
            console.error(err);
            setSubmitError("Failed to connect to authentication server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: "",
            });
        }
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
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center py-8 px-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-md max-h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2
                                        className="text-3xl font-bold text-white mb-2"
                                        style={{ fontFamily: "'Cinzel', serif" }}
                                    >
                                        {mode === "login" ? "Welcome Back" : "Join Ocean Fresh"}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {mode === "login"
                                            ? "Sign in to your account"
                                            : "Create your account to get started"}
                                    </p>
                                </div>

                                {/* Tab Switcher */}
                                <div className="flex gap-2 mb-6 bg-background rounded-lg p-1">
                                    <button
                                        onClick={() => setMode("login")}
                                        className={`flex-1 py-2 px-4 rounded-md font-['Montserrat'] font-semibold transition-all ${mode === "login"
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-white"
                                            }`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setMode("signup")}
                                        className={`flex-1 py-2 px-4 rounded-md font-['Montserrat'] font-semibold transition-all ${mode === "signup"
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-white"
                                            }`}
                                    >
                                        Sign Up
                                    </button>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {submitError && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center font-medium">
                                            {submitError}
                                        </div>
                                    )}

                                    {mode === "signup" && (
                                        <>
                                            <div>
                                                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${errors.name ? "border-red-500" : "border-border"
                                                        }`}
                                                    placeholder="John Doe"
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                                                    Phone Number (Optional)
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${errors.phone ? "border-red-500" : "border-border"
                                                        }`}
                                                    placeholder="+94 77 123 4567"
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${errors.email ? "border-red-500" : "border-border"
                                                }`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm text-muted-foreground mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${errors.password ? "border-red-500" : "border-border"
                                                }`}
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>

                                    {mode === "signup" && (
                                        <div>
                                            <label
                                                htmlFor="confirmPassword"
                                                className="block text-sm text-muted-foreground mb-2"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 bg-input-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white ${errors.confirmPassword ? "border-red-500" : "border-border"
                                                    }`}
                                                placeholder="••••••••"
                                            />
                                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                    )}

                                    {mode === "login" && (
                                        <div className="text-right">
                                            <button
                                                type="button"
                                                className="text-sm text-accent hover:text-accent/80 transition-colors"
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-['Montserrat'] font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            mode === "login" ? "Sign In" : "Create Account"
                                        )}
                                    </button>
                                </form>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            />
                                            <path
                                                fill="currentColor"
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            />
                                        </svg>
                                        <span className="text-sm font-['Montserrat'] font-medium">Google</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center justify-center gap-2 py-3 px-4 bg-background border border-border rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span className="text-sm font-['Montserrat'] font-medium">Facebook</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
