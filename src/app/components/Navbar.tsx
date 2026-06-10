import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { User, LogOut, Menu, X } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { UserDropdown } from "./UserDropdown";
import {
  isLoggedIn as checkIsLoggedIn,
  loginUser,
  registerUser,
  saveToken,
  removeToken
} from "./components/utils";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const logged = checkIsLoggedIn();
    setIsLoggedIn(logged);
    if (logged) {
      setUserName(localStorage.getItem("userName") || "");
      setUserEmail(localStorage.getItem("userEmail") || "");
      setUserPhone(localStorage.getItem("userPhone") || "");
    }
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        saveToken(res.token);
        localStorage.setItem("userName", res.user.name);
        localStorage.setItem("userEmail", res.user.email);
        localStorage.setItem("userPhone", res.user.phone || "");
        setUserName(res.user.name);
        setUserEmail(res.user.email);
        setUserPhone(res.user.phone || "");
        setIsLoggedIn(true);

        // If admin, store admin token and redirect to dashboard
        if (res.user.role === "admin") {
          localStorage.setItem("adminToken", res.token);
          localStorage.setItem("adminUser", JSON.stringify(res.user));
          setIsAuthModalOpen(false);
          navigate("/admin/dashboard");
        }

        return { success: true };
      } else {
        return { success: false, message: res.message || "Invalid credentials" };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Could not connect to authentication server." };
    }
  };

  const handleSignup = async (name: string, email: string, password: string, phone: string) => {
    try {
      const res = await registerUser({ name, email, password, phone });
      if (res.token) {
        saveToken(res.token);
        localStorage.setItem("userName", res.user.name);
        localStorage.setItem("userEmail", res.user.email);
        localStorage.setItem("userPhone", res.user.phone || "");
        setUserName(res.user.name);
        setUserEmail(res.user.email);
        setUserPhone(res.user.phone || "");
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: res.message || res.errors?.join(", ") || "Failed to register" };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: "Could not connect to authentication server." };
    }
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h3 className="text-xl text-accent tracking-wider">OCEAN FRESH</h3>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative font-['Poppins'] text-sm transition-colors duration-200 ${
                isActive(item.path)
                  ? "text-accent"
                  : "text-white/90 hover:text-accent"
              }`}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              <User className="w-5 h-5 text-white" />
            </button>
            {isDropdownOpen && (
              <UserDropdown
                isLoggedIn={isLoggedIn}
                userName={userName}
                userEmail={userEmail}
                userPhone={userPhone}
                onClose={() => setIsDropdownOpen(false)}
                onLogin={() => {
                  setIsDropdownOpen(false);
                  setAuthModalMode("login");
                  setIsAuthModalOpen(true);
                }}
                onSignup={() => {
                  setIsDropdownOpen(false);
                  setAuthModalMode("signup");
                  setIsAuthModalOpen(true);
                }}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div
        className="fixed inset-0 bg-black/60 z-40 md:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )}

    {/* Mobile Menu Drawer */}
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-zinc-900/95 backdrop-blur-lg border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="pt-20 px-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`py-3 px-4 rounded-xl font-['Poppins'] text-base transition-all duration-200 ${
              isActive(item.path)
                ? "text-accent bg-accent/10 font-semibold"
                : "text-white/80 hover:text-accent hover:bg-white/5"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <div className="mt-4 pt-4 border-t border-white/10">
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 px-4 rounded-xl text-red-400 hover:bg-red-500/10 flex items-center gap-3 font-['Poppins'] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setAuthModalMode("login");
                setIsAuthModalOpen(true);
              }}
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-xl transition-colors font-['Poppins']"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>

    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      onLogin={handleLogin}
      onSignup={handleSignup}
      initialMode={authModalMode}
    />
    </>
  );
}
