import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Clock, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export default async function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pkg = await prisma.package.findUnique({
    where: { id },
  });

  if (!pkg) notFound();

  let images = [], itinerary = [], inclusions = [], exclusions = [];
  try {
    images = JSON.parse(pkg.images || "[]");
    itinerary = JSON.parse(pkg.itinerary || "[]");
    inclusions = JSON.parse(pkg.inclusions || "[]");
    exclusions = JSON.parse(pkg.exclusions || "[]");
  } catch (e) { }

  const mainImage = images[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero */}
      <div className="relative h-[500px]">
        <img src={mainImage} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{pkg.title}</h1>
            <div className="flex items-center gap-6 text-lg">
              <span className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> {pkg.destination}</span>
              <span className="flex items-center"><Clock className="mr-2 h-5 w-5" /> {pkg.duration} Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{pkg.description}</p>
          </section>

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <section className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                      Day {day.day || index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{day.title}</h3>
                      <p className="text-gray-600">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="p-6 sticky top-24">
            <div className="text-3xl font-bold text-blue-600 mb-2">${pkg.price}</div>
            <div className="text-sm text-gray-500 mb-6">per person</div>

            <Link href={`/checkout?type=PACKAGE&id=${pkg.id}`}>
              <Button size="lg" className="w-full mb-4">Book Now</Button>
            </Link>

            <div className="text-xs text-gray-500 text-center">
              Instant Confirmation • Secure Payment
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">What's Included</h3>
            <ul className="space-y-2">
              {inclusions.map((inc: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" /> {inc}
                </li>
              ))}
              {exclusions.map((exc: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                  <X className="h-4 w-4 text-red-500 mr-2 mt-0.5" /> {exc}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
