"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FOODS = ["🍔", "🍕", "🍟", "🌮", "🥤", "🍗", "🥗", "🧃"];

type Flyer = { id: number; emoji: string; top: number; delay: number; duration: number };

export function FoodFlythrough() {
  const [flyers, setFlyers] = useState<Flyer[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      emoji: FOODS[i % FOODS.length],
      top: 12 + Math.random() * 70,
      delay: i * 0.4,
      duration: 1.8 + Math.random() * 0.8,
    }));
    setFlyers(initial);

    const interval = setInterval(() => {
      setFlyers((prev) => {
        const next = [...prev];
        const id = Date.now();
        next.push({
          id,
          emoji: FOODS[Math.floor(Math.random() * FOODS.length)],
          top: 8 + Math.random() * 80,
          delay: 0,
          duration: 1.6 + Math.random() * 1,
        });
        return next.slice(-6);
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {flyers.map((f) => (
        <motion.span
          key={f.id}
          initial={{ x: "-10vw", opacity: 0, scale: 0.6 }}
          animate={{ x: "110vw", opacity: [0, 0.7, 0.7, 0], scale: [0.6, 1, 1, 0.8] }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            ease: "easeInOut",
          }}
          className="absolute text-2xl sm:text-3xl md:text-4xl select-none blur-[0.3px]"
          style={{ top: `${f.top}%` }}
        >
          {f.emoji}
        </motion.span>
      ))}
    </div>
  );
}
