
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PortfolioStockItem {
  symbol: string;
  name: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  allocation: number;
  change: number;
  changePercent: number;
}

interface PortfolioSummaryProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  totalReturn: number;
  totalReturnPercent: number;
  stocks: PortfolioStockItem[];
}

export default function PortfolioSummary({
  totalValue,
  dailyChange,
  dailyChangePercent,
  totalReturn,
  totalReturnPercent,
  stocks,
}: PortfolioSummaryProps) {
  const isPositiveDailyChange = dailyChange >= 0;
  const isPositiveTotalReturn = totalReturn >= 0;

  // Prepare data for the pie chart
  const pieData = stocks.map((stock) => ({
    name: stock.symbol,
    value: stock.allocation,
  }));

  const COLORS = [
    "#0E76FD",
    "#25CEC8",
    "#8B5CF6",
    "#F59E0B",
    "#6C63FF",
    "#EC4899",
    "#10B981",
    "#EF4444",
    "#3B82F6",
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-100 rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Portfolio Summary</CardTitle>
        <CardDescription>Your investment performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Value */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Value</p>
              <h3 className="text-3xl font-bold">${totalValue.toFixed(2)}</h3>
              <div
                className={`flex items-center mt-1 ${
                  isPositiveDailyChange
                    ? "text-tradewise-success"
                    : "text-tradewise-danger"
                }`}
              >
                <span className="flex items-center text-sm">
                  {isPositiveDailyChange ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {isPositiveDailyChange ? "+" : ""}
                  ${dailyChange.toFixed(2)} Today (
                  {isPositiveDailyChange ? "+" : ""}
                  {dailyChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Daily Change</p>
                <p
                  className={`text-lg font-semibold ${
                    isPositiveDailyChange
                      ? "text-tradewise-success"
                      : "text-tradewise-danger"
                  }`}
                >
                  {isPositiveDailyChange ? "+" : ""}${dailyChange.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    isPositiveDailyChange
                      ? "text-tradewise-success"
                      : "text-tradewise-danger"
                  }`}
                >
                  {isPositiveDailyChange ? "+" : ""}
                  {dailyChangePercent.toFixed(2)}%
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Total Return</p>
                <p
                  className={`text-lg font-semibold ${
                    isPositiveTotalReturn
                      ? "text-tradewise-success"
                      : "text-tradewise-danger"
                  }`}
                >
                  {isPositiveTotalReturn ? "+" : ""}${totalReturn.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    isPositiveTotalReturn
                      ? "text-tradewise-success"
                      : "text-tradewise-danger"
                  }`}
                >
                  {isPositiveTotalReturn ? "+" : ""}
                  {totalReturnPercent.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Top Holdings</h4>
              <div className="space-y-2">
                {stocks.slice(0, 3).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-gray-500">{stock.shares} shares</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${stock.value.toFixed(2)}</p>
                      <p
                        className={`text-xs ${
                          stock.change >= 0
                            ? "text-tradewise-success"
                            : "text-tradewise-danger"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation Chart */}
          <div>
            <p className="text-sm text-gray-500 mb-3">Asset Allocation</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {stocks.slice(0, 6).map((stock, index) => (
                <div key={stock.symbol} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">
                    {stock.symbol} ({stock.allocation.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
