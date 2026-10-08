"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cases, categoryLabels, type CaseCategory } from "@/data/cases";
import Link from "next/link";

const categories: { value: CaseCategory | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "institucional", label: "Institucional" },
  { value: "landing-page", label: "Landing Page" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "sistema", label: "Sistema" },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<CaseCategory | "all">("all");

  const filtered = activeCategory === "all"
    ? cases
    : cases.filter((c) => c.category === activeCategory);

  return (
    <section id="cases" className="py-20">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Portfólio / Cases</h2>
          <p className="section-subtitle">
            Conheça alguns dos projetos que já entreguei. Cada case é uma história de resultado.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((caseItem) => (
              <motion.div
                key={caseItem.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/cases/${caseItem.slug}`} className="block group">
                  <div className="card overflow-hidden !p-0">
                    {/* Cover Image */}
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-brand-400 to-brand-600 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-display font-bold text-white/20">
                          {caseItem.client.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full bg-white/90 text-xs font-medium text-gray-700">
                          {categoryLabels[caseItem.category]}
                        </span>
                      </div>
                      {caseItem.result && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="inline-block px-2 py-1 rounded-full bg-green-500/90 text-xs font-medium text-white">
                            {caseItem.result}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg group-hover:text-brand-600 transition-colors">
                        {caseItem.client}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {caseItem.segment}
                      </p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {caseItem.shortDescription}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {caseItem.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
