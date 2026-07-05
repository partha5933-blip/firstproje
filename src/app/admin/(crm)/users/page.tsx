import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";

export default function UsersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Role based access"
        description="Users can be admins, editors, or viewers. Passwords are hashed, sessions are JWT-based, and access is protected by middleware."
      />
      <ManagementSurface
        title="User management"
        description="Invite staff, assign roles, deactivate accounts, and audit admin activity."
        features={["Admin", "Editor", "Viewer", "JWT", "Password hashing", "Secure sessions"]}
        records={[
          { label: "Studio Owner", detail: "Full account and settings access", status: "Admin" },
          { label: "Producer", detail: "Leads, bookings, notes, emails", status: "Editor" },
          { label: "Retoucher", detail: "Media and portfolio visibility", status: "Viewer" }
        ]}
      />
    </>
  );
}
