import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          LuxoGlobal
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
          <Link href="/packages" className="text-sm font-medium hover:text-blue-600">Packages</Link>
          <Link href="/hotels/search" className="text-sm font-medium hover:text-blue-600">Hotels</Link>
          <Link href="/flights/search" className="text-sm font-medium hover:text-blue-600">Flights</Link>
        </div>

        <div className="flex items-center space-x-4">
          {session ? (
            <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}>
              <Button variant="outline">{session.user.role === "ADMIN" ? "Admin" : "Dashboard"}</Button>
            </Link>
          ) : (
            <div className="space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
