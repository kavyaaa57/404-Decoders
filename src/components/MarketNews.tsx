
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  time: string;
  category: string;
  url: string;
}

interface MarketNewsProps {
  news: NewsItem[];
}

export default function MarketNews({ news }: MarketNewsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Market News</CardTitle>
        <CardDescription>Latest financial news and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[460px] pr-4">
          <div className="space-y-4">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-4 rounded-lg border border-gray-100 hover:border-gray-300 transition-all hover:shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryStyle(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500">{item.source}</span>
                  </div>
                  <h3 className="font-medium mb-2 hover:text-tradewise-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function getCategoryStyle(category: string) {
  switch (category.toLowerCase()) {
    case "stocks":
      return "bg-blue-100 text-blue-800";
    case "economy":
      return "bg-green-100 text-green-800";
    case "crypto":
      return "bg-purple-100 text-purple-800";
    case "commodities":
      return "bg-yellow-100 text-yellow-800";
    case "technology":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
