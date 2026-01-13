import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-3">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                        className="relative"
                    >
                        <Heart className="w-8 h-8 text-[#ff416c] filter drop-shadow-[0_0_8px_rgba(255,65,108,0.5)]" fill="#ff416c" />
                        <motion.div
                            className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">CardioCare AI</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-secondary)] leading-none ml-0.5">By Anjali</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-[var(--glass-border)] transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
                    </button>

                    <button
                        onClick={() => document.getElementById('predict-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-primary text-sm whitespace-nowrap"
                    >
                        Start Assessment
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
