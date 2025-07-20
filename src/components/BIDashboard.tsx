import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { DataVisualization } from "./DataVisualization";
import { Brain, MessageSquare, BarChart3, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  hasVisualization?: boolean;
}

export const BIDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Welcome to your AI Business Intelligence assistant! I can help you analyze your data and provide insights. What would you like to explore today?",
      isUser: false,
      timestamp: "Now",
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setCurrentQuery(message);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Based on your query "${message}", I've analyzed your data and generated comprehensive insights below. The visualizations show key trends and patterns in your business metrics.`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasVisualization: true,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      toast.success("Analysis complete! Check out your insights below.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AI Business Intelligence
            </h1>
          </div>
          <p className="text-muted-foreground">
            Ask questions about your data and get instant insights with beautiful visualizations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Panel */}
          <Card className="lg:col-span-1 bg-gradient-card border-border/20 backdrop-blur-glass flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5 text-primary" />
                Ask Questions
              </CardTitle>
              <Separator className="bg-border/30" />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 p-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex items-center justify-center py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Analyzing your data...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <ChatInput onSend={handleSendMessage} disabled={isLoading} />
            </CardContent>
          </Card>

          {/* Visualization Panel */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-gradient-card border-border/20 backdrop-blur-glass">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-chart-primary" />
                  Data Insights & Visualizations
                </CardTitle>
                <Separator className="bg-border/30" />
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  {messages.some(m => m.hasVisualization) ? (
                    <DataVisualization query={currentQuery} />
                  ) : (
                    <div className="flex items-center justify-center h-full text-center">
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 inline-block">
                          <BarChart3 className="h-12 w-12 text-primary mx-auto mb-2" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                          <p className="text-muted-foreground max-w-md">
                            Ask a question about your business data to see beautiful visualizations and AI-powered insights appear here.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};