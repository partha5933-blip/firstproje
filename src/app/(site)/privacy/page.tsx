import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy policy, consent handling, data export, deletion, and marketing consent details."
});

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-sm font-medium uppercase text-gold">GDPR</p>
        <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-muted">
          <p>
            Lux Lens Studio stores inquiry, booking, consent, and communication details only for responding to requests, managing client relationships, and delivering photography services.
          </p>
          <p>
            Marketing and analytics cookies are optional. Consent is logged only after the visitor makes an affirmative choice.
          </p>
          <p>
            You can request an export through `/api/gdpr/export` or deletion through `/api/gdpr/delete` using the email address associated with your inquiry.
          </p>
          <p>
            Uploaded inspiration files are used only for production planning and can be removed on request.
          </p>
        </div>
      </div>
    </section>
  );
}
