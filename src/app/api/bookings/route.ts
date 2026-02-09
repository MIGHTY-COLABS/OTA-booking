import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const where = session.user.role === "ADMIN"
      ? {}
      : { userId: session.user.id };

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Parse details
    const parsedBookings = bookings.map(b => ({
      ...b,
      details: JSON.parse(b.details || "{}"),
    }));

    return NextResponse.json(parsedBookings);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bookings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        type: body.type, // HOTEL, FLIGHT, PACKAGE
        status: "CONFIRMED", // Auto confirm for now
        totalAmount: parseFloat(body.totalAmount),
        details: JSON.stringify(body.details || {}),
        paymentStatus: "PAID", // Simulate payment success
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating booking", error }, { status: 500 });
  }
}
