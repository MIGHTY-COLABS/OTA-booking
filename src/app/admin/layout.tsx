import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">LuxoAdmin</h2>
        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/packages">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <Package className="mr-2 h-4 w-4" />
              Packages
            </Button>
          </Link>
          <Link href="/admin/bookings">
            <Button variant="ghost" className="w-full justify-start text-white hover:text-white hover:bg-slate-800">
              <Calendar className="mr-2 h-4 w-4" />
              Bookings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
