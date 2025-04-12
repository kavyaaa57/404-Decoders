import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  ChevronsUpDown,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import StockChart from "@/components/StockChart";
import StockCard from "@/components/StockCard";
import PortfolioSummary from "@/components/PortfolioSummary";
import MarketNews from "@/components/MarketNews";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AIAssistant from "@/components/AIAssistant";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Mock data for stocks
  const [recommendedStocks] = useState([
    {
      symbol: "AAPL",
      name: "Apple Inc",
      price: 178.72,
      change: 2.35,
      changePercent: 1.33,
      recommendation: "buy" as const,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 337.91,
      change: 1.95,
      changePercent: 0.58,
      recommendation: "buy" as const,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc",
      price: 139.80,
      change: -0.83,
      changePercent: -0.59,
      recommendation: "hold" as const,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc",
      price: 134.30,
      change: -1.52,
      changePercent: -1.12,
      recommendation: "buy" as const,
    },
  ]);

  // Portfolio mock data
  const [portfolioData] = useState({
    totalValue: 25789.43,
    dailyChange: 423.12,
    dailyChangePercent: 1.67,
    totalReturn: 3421.76,
    totalReturnPercent: 15.3,
    stocks: [
      {
        symbol: "AAPL",
        name: "Apple Inc",
        shares: 10,
        avgPrice: 150.60,
        currentPrice: 178.72,
        value: 1787.20,
        allocation: 20.5,
        change: 28.12,
        changePercent: 18.67,
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 5,
        avgPrice: 320.45,
        currentPrice: 337.91,
        value: 1689.55,
        allocation: 18.2,
        change: 17.46,
        changePercent: 5.45,
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc",
        shares: 4,
        avgPrice: 220.30,
        currentPrice: 242.50,
        value: 970.00,
        allocation: 14.8,
        change: 22.20,
        changePercent: 10.08,
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc",
        shares: 7,
        avgPrice: 130.25,
        currentPrice: 134.30,
        value: 940.10,
        allocation: 13.5,
        change: 4.05,
        changePercent: 3.11,
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        shares: 3,
        avgPrice: 380.90,
        currentPrice: 436.75,
        value: 1310.25,
        allocation: 12.2,
        change: 55.85,
        changePercent: 14.66,
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc",
        shares: 8,
        avgPrice: 135.40,
        currentPrice: 139.80,
        value: 1118.40,
        allocation: 10.8,
        change: 4.40,
        changePercent: 3.25,
      },
      {
        symbol: "META",
        name: "Meta Platforms Inc",
        shares: 6,
        avgPrice: 290.75,
        currentPrice: 313.20,
        value: 1879.20,
        allocation: 10.0,
        change: 22.45,
        changePercent: 7.72,
      },
    ],
  });

  // Market news mock data
  const [marketNews] = useState([
    {
      id: "1",
      title: "Federal Reserve signals potential rate cuts in the coming months",
      source: "Financial Times",
      date: "Apr 12, 2025",
      time: "10:32 AM",
      category: "Economy",
      url: "#",
    },
    {
      id: "2",
      title: "Apple unveils new AI features for iPhone and Mac lineup",
      source: "Tech Today",
      date: "Apr 12, 2025",
      time: "9:15 AM",
      category: "Technology",
      url: "#",
    },
    {
      id: "3",
      title: "Oil prices surge amid Middle East tensions",
      source: "Market Watch",
      date: "Apr 12, 2025",
      time: "8:45 AM",
      category: "Commodities",
      url: "#",
    },
    {
      id: "4",
      title: "Bitcoin breaks $100,000 barrier for the first time",
      source: "Crypto Daily",
      date: "Apr 11, 2025",
      time: "4:20 PM",
      category: "Crypto",
      url: "#",
    },
    {
      id: "5",
      title: "Tesla announces new affordable EV model starting at $25,000",
      source: "Auto News",
      date: "Apr 11, 2025",
      time: "2:30 PM",
      category: "Stocks",
      url: "#",
    },
    {
      id: "6",
      title: "Amazon acquires AI startup for $2.5 billion",
      source: "Business Insider",
      date: "Apr 11, 2025",
      time: "11:15 AM",
      category: "Stocks",
      url: "#",
    },
    {
      id: "7",
      title: "U.S. job growth exceeds expectations in March",
      source: "Economic Times",
      date: "Apr 10, 2025",
      time: "9:30 AM",
      category: "Economy",
      url: "#",
    },
    {
      id: "8",
      title: "Microsoft launches new AI-powered productivity tools",
      source: "Tech Crunch",
      date: "Apr 10, 2025",
      time: "8:00 AM",
      category: "Technology",
      url: "#",
    },
  ]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="tradewise-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex mt-4 lg:mt-0 space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
              <Input
                placeholder="Search stocks..."
                className="pl-9 h-9 w-[150px] lg:w-[200px]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Portfolio Summary */}
            <PortfolioSummary
              totalValue={portfolioData.totalValue}
              dailyChange={portfolioData.dailyChange}
              dailyChangePercent={portfolioData.dailyChangePercent}
              totalReturn={portfolioData.totalReturn}
              totalReturnPercent={portfolioData.totalReturnPercent}
              stocks={portfolioData.stocks}
            />

            {/* Market Overview */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="stocks" className="w-full">
                  <div className="px-6">
                    <TabsList className="w-full">
                      <TabsTrigger value="stocks" className="flex-1">
                        Stocks
                      </TabsTrigger>
                      <TabsTrigger value="indices" className="flex-1">
                        Indices
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="flex-1">
                        Crypto
                      </TabsTrigger>
                      <TabsTrigger value="forex" className="flex-1">
                        Forex
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="stocks" className="p-6 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">
                          Major Stocks
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs"
                        >
                          <ChevronsUpDown className="h-3 w-3 mr-1" />
                          Sort
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs px-2"
                      >
                        View All
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <StockCard
                        symbol="AAPL"
                        name="Apple Inc."
                        price={178.72}
                        change={2.35}
                        changePercent={1.33}
                      />
                      <StockCard
                        symbol="MSFT"
                        name="Microsoft Corp."
                        price={337.91}
                        change={1.95}
                        changePercent={0.58}
                      />
                      <StockCard
                        symbol="GOOGL"
                        name="Alphabet Inc."
                        price={139.80}
                        change={-0.83}
                        changePercent={-0.59}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="indices">
                    <div className="p-6 text-center text-gray-500">
                      Indices data will appear here.
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto">
                    <div className="p-6 text-center text-gray-500">
                      Cryptocurrency data will appear here.
                    </div>
                  </TabsContent>

                  <TabsContent value="forex">
                    <div className="p-6 text-center text-gray-500">
                      Forex data will appear here.
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedStocks.map((stock) => (
                    <StockCard
                      key={stock.symbol}
                      symbol={stock.symbol}
                      name={stock.name}
                      price={stock.price}
                      change={stock.change}
                      changePercent={stock.changePercent}
                      recommendation={stock.recommendation}
                    />
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-white p-2 rounded-full shadow">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Market Alert</h4>
                      <p className="text-sm mt-1">
                        Consider diversifying your portfolio by adding exposure to the
                        energy sector as oil prices are expected to rise in the
                        coming weeks.
                      </p>
                      <div className="mt-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="text-xs"
                        >
                          View Recommendations
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Chart */}
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">Market Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <StockChart symbol="SPY" timeframe="1M" />
              </CardContent>
            </Card>

            {/* News */}
            <MarketNews news={marketNews} />
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant minimized />
    </div>
  );
}
