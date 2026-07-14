import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

export const ScrollSpaceWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Interpolation:
  // - On entry (bottom of viewport): small scale, hidden.
  // - In active screen view: full scale, fully visible.
  // - On exit (scrolled up past viewport): slight zoom-out or zoom-in, hidden.
  const scaleRaw = useTransform(scrollYProgress, [0, 0.4, 0.65, 1], [0.75, 1, 1, 1.05]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [0, 1, 1, 0]);

  // Spring physics for smooth camera acceleration feel
  const scale = useSpring(scaleRaw, { stiffness: 65, damping: 22, restDelta: 0.001 });
  const opacity = useSpring(opacityRaw, { stiffness: 65, damping: 22, restDelta: 0.001 });

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity }}
      className="w-full relative py-12 md:py-20 overflow-visible"
    >
      {children}
    </motion.div>
  );
};
