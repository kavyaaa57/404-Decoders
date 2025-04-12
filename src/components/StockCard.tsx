
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  recommendation?: "buy" | "sell" | "hold";
}

export default function StockCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  recommendation,
}: StockCardProps) {
  const isPositiveChange = change >= 0;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{symbol}</CardTitle>
            <p className="text-sm text-gray-500 max-w-[180px] truncate">
              {name}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-3 pt-0">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
            <div
              className={`flex items-center ${
                isPositiveChange ? "text-tradewise-success" : "text-tradewise-danger"
              }`}
            >
              <span className="flex items-center text-sm font-medium">
                {isPositiveChange ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {isPositiveChange ? "+" : ""}
                {change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          {recommendation && (
            <div
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                recommendation === "buy"
                  ? "bg-green-100 text-green-800"
                  : recommendation === "sell"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {recommendation.toUpperCase()}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3">
        <Link to={`/trading?symbol=${symbol}`} className="w-full">
          <Button variant="outline" className="w-full text-sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
