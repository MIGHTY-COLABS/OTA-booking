import { NextResponse } from "next/server";

const MOCK_FLIGHTS = [
  {
    id: "f1",
    airline: "LuxoAir",
    flightNumber: "LX101",
    from: "New York (JFK)",
    to: "London (LHR)",
    departure: "10:00 AM",
    arrival: "10:00 PM",
    duration: "7h 0m",
    price: 650,
    stops: 0,
    logo: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "f2",
    airline: "GlobalWings",
    flightNumber: "GW505",
    from: "New York (JFK)",
    to: "Paris (CDG)",
    departure: "06:00 PM",
    arrival: "07:00 AM (+1)",
    duration: "8h 0m",
    price: 550,
    stops: 0,
    logo: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "f3",
    airline: "Emirates Connect",
    flightNumber: "EC202",
    from: "Dubai (DXB)",
    to: "London (LHR)",
    departure: "08:00 AM",
    arrival: "12:30 PM",
    duration: "7h 30m",
    price: 450,
    stops: 0,
    logo: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "f4",
    airline: "Asia Pacific",
    flightNumber: "AP999",
    from: "Tokyo (NRT)",
    to: "Los Angeles (LAX)",
    departure: "05:00 PM",
    arrival: "11:00 AM",
    duration: "10h 0m",
    price: 900,
    stops: 0,
    logo: "https://images.unsplash.com/photo-1542296332-2e44a996aa0d?auto=format&fit=crop&q=80&w=200",
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let results = MOCK_FLIGHTS;
  if (from) results = results.filter(f => f.from.toLowerCase().includes(from.toLowerCase()));
  if (to) results = results.filter(f => f.to.toLowerCase().includes(to.toLowerCase()));

  return NextResponse.json(results);
}
