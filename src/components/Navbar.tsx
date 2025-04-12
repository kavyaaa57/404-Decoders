
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  Bell,
  ChevronDown,
  Menu,
  User,
  X,
} from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import NotificationCenter from "./NotificationCenter";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="tradewise-container py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BarChart3 className="h-7 w-7 text-tradewise-primary" />
            <span className="font-bold text-xl text-slate-800">
              Trade<span className="text-tradewise-primary">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium hover:text-tradewise-primary transition-colors ${
                  isActive("/") ? "text-tradewise-primary" : "text-gray-600"
                }`}
              >
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium hover:text-tradewise-primary transition-colors ${
                      isActive("/dashboard") ? "text-tradewise-primary" : "text-gray-600"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/trading"
                    className={`text-sm font-medium hover:text-tradewise-primary transition-colors ${
                      isActive("/trading") ? "text-tradewise-primary" : "text-gray-600"
                    }`}
                  >
                    Trading
                  </Link>
                  <Link
                    to="/history"
                    className={`text-sm font-medium hover:text-tradewise-primary transition-colors ${
                      isActive("/history") ? "text-tradewise-primary" : "text-gray-600"
                    }`}
                  >
                    History
                  </Link>
                </>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notification Bell */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-tradewise-danger"></span>
                  </Button>
                  {notificationsOpen && (
                    <NotificationCenter onClose={() => setNotificationsOpen(false)} />
                  )}
                </div>

                {/* User Menu */}
                <div className="relative group">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2"
                  >
                    <span className="text-sm font-medium">
                      Hi, {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Log In
                </Button>
                <Button
                  onClick={() => setSignupModalOpen(true)}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 pt-4 animate-fade-in">
            <Link
              to="/"
              className="block py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/trading"
                  className="block py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trading
                </Link>
                <Link
                  to="/history"
                  className="block py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  History
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-base font-medium text-gray-900 hover:text-tradewise-primary"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="pt-2 space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setSignupModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <SignupModal open={signupModalOpen} onOpenChange={setSignupModalOpen} />
    </nav>
  );
}
