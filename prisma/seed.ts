import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@luxoglobal.com" },
    update: {},
    create: {
      email: "admin@luxoglobal.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log({ admin });

  // Create Demo User
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Demo Traveler",
      password: userPassword,
      role: "USER",
    },
  });
  console.log({ user });

  // Create Packages
  const packages = [
    {
      title: "Majestic Swiss Alps",
      description: "Experience the breathtaking beauty of Switzerland with this 7-day tour. Visit Zurich, Lucerne, Interlaken, and the iconic Matterhorn. Enjoy scenic train rides, chocolate tasting, and alpine adventures.",
      destination: "Switzerland",
      price: 2499,
      duration: 7,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1527668752968-14a708a304d3?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1533038590840-1cde6b418979?auto=format&fit=crop&q=80&w=1000"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Zurich", description: "Arrive at Zurich Airport and transfer to your hotel. Evening leisure walk around Lake Zurich." },
        { day: 2, title: "Zurich to Lucerne", description: "Travel to Lucerne. Visit the Chapel Bridge and Lion Monument. Boat cruise on Lake Lucerne." },
        { day: 3, title: "Mount Pilatus Excursion", description: "Take the steepest cogwheel railway in the world to the top of Mount Pilatus." },
        { day: 4, title: "Interlaken & Jungfraujoch", description: "Journey to Interlaken. Optional excursion to Jungfraujoch - Top of Europe." },
        { day: 5, title: "Zermatt & Matterhorn", description: "Train to Zermatt. View the majestic Matterhorn mountain." },
        { day: 6, title: "Glacier Express", description: "Experience the world's slowest express train with panoramic views." },
        { day: 7, title: "Departure", description: "Transfer to Geneva or Zurich airport for your flight home." }
      ]),
      inclusions: JSON.stringify(["4-Star Accommodation", "Daily Breakfast", "Swiss Travel Pass", "Airport Transfers"]),
      exclusions: JSON.stringify(["International Flights", "Lunch & Dinner", "Personal Expenses", "Travel Insurance"]),
      activities: JSON.stringify(["Hiking", "Sightseeing", "Train Rides", "Chocolate Tasting"]),
    },
    {
      title: "Bali Island Paradise",
      description: "Immerse yourself in the tropical paradise of Bali. Explore ancient temples, lush rice terraces, and pristine beaches. Rejuvenate with a traditional Balinese massage and enjoy sunset dinners.",
      destination: "Bali, Indonesia",
      price: 1299,
      duration: 6,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&q=80&w=1000"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Denpasar", description: "Welcome to Bali! Transfer to your resort in Ubud." },
        { day: 2, title: "Ubud Cultural Tour", description: "Visit the Sacred Monkey Forest, Ubud Palace, and Tegalalang Rice Terrace." },
        { day: 3, title: "Kintamani Volcano", description: "Full day tour to Kintamani with views of Mount Batur and its crater lake." },
        { day: 4, title: "Transfer to Seminyak", description: "Head to the coast. Relax on the beach and enjoy the vibrant nightlife." },
        { day: 5, title: "Nusa Penida Day Trip", description: "Speedboat to Nusa Penida island. Visit Kelingking Beach and Angel's Billabong." },
        { day: 6, title: "Departure", description: "Last minute shopping before transfer to the airport." }
      ]),
      inclusions: JSON.stringify(["Resort Accommodation", "Daily Breakfast", "Private Driver", "Entrance Fees"]),
      exclusions: JSON.stringify(["Flights", "Visa Fees", "Tipping"]),
      activities: JSON.stringify(["Snorkeling", "Temple Visits", "Spa", "Beach"]),
    },
    {
      title: "Dubai Luxury Escape",
      description: "Discover the glitz and glamour of Dubai. Visit the Burj Khalifa, go on a desert safari, and shop at the world's largest mall. A perfect blend of modern architecture and traditional Arabian culture.",
      destination: "Dubai, UAE",
      price: 1899,
      duration: 5,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=1000"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival & Dhow Cruise", description: "Arrive in Dubai. Evening Dhow Cruise with dinner on Dubai Creek." },
        { day: 2, title: "Dubai City Tour", description: "Visit Dubai Museum, Jumeirah Mosque, and photo stop at Burj Al Arab." },
        { day: 3, title: "Desert Safari", description: "Thrilling dune bashing, camel ride, and BBQ dinner with belly dancing show." },
        { day: 4, title: "Burj Khalifa & Shopping", description: "Visit the observation deck of Burj Khalifa. Free time at Dubai Mall." },
        { day: 5, title: "Departure", description: "Transfer to DXB airport." }
      ]),
      inclusions: JSON.stringify(["5-Star Hotel", "Daily Breakfast", "Desert Safari", "Burj Khalifa Ticket"]),
      exclusions: JSON.stringify(["Flights", "Tourism Dirham Fee", "Personal Expenses"]),
      activities: JSON.stringify(["Desert Safari", "Shopping", "Sightseeing", "Cruise"]),
    },
    {
      title: "Tokyo & Kyoto Highlights",
      description: "A 8-day journey through Japan's past and present. Experience the neon lights of Tokyo and the ancient temples of Kyoto. Ride the Shinkansen bullet train.",
      destination: "Japan",
      price: 2899,
      duration: 8,
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?auto=format&fit=crop&q=80&w=1000"
      ]),
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Tokyo", description: "Transfer to hotel in Shinjuku." },
        { day: 2, title: "Tokyo City Tour", description: "Visit Asakusa Senso-ji Temple, Meiji Shrine, and Shibuya Crossing." },
        { day: 3, title: "Mount Fuji Day Trip", description: "Bus tour to Mt. Fuji 5th Station and Lake Kawaguchi." },
        { day: 4, title: "Bullet Train to Kyoto", description: "Experience the Shinkansen. Afternoon visit to Fushimi Inari Shrine." },
        { day: 5, title: "Kyoto Temples", description: "Kinkaku-ji (Golden Pavilion) and Arashiyama Bamboo Grove." },
        { day: 6, title: "Day Trip to Nara", description: "See the giant Buddha and feed the bowing deer in Nara Park." },
        { day: 7, title: "Return to Tokyo", description: "Bullet train back to Tokyo. Free evening in Akihabara." },
        { day: 8, title: "Departure", description: "Transfer to Narita/Haneda airport." }
      ]),
      inclusions: JSON.stringify(["Hotels", "Japan Rail Pass", "WiFi Router", "Breakfast"]),
      exclusions: JSON.stringify(["Flights", "Lunch & Dinner", "Subway Tickets"]),
      activities: JSON.stringify(["Culture", "Food", "History", "Nature"]),
    }
  ];

  for (const pkg of packages) {
    const p = await prisma.package.create({
      data: pkg,
    });
    console.log(`Created package: ${p.title}`);
  }

  // Create Mock Bookings
  const booking1 = await prisma.booking.create({
    data: {
      userId: user.id,
      type: "PACKAGE",
      status: "CONFIRMED",
      totalAmount: 2499,
      paymentStatus: "PAID",
      details: JSON.stringify({
        itemId: "pkg_1", // Just a placeholder ID for reference in seed
        title: "Majestic Swiss Alps",
        description: "7-day tour of Switzerland",
        date: new Date().toISOString(),
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1000"
      })
    }
  });
  console.log(`Created booking: ${booking1.id}`);

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
