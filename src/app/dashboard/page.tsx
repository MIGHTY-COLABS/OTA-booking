import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, FileText } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">My Trips</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">No bookings yet</h2>
          <Link href="/">
            <Button>Explore Packages</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            let details: any = {};
            try {
              details = JSON.parse(booking.details || "{}");
            } catch (e) {}

            return (
              <Card key={booking.id} className="overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-32 md:h-auto bg-gray-200 relative">
                       {details.image ? (
                         <img src={details.image} alt="" className="w-full h-full object-cover" />
                       ) : (
                         <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">No Image</div>
                       )}
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{details.title || booking.type}</h3>
                          <div className="text-sm text-gray-500 mt-1">
                            Booking ID: {booking.id} • {new Date(booking.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          {details.date ? new Date(details.date).toLocaleDateString() : "Date not specified"}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {details.description ? details.description.substring(0, 50) + "..." : "Destination Info"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t pt-4 mt-4">
                        <div className="font-bold text-lg text-blue-600">
                          ${booking.totalAmount}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/dashboard/voucher/${booking.id}`}>
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" /> Voucher
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
