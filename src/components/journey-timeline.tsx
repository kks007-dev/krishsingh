'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { resume } from '@/lib/data';
import { Calendar, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function JourneyTimeline() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="relative w-full py-10 space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />

            {resume.experience.map((job, index) => {
                const isEven = index % 2 === 0;
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex items-center justify-between md:justify-normal w-full ${!isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Timeline Node */}
                        <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-0 md:top-8 w-4 h-4 rounded-full bg-blue-500 border-4 border-black z-10 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

                        {/* Spacer for Desktop Layout */}
                        <div className="hidden md:block w-1/2" />

                        {/* Content Card */}
                        <div className={`w-[calc(100%-60px)] md:w-[calc(50%-40px)] ml-16 md:ml-0 ${!isEven ? 'md:mr-10' : 'md:ml-10'}`}>
                            <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors backdrop-blur-sm overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-blue-400 mb-2 text-xs font-mono uppercase tracking-wider">
                                        <Calendar className="w-3 h-3" />
                                        <span>{job.duration}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                        {job.role}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-4">
                                        <Briefcase className="w-4 h-4" />
                                        {job.company}
                                    </div>

                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
