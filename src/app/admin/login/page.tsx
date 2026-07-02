import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <AdminLoginForm />
    </div>
  );
}
