import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">{children}</main>
      <Footer />
    </>
  );
}
