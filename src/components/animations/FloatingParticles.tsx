"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 95}%`,
  size: 4 + (i % 3) * 2,
  delay: (i % 5) * 0.6,
  duration: 4 + (i % 4),
}));

export function FloatingParticles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-secondary/20"
          style={{ left: p.left, width: p.size, height: p.size, bottom: "-10%" }}
          animate={{ y: [0, -720], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
