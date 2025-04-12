
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Button } from "@/components/ui/button";

interface StockChartProps {
  symbol: string;
  fillColor?: string;
  strokeColor?: string;
  timeframe?: string;
  chartType?: "line" | "area";
  height?: number;
}

export default function StockChart({
  symbol,
  fillColor = "#0E76FD",
  strokeColor = "#0E76FD",
  timeframe = "1D",
  chartType = "area",
  height = 300,
}: StockChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock data based on the symbol and timeframe
  useEffect(() => {
    setIsLoading(true);

    // Simulate API fetch delay
    setTimeout(() => {
      const data = generateMockData(symbol, selectedTimeframe);
      setChartData(data);
      setIsLoading(false);
    }, 500);
  }, [symbol, selectedTimeframe]);

  const timeframes = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

  // Mock data generator based on symbol name (for demo purposes)
  function generateMockData(symbol: string, timeframe: string) {
    const basePrice = symbol.charCodeAt(0) + symbol.charCodeAt(1);
    const dataPoints = getDataPointsFromTimeframe(timeframe);
    const volatility = getVolatilityFromSymbol(symbol);
    
    let currentPrice = basePrice;
    const trend = Math.random() > 0.5 ? 1 : -1;
    
    return Array(dataPoints)
      .fill(0)
      .map((_, i) => {
        const change = (Math.random() - 0.5) * volatility;
        currentPrice += change + trend * (volatility / 5);
        currentPrice = Math.max(currentPrice, basePrice * 0.5); // Prevent negative prices
        
        const time = getTimeForIndex(i, timeframe, dataPoints);
        return {
          time,
          price: parseFloat(currentPrice.toFixed(2)),
        };
      });
  }
  
  function getDataPointsFromTimeframe(timeframe: string): number {
    switch (timeframe) {
      case "1D": return 24; // hourly points
      case "1W": return 7; // daily points
      case "1M": return 30; // daily points
      case "3M": return 12; // weekly points
      case "1Y": return 12; // monthly points
      case "5Y": return 20; // quarterly points
      default: return 24;
    }
  }
  
  function getVolatilityFromSymbol(symbol: string): number {
    // Different symbols have different volatility
    const seed = symbol.charCodeAt(0) + symbol.charCodeAt(symbol.length - 1);
    return (seed % 10) + 1;
  }
  
  function getTimeForIndex(index: number, timeframe: string, totalPoints: number): string {
    const now = new Date();
    
    switch (timeframe) {
      case "1D":
        const hour = Math.floor((index / totalPoints) * 24);
        return `${hour}:00`;
      case "1W":
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayIndex = (now.getDay() - (totalPoints - index - 1)) % 7;
        return dayNames[(dayIndex + 7) % 7];
      case "1M":
        const dayOfMonth = index + 1;
        return `${dayOfMonth}`;
      case "3M":
        const weekOfQuarter = index + 1;
        return `W${weekOfQuarter}`;
      case "1Y":
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[index % 12];
      case "5Y":
        const year = now.getFullYear() - 5 + Math.floor(index / 4);
        const quarter = (index % 4) + 1;
        return `${year} Q${quarter}`;
      default:
        return index.toString();
    }
  }

  // Calculate if the stock price is up or down
  const isUp = chartData.length >= 2 && chartData[chartData.length - 1].price >= chartData[0].price;
  
  // For the gradient fill
  const gradientId = `stockGradient-${symbol}`;

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{symbol}</h3>
        <div className="flex space-x-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={selectedTimeframe === tf ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs px-2"
              onClick={() => setSelectedTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      <div style={{ height: `${height}px` }} className="w-full">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-50 rounded-md animate-pulse">
            <p className="text-gray-400">Loading chart...</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={fillColor}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={fillColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f5f5f5"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={["dataMin - 1", "dataMax + 1"]}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  orientation="right"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                  }}
                  formatter={(value: any) => [`$${value}`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isUp ? "#22C55E" : "#EF4444"}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={500}
                />
              </LineChart>
            ) : (
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={isUp ? "#22C55E" : "#EF4444"}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={isUp ? "#22C55E" : "#EF4444"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f5f5f5"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={["dataMin - 1", "dataMax + 1"]}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  orientation="right"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    borderRadius: "4px",
                  }}
                  formatter={(value: any) => [`$${value}`, "Price"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isUp ? "#22C55E" : "#EF4444"}
                  fillOpacity={1}
                  fill={`url(#${gradientId})`}
                  strokeWidth={2}
                  animationDuration={500}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Current Price</p>
          <p className="text-xl font-semibold">
            ${chartData.length > 0 ? chartData[chartData.length - 1].price.toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Change</p>
          <p
            className={`text-xl font-semibold ${
              isUp ? "price-up" : "price-down"
            }`}
          >
            {isUp ? "+" : ""}
            {chartData.length > 0
              ? (
                  ((chartData[chartData.length - 1].price - chartData[0].price) /
                    chartData[0].price) *
                  100
                ).toFixed(2)
              : "0.00"}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
