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
  // - On entry (bottom of viewport): small scale, high blur, hidden.
  // - In active screen view: full scale, sharp details, fully visible.
  // - On exit (scrolled up past viewport): slight zoom-out or zoom-in, blur, hidden.
  const scaleRaw = useTransform(scrollYProgress, [0, 0.4, 0.65, 1], [0.75, 1, 1, 1.05]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.35, 0.68, 1], [0, 1, 1, 0]);
  const blurRaw = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [16, 0, 0, 12]);

  // Spring physics for smooth camera acceleration feel
  const scale = useSpring(scaleRaw, { stiffness: 65, damping: 22, restDelta: 0.001 });
  const opacity = useSpring(opacityRaw, { stiffness: 65, damping: 22, restDelta: 0.001 });
  const blurVal = useSpring(blurRaw, { stiffness: 65, damping: 22, restDelta: 0.001 });

  const filter = useTransform(blurVal, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity, filter }}
      className="w-full relative py-12 md:py-20 overflow-visible"
    >
      {children}
    </motion.div>
  );
};
