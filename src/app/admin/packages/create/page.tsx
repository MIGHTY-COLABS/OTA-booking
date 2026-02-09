import { PackageForm } from "@/components/admin/package-form";

export default function CreatePackagePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-bold">Create New Package</h1>
      <PackageForm />
    </div>
  );
}
