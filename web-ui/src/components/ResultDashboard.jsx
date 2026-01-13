import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { RefreshCcw, AlertTriangle, CheckCircle, TrendingUp, Info, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultDashboard = ({ prediction, onRestart }) => {
    const [gaugeValue, setGaugeValue] = useState(0);

    if (!prediction || !prediction.importance) {
        return (
            <div className="glass-card p-12 text-center space-y-4">
                <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500" />
                <h2 className="text-2xl font-bold">Analysis Incomplete</h2>
                <p className="text-[var(--text-secondary)]">We couldn't retrieve your health data. Please try again.</p>
                <button onClick={onRestart} className="btn-primary">Restart Assessment</button>
            </div>
        );
    }

    useEffect(() => {
        console.log("Prediction received in Dashboard:", prediction);
        // Animate gauge
        if (prediction && typeof prediction.probability === 'number') {
            setTimeout(() => setGaugeValue(prediction.probability), 500);
        } else {
            console.warn("Invalid probability value:", prediction?.probability);
        }

        // Confetti for low risk
        if (prediction.prediction === 0) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#ffffff']
            });
        }
    }, [prediction]);

    const chartData = {
        labels: prediction.importance.map(i => i.feature),
        datasets: [
            {
                label: 'Contribution %',
                data: prediction.importance.map(i => i.importance),
                backgroundColor: prediction.importance.map(i =>
                    i.impact === 'Positive' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(16, 185, 129, 0.7)'
                ),
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0f172a',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
            }
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
            y: { grid: { display: false }, ticks: { color: '#f8fafc' } }
        },
    };

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Risk Score Gauge */}
                <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <TrendingUp className="text-[var(--accent-primary)]" />
                        Risk Index
                    </h3>

                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96" cy="96" r="80"
                                fill="none" stroke="currentColor" strokeWidth="12"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="96" cy="96" r="80"
                                fill="none"
                                stroke={prediction.prediction === 1 ? '#ef4444' : '#10b981'}
                                strokeWidth="12"
                                strokeDasharray={502.4}
                                initial={{ strokeDashoffset: 502.4 }}
                                animate={{ strokeDashoffset: 502.4 - (502.4 * gaugeValue) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black font-['Outfit']">{Math.round(gaugeValue)}%</span>
                            <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">Risk Level</span>
                        </div>
                    </div>

                    <div className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 ${prediction.prediction === 1 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'
                        }`}>
                        {prediction.prediction === 1 ? (
                            <><AlertTriangle className="w-5 h-5" /> High Risk Detected</>
                        ) : (
                            <><CheckCircle className="w-5 h-5" /> Low Risk Assessed</>
                        )}
                    </div>
                </div>

                {/* Feature Importance Chart */}
                <div className="glass-card p-8 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <BarChart3 className="text-[var(--accent-primary)]" />
                            Contribution Analysis
                        </h3>
                        <div className="group relative">
                            <Info className="w-5 h-5 text-[var(--text-secondary)] cursor-pointer" />
                            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-xs text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl z-50">
                                This chart shows which health factors had the most significant impact on your risk assessment score.
                            </div>
                        </div>
                    </div>

                    <div className="h-[250px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                            <p className="text-xs text-red-400 mb-1">Primary Concern</p>
                            <p className="font-bold">{prediction.importance[0].feature}</p>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                            <p className="text-xs text-emerald-400 mb-1">Strongest Metric</p>
                            <p className="font-bold">
                                {[...prediction.importance].reverse().find(i => i.impact === 'Negative')?.feature || 'Physical Activity'}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onRestart}
                    className="flex items-center gap-2 px-8 py-4 bg-[var(--glass-border)] hover:bg-[var(--glass-border)] rounded-2xl font-bold transition-all hover:scale-105"
                >
                    <RefreshCcw className="w-5 h-5" /> Start New Assessment
                </button>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-3xl flex gap-4 items-start">
                <div className="p-2 bg-blue-500 rounded-lg shrink-0">
                    <Info className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h4 className="font-bold mb-1">Health Recommendation</h4>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {prediction.prediction === 1
                            ? "Based on your clinical data, we strongly recommend consulting a healthcare professional for a detailed cardiac check-up. Focus on managing your " + prediction.importance[0].feature + " as it shows significant risk contribution."
                            : "Keep up the healthy lifestyle! Your current vitals and habits correlate with a low cardiovascular risk. Continue regular physical activity and balanced nutrition to maintain this status."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultDashboard;
