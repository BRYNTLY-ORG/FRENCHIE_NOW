"use client";

import { useState } from "react";
import Image from "next/image";
import { frenchieTypes, calculateOffspring } from "@/lib/genetics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TriangleAlert, Percent } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

export default function BreedingPage() {
  const [sireId, setSireId] = useState(frenchieTypes[0].id);
  const [damId, setDamId] = useState(frenchieTypes[1].id);

  const sire = frenchieTypes.find(t => t.id === sireId)!;
  const dam = frenchieTypes.find(t => t.id === damId)!;

  const { isUnsafe, probabilities } = calculateOffspring(sire, dam);

  const chartData = probabilities.map(p => ({
    name: p.type.name,
    probability: p.probability,
    fill: "var(--color-primary)",
  }));

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-primary">Breeding Calculator</h1>
        <p className="text-lg text-muted-foreground">Select a Sire and Dam to predict offspring probabilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Sire Selection */}
        <Card className="border-primary/20 bg-background/50 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-blue-500">♂ Sire (Male)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 w-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200">
              <Image src={sire.imageUrl} alt={sire.name} fill className="object-cover" />
            </div>
            <select 
              className="w-full p-3 rounded-lg border-2 border-primary/20 bg-background font-semibold text-lg focus:ring-primary focus:border-primary outline-none"
              value={sireId}
              onChange={(e) => setSireId(e.target.value)}
            >
              {frenchieTypes.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.rarity})</option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Dam Selection */}
        <Card className="border-primary/20 bg-background/50 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-pink-500">♀ Dam (Female)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-48 w-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-200">
              <Image src={dam.imageUrl} alt={dam.name} fill className="object-cover" />
            </div>
            <select 
              className="w-full p-3 rounded-lg border-2 border-primary/20 bg-background font-semibold text-lg focus:ring-primary focus:border-primary outline-none"
              value={damId}
              onChange={(e) => setDamId(e.target.value)}
            >
              {frenchieTypes.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.rarity})</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {isUnsafe && (
        <Alert variant="destructive" className="mb-8 border-2">
          <TriangleAlert className="h-5 w-5" />
          <AlertTitle className="text-lg font-bold">WARNING: UNSAFE PAIRING DETECTED</AlertTitle>
          <AlertDescription className="text-base">
            Breeding two Merles together creates a 25% risk of "Double Merle" offspring, which are highly prone to severe deafness and blindness. This pairing is strongly discouraged by ethical breeding standards.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Offspring Probabilities
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" />
                <YAxis unit="%" />
                <RechartsTooltip cursor={{ fill: 'var(--color-primary)', opacity: 0.1 }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="probability" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Rarity</TableHead>
                  <TableHead className="text-right">Probability</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {probabilities.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden shrink-0">
                        <Image src={p.type.imageUrl} alt={p.type.name} fill className="object-cover" />
                      </div>
                      {p.type.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/30">{p.type.rarity}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-lg">{p.probability}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
