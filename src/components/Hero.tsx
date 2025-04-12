
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart3, ChevronRight, LineChart, TrendingUp } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function Hero() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-32 pb-20">
      <div className="tradewise-container">
        <div className="mx-auto max-w-3xl text-center">
          {isAuthenticated && user ? (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Welcome back,</span>
                <span className="block gradient-text mt-2">
                  {user.name}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-2xl mx-auto">
                Continue your trading journey with TradeWise. Check your dashboard for the latest updates and recommendations.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/dashboard">
                  <Button
                    size="lg"
                    className="text-base px-8 py-6"
                  >
                    Go to Dashboard
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/trading">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base px-8 py-6"
                  >
                    Start Trading
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Trade Smarter with AI</span>
                <span className="block gradient-text mt-2">
                  Powered Insights
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-2xl mx-auto">
                TradeWise combines cutting-edge AI technology with advanced trading tools to help you make better investment decisions. Get personalized recommendations based on your risk profile.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="text-base px-8 py-6"
                  onClick={() => setSignupModalOpen(true)}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6"
                  onClick={() => setLoginModalOpen(true)}
                >
                  Log In
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Graphics */}
      <div className="hidden lg:block absolute top-1/2 -left-24 transform -translate-y-1/2">
        <div className="relative h-64 w-64 opacity-20 animate-pulse-light">
          <LineChart className="h-full w-full text-tradewise-primary" strokeWidth={0.5} />
        </div>
      </div>
      <div className="hidden lg:block absolute top-1/3 -right-16 transform -translate-y-1/2">
        <div className="relative h-52 w-52 opacity-20 animate-pulse-light">
          <BarChart3 className="h-full w-full text-tradewise-secondary" strokeWidth={0.5} />
        </div>
      </div>
      <div className="hidden lg:block absolute bottom-10 left-1/4 transform -translate-x-1/2">
        <div className="relative h-36 w-36 opacity-20 animate-pulse-light">
          <TrendingUp className="h-full w-full text-tradewise-accent" strokeWidth={0.5} />
        </div>
      </div>

      {/* Modal Components */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <SignupModal open={signupModalOpen} onOpenChange={setSignupModalOpen} />
    </div>
  );
}
