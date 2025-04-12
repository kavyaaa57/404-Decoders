
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Printer,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import AIAssistant from "@/components/AIAssistant";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Transaction {
  id: string;
  date: string;
  symbol: string;
  type: "buy" | "sell";
  price: number;
  quantity: number;
  total: number;
  status: "completed" | "pending" | "failed";
}

export default function History() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Portfolio performance data (mock)
  const [performanceData] = useState([
    { date: "Jan", value: 10000 },
    { date: "Feb", value: 10400 },
    { date: "Mar", value: 9800 },
    { date: "Apr", value: 12000 },
    { date: "May", value: 12600 },
    { date: "Jun", value: 13100 },
    { date: "Jul", value: 14000 },
    { date: "Aug", value: 13500 },
    { date: "Sep", value: 14200 },
    { date: "Oct", value: 15000 },
    { date: "Nov", value: 16200 },
    { date: "Dec", value: 17000 },
    { date: "Jan", value: 18500 },
    { date: "Feb", value: 19800 },
    { date: "Mar", value: 20500 },
    { date: "Apr", value: 25789.43 },
  ]);

  // Transaction history (mock)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "TR-12345",
      date: "Apr 12, 2025",
      symbol: "AAPL",
      type: "buy",
      price: 178.72,
      quantity: 10,
      total: 1787.20,
      status: "completed",
    },
    {
      id: "TR-12344",
      date: "Apr 10, 2025",
      symbol: "MSFT",
      type: "buy",
      price: 337.91,
      quantity: 5,
      total: 1689.55,
      status: "completed",
    },
    {
      id: "TR-12343",
      date: "Apr 05, 2025",
      symbol: "TSLA",
      type: "buy",
      price: 242.50,
      quantity: 4,
      total: 970.00,
      status: "completed",
    },
    {
      id: "TR-12342",
      date: "Mar 28, 2025",
      symbol: "GOOGL",
      type: "buy",
      price: 139.80,
      quantity: 8,
      total: 1118.40,
      status: "completed",
    },
    {
      id: "TR-12341",
      date: "Mar 22, 2025",
      symbol: "NVDA",
      type: "sell",
      price: 436.75,
      quantity: 2,
      total: 873.50,
      status: "completed",
    },
    {
      id: "TR-12340",
      date: "Mar 15, 2025",
      symbol: "AMZN",
      type: "buy",
      price: 134.30,
      quantity: 7,
      total: 940.10,
      status: "completed",
    },
    {
      id: "TR-12339",
      date: "Mar 10, 2025",
      symbol: "META",
      type: "buy",
      price: 313.20,
      quantity: 6,
      total: 1879.20,
      status: "completed",
    },
    {
      id: "TR-12338",
      date: "Mar 02, 2025",
      symbol: "NVDA",
      type: "buy",
      price: 380.90,
      quantity: 5,
      total: 1904.50,
      status: "completed",
    },
    {
      id: "TR-12337",
      date: "Feb 24, 2025",
      symbol: "TSLA",
      type: "sell",
      price: 220.30,
      quantity: 3,
      total: 660.90,
      status: "completed",
    },
    {
      id: "TR-12336",
      date: "Feb 18, 2025",
      symbol: "AAPL",
      type: "buy",
      price: 150.60,
      quantity: 5,
      total: 753.00,
      status: "completed",
    },
  ]);

  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredTransactions(transactions);
    } else if (filterType === "buy") {
      setFilteredTransactions(transactions.filter(t => t.type === "buy"));
    } else if (filterType === "sell") {
      setFilteredTransactions(transactions.filter(t => t.type === "sell"));
    }
  }, [filterType, transactions]);

  const handleExportCSV = () => {
    // Mock function to export data as CSV
    const element = document.createElement("a");
    const csvData = [
      "ID,Date,Symbol,Type,Price,Quantity,Total,Status",
      ...filteredTransactions.map(t => 
        `${t.id},${t.date},${t.symbol},${t.type},${t.price},${t.quantity},${t.total},${t.status}`
      )
    ].join("\n");
    
    const file = new Blob([csvData], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "transaction_history.csv";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="tradewise-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <h1 className="text-3xl font-bold">Trading History</h1>
          <div className="flex mt-4 lg:mt-0 space-x-2">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="w-full">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                      Record of your past trades and transactions
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterType("all")}
                      className={filterType === "all" ? "bg-gray-100" : ""}
                    >
                      All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterType("buy")}
                      className={filterType === "buy" ? "bg-gray-100" : ""}
                    >
                      Buy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilterType("sell")}
                      className={filterType === "sell" ? "bg-gray-100" : ""}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {transaction.date}
                          </TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                transaction.type === "buy"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.type.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            ${transaction.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {transaction.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${transaction.total.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                transaction.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : transaction.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.status.charAt(0).toUpperCase() +
                                transaction.status.slice(1)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>
                  Track your investment growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#0E76FD"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#0E76FD"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                      />
                      <Tooltip
                        formatter={(value: any) =>
                          [`$${value.toLocaleString()}`, "Portfolio Value"]
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0E76FD"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Initial Investment</span>
                    <span className="font-medium">$10,000.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Value</span>
                    <span className="font-medium">$25,789.43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Return</span>
                    <span className="font-medium text-tradewise-success">+$15,789.43 (157.89%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Trading Summary</CardTitle>
                <CardDescription>
                  Overview of your trading activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Total Trades</span>
                      <BarChart3 className="h-4 w-4 text-tradewise-primary" />
                    </div>
                    <p className="text-xl font-bold">{transactions.length}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Profit/Loss</span>
                      <BarChart3 className="h-4 w-4 text-tradewise-success" />
                    </div>
                    <p className="text-xl font-bold text-tradewise-success">+$3,421.76</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Buy Orders</span>
                      <BarChart3 className="h-4 w-4 text-tradewise-primary" />
                    </div>
                    <p className="text-xl font-bold">{transactions.filter(t => t.type === "buy").length}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">Sell Orders</span>
                      <BarChart3 className="h-4 w-4 text-tradewise-primary" />
                    </div>
                    <p className="text-xl font-bold">{transactions.filter(t => t.type === "sell").length}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium mb-2">Tax Information</h3>
                  <p className="text-sm">
                    Your estimated capital gains tax for the current year is $854.44. Remember to consult with a tax professional for accurate advice.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-tradewise-primary text-sm mt-2">
                    Download Tax Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant minimized />
    </div>
  );
}
