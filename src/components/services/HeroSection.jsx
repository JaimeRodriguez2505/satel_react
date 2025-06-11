import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/servicesData';

const HeroSection = ({ current, activeCategory, setActiveCategory }) => {
  return (
    <section className="relative w-full h-[40vh] mb-16 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundImage: `url(${current.heroImage})`, filter: "brightness(0.7)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
        >
          {current.label}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl"
        >
          {current.available}
        </motion.p>
      </div>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-t-lg font-semibold shadow-lg whitespace-nowrap transition-colors duration-300 ${
              activeCategory === cat.id
                ? "bg-white text-green-600"
                : "bg-black/60 text-white hover:bg-black/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
