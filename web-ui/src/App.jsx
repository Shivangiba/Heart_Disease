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
        } catch (error) {
            console.error("Error predicting:", error);
        } finally {
            setIsPredicting(false);
        }
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

            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main className="container mx-auto px-6 pt-32 pb-12 relative z-10">
                <AnimatePresence mode="wait">
                    {!prediction ? (
                        <motion.div
                            key="landing"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="space-y-20"
                        >
                            <Hero />
                            <div id="predict-section" className="max-w-4xl mx-auto pb-12">
                                <PredictionForm onPredict={handlePrediction} isPredicting={isPredicting} />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <ResultDashboard prediction={prediction} onRestart={() => setPrediction(null)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="py-12 border-t border-[var(--glass-border)] text-center text-[var(--text-secondary)] text-sm">
                <p>© 2026 CardioCare AI. Developed with ❤️ for Heart Health.</p>
            </footer>
        </div>
    );
}

export default App;
