"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ana Paula Silva",
    role: "Proprietária, Clínica Vida Saudável",
    text: "O Marcelo transformou completamente nossa presença online. O site ficou lindo e os agendamentos aumentaram 140% no primeiro mês. Recomendo de olhos fechados!",
    avatar: "AS",
  },
  {
    name: "Carlos Eduardo Mendes",
    role: "CEO, App Finly",
    text: "A landing page que o Marcelo criou para o lançamento do nosso app superou todas as expectativas. Taxa de conversão de 8,4%! Profissional excepcional.",
    avatar: "CM",
  },
  {
    name: "Mariana Oliveira",
    role: "Fundadora, Ateliê Bella Moda",
    text: "Nossa loja virtual ficou incrível e as vendas não param de crescer. O Marcelo entendeu perfeitamente o que nossa marca precisava. R$ 180k no primeiro trimestre!",
    avatar: "MO",
  },
  {
    name: "Roberto Almeida",
    role: "Diretor, Imobiliária Prime",
    text: "O sistema de gestão que desenvolveu para nós economiza horas todos os dias. Profissionalismo e qualidade técnica de alto nível.",
    avatar: "RA",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="section-title">Depoimentos</h2>
          <p className="section-subtitle">
            O que meus clientes dizem sobre o trabalho que entrego.
          </p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="card text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold">
                    {testimonials[current].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{testimonials[current].name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Próximo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
