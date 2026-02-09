import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrintButton } from "@/components/print-button";

export default async function VoucherPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!booking) notFound();

  if (booking.userId !== session.user.id && session.user.role !== "ADMIN") {
    notFound();
  }

  const details = JSON.parse(booking.details || "{}");

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="bg-white p-8 border shadow-lg print:shadow-none print:border-0 w-full max-w-3xl">
        <div className="flex justify-between items-start mb-8 border-b pb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">LuxoGlobal Holidays</h1>
            <p className="text-sm text-gray-500">Premium Travel Experience</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-gray-700">BOOKING VOUCHER</h2>
            <p className="text-sm text-gray-500">Ref: {booking.id.toUpperCase().slice(0, 8)}</p>
            <p className="text-sm text-gray-500">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">Guest Details</h3>
            <p className="font-bold text-lg">{booking.user.name || booking.user.email}</p>
            <p className="text-gray-600">{booking.user.email}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">Booking Status</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {booking.status}
            </span>
            <div className="mt-2 text-sm text-green-600 font-bold">
              {booking.paymentStatus === 'PAID' ? 'PAYMENT SUCCESSFUL' : 'PAYMENT PENDING'}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded mb-8 print:bg-gray-100">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">Itinerary Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Type</span>
              <span className="font-medium">{booking.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Item Name</span>
              <span className="font-medium">{details.title || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Travel Date</span>
              <span className="font-medium">{details.date ? new Date(details.date).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Description</span>
              <span className="font-medium text-right max-w-[50%]">{details.description || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end border-t pt-8">
          <div className="text-sm text-gray-500">
            <p>For support, contact support@luxoglobal.com</p>
            <p>Emergency Line: +1 555 000 0000</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-blue-600">${booking.totalAmount}</p>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 print:hidden">
          <p>This is a computer generated receipt and does not require a physical signature.</p>
        </div>
      </div>

      <div className="mt-8 text-center print:hidden">
        <PrintButton />
      </div>
    </div>
  );
}
