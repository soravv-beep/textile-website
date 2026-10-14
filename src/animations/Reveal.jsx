/**
 * <Reveal /> — staggered scroll-reveal (fade + 16px rise) powered by
 * framer-motion's `whileInView`, which only animates transform/opacity.
 *
 *   <Reveal>…</Reveal>
 *   <Reveal delay={0.08}>…</Reveal>
 *   <Reveal stagger={0.12}>{items.map(…) }</Reveal>   // children animate one by one
 *
 * @param {object} props
 * @param {number} [props.delay=0] seconds before this element animates
 * @param {number} [props.stagger] seconds between direct children
 * @param {"up"|"down"|"left"|"right"|"fade"} [props.from="up"]
 * @param {number} [props.distance=16] travel distance in px
 * @param {React.ElementType} [props.as="div"]
 */
import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = {
  up: { y: 16 },
  down: { y: -16 },
  left: { x: 16 },
  right: { x: -16 },
  fade: {}
};

export default function Reveal({
  delay = 0,
  stagger,
  from = "up",
  distance = 16,
  as = "div",
  className = "",
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  const base = OFFSETS[from] ?? {};
  // A staggered parent stays put — only its children travel.
  const offset =
    stagger != null
      ? {}
      : Object.fromEntries(
          Object.entries(base).map(([axis, value]) => [axis, Math.sign(value) * distance])
        );

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  const variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay, staggerChildren: stagger }
    }
  };

  const childVariants =
    stagger == null
      ? undefined
      : {
          hidden: { opacity: 0, ...offset },
          visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } }
        };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      {...rest}
    >
      {stagger == null
        ? children
        : Array.isArray(children)
          ? children.map((child, index) =>
              child ? (
                <motion.div key={child.key ?? index} variants={childVariants}>
                  {child}
                </motion.div>
              ) : null
            )
          : children}
    </Tag>
  );
}
