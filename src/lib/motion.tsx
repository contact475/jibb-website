'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// Custom easing - cubic bezier for smooth animations
const smoothEase = "easeOut"

// Animation variants for reuse across components
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEase }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Reusable animated components
interface MotionSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
}

export function MotionSection({ children, className, id, delay = 0 }: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay, duration: 0.5 }
        }
      }}
    >
      {children}
    </motion.section>
  )
}

interface MotionDivProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  style?: React.CSSProperties
}

export function MotionDiv({ children, className, variants = fadeInUp, delay = 0, style }: MotionDivProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...(variants.visible as { transition?: object }).transition,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Card hover animation
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
}

// Subtle lift for interactive elements
export const subtleLift = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
}

// Export motion and AnimatePresence for direct use
export { motion, AnimatePresence }
