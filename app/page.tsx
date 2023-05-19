'use client'

import Image from 'next/image';
import { motion } from 'framer-motion'

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5">
        <motion.h1
          animate={{
            backgroundPosition: ["0% 0%", "0% 100%", "100% 100%", "100% 0%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear"
          }}
          className="text-5xl font-bold bg-clip-text text-transparent bg-[url('/hhholographic.png')] bg-[length:3000px_3000px]">
          Hi! Welcome to my site
        </motion.h1>
        <p>Unfortunately, I&apos;m still working on it. Come back in some time.</p>

      </div>
    </>
  );
}

export default HomePage;