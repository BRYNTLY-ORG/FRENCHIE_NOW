import Image from "next/image";
import Link from "next/link";
import { frenchieTypes } from "@/lib/genetics";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dna, Activity, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-primary">
          Discover the Genetics of Frenchies
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our interactive database of 18 distinct French Bulldog variations. Understand their DNA, health traits, and rarity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {frenchieTypes.map((dog) => (
          <Card key={dog.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/20">
            <div className="relative h-64 w-full bg-primary/5">
              <Image 
                src={dog.imageUrl} 
                alt={dog.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur font-bold border-primary/20">
                  {dog.rarity}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{dog.name}</CardTitle>
              <CardDescription className="line-clamp-2 h-10">{dog.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <Activity className="h-4 w-4 text-rose-500" />
                <span className="line-clamp-1">{dog.healthNotes}</span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button asChild className="w-full group-hover:bg-primary" variant="outline">
                <Link href={`/dna?type=${dog.id}`}>
                  <Dna className="mr-2 h-4 w-4" />
                  View DNA
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
