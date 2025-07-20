import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Activity } from "lucide-react";

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 139 },
  { month: 'Mar', revenue: 5000, orders: 980 },
  { month: 'Apr', revenue: 2780, orders: 390 },
  { month: 'May', revenue: 1890, orders: 480 },
  { month: 'Jun', revenue: 6390, orders: 380 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: 'hsl(var(--chart-primary))' },
  { name: 'Mobile', value: 300, color: 'hsl(var(--chart-secondary))' },
  { name: 'Tablet', value: 100, color: 'hsl(var(--chart-accent))' },
];

const metrics = [
  { title: "Total Revenue", value: "$23,456", change: "+12.5%", trend: "up", icon: DollarSign },
  { title: "Active Users", value: "2,384", change: "+8.2%", trend: "up", icon: Users },
  { title: "Orders", value: "1,247", change: "-2.4%", trend: "down", icon: ShoppingCart },
  { title: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up", icon: Activity },
];

interface DataVisualizationProps {
  query: string;
}

export const DataVisualization = ({ query }: DataVisualizationProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-gradient-card border-border/20 backdrop-blur-glass hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-chart-success mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.trend === "up" ? "text-chart-success" : "text-destructive"
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="bg-gradient-card border-border/20 backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Orders Line Chart */}
        <Card className="bg-gradient-card border-border/20 backdrop-blur-glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-chart-secondary" />
              Order Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="hsl(var(--chart-secondary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-secondary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card className="bg-gradient-card border-border/20 backdrop-blur-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-chart-accent" />
            Traffic Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-card border-border/20 backdrop-blur-glass border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-sm">
                <strong>Revenue Growth:</strong> Your revenue has increased by 12.5% this month, driven primarily by mobile traffic increases.
              </p>
            </div>
            <div className="p-3 bg-chart-warning/5 rounded-lg border border-chart-warning/10">
              <p className="text-sm">
                <strong>Opportunity:</strong> Desktop conversion rates are 2.3x higher than mobile. Consider optimizing mobile UX.
              </p>
            </div>
            <div className="p-3 bg-chart-success/5 rounded-lg border border-chart-success/10">
              <p className="text-sm">
                <strong>Prediction:</strong> Based on current trends, you're on track to exceed quarterly targets by 8%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};