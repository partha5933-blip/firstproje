"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Upload } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { services } from "@/data/sample-content";
import { bookingSchema } from "@/lib/validation";

type BookingValues = z.infer<typeof bookingSchema>;

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const fileInputId = useId();
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: defaultService || "",
      consentAccepted: false
    }
  });

  async function onSubmit(values: BookingValues) {
    setStatus(null);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const input = document.getElementById(fileInputId) as HTMLInputElement | null;
    Array.from(input?.files || []).forEach((file) => formData.append("inspirationFiles", file));

    const response = await fetch("/api/bookings", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      setStatus("Booking request could not be sent. Please try again.");
      return;
    }

    setStatus("Booking request received. We will confirm availability by email.");
    reset({ service: defaultService || "", consentAccepted: false });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" id="booking">
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
        <Select {...register("service")}>
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </Select>
        <Input placeholder="Budget" {...register("budget")} />
        <Input type="date" {...register("date")} />
        <Input type="time" {...register("time")} />
        <Input className="sm:col-span-2" placeholder="Shoot location" {...register("location")} />
      </div>
      <Textarea placeholder="Message, creative direction, guest count, or production needs" {...register("message")} />
      <label
        htmlFor={fileInputId}
        className="flex min-h-24 cursor-pointer items-center justify-center gap-3 rounded-lg border border-dashed border-white/20 bg-white/[0.03] px-4 text-sm text-muted transition hover:border-gold/70 hover:text-ink"
      >
        <Upload className="h-5 w-5 text-gold" aria-hidden="true" />
        Upload inspiration images or PDFs
      </label>
      <input id={fileInputId} name="inspirationFiles" type="file" multiple className="sr-only" />
      <label className="flex items-start gap-2 text-xs leading-5 text-muted">
        <Checkbox {...register("consentAccepted")} />
        I consent to the studio storing booking details and uploaded files to respond to this request.
      </label>
      {errors.consentAccepted ? (
        <p className="text-xs text-red-300">{errors.consentAccepted.message}</p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Request Booking
      </Button>
      {status ? <p className="text-sm text-gold">{status}</p> : null}
    </form>
  );
}
