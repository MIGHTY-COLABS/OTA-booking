import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const pkg = await prisma.package.findUnique({
      where: { id },
    });

    if (!pkg) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    const parsedPkg = {
      ...pkg,
      images: JSON.parse(pkg.images || "[]"),
      itinerary: JSON.parse(pkg.itinerary || "[]"),
      inclusions: JSON.parse(pkg.inclusions || "[]"),
      exclusions: JSON.parse(pkg.exclusions || "[]"),
      activities: JSON.parse(pkg.activities || "[]"),
    };

    return NextResponse.json(parsedPkg);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching package" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();

    const pkg = await prisma.package.update({
      where: { id },
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

    return NextResponse.json(pkg);
  } catch (error) {
    return NextResponse.json({ message: "Error updating package" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Package deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting package" }, { status: 500 });
  }
}
