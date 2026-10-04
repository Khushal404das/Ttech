import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Ttech SOLUTIONS"
        description="The page you're looking for doesn't exist. Return to Ttech SOLUTIONS homepage or contact us for assistance."
        noindex={true}
      />
      <main className="flex-1 min-h-screen bg-[#F8FBFF] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Visual */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#EAF2FF] to-[#F1F7FF] border-2 border-[#DCE8F8] mb-6"
          >
            <Search className="w-16 h-16 text-[#2563EB]" />
          </motion.div>
          
          <h1 className="text-8xl sm:text-9xl font-extrabold text-[#2563EB] font-display mb-4">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1220] mb-4">
            Page Not Found
          </h2>
          
          <p className="text-[#475569] text-base sm:text-lg max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white font-bold text-sm shadow-lg shadow-[#2563EB]/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#DCE8F8] hover:border-[#2563EB]/50 text-[#475569] hover:text-[#2563EB] font-semibold text-sm transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="p-6 rounded-2xl bg-white border border-[#DCE8F8]">
          <p className="text-xs font-semibold text-[#7B8AA3] uppercase tracking-wider mb-4">
            Quick Navigation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <Link
              to="/services"
              className="p-3 rounded-xl bg-[#F8FBFF] hover:bg-[#EAF2FF] text-[#475569] hover:text-[#2563EB] font-medium transition-all"
            >
              Our Services
            </Link>
            <Link
              to="/work"
              className="p-3 rounded-xl bg-[#F8FBFF] hover:bg-[#EAF2FF] text-[#475569] hover:text-[#2563EB] font-medium transition-all"
            >
              Portfolio & Work
            </Link>
            <Link
              to="/contact"
              className="p-3 rounded-xl bg-[#F8FBFF] hover:bg-[#EAF2FF] text-[#475569] hover:text-[#2563EB] font-medium transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-[#7B8AA3] mt-8">
          If you believe this is an error, please{' '}
          <Link to="/contact" className="text-[#2563EB] hover:underline font-medium">
            contact our team
          </Link>
          .
        </p>
      </motion.div>
    </main>
    </>
  );
}
