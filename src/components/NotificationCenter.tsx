
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ChevronDown, X } from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "price" | "news";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  onClose: () => void;
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Mock notifications for the demo
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "alert",
      title: "Portfolio Alert",
      message: "Your portfolio value increased by 5% today!",
      time: "Just now",
      read: false,
    },
    {
      id: "2",
      type: "price",
      title: "Price Movement",
      message: "AAPL stock has increased by 3.2% in the last hour.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "news",
      title: "Market News",
      message: "Federal Reserve announces new interest rate policies.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "alert",
      title: "AI Recommendation",
      message: "Consider adding TSLA to your portfolio based on your risk profile.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute top-12 right-0 w-80 sm:w-96 bg-white rounded-md shadow-lg z-50 animate-fade-in">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-tradewise-primary" />
          <h3 className="font-medium text-base">Notifications</h3>
          {unreadCount > 0 && (
            <span className="ml-2 bg-tradewise-primary text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-3">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="alert" className="flex-1">Alerts</TabsTrigger>
            <TabsTrigger value="price" className="flex-1">Prices</TabsTrigger>
            <TabsTrigger value="news" className="flex-1">News</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="max-h-80 overflow-y-auto pt-2">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b last:border-b-0 hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-xs">
          Mark all as read
        </Button>
        <Button variant="link" size="sm" className="text-xs flex items-center">
          See all
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
}
