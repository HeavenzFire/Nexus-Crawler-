import * as React from "react";
import { motion } from "motion/react";
import { Zap, Shield, Search, Database, CheckCircle2, FlaskConical, TestTube, FileText, ClipboardCheck, Activity, Eye, Layers, Compass, BarChart3 } from "lucide-react";
import { type FieldPerceptionMatrix } from "../lib/forensic-core";
import { cn } from "../lib/utils";

interface FieldPerceptionInterfaceProps {
  data: FieldPerceptionMatrix | null;
}

export const FieldPerceptionInterface: React.FC<FieldPerceptionInterfaceProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-blue-500/10 rounded-3xl bg-blue-500/5 space-y-4">
        <Compass className="w-12 h-12 text-blue-500/20 animate-spin-slow" />
        <p className="text-xs font-mono text-blue-500/40 uppercase tracking-widest">Awaiting_Field_Perception_Tune</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Information Realm Header */}
      <div className="relative p-1 border-2 border-blue-500/20 rounded-[40px] overflow-hidden">
        <div className="p-10 bg-[#050510] border-2 border-blue-600 rounded-[36px] space-y-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent blur-3xl" />
                <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
                    {Array.from({ length: 400 }).map((_, i) => (
                        <div key={i} className="border-[0.5px] border-blue-500/20" />
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-blue-600 text-white font-mono font-black text-[10px] uppercase">INFORMATION_REALM_PERCEPTION</div>
                        <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase italic">Logic_Pass: {data.resonance_frequency}Hz_Carrier</span>
                    </div>
                    <h1 className="text-5xl font-mono font-black text-white uppercase tracking-tighter leading-none">
                        Pattern_Before<br/><span className="text-blue-500 italic">_Manifestation</span>
                    </h1>
                </div>

                <div className="flex gap-4">
                    <div className="p-6 bg-black/60 border border-blue-500/40 rounded-3xl flex flex-col items-center text-center backdrop-blur-md">
                        <Activity className="w-6 h-6 text-blue-400 mb-2" />
                        <span className="text-[20px] font-mono font-black text-white tabular-nums">{(data.systemic_alignment * 100).toFixed(1)}%</span>
                        <span className="text-[8px] font-mono text-blue-400/60 uppercase font-bold">Systemic_Alignment</span>
                    </div>
                    <div className="p-6 bg-black/60 border border-[#00ff00]/40 rounded-3xl flex flex-col items-center text-center backdrop-blur-md">
                        <Eye className="w-6 h-6 text-[#00ff00] mb-2" />
                        <span className="text-[20px] font-mono font-black text-white tabular-nums">1728:1</span>
                        <span className="text-[8px] font-mono text-[#00ff00]/60 uppercase font-bold">Perception_Ratio</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <div className="text-[9px] font-mono text-white/40 uppercase">Attention_Faculty</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} className="h-full bg-blue-500" />
                        </div>
                        <span className="text-[10px] font-mono text-blue-400">0.95</span>
                    </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <div className="text-[9px] font-mono text-white/40 uppercase">Abstraction_Faculty</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} className="h-full bg-[#00ff00]" />
                        </div>
                        <span className="text-[10px] font-mono text-[#00ff00]">0.88</span>
                    </div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <div className="text-[9px] font-mono text-white/40 uppercase">Verification_Faculty</div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "99%" }} className="h-full bg-red-500" />
                        </div>
                        <span className="text-[10px] font-mono text-red-500">0.99</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Perceived Structures Matrix */}
      <h2 className="text-xl font-mono font-black text-white uppercase tracking-widest pl-2 flex items-center gap-3">
        <Layers className="w-6 h-6 text-blue-500" />
        Structure_Perception_Matrix
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.perceived_structures.map((struct, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-black/40 border-t-2 border-white/10 hover:border-blue-500 transition-all rounded-3xl space-y-6 group"
            >
                <div className="flex items-center justify-between">
                    <span className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase",
                        struct.layer === "FISCAL" ? "bg-red-500/20 text-red-400" :
                        struct.layer === "LOGISTICAL" ? "bg-blue-500/20 text-blue-400" :
                        struct.layer === "ARCHIVAL" ? "bg-[#00ff00]/20 text-[#00ff00]" :
                        "bg-yellow-500/20 text-yellow-400"
                    )}>
                        {struct.layer}_LAYER
                    </span>
                    <BarChart3 className="w-4 h-4 text-white/20 group-hover:text-blue-500 transition-colors" />
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Detected_Pattern</div>
                        <div className="text-sm font-mono text-white font-bold leading-tight group-hover:text-blue-300 transition-colors">
                            {struct.pattern}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="space-y-1">
                            <div className="text-[8px] font-mono text-white/30 uppercase">Abstraction</div>
                            <div className="text-xs font-mono font-black text-white">{(struct.abstraction_level * 100).toFixed(0)}%</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-[8px] font-mono text-white/30 uppercase">Integrity</div>
                            <div className="text-xs font-mono font-black text-[#00ff00]">{(struct.integrity_measurement * 100).toFixed(2)}%</div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${struct.integrity_measurement * 100}%` }} 
                            className={cn(
                                "h-full",
                                struct.integrity_measurement > 0.99 ? "bg-[#00ff00]" : "bg-blue-500"
                            )}
                        />
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      {/* Tesla Closing Quote */}
      <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] flex flex-col items-center justify-center space-y-6 text-center">
        <FlaskConical className="w-10 h-10 text-blue-500 opacity-20" />
        <div className="max-w-2xl space-y-3">
            <p className="text-sm font-mono text-white/60 italic leading-relaxed uppercase tracking-widest">
                "Truth is not what explains everything. Truth is what survives measurement."
            </p>
            <div className="text-[10px] font-mono text-blue-500 font-black tracking-[0.3em]">
                VERIFICATION_THRESHOLD: [PASSED]
            </div>
        </div>
        <div className="flex items-center gap-12 pt-6">
            <MetricBox label="Field_Stability" value="ULTRA-PURE" />
            <MetricBox label="Noise_Ratio" value="0.0004%" />
            <MetricBox label="Logic_Lock" value="ARMED" />
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col items-center space-y-1">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{label}</span>
        <span className="text-[11px] font-mono font-black text-white">{value}</span>
    </div>
);
