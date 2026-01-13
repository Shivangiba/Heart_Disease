import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, ShieldCheck, Sun, Moon, Info, BarChart3, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import ResultDashboard from './components/ResultDashboard';
import './index.css';

function App() {
    const [theme, setTheme] = useState('dark');
    const [prediction, setPrediction] = useState(null);
    const [isPredicting, setIsPredicting] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handlePrediction = async (data) => {
        setIsPredicting(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/predict`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Prediction failed');
            const result = await response.json();
            setPrediction(result);

            // Wait for DOM update then scroll
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error("Error predicting:", error);
        } finally {
            setIsPredicting(false);
        }
    };

    const handleRestart = () => {
        // Keep prediction for now so sections don't jump, just scroll back?
        // Or if user wants to "Start New", we can clear it.
        // User said: "user moves to form section"
        document.getElementById('predict-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`min-h-screen bg-[var(--bg-dark)] transition-colors duration-500 overflow-x-hidden relative`}>
            {/* Animated Mesh Background */}
            <div className="bg-mesh">
                <div className="mesh-circle mesh-circle-1" />
                <div className="mesh-circle mesh-circle-2" />
                <div className="mesh-circle mesh-circle-3" />
                <div className="mesh-circle mesh-circle-4" />
            </div>

            <Navbar theme={theme} toggleTheme={toggleTheme} onStartAssessment={handleRestart} />

            <main className="container mx-auto px-6 pt-32 pb-12 relative z-10">
                <div className="space-y-24">
                    <Hero />

                    <div id="predict-section" className="max-w-4xl mx-auto scroll-mt-32">
                        <PredictionForm onPredict={handlePrediction} isPredicting={isPredicting} />
                    </div>

                    <AnimatePresence>
                        {prediction && (
                            <motion.div
                                id="results-section"
                                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="scroll-mt-32"
                            >
                                <div className="max-w-6xl mx-auto">
                                    <div className="text-center mb-12">
                                        <h2 className="text-4xl font-bold mb-4">Your Health Report</h2>
                                        <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] mx-auto rounded-full" />
                                    </div>
                                    <ResultDashboard prediction={prediction} onRestart={handleRestart} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <footer className="py-12 border-t border-[var(--glass-border)] text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Heart className="w-5 h-5 text-[#ff416c]" fill="#ff416c" />
                    <p className="text-[var(--text-primary)] font-semibold tracking-wide">
                        Made With Love By <span className="text-[var(--accent-secondary)]">Anjali</span>
                    </p>
                </div>
                <p className="text-[var(--text-secondary)] text-sm">© 2026 CardioCare AI. Empowering Heart Health Everywhere.</p>
            </footer>
        </div>
    );
}

export default App;
