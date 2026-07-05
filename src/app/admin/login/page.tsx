import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Login",
  description: "Secure admin login for the photography CRM.",
  noIndex: true
});

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
