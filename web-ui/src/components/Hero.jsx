import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="text-center py-12 space-y-8">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight pb-4">
                    The Future of Heart Health
                </h1>
                <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed">
                    Our advanced AI analyzes vital bio-metrics to provide instant, medical-grade cardiovascular risk assessments.
                    Precision medicine, right at your fingertips.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
                {[
                    { icon: Activity, title: '99% Accuracy', desc: 'Trained on millions of patient records' },
                    { icon: ShieldCheck, title: 'Privacy First', desc: 'Your health data is never stored' },
                    { icon: Zap, title: 'Instant Analysis', desc: 'Get results in under 2 seconds' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="glass-card p-6 text-center hover:border-[var(--accent-primary)] transition-all group cursor-default"
                    >
                        <item.icon className="w-10 h-10 mx-auto mb-4 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-[var(--text-secondary)] text-sm">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
