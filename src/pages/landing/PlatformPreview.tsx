
import React from "react";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import StockChart from "@/components/StockChart";

const PlatformPreview = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="tradewise-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Trading that works for you
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our intuitive platform with real-time data and AI-powered insights.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 border-r border-gray-100 pr-6">
                <StockChart symbol="AAPL" timeframe="1M" height={400} />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">AI Recommendation</h3>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <BrainCircuit className="h-5 w-5 text-tradewise-primary mr-2 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          Based on your risk profile and market conditions, AAPL
                          shows a <span className="font-medium">strong buy</span>{" "}
                          signal. Consider adding to your portfolio.
                        </p>
                        <div className="mt-3 flex space-x-2">
                          <Button size="sm" className="text-xs">
                            Buy Now
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Add to Watchlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">Market Cap</p>
                      <p className="font-medium">$2.87T</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">P/E Ratio</p>
                      <p className="font-medium">28.4</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">52W High</p>
                      <p className="font-medium">$198.23</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">52W Low</p>
                      <p className="font-medium">$124.17</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Market Sentiment</h3>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">75%</span>
                    </div>
                    <div>
                      <p className="font-medium">Bullish</p>
                      <p className="text-xs text-gray-500">
                        Majority of analysts recommend buying
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPreview;
