"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { frenchieTypes } from "@/lib/genetics";
import { DNADiagram } from "@/components/DNADiagram";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, HeartPulse } from "lucide-react";

export default function DNAPage() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTypes = useMemo(() => {
    return frenchieTypes.filter((t) => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const defaultDog = initialType ? frenchieTypes.find((t) => t.id === initialType) : filteredTypes[0];
  const selectedDog = filteredTypes.includes(defaultDog as any) ? defaultDog : filteredTypes[0];

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-primary">DNA Visualizer</h1>
        <p className="text-lg text-muted-foreground">Search and inspect the genotype of different French Bulldogs.</p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search for a type (e.g. Merle, Fluffy)..." 
          className="pl-10 h-12 text-lg border-primary/50 focus-visible:ring-primary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {selectedDog ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Card className="overflow-hidden border-primary/20 sticky top-24">
              <div className="relative h-72 w-full bg-primary/5">
                <Image 
                  src={selectedDog.imageUrl} 
                  alt={selectedDog.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-3xl font-bold">{selectedDog.name}</CardTitle>
                  <Badge variant="default" className="text-sm bg-primary">{selectedDog.rarity}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{selectedDog.description}</p>
                <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-lg border border-rose-200 dark:border-rose-900/50 flex gap-3 items-start">
                  <HeartPulse className="h-5 w-5 text-rose-500 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-1">Health Notes</h4>
                    <p className="text-sm text-rose-600/90 dark:text-rose-300/90">{selectedDog.healthNotes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-2/3">
            <Card className="border-primary/20 bg-background/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <span className="bg-primary/10 text-primary p-2 rounded-lg">🧬</span> 
                  Genotype Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DNADiagram genotype={selectedDog.genotype} />
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">No Frenchie types found matching your search.</p>
        </div>
      )}
    </div>
  );
}
