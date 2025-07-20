import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-secondary"}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`p-3 ${
          isUser 
            ? 'bg-gradient-primary border-primary/20' 
            : 'bg-card border-border/20 backdrop-blur-glass'
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </Card>
        <span className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  );
};