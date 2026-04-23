"use client";

import Image from "next/image";
import { typeMarketData } from "@/lib/market-data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function RecommendPage() {
  const sortedData = [...typeMarketData].sort((a, b) => {
    const maxA = Math.max(a.market.buyScore, a.market.holdScore, a.market.breedScore, a.market.flipScore);
    const maxB = Math.max(b.market.buyScore, b.market.holdScore, b.market.breedScore, b.market.flipScore);
    return maxB - maxA;
  });

  const topRecommendations = sortedData.slice(0, 5);

  const radarData = topRecommendations.map(d => ({
    subject: d.type.name,
    A: d.market.buyScore,
    B: d.market.holdScore,
    C: d.market.breedScore,
    D: d.market.flipScore,
    fullMark: 100,
  }));

  const comparisonData = sortedData.map(d => ({
    name: d.type.name,
    Buy: d.market.buyScore,
    Hold: d.market.holdScore,
    Breed: d.market.breedScore,
    Flip: d.market.flipScore,
  }));

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-primary">Investment Recommendations</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our proprietary scoring engine analyzes market demand, supply scarcity, and genetic rarity to provide actionable insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Radar Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Top 5 Profiles Radar</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid opacity={0.3} />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} opacity={0.5} />
                <Radar name="Buy Score" dataKey="A" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                <Radar name="Flip Score" dataKey="D" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Score Comparison Bar Chart */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Action Scores Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData.slice(0, 8)} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 100]} />
                <Tooltip cursor={{fill: 'var(--color-muted)'}} />
                <Legend verticalAlign="top" />
                <Bar dataKey="Buy" stackId="a" fill="var(--color-chart-1)" />
                <Bar dataKey="Hold" stackId="a" fill="var(--color-chart-3)" />
                <Bar dataKey="Breed" stackId="a" fill="var(--color-chart-4)" />
                <Bar dataKey="Flip" stackId="a" fill="var(--color-chart-5)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-3xl font-bold mb-6 mt-12 text-center text-primary">Ranked Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((d, i) => (
          <Card key={d.type.id} className="border-primary/20 hover:border-primary transition-colors">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <Badge variant={d.market.recommendation === "Buy" ? "default" : "secondary"} className="text-sm">
                  #{i + 1} • {d.market.recommendation}
                </Badge>
                <span className="text-sm font-semibold text-muted-foreground">{d.type.rarity}</span>
              </div>
              <CardTitle className="text-xl">{d.type.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                <Image src={d.type.imageUrl} alt={d.type.name} fill className="object-cover" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Buy Score</span>
                    <span className="font-bold">{d.market.buyScore}/100</span>
                  </div>
                  <Progress value={d.market.buyScore} className="h-2 bg-primary/20 [&>div]:bg-primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hold Score</span>
                    <span className="font-bold">{d.market.holdScore}/100</span>
                  </div>
                  <Progress value={d.market.holdScore} className="h-2 bg-chart-3/20 [&>div]:bg-chart-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Flip Score</span>
                    <span className="font-bold">{d.market.flipScore}/100</span>
                  </div>
                  <Progress value={d.market.flipScore} className="h-2 bg-chart-5/20 [&>div]:bg-chart-5" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 border-t pt-4">
              <div className="w-full flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Est. Value</span>
                <span className="font-bold text-lg text-primary">
                  ${(d.market.priceRange[0]/1000).toFixed(1)}k - ${(d.market.priceRange[1]/1000).toFixed(1)}k
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
