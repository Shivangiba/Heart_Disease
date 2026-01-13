import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import horseLogo from '../assets/horse-logo.png';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center glass-card px-8 py-3">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    >
                        <img src={horseLogo} alt="" className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">CardioCare AI</span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-primary)] leading-none ml-0.5 opacity-60">By Shivangi</span>
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
