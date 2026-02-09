import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination");

  try {
    const packages = await prisma.package.findMany({
      where: destination ? { destination: { contains: destination } } : {},
      orderBy: { createdAt: "desc" },
    });

    // Parse JSON fields for frontend usage
    const parsedPackages = packages.map(pkg => ({
      ...pkg,
      images: JSON.parse(pkg.images || "[]"),
      itinerary: JSON.parse(pkg.itinerary || "[]"),
      inclusions: JSON.parse(pkg.inclusions || "[]"),
      exclusions: JSON.parse(pkg.exclusions || "[]"),
      activities: JSON.parse(pkg.activities || "[]"),
    }));

    return NextResponse.json(parsedPackages);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching packages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const pkg = await prisma.package.create({
      data: {
        title: body.title,
        description: body.description,
        destination: body.destination,
        price: parseFloat(body.price),
        duration: parseInt(body.duration),
        images: JSON.stringify(body.images || []),
        itinerary: JSON.stringify(body.itinerary || []),
        inclusions: JSON.stringify(body.inclusions || []),
        exclusions: JSON.stringify(body.exclusions || []),
        activities: JSON.stringify(body.activities || []),
      },
    });

    return NextResponse.json(pkg, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating package", error }, { status: 500 });
  }
}
