"use client"
import React from 'react'
import { motion } from 'framer-motion'
const About = () => {
  return (
    <motion.div
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen p-10"
    >
    <div>About</div>
    </motion.div>
  )
}

export default About