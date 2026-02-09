import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function PackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Packages</h1>
        <Link href="/admin/packages/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Package
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">{pkg.title}</TableCell>
                <TableCell>{pkg.destination}</TableCell>
                <TableCell>${pkg.price}</TableCell>
                <TableCell>{pkg.duration} Days</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/packages/${pkg.id}`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
