import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const suggestedQueries = [
    "Show me last quarter's sales performance",
    "What are the top performing products?",
    "Analyze customer acquisition trends",
    "Compare revenue by region"
  ];

  return (
    <div className="space-y-3">
      {/* Suggested Queries */}
      <div className="flex flex-wrap gap-2">
        {suggestedQueries.map((query, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs bg-card/50 border-border/30 hover:bg-primary/10 hover:border-primary/30"
            onClick={() => !disabled && onSend(query)}
            disabled={disabled}
          >
            {query}
          </Button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about your data..."
            disabled={disabled}
            className="pr-20 bg-card/50 border-border/30 focus:border-primary/50 focus:bg-card"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-primary/10"
              disabled={disabled}
            >
              <Paperclip className="h-3 w-3" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-primary/10"
              disabled={disabled}
            >
              <Mic className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          size="sm"
          disabled={!message.trim() || disabled}
          className="bg-gradient-primary hover:opacity-90 shadow-glow"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};