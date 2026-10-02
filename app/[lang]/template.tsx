"use client"
import { motion } from "framer-motion"
import { ease } from "@/components/motion"

/** Soft fade-up between route changes. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
      {children}
    </motion.div>
  )
}
