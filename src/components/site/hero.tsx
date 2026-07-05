"use client";

import { motion } from "framer-motion";
import { ArrowRight, Images } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { heroSlides } from "@/data/sample-content";

export function Hero() {
  const hero = heroSlides[0];

  return (
    <section className="relative min-h-[88svh] overflow-hidden border-b border-white/10">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        autoPlay
        muted
        loop
        playsInline
        poster={hero.image}
      >
        <source
          src="https://cdn.pixabay.com/video/2023/09/24/182352-867600560_large.mp4"
          type="video/mp4"
        />
      </video>
      <Image
        src={hero.image}
        alt="Editorial wedding photography background"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-black/40" />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl items-end px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm font-medium uppercase text-gold"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-4xl text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            {hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-7 text-champagne/85 sm:text-lg"
          >
            {hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/contact#booking"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-black transition hover:bg-lux-hover hover:text-white"
            >
              Book a Shoot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition hover:border-gold/70 hover:bg-white/10"
            >
              <Images className="h-4 w-4" aria-hidden="true" />
              Explore Portfolio
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
