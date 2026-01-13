import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <section className="text-center py-12 space-y-8">
            <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-gradient-to-br from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight pb-4 animate-reveal">
                    The Future of <br className="hidden md:block" /> Heart Health
                </h1>
                <p className="mt-6 text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed animate-reveal" style={{ animationDelay: '0.2s' }}>
                    Our advanced AI analyzes vital bio-metrics to provide instant, medical-grade cardiovascular risk assessments.
                    Precision medicine, right at your fingertips.
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
