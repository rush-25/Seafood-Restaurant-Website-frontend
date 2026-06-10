import { LogOut, User, Settings, Heart, X, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router';

interface UserDropdownProps {
    isLoggedIn: boolean;
    userName?: string;
    userEmail?: string;
    userPhone?: string;
    onClose: () => void;
    onLogin: () => void;
    onSignup: () => void;
    onLogout: () => void;
}

export function UserDropdown({ isLoggedIn, userName, userEmail, userPhone, onClose, onLogin, onSignup, onLogout }: UserDropdownProps) {
    return (
        <div className="absolute right-0 mt-2 w-72 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
            <div className="px-4 py-3 border-b border-white/10">
                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-black" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="font-medium text-white truncate">{userName || "Alex Rivera"}</p>
                            {userEmail && <p className="text-xs text-white/60 truncate">{userEmail}</p>}
                            {userPhone && <p className="text-xs text-white/60 truncate">{userPhone}</p>}
                            {!userEmail && !userPhone && <p className="text-xs text-white/60 truncate">Premium Member</p>}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-2">
                        <p className="text-white font-medium">Sign in to your account</p>
                    </div>
                )}
            </div>

            <div className="py-2">
                {isLoggedIn ? (
                    <>
                        {/* <button className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3 text-white">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3 text-white">
                            <Heart className="w-4 h-4" />
                            <span>Favorites</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center gap-3 text-white">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                        </button> */}
                        {userName === "Administrator" && (
                            <Link
                                to="/admin/dashboard"
                                className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 text-amber-400"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                <span>Admin Dashboard</span>
                            </Link>
                        )}
                        <button
                            onClick={onLogout}
                            className="w-full px-4 py-3 text-left hover:bg-red-500/10 flex items-center gap-3 text-red-400"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </>
                ) : (
                    <>
                        <div className="px-4">
                            <button
                                onClick={onLogin}
                                className="w-full mt-2 bg-amber-400 hover:bg-amber-500 text-black font-medium py-3 rounded-xl transition"
                            >
                                Sign In
                            </button>
                        </div>
                        <button
                            onClick={onSignup}
                            className="w-full px-4 py-3 text-center text-white/70 hover:text-white"
                        >
                            Create Account
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white/50 hover:text-white"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );
}