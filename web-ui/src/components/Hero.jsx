import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';
import horseLogo from '../assets/horse-logo.png';

const Hero = () => {
    return (
        <section className="text-center py-12 space-y-12 relative">
            {/* Extremely Subtle Watermark */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full -z-10 opacity-[0.008] pointer-events-none grayscale">
                <img src={horseLogo} alt="" className="w-full h-full object-contain scale-110" />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--glass-border)] bg-white/5 text-[var(--accent-primary)] text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
                >
                    Professional Grade Analysis
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-b from-slate-100 to-slate-400 bg-clip-text text-transparent leading-tight pb-4">
                    Cardiovascular <br className="hidden md:block" /> Intelligence
                </h1>
                <p className="mt-8 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-normal leading-relaxed opacity-70" style={{ animationDelay: '0.2s' }}>
                    Advanced neural networks providing precise heart health risk assessments. <br />
                    Medical informatics distilled for clarity and action.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                {[
                    { icon: Activity, title: '72.3% Accuracy', desc: 'Trained on 70,000+ patient records', delay: '0.4s' },
                    { icon: ShieldCheck, title: 'Privacy First', desc: 'Your health data is never stored', delay: '0.5s' },
                    { icon: Zap, title: 'Instant Analysis', desc: 'Get results in under 2 seconds', delay: '0.6s' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        whileHover={{ y: -10, scale: 1.02 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * i }}
                        className="glass-card p-8 text-center border-white/5 hover:border-[var(--accent-primary)]/30 transition-all group cursor-default relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <item.icon className="w-12 h-12 mx-auto mb-6 text-[var(--accent-primary)] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-[var(--text-secondary)] text-base leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
