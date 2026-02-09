"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

function HotelSearchResults() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/hotels?destination=${destination || ""}`);
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [destination]);

  if (loading) return <div className="container mx-auto px-4 py-12">Loading hotels...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Hotels in {destination || "Popular Destinations"}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {hotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{hotel.name}</span>
                <span className="flex items-center text-sm font-normal bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  <Star className="h-3 w-3 mr-1 fill-yellow-500" /> {hotel.rating}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="mr-2 h-4 w-4" /> {hotel.location}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((amenity: string) => (
                  <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="text-lg font-bold text-blue-600">
                ${hotel.price} <span className="text-sm text-gray-400 font-normal">/ night</span>
              </div>
              <Button>Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function HotelsSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HotelSearchResults />
    </Suspense>
  );
}
