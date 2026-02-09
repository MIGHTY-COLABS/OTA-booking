"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const packageSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  destination: z.string().min(2, "Destination is required"),
  price: z.preprocess((val) => Number(val), z.number().min(1)),
  duration: z.preprocess((val) => Number(val), z.number().min(1)),
  images: z.string().min(2, "Images are required"),
  itinerary: z.string().min(2, "Itinerary is required"),
});

interface PackageFormProps {
  initialData?: any;
}

export function PackageForm({ initialData }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<any>({
    resolver: zodResolver(packageSchema),
    defaultValues: initialData ? {
      ...initialData,
      images: Array.isArray(initialData.images) ? JSON.stringify(initialData.images) : initialData.images,
      itinerary: Array.isArray(initialData.itinerary) ? JSON.stringify(initialData.itinerary) : initialData.itinerary,
    } : {
      itinerary: '[]',
      images: '[]'
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let imagesArray;
      try {
        imagesArray = JSON.parse(data.images);
      } catch (e) {
        imagesArray = data.images.split(',').map((s: string) => s.trim());
      }

      let itineraryArray;
      try {
        itineraryArray = JSON.parse(data.itinerary);
      } catch (e) {
        itineraryArray = [];
      }

      const payload = {
        ...data,
        images: imagesArray,
        itinerary: itineraryArray,
      };

      const url = initialData?.id ? `/api/packages/${initialData.id}` : "/api/packages";
      const method = initialData?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed");

      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      alert("Error saving package");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    setLoading(true);
    try {
      await fetch(`/api/packages/${initialData.id}`, { method: "DELETE" });
      router.push("/admin/packages");
      router.refresh();
    } catch (error) {
      alert("Error deleting package");
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input {...register("title")} />
            {errors.title && <p className="text-red-500 text-sm">{String(errors.title.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{String(errors.description.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label>Destination</Label>
            <Input {...register("destination")} />
            {errors.destination && <p className="text-red-500 text-sm">{String(errors.destination.message)}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <Input type="number" step="0.01" {...register("price")} />
              {errors.price && <p className="text-red-500 text-sm">{String(errors.price.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label>Duration (Days)</Label>
              <Input type="number" {...register("duration")} />
              {errors.duration && <p className="text-red-500 text-sm">{String(errors.duration.message)}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Images (JSON Array or Comma Separated URLs)</Label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("images")} placeholder='["url1", "url2"]' />
            {errors.images && <p className="text-red-500 text-sm">{String(errors.images.message)}</p>}
          </div>

          <div className="space-y-2">
            <Label>Itinerary (JSON Array)</Label>
            <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" {...register("itinerary")} placeholder='[{"day": 1, "title": "Arrival", "description": "..."}]' />
            {errors.itinerary && <p className="text-red-500 text-sm">{String(errors.itinerary.message)}</p>}
          </div>

          <div className="flex gap-4">
            <Button disabled={loading}>
              {loading ? "Saving..." : initialData ? "Update Package" : "Create Package"}
            </Button>
            {initialData && (
              <Button type="button" variant="destructive" onClick={onDelete} disabled={loading}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
