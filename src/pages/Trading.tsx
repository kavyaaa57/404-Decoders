
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Copy,
  Lightbulb,
  Loader2,
  Search,
  Share2,
  Star,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import StockChart from "@/components/StockChart";
import AIAssistant from "@/components/AIAssistant";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: string;
  marketCap: string;
  pe: number;
  dividend: number;
  sector: string;
  yearHigh: number;
  yearLow: number;
  analystRating: string;
}

export default function Trading() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const symbolParam = searchParams.get("symbol") || "AAPL";
  const { toast } = useToast();

  const [selectedStock, setSelectedStock] = useState<string>(symbolParam);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("1D");
  const [quantity, setQuantity] = useState<number>(1);
  const [orderType, setOrderType] = useState<string>("market");
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Fetch stock data when symbol changes
  useEffect(() => {
    setIsLoading(true);
    // Mock API call to get stock data
    setTimeout(() => {
      const mockData: { [key: string]: StockData } = {
        AAPL: {
          symbol: "AAPL",
          name: "Apple Inc.",
          price: 178.72,
          change: 2.35,
          changePercent: 1.33,
          open: 177.23,
          high: 179.82,
          low: 176.45,
          volume: "52.3M",
          marketCap: "$2.87T",
          pe: 28.4,
          dividend: 0.58,
          sector: "Technology",
          yearHigh: 198.23,
          yearLow: 124.17,
          analystRating: "Strong Buy",
        },
        MSFT: {
          symbol: "MSFT",
          name: "Microsoft Corporation",
          price: 337.91,
          change: 1.95,
          changePercent: 0.58,
          open: 336.84,
          high: 339.27,
          low: 335.62,
          volume: "18.7M",
          marketCap: "$2.51T",
          pe: 32.6,
          dividend: 0.75,
          sector: "Technology",
          yearHigh: 366.78,
          yearLow: 274.37,
          analystRating: "Strong Buy",
        },
        GOOGL: {
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          price: 139.80,
          change: -0.83,
          changePercent: -0.59,
          open: 140.51,
          high: 141.20,
          low: 138.95,
          volume: "23.1M",
          marketCap: "$1.76T",
          pe: 24.2,
          dividend: 0,
          sector: "Technology",
          yearHigh: 153.78,
          yearLow: 102.63,
          analystRating: "Buy",
        },
        TSLA: {
          symbol: "TSLA",
          name: "Tesla, Inc.",
          price: 242.50,
          change: 5.76,
          changePercent: 2.43,
          open: 238.45,
          high: 244.32,
          low: 237.24,
          volume: "91.2M",
          marketCap: "$775.9B",
          pe: 62.8,
          dividend: 0,
          sector: "Automotive",
          yearHigh: 299.29,
          yearLow: 138.80,
          analystRating: "Hold",
        },
        AMZN: {
          symbol: "AMZN",
          name: "Amazon.com, Inc.",
          price: 134.30,
          change: -1.52,
          changePercent: -1.12,
          open: 135.73,
          high: 136.65,
          low: 133.89,
          volume: "32.6M",
          marketCap: "$1.38T",
          pe: 42.7,
          dividend: 0,
          sector: "Consumer Cyclical",
          yearHigh: 145.86,
          yearLow: 88.12,
          analystRating: "Buy",
        },
      };

      setStockData(
        mockData[selectedStock] || mockData["AAPL"]
      );
      setIsLoading(false);
    }, 1000);
  }, [selectedStock]);

  const handleStockSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const symbol = formData.get("stockSymbol") as string;
    if (symbol) {
      setSelectedStock(symbol.toUpperCase());
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleBuy = () => {
    if (!stockData) return;
    
    setIsProcessingOrder(true);
    
    // Mock API call to process the buy order
    setTimeout(() => {
      toast({
        title: "Order Successful",
        description: `You have successfully purchased ${quantity} shares of ${stockData.symbol} at $${stockData.price.toFixed(2)}.`,
      });
      setIsProcessingOrder(false);
    }, 1500);
  };

  const handleSell = () => {
    if (!stockData) return;
    
    setIsProcessingOrder(true);
    
    // Mock API call to process the sell order
    setTimeout(() => {
      toast({
        title: "Order Successful",
        description: `You have successfully sold ${quantity} shares of ${stockData.symbol} at $${stockData.price.toFixed(2)}.`,
      });
      setIsProcessingOrder(false);
    }, 1500);
  };

  const calculateTotal = () => {
    if (!stockData) return 0;
    return stockData.price * quantity;
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="tradewise-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-3xl font-bold">Trading</h1>
          <form onSubmit={handleStockSearch} className="flex w-full lg:w-auto mt-4 lg:mt-0">
            <div className="relative flex-1 lg:w-64">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
              <Input
                name="stockSymbol"
                placeholder="Search stock symbol (e.g. AAPL)"
                className="pl-9"
              />
            </div>
            <Button type="submit" className="ml-2">
              Search
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-tradewise-primary" />
          </div>
        ) : stockData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stock Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <CardTitle className="text-2xl">
                          {stockData.symbol}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-8 w-8 p-0"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="text-base font-normal mt-1">
                        {stockData.name}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-3xl font-bold">
                        ${stockData.price.toFixed(2)}
                      </p>
                      <div
                        className={`flex items-center ${
                          stockData.change >= 0
                            ? "text-tradewise-success"
                            : "text-tradewise-danger"
                        }`}
                      >
                        <span className="flex items-center text-sm font-medium">
                          {stockData.change >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {stockData.change >= 0 ? "+" : ""}
                          {stockData.change.toFixed(2)} (
                          {stockData.change >= 0 ? "+" : ""}
                          {stockData.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        stockData.analystRating === "Strong Buy"
                          ? "bg-green-100 text-green-800"
                          : stockData.analystRating === "Buy"
                          ? "bg-emerald-100 text-emerald-800"
                          : stockData.analystRating === "Hold"
                          ? "bg-yellow-100 text-yellow-800"
                          : stockData.analystRating === "Sell"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {stockData.analystRating}
                    </div>
                  </div>

                  <StockChart
                    symbol={stockData.symbol}
                    timeframe={selectedTimeframe}
                    height={350}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    <div>
                      <p className="text-sm text-gray-500">Open</p>
                      <p className="font-medium">${stockData.open.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">High</p>
                      <p className="font-medium">${stockData.high.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Low</p>
                      <p className="font-medium">${stockData.low.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Volume</p>
                      <p className="font-medium">{stockData.volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">P/E Ratio</p>
                      <p className="font-medium">{stockData.pe.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dividend Yield</p>
                      <p className="font-medium">
                        {stockData.dividend.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">52W High</p>
                      <p className="font-medium">
                        ${stockData.yearHigh.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">52W Low</p>
                      <p className="font-medium">
                        ${stockData.yearLow.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-2 rounded-full shadow">
                        <BrainCircuit className="h-5 w-5 text-tradewise-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">AI Analysis</h4>
                        <p className="text-sm mt-1">
                          {stockData.symbol} shows strong potential based on recent quarterly results and industry trends. The company's innovative product lineup and expanding market share contribute to a positive outlook. Consider adding to your portfolio as a long-term investment.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Panel */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trade {stockData.symbol}</CardTitle>
                  <CardDescription>
                    Execute buy or sell orders for this stock
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 mb-4">
                      <TabsTrigger value="buy">Buy</TabsTrigger>
                      <TabsTrigger value="sell">Sell</TabsTrigger>
                    </TabsList>
                    <TabsContent value="buy" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order-type">Order Type</Label>
                        <Select
                          value={orderType}
                          onValueChange={setOrderType}
                        >
                          <SelectTrigger id="order-type">
                            <SelectValue placeholder="Market Order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm">Estimated Total</span>
                        <span className="font-medium">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <Button
                        className="w-full bg-tradewise-success hover:bg-tradewise-success/90 mt-2"
                        onClick={handleBuy}
                        disabled={isProcessingOrder}
                      >
                        {isProcessingOrder ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Buy Now"
                        )}
                      </Button>
                    </TabsContent>

                    <TabsContent value="sell" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity-sell">Quantity</Label>
                        <Input
                          id="quantity-sell"
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="order-type-sell">Order Type</Label>
                        <Select
                          value={orderType}
                          onValueChange={setOrderType}
                        >
                          <SelectTrigger id="order-type-sell">
                            <SelectValue placeholder="Market Order" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="market">Market Order</SelectItem>
                            <SelectItem value="limit">Limit Order</SelectItem>
                            <SelectItem value="stop">Stop Order</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm">Estimated Total</span>
                        <span className="font-medium">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        className="w-full mt-2"
                        onClick={handleSell}
                        disabled={isProcessingOrder}
                      >
                        {isProcessingOrder ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Sell Now"
                        )}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">AI Recommendations</CardTitle>
                    <Lightbulb className="h-4 w-4 text-tradewise-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                    <p className="text-sm">
                      <span className="font-medium">Buy Strategy:</span> Consider dollar-cost averaging by investing smaller amounts over time.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                    <p className="text-sm">
                      <span className="font-medium">Risk Management:</span> This stock represents 15% of your portfolio, consider diversifying.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                    <p className="text-sm">
                      <span className="font-medium">Pattern Alert:</span> Recent price consolidation may indicate a breakout soon.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Price Alerts</p>
                      <p className="text-xs text-gray-500">Notify me of significant price changes</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Add to Watchlist</p>
                      <p className="text-xs text-gray-500">Track this stock in your watchlist</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">News Notifications</p>
                      <p className="text-xs text-gray-500">Get updates about this company</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold mb-2">Stock Not Found</h3>
            <p className="text-gray-600">
              We couldn't find the stock you're looking for. Please check the symbol and try again.
            </p>
          </div>
        )}
      </div>

      {/* AI Assistant */}
      <AIAssistant minimized />
    </div>
  );
}
