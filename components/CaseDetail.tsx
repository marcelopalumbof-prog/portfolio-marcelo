"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categoryLabels, type CaseStudy } from "@/data/cases";
import { profile } from "@/data/profile";

interface Props {
  caseItem: CaseStudy;
}

export function CaseDetail({ caseItem }: Props) {
  const whatsappUrl = `https://wa.me/${profile.social.whatsapp}?text=${encodeURIComponent(`Olá, Marcelo! Vi o case ${caseItem.client} e quero algo parecido para meu negócio.`)}`;

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link
              href="/#cases"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para cases
            </Link>

            <div className="mt-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-sm font-medium dark:bg-brand-900/50 dark:text-brand-300">
                {categoryLabels[caseItem.category]}
              </span>
              <span className="text-sm text-gray-500">{caseItem.segment}</span>
            </div>

            <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
              {caseItem.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {caseItem.shortDescription}
            </p>

            {caseItem.result && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="font-medium text-green-700 dark:text-green-300">
                  {caseItem.result}
                </span>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={caseItem.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Visitar site
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Quero algo parecido
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container-section">
          <h2 className="section-title text-2xl">Galeria</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseItem.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center"
              >
                <span className="text-6xl font-display font-bold text-white/20">
                  {caseItem.client.charAt(0)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-2xl">Sobre o projeto</h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {caseItem.shortDescription}
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Este projeto foi desenvolvido com foco total em performance, SEO e conversão.
                Cada detalhe foi pensado para gerar resultados reais para o cliente.
              </p>
            </div>
            <div>
              <h2 className="section-title text-2xl">Tecnologias</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {caseItem.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium dark:bg-brand-900/30 dark:text-brand-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-section text-center">
          <h2 className="section-title">Gostou do que viu?</h2>
          <p className="section-subtitle mx-auto max-w-xl">
            Vamos conversar sobre como posso ajudar seu negócio a alcançar resultados semelhantes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Solicitar orçamento
            </a>
            <Link href="/#cases" className="btn-secondary">
              Ver mais cases
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
