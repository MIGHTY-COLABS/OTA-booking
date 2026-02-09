import { NextResponse } from "next/server";

const MOCK_HOTELS = [
  {
    id: "h1",
    name: "Grand Luxo Plaza",
    location: "Paris, France",
    price: 350,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    amenities: ["WiFi", "Pool", "Spa", "Gym"],
    description: "Experience luxury in the heart of Paris with stunning views of the Eiffel Tower.",
  },
  {
    id: "h2",
    name: "Seaside Paradise Resort",
    location: "Maldives",
    price: 850,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1439066615861-d1fb8ea5388e?auto=format&fit=crop&q=80&w=1000",
    amenities: ["Private Beach", "Overwater Villa", "All Inclusive"],
    description: "Ultimate relaxation in your private overwater villa.",
  },
  {
    id: "h3",
    name: "Urban Retreat",
    location: "New York, USA",
    price: 450,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1000",
    amenities: ["Rooftop Bar", "Gym", "City View"],
    description: "Modern luxury in the heart of Manhattan.",
  },
  {
    id: "h4",
    name: "Alpine Lodge",
    location: "Zermatt, Switzerland",
    price: 600,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1000",
    amenities: ["Ski-in/Ski-out", "Spa", "Fireplace"],
    description: "Cozy alpine charm with Matterhorn views.",
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");

  let results = MOCK_HOTELS;
  if (destination) {
    results = results.filter(h => h.location.toLowerCase().includes(destination.toLowerCase()));
  }

  return NextResponse.json(results);
}
