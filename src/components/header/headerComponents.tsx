"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuVariants = {
    hidden: { 
      x: "-100%", 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: { 
      x: "-100%", 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: i * 0.1
      }
    })
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-gradient-to-r from-emerald-700 to-emerald-900 shadow-xl "
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-white text-2xl font-bold tracking-wider"
        >
          <Link href="/" className="hover:text-emerald-200 transition">
            Sabor Diana
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {['/', 'about', 'Pedido'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link 
                href={`/${item.toLowerCase()}`}
                className="text-white text-lg font-medium hover:text-emerald-200 transition-all duration-300 transform hover:scale-110"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 w-64 bg-emerald-800 shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full pt-16 px-6 space-y-6">
              {['Home', 'About', 'Pedidos'].map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className="text-white text-xl font-semibold hover:text-emerald-200 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};