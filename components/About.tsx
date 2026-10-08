"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="sobre" className="py-20">
      <div className="container-section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder para foto - substitua por next/image quando tiver a foto real */}
              <div className="aspect-[4/5] bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <span className="text-8xl font-display font-bold text-white/20">
                  {profile.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-800">
              <div className="font-display text-2xl font-bold text-brand-600">5+</div>
              <div className="text-sm text-gray-500">anos de experiência</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Sobre mim</h2>
            <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {profile.summary}
            </p>

            {/* Specialties */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                Especialidades
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-sm font-medium dark:bg-brand-900/30 dark:text-brand-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                Ferramentas & Tecnologias
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm dark:bg-gray-800 dark:text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
