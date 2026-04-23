"use client";

import { typeMarketData, marketTrendData, rarityDistribution } from "@/lib/market-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Legend
} from "recharts";
import { TrendingUp, Info } from "lucide-react";

export default function MarketPage() {
  const priceData = typeMarketData
    .map(d => ({
      name: d.type.name,
      min: d.market.priceRange[0],
      max: d.market.priceRange[1],
      avg: (d.market.priceRange[0] + d.market.priceRange[1]) / 2,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10); // Top 10 for visibility

  const demandSupplyData = typeMarketData.map(d => ({
    name: d.type.name,
    demand: d.market.demandScore,
    supply: d.market.supplyScore,
    rarity: d.type.rarity,
  }));

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-primary">Market Insights</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Data-driven analysis of the French Bulldog market. Track pricing, demand, supply, and rarity distributions to make informed decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Trend Line Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Market Trends (2020 - 2025)</CardTitle>
            <CardDescription>Average price and sales volume across all types.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" tickFormatter={(val) => `$${val/1000}k`} />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip formatter={(value, name) => [name === 'price' ? `$${value}` : value, name === 'price' ? 'Avg Price' : 'Volume']} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="price" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="volume" stroke="var(--color-secondary-foreground)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Horizontal Bar Chart: Price Ranges */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Top 10 Valuations by Type</CardTitle>
            <CardDescription>Average market value for premium variations.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={priceData} margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                <XAxis type="number" tickFormatter={(val) => `$${val/1000}k`} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} />
                <RechartsTooltip formatter={(value) => `$${(value as number).toLocaleString()}`} />
                <Bar dataKey="avg" name="Average Price" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scatter Chart: Demand vs Supply */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Demand vs. Supply Analysis</CardTitle>
            <CardDescription>Identifying underserved and saturated markets.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="supply" name="Supply Score" domain={[0, 100]} label={{ value: 'Supply (Higher = More Common)', position: 'insideBottom', offset: -10 }} />
                <YAxis type="number" dataKey="demand" name="Demand Score" domain={[0, 100]} label={{ value: 'Demand (Higher = More Desired)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Frenchies" data={demandSupplyData} fill="var(--color-primary)">
                  {demandSupplyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart: Rarity Distribution */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Rarity Distribution</CardTitle>
            <CardDescription>Market share of overall population by rarity tier.</CardDescription>
          </CardHeader>
          <CardContent className="h-80 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rarityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {rarityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Breeding Tips */}
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Insights & Breeding Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">The "Fluffy" Premium</h4>
              <p className="text-muted-foreground text-sm">Long-haired frenchies (carrying two copies of L4) command up to a 300% premium over their short-haired equivalents due to extremely low supply and skyrocketing demand.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Color Dilution Shifts</h4>
              <p className="text-muted-foreground text-sm">Standard "Blue" has moved from Exotic to Rare/Uncommon status as supply caught up. True "Isabella" (Testable Chocolate + Blue) remains the dominant high-ticket solid color.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold">Ethical Breeding Premium</h4>
              <p className="text-muted-foreground text-sm">Buyers are increasingly willing to pay higher prices for health-cleared dogs. Fad colors without proper OFA testing are seeing a sharp decline in hold scores.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
