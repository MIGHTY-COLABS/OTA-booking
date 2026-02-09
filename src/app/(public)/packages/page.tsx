import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign } from "lucide-react";

export default async function PackagesListPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Packages</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pkg) => {
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
    </div>
  );
}
