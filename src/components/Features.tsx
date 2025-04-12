
import {
  BarChart3,
  BrainCircuit,
  Shield,
  TrendingUp,
  Users,
  LineChart,
} from "lucide-react";

const features = [
  {
    name: "AI-Powered Insights",
    description:
      "Leverage advanced machine learning algorithms to analyze market trends and make data-driven investment decisions.",
    icon: BrainCircuit,
  },
  {
    name: "Real-Time Market Data",
    description:
      "Access live stock market data, including price movements, volume analysis, and technical indicators.",
    icon: TrendingUp,
  },
  {
    name: "Risk Management",
    description:
      "Set your risk preferences and receive personalized recommendations that align with your investment goals.",
    icon: Shield,
  },
  {
    name: "Advanced Charting",
    description:
      "Visualize stock performance with interactive charts showing various timeframes and technical indicators.",
    icon: LineChart,
  },
  {
    name: "Portfolio Tracking",
    description:
      "Monitor your investments in real-time with comprehensive portfolio analytics and performance metrics.",
    icon: BarChart3,
  },
  {
    name: "Community Insights",
    description:
      "Learn from experienced traders and share strategies with a growing community of investors.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="tradewise-container">
        <div className="lg:text-center mb-16">
          <h2 className="text-base font-semibold text-tradewise-primary tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for smarter trading
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Our platform combines cutting-edge technology with user-friendly
            tools to help you make better investment decisions.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative p-6 bg-white rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200"
              >
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-tradewise-primary bg-opacity-10 text-tradewise-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
