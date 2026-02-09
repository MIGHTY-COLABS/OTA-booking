"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CheckoutForm() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // PACKAGE, HOTEL, FLIGHT
  const id = searchParams.get("id");
  const router = useRouter();
  const { data: session } = useSession();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!id || !type) return;

    const fetchItem = async () => {
      try {
        if (type === "PACKAGE") {
          const res = await fetch(`/api/packages/${id}`);
          if (res.ok) setItem(await res.json());
        } else if (type === "HOTEL") {
          const res = await fetch(`/api/search/hotels`);
          const hotels = await res.json();
          setItem(hotels.find((h: any) => h.id === id));
        } else if (type === "FLIGHT") {
           const res = await fetch(`/api/search/flights`);
           const flights = await res.json();
           setItem(flights.find((f: any) => f.id === id));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, type]);

  const handlePayment = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/checkout?type=${type}&id=${id}`);
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          totalAmount: item.price,
          details: {
            itemId: id,
            title: item.title || item.name || item.airline + " " + item.flightNumber,
            description: item.description,
            date: new Date().toISOString(),
            image: item.image || item.images?.[0]
          }
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Booking failed");
      }
    } catch (e) {
      alert("Error processing payment");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12">Loading...</div>;
  if (!item) return <div className="container mx-auto px-4 py-12">Item not found</div>;

  return (
    <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Guest Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input defaultValue={session?.user?.name?.split(" ")[0]} />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input defaultValue={session?.user?.name?.split(" ")[1]} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={session?.user?.email || ""} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input placeholder="+1 234 567 8900" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded bg-gray-50 text-center text-gray-500">
              Payment Gateway Placeholder (Stripe / Razorpay)
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between font-medium">
              <span>{item.title || item.name || `${item.airline} ${item.flightNumber}`}</span>
              <span>${item.price}</span>
            </div>
            {item.duration && (
               <div className="text-sm text-gray-500">{item.duration} Days</div>
            )}
            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>${item.price}</span>
            </div>

            <Button className="w-full mt-4" size="lg" onClick={handlePayment} disabled={processing}>
              {processing ? "Processing..." : `Pay $${item.price}`}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              By clicking Pay, you agree to our Terms & Conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
