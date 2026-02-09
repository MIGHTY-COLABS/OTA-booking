"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Clock, ArrowRight } from "lucide-react";

function FlightSearchResults() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/flights?from=${from || ""}&to=${to || ""}`);
        const data = await res.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to]);

  if (loading) return <div className="container mx-auto px-4 py-12">Loading flights...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Flights from {from || "Anywhere"} to {to || "Anywhere"}
      </h1>

      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="overflow-hidden bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center gap-8 text-center">
                  <div>
                    <div className="font-bold text-xl">{flight.departure}</div>
                    <div className="text-sm text-gray-500">{flight.from}</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">{flight.duration}</div>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                    <div className="text-xs text-green-600 mt-1">{flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop`}</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">{flight.arrival}</div>
                    <div className="text-sm text-gray-500">{flight.to}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-600">${flight.price}</div>
                  <Button className="w-full">Select</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function FlightsSearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightSearchResults />
    </Suspense>
  );
}
