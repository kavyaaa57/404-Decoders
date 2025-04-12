
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BrainCircuit,
  ChevronDown,
  MinusCircle,
  SendIcon,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

interface AIAssistantProps {
  minimized?: boolean;
}

export default function AIAssistant({ minimized = false }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(!minimized);
  const [isFullsize, setIsFullsize] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi! I'm your AI Trading Assistant. I can help you with market analysis, trading recommendations, and answer your questions about stocks.",
      isUser: false,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      isUser: true,
    };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate AI response (would connect to a real AI service in production)
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        stock: "Based on your risk profile and market analysis, I recommend looking at technology and healthcare sectors. Specific stocks like AAPL, MSFT, and JNJ could be good additions to your portfolio.",
        market: "The market is showing some volatility due to recent economic data. However, tech stocks are still performing well overall.",
        portfolio: "Your portfolio is currently balanced with a good mix of growth and value stocks. Consider increasing your exposure to renewable energy stocks for long-term growth.",
        risk: "Based on your trading history, your risk profile appears to be moderate. You could consider increasing your exposure to growth stocks slightly.",
        help: "I can help with market analysis, stock recommendations, portfolio evaluation, and answering questions about trading strategies. Just let me know what you need!",
      };

      const lowercaseMsg = message.toLowerCase();
      let botReply = "I'm sorry, I didn't understand that query. Could you please rephrase or ask about stocks, market conditions, portfolio advice, or risk assessment?";

      for (const [keyword, response] of Object.entries(botResponses)) {
        if (lowercaseMsg.includes(keyword)) {
          botReply = response;
          break;
        }
      }

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: botReply,
        isUser: false,
      };
      setChatHistory((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col bg-white rounded-lg shadow-xl transition-all duration-300 ease-in-out",
        isOpen ? "w-80" : "w-auto",
        isFullsize ? "w-96 h-[80vh] bottom-4 right-4" : "max-h-[500px]"
      )}
    >
      {/* Chat header */}
      <div
        className={cn(
          "flex items-center justify-between p-3 bg-tradewise-primary text-white rounded-t-lg cursor-pointer",
          !isOpen && "rounded-lg"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <BrainCircuit className="h-5 w-5" />
          <span className="font-medium">AI Trading Assistant</span>
        </div>
        <div className="flex space-x-1">
          {isOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullsize(!isFullsize);
              }}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4 transform rotate-180" />
            )}
          </Button>
        </div>
      </div>

      {/* Chat body */}
      {isOpen && (
        <>
          <div
            className={cn(
              "flex-1 p-4 overflow-y-auto space-y-4",
              isFullsize ? "max-h-[calc(80vh-120px)]" : "max-h-[340px]"
            )}
          >
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.isUser
                      ? "bg-tradewise-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t flex items-center space-x-2"
          >
            <Input
              placeholder="Ask about stocks, market, or trading..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
