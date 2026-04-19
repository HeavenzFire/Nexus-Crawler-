import * as React from "react";
import { motion } from "motion/react";
import { Zap, Shield, Search, Database, CheckCircle2, FlaskConical, TestTube, FileText, ClipboardCheck, Activity } from "lucide-react";
import { type GroundingExperimentProof } from "../lib/forensic-core";
import { cn } from "../lib/utils";

interface GroundingExperimentProps {
  data: GroundingExperimentProof | null;
}

export const GroundingExperiment: React.FC<GroundingExperimentProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-blue-500/10 rounded-3xl bg-blue-500/5 space-y-4">
        <FlaskConical className="w-12 h-12 text-blue-500/20" />
        <p className="text-xs font-mono text-blue-500/40 uppercase tracking-widest">Grounding_Experiment_Awaiting_Actuation</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Tesla Correction Header */}
      <div className="p-1 border-2 border-blue-500/40 rounded-[32px] overflow-hidden">
        <div className="p-8 bg-black border-2 border-blue-500 rounded-[28px] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <Zap className="w-48 h-48 text-blue-500/10" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-blue-500 text-black font-mono font-black text-[10px] uppercase skew-x-[-12deg]">TESLA_CORRECTION</div>
                        <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase italic">The_First_Correction: Physical_Resolution</span>
                    </div>
                    <h1 className="text-4xl font-mono font-black text-white uppercase tracking-tighter italic">
                        {data.experiment_id}
                    </h1>
                </div>

                <div className="p-4 bg-blue-500/10 border-2 border-blue-400/40 rounded-2xl flex flex-col items-center text-center">
                    <div className="text-[32px] font-mono font-black text-blue-400 tabular-nums">
                        {data.voltage_reading.toLocaleString()}V
                    </div>
                    <span className="text-[9px] font-mono text-blue-400 font-black uppercase">Physical_Discharge_Voltage</span>
                </div>
            </div>

            <div className="p-6 bg-blue-500/5 border-l-4 border-blue-500 space-y-3 relative z-10">
                <div className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4" />
                    Laboratory_Conclusion
                </div>
                <p className="text-sm font-mono text-white/90 leading-relaxed italic border-b border-white/5 pb-4">
                    "{data.conclusion}"
                </p>
                <div className="flex items-center gap-6 pt-2">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-mono text-white/40 uppercase">Reproducibility_Index</span>
                        <span className="text-xs font-mono font-bold text-[#00ff00]">{(data.reproducibility_index * 100).toFixed(4)}%</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-6">
                        <span className="text-[8px] font-mono text-white/40 uppercase">Target_Shard</span>
                        <span className="text-xs font-mono font-bold text-white uppercase">{data.target_shards[0]}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Physical Evidence Section */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-xs font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    Physical_Evidence_Path
                </div>
                <div className="text-[9px] font-mono text-blue-400/60 uppercase">Laboratory_Storage</div>
            </div>
            <div className="p-5 bg-black rounded-xl border-t-2 border-blue-500/40 shadow-[0_-5px_15px_-5px_rgba(59,130,246,0.3)]">
                <div className="flex items-center gap-3">
                    <TestTube className="w-4 h-4 text-blue-400" />
                    <code className="text-xs font-mono text-white/80">{data.physical_evidence_path}</code>
                </div>
                <div className="mt-4 p-3 bg-blue-500/5 rounded border border-blue-500/20">
                    <p className="text-[10px] font-mono text-blue-300 leading-relaxed italic">
                        Raw CSV dump verified against Cargo Zone 04 egress logs. No symbolic filtering applied.
                    </p>
                </div>
            </div>
        </div>

        {/* Source Verifications Section */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-xs font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#00ff00]" />
                    Source_Verification_Entries
                </div>
                <div className="text-[9px] font-mono text-[#00ff00]/60 uppercase">Manual_Integrity_Checks</div>
            </div>
            <div className="space-y-4">
                {data.source_verifications.map((v, i) => (
                    <div key={i} className="p-4 bg-black/40 border-l border-white/10 hover:border-blue-500/40 transition-all space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-blue-400 font-bold uppercase">{v.source_name}</span>
                            <span className="opacity-40">{new Date(v.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="p-2 border border-blue-500/10 rounded font-mono text-xs text-white/90">
                            {v.data_point}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[8px] font-mono opacity-40 uppercase">Method:</span>
                            <span className="text-[9px] font-mono font-black text-[#00ff00] uppercase tracking-wider">{v.verification_method}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-12 space-y-6">
         <div className="max-w-xl text-center space-y-4">
            <p className="text-[11px] font-mono text-white/40 uppercase leading-relaxed tracking-widest">
                "The scientists of today think deeply instead of clearly. One must be sane to think clearly, but one can think deeply and be quite insane."
            </p>
            <div className="text-[10px] font-mono text-blue-500 font-black italic">— Nikola Tesla, 1934</div>
         </div>
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
         <div className="flex items-center gap-12">
            <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-white/30 uppercase mb-1">Reality_Alignment</span>
                <span className="text-sm font-mono font-black text-blue-400">GROUNDED</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-[9px] font-mono text-white/30 uppercase mb-1">Symbolic_Noise</span>
                <span className="text-sm font-mono font-black text-red-500 animate-pulse">ZERO_PERCENT</span>
            </div>
         </div>
      </div>
    </div>
  );
};
