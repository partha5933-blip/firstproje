import { ManagementSurface } from "@/components/admin/management-surface";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog CMS"
        title="Categories, search, tags, comments, SEO, and rich snippets"
        description="Blog posts support publish states, comments, tags, authors, SEO metadata, and lead forms on article pages."
        action={<Button>New Post</Button>}
      />
      <ManagementSurface
        title="Content publishing"
        description="Create planning guides that rank, educate clients, and convert into lead inquiries with source tracking."
        features={["Drafts", "Published", "Categories", "Tags", "Comments", "SEO", "Schema"]}
        records={[
          { label: "How to plan a wedding timeline", detail: "Wedding · planning guide", status: "Published" },
          { label: "Building a brand image library", detail: "Commercial · production", status: "Published" },
          { label: "What to wear for portraits", detail: "Portrait · styling", status: "Published" }
        ]}
      />
    </>
  );
}
