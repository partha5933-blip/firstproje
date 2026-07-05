"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  async function onSubmit(values: LoginValues) {
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (result?.error) {
      setError("Invalid credentials or inactive admin user.");
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-lg border border-white/15 bg-white/[0.04] p-6 shadow-soft">
        <span className="flex h-12 w-12 items-center justify-center rounded-md border border-gold/35">
          <Camera className="h-6 w-6 text-gold" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold text-white">Admin login</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Sign in with the admin user created by the seed command.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <div>
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email.message}</p> : null}
          </div>
          <div>
            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password ? (
              <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>
            ) : null}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Sign In
          </Button>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}
