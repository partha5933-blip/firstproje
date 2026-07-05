"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { portfolioCategories, services } from "@/data/sample-content";
import { leadSchema } from "@/lib/validation";

type LeadValues = z.infer<typeof leadSchema>;

export function LeadForm({ source = "Website" }: { source?: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      leadSource: source,
      marketingConsent: false,
      newsletterConsent: false,
      consentAccepted: false
    }
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue("utmSource", params.get("utm_source") || undefined);
    setValue("utmCampaign", params.get("utm_campaign") || undefined);
    setValue("utmMedium", params.get("utm_medium") || undefined);
  }, [setValue]);

  async function onSubmit(values: LeadValues) {
    setStatus(null);
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("We could not send this yet. Please try again.");
      return;
    }

    setStatus("Inquiry received. We'll reply with availability and next steps.");
    reset({
      name: "",
      email: "",
      leadSource: source,
      marketingConsent: false,
      newsletterConsent: false,
      consentAccepted: false
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input placeholder="Name" {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name.message}</p> : null}
        </div>
        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email.message}</p> : null}
        </div>
        <Input placeholder="Phone" {...register("phone")} />
        <Input placeholder="WhatsApp" {...register("whatsapp")} />
        <Select {...register("serviceInterested")}>
          <option value="">Service interested</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          {portfolioCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input placeholder="Budget" {...register("budget")} />
        <Input type="date" {...register("eventDate")} />
        <Input placeholder="Location" {...register("location")} />
      </div>
      <Textarea placeholder="Tell us about the shoot" {...register("message")} />
      <input type="hidden" {...register("leadSource")} />
      <input type="hidden" {...register("utmSource")} />
      <input type="hidden" {...register("utmCampaign")} />
      <input type="hidden" {...register("utmMedium")} />
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <Checkbox {...register("marketingConsent")} />
        I agree to receive follow-up messages about this inquiry.
      </label>
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <Checkbox {...register("newsletterConsent")} />
        Send me planning guides and studio updates.
      </label>
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <Checkbox {...register("consentAccepted")} />
        I consent to the studio storing my inquiry details to respond to this request.
      </label>
      {errors.consentAccepted ? (
        <p className="text-xs text-red-300">{errors.consentAccepted.message}</p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Inquiry
      </Button>
      {status ? <p className="text-sm text-gold">{status}</p> : null}
    </form>
  );
}
