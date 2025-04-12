
import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type PricingSectionProps = {
  onSignupClick: () => void;
};

const PricingSection = ({ onSignupClick }: PricingSectionProps) => {
  return (
    <section className="py-16 sm:py-24">
      <div className="tradewise-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Transparent pricing for everyone
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you, with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Basic</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Perfect for beginners looking to get started.
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Basic market data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Limited AI recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Portfolio tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Basic charts</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6">
                Get Started Free
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl border border-tradewise-primary shadow-md relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <div className="bg-tradewise-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            </div>
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Pro</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                For active traders who need advanced features.
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Real-time market data</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Personalized AI recommendations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced portfolio analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Advanced technical indicators</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Priority customer support</span>
                </li>
              </ul>
              <Button className="w-full mt-6" onClick={onSignupClick}>
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold">Enterprise</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-gray-500 ml-1">/month</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                For professional traders and institutions.
              </p>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Pro plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Custom trading algorithms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">API access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-tradewise-success mr-2 shrink-0 mt-0.5" />
                  <span className="text-sm">White-glove onboarding</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-6">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
