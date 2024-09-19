"use client";

import { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Links from 'next/link';

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-indigo-600 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-white font-bold">Saint Lukes Medical Centre</h1>
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(true)}>
              <FaBars className="h-6 w-6 text-white" />
            </button>
          </div>
          <nav className="hidden sm:flex space-x-8">
            <Link to="services" smooth className="text-white hover:underline cursor-pointer">Services</Link>
            <Link to="about" smooth className="text-white hover:underline cursor-pointer">About Us</Link>
            <Link to="contact" smooth className="text-white hover:underline cursor-pointer">Contact</Link>
            <Links href="/login"  className="text-white hover:underline cursor-pointer">Login</Links>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 flex z-50 sm:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-0 flex flex-col bg-indigo-600 w-64 p-4">
            <button onClick={() => setIsOpen(false)} className="self-end">
              <FaTimes className="h-6 w-6 text-white" />
            </button>
            <nav className="mt-4 space-y-4">
              <Link to="services" smooth className="block text-white hover:underline">Services</Link>
              <Link to="about" smooth className="block text-white hover:underline">About Us</Link>
              <Link to="contact" smooth className="block text-white hover:underline">Contact</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main>
        <section id="hero" className="h-screen flex items-center justify-center bg-indigo-500 text-white relative">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome to Saint Lukes Medical Centre</h2>
            <p className="text-8xl mb-6 font-bold">cLiRx</p>
            <p className="text-lg mb-6">Accreditation, Policy & Procedure Tool (APPT)</p>
            <Link to="services" smooth className="bg-white text-indigo-600 px-4 py-2 rounded-lg">
              Explore Our Services
            </Link>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white text-gray-900 dark:text-gray-100 dark:bg-gray-800">
          <div className="container mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-center mb-8"
            >
              Our Services
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 border rounded-lg shadow-lg dark:border-gray-700"
              >
                <h4 className="text-xl font-semibold mb-4">Emergency Care</h4>
                <p className="text-gray-600 dark:text-gray-300">Our emergency department provides rapid care for critical conditions.</p>
              </motion.div>
              {/* Repeat for more services */}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
          <div className="container mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-center mb-8"
            >
              About Us
            </motion.h3>
            <p className="text-center">We are a leading hospital with world-class facilities and a team of dedicated healthcare professionals.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-indigo-600 text-white">
          <div className="container mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-center mb-8"
            >
              Contact Us
            </motion.h3>
            <form className="max-w-lg mx-auto">
              <input type="text" placeholder="Your Name" className="w-full p-2 mb-4 rounded-lg" />
              <input type="email" placeholder="Your Email" className="w-full p-2 mb-4 rounded-lg" />
              <textarea placeholder="Your Message" className="w-full p-2 mb-4 rounded-lg"></textarea>
              <button type="submit" className="bg-white text-indigo-600 px-4 py-2 rounded-lg">Send Message</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
