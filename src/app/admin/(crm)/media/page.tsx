import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function MediaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media library"
        title="Images, videos, PDFs, folders, search, preview, and compression hooks"
        description="Development uploads are stored in public/uploads. Production storage can be swapped to Cloudinary, S3, or UploadThing."
        action={<Button>Upload Media</Button>}
      />
      <ManagementSurface
        title="Media asset operations"
        description="Assets include filename, original name, URL, MIME type, size, folder, alt text, captions, and uploader metadata."
        features={["Upload", "Delete", "Edit", "Rename", "Folders", "Search", "Preview", "Compress"]}
        records={[
          { label: "wedding-hero.webp", detail: "Images · hero", status: "Optimized" },
          { label: "brand-guide.pdf", detail: "PDF · lead magnet", status: "Ready" },
          { label: "behind-scenes.mp4", detail: "Video · homepage", status: "Draft" }
        ]}
      />
    </>
  );
}
