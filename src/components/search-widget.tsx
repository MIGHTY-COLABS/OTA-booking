"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Calendar as CalendarIcon, Plane } from "lucide-react";

export function SearchWidget() {
  const router = useRouter();

  const [hotelDestination, setHotelDestination] = useState("");
  const [flightFrom, setFlightFrom] = useState("");
  const [flightTo, setFlightTo] = useState("");
  const [packageDestination, setPackageDestination] = useState("");

  const searchHotels = () => {
    router.push(`/hotels/search?destination=${hotelDestination}`);
  };

  const searchFlights = () => {
    router.push(`/flights/search?from=${flightFrom}&to=${flightTo}`);
  };

  const searchPackages = () => {
    router.push(`/packages?destination=${packageDestination}`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl bg-white/95 backdrop-blur">
      <CardContent className="p-6">
        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="hotels">Hotels</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Where are you going?"
                    className="pl-10"
                    value={hotelDestination}
                    onChange={(e) => setHotelDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Check-in</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input type="date" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="invisible">Search</Label>
                <Button className="w-full" onClick={searchHotels}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flights" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Origin"
                    className="pl-10"
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <div className="relative">
                  <Plane className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Destination"
                    className="pl-10"
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="invisible">Search</Label>
                <Button className="w-full" onClick={searchFlights}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-3 space-y-2">
                <Label>Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Where do you want to explore?"
                    className="pl-10"
                    value={packageDestination}
                    onChange={(e) => setPackageDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="invisible">Search</Label>
                <Button className="w-full" onClick={searchPackages}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
