
import React from "react";
import { ArrowRight, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

type CtaSectionProps = {
  onSignupClick: () => void;
};

const CtaSection = ({ onSignupClick }: CtaSectionProps) => {
  return (
    <section className="py-16 sm:py-24 bg-tradewise-primary text-white">
      <div className="tradewise-container">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to transform your trading?
            </h2>
            <p className="mt-3 text-lg">
              Join thousands of traders who are already using TradeWise to make smarter investment decisions.
            </p>
            <div className="mt-8 flex gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-tradewise-primary hover:bg-gray-100"
                onClick={onSignupClick}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:shrink-0 lg:grow-0 lg:basis-1/3">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8" />
                <h3 className="text-xl font-semibold">Our Guarantee</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                  <span>30-day money-back guarantee</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                  <span>Cancel anytime with no fees</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                  <span>Dedicated support team</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                  <span>Continuous platform updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
