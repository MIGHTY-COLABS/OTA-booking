import { prisma } from "@/lib/prisma";
import { PackageForm } from "@/components/admin/package-form";
import { notFound } from "next/navigation";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pkg = await prisma.package.findUnique({
    where: { id },
  });

  if (!pkg) {
    notFound();
  }

  const parsedPkg = {
    ...pkg,
    images: JSON.parse(pkg.images || "[]"),
    itinerary: JSON.parse(pkg.itinerary || "[]"),
    inclusions: JSON.parse(pkg.inclusions || "[]"),
    exclusions: JSON.parse(pkg.exclusions || "[]"),
    activities: JSON.parse(pkg.activities || "[]"),
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Edit Package</h1>
      <PackageForm initialData={parsedPkg} />
    </div>
  );
}
