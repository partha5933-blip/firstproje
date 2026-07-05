"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { newsletterSchema } from "@/lib/validation";

type NewsletterValues = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", consentAccepted: false }
  });

  async function onSubmit(values: NewsletterValues) {
    setStatus(null);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("Please try again in a moment.");
      return;
    }

    setStatus("You're on the list.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-[1fr_auto]">
      <div>
        <Input type="email" placeholder="Email for private guides" {...register("email")} />
        {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        <Send className="h-4 w-4" aria-hidden="true" />
        Join
      </Button>
      <label className="flex items-start gap-2 text-xs leading-5 text-muted sm:col-span-2">
        <Checkbox {...register("consentAccepted")} />
        I agree to receive photography planning emails and understand I can unsubscribe anytime.
      </label>
      {errors.consentAccepted ? (
        <p className="text-xs text-red-300 sm:col-span-2">{errors.consentAccepted.message}</p>
      ) : null}
      {status ? <p className="text-sm text-gold sm:col-span-2">{status}</p> : null}
    </form>
  );
}
