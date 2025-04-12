
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import AIAssistant from "@/components/AIAssistant";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingState from "./landing/LoadingState";
import PlatformPreview from "./landing/PlatformPreview";
import PricingSection from "./landing/PricingSection";
import CtaSection from "./landing/CtaSection";

export default function Index() {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading state or null while checking authentication
  if (isLoading) {
    return <LoadingState />;
  }

  // Don't render anything if authenticated (prevents flickering)
  if (isAuthenticated) {
    return null;
  }

  // Return the full landing page for non-authenticated users
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Platform Preview Section */}
      <PlatformPreview />

      {/* Pricing Section */}
      <PricingSection onSignupClick={() => setSignupModalOpen(true)} />

      {/* CTA Section */}
      <CtaSection onSignupClick={() => setSignupModalOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}
