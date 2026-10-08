"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Hero() {
  const whatsappUrl = `https://wa.me/${profile.social.whatsapp}?text=${encodeURIComponent(profile.social.whatsappMessage)}`;

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-gray-950 dark:via-gray-900 dark:to-brand-950" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl dark:bg-brand-800/20" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-100/40 rounded-full blur-3xl dark:bg-brand-900/20" />

      <div className="container-section relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium dark:bg-brand-900/50 dark:text-brand-300">
              {profile.role}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            {profile.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#cases" className="btn-primary">
              Ver cases
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Pedir orçamento
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-display text-3xl font-bold text-brand-600">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
