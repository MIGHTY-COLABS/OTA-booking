import { SearchWidget } from "@/components/search-widget";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign } from "lucide-react";

export default async function Home() {
  const featuredPackages = await prisma.package.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">Discover Your Next Adventure</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Premium travel experiences curated just for you. Hotels, flights, and custom packages.
          </p>
          <SearchWidget />
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Featured Packages</h2>
          <Link href="/packages">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => {
            let images = [];
            try {
              images = JSON.parse(pkg.images || "[]");
            } catch (e) {
              images = [];
            }
            const image = images[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000";

            return (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="aspect-video relative">
                  <img
                    src={image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{pkg.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="mr-2 h-4 w-4" /> {pkg.destination}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2 h-4 w-4" /> {pkg.duration} Days
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{pkg.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4">
                  <div className="flex items-center font-bold text-lg text-blue-600">
                    <DollarSign className="h-4 w-4" /> {pkg.price}
                  </div>
                  <Link href={`/packages/${pkg.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
