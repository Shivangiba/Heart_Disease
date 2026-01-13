import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { User, Activity, Droplets, Cigarette, Wine, Dumbbell, ChevronRight, ChevronLeft, Search } from 'lucide-react';

const steps = [
    {
        title: 'Personal Vitals',
        fields: ['age', 'gender', 'height', 'weight'],
        icons: { age: User, gender: User, height: Activity, weight: Activity }
    },
    {
        title: 'Clinical Data',
        fields: ['ap_hi', 'ap_lo', 'cholesterol', 'gluc'],
        icons: { ap_hi: Droplets, ap_lo: Droplets, cholesterol: Activity, gluc: Activity }
    },
    {
        title: 'Lifestyle Factors',
        fields: ['smoke', 'alco', 'active'],
        icons: { smoke: Cigarette, alco: Wine, active: Dumbbell }
    }
];

const PredictionForm = ({ onPredict, isPredicting }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        age: 50, gender: 1, height: 170, weight: 70,
        ap_hi: 120, ap_lo: 80, cholesterol: 1, gluc: 1,
        smoke: 0, alco: 0, active: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const currentFields = steps[currentStep];

    return (
        <div className="glass-card p-8 md:p-12 shadow-2xl relative overflow-hidden border-[var(--glass-border)]">
            {/* Background glow Decor */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent-primary)]/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold">{currentFields.title}</h2>
                        <p className="text-[var(--text-secondary)]">Step {currentStep + 1} of 3</p>
                    </div>
                    <div className="flex gap-2">
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-colors ${currentStep === i ? 'bg-[var(--accent-primary)]' : 'bg-[var(--glass-border)]'}`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ x: 50, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ x: -50, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {currentFields.fields.map(field => {
                            const Icon = currentFields.icons[field];
                            return (
                                <div key={field} className="space-y-2">
                                    <label className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2 capitalize">
                                        <Icon className="w-4 h-4" />
                                        {field.replace('_', ' ')}
                                    </label>
                                    {field === 'gender' ? (
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:border-[var(--accent-primary)] outline-none transition-all cursor-pointer"
                                        >
                                            <option value={1}>Male</option>
                                            <option value={2}>Female</option>
                                        </select>
                                    ) : ['cholesterol', 'gluc'].includes(field) ? (
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:border-[var(--accent-primary)] outline-none transition-all cursor-pointer"
                                        >
                                            <option value={1}>Normal</option>
                                            <option value={2}>Above Normal</option>
                                            <option value={3}>High</option>
                                        </select>
                                    ) : ['smoke', 'alco', 'active'].includes(field) ? (
                                        <select
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:border-[var(--accent-primary)] outline-none transition-all cursor-pointer"
                                        >
                                            <option value={0}>No</option>
                                            <option value={1}>Yes</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="number"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            className="w-full bg-[var(--bg-dark)] border border-[var(--glass-border)] rounded-xl px-4 py-3 focus:border-[var(--accent-primary)] outline-none transition-all"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-12">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${currentStep === 0 ? 'opacity-0' : 'hover:bg-[var(--glass-border)]'}`}
                    >
                        <ChevronLeft /> Back
                    </button>

                    {currentStep === 2 ? (
                        <button
                            onClick={() => onPredict(formData)}
                            disabled={isPredicting}
                            className="btn-primary px-10 flex items-center gap-2 disabled:opacity-70"
                        >
                            {isPredicting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" /> Analyze Health
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className="btn-primary px-10 flex items-center gap-2"
                        >
                            Next <ChevronRight />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PredictionForm;
