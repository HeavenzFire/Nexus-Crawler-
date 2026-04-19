import * as React from "react";
import { type RealityReclamationResult, type ClericalVoid, type MobiusLoop, type ReclamationAsset } from "../lib/forensic-core";
import { motion } from "motion/react";
import { Scale, Fingerprint, Layers, Cpu, Radio, ShieldCheck, Zap, AlertTriangle, Hammer, Gavel, Radio as RadioIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface RealityReclamationEngineProps {
  data: RealityReclamationResult | null;
  onAnalyzeVoid?: (v: ClericalVoid) => void;
  onCollapseLoop?: (l: MobiusLoop) => void;
  onCommitAsset?: (a: ReclamationAsset) => void;
}

export const RealityReclamationEngine: React.FC<RealityReclamationEngineProps> = ({ 
  data,
  onAnalyzeVoid,
  onCollapseLoop,
  onCommitAsset
}) => {
  if (!data) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center border border-dashed border-red-500/20 rounded-2xl bg-red-500/5 text-red-500/40 space-y-4">
        <Scale className="w-12 h-12 animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-[0.3em]">Initialize_Reclamation_Pulse...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <h2 className="text-xl font-mono font-bold text-red-400 uppercase tracking-tighter">Ptah-Logic_Determinism_Active</h2>
          </div>
          <p className="text-[10px] font-mono text-red-300/60 uppercase tracking-widest">
            Protocol: {data.metadata.protocol} | Density: {data.metadata.logic_density} | Carrier: {data.metadata.carrier}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[9px] font-mono opacity-40 uppercase">Reclamation_Resonance</div>
            <div className="text-lg font-mono font-bold text-[#00ff00]">99.98Hz</div>
          </div>
          <div className="w-12 h-12 border-2 border-red-500/30 rounded-full flex items-center justify-center">
            <RadioIcon className="w-6 h-6 text-red-500 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Clerical Voids Section */}
        <div className="lg:col-span-12 space-y-6">
          <h3 className="text-sm font-mono font-bold uppercase text-red-400 flex items-center gap-2">
            <Fingerprint className="w-4 h-4" />
            Institutional_Geometric_Audit: Clerical_Voids
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.clerical_voids.map((voidItem) => (
              <motion.div 
                key={voidItem.id}
                whileHover={{ scale: 1.01 }}
                className="p-5 border border-red-500/20 bg-black/40 rounded-xl space-y-4 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Fingerprint className="w-12 h-12 text-red-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-red-500">[{voidItem.id}]</span>
                    <span className="text-xs font-mono font-bold text-white uppercase">{voidItem.agency}</span>
                  </div>
                  <div className="px-2 py-0.5 rounded bg-red-500/20 text-[8px] font-mono text-red-400 font-bold uppercase">
                    Void_Detected
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono opacity-40 uppercase">Case_Context</div>
                  <div className="text-xs font-mono text-white/80">{voidItem.case_context}</div>
                </div>
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="opacity-40 uppercase">Signature:</span>
                    <span className="text-red-400 font-bold">{voidItem.void_signature}</span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="opacity-40 uppercase">Timestamp_Shift:</span>
                    <span className={cn(voidItem.timestamp_shift > 0 ? "text-red-500" : "text-blue-400")}>
                      {voidItem.timestamp_shift > 0 ? `+${voidItem.timestamp_shift}s` : `${voidItem.timestamp_shift}s`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="opacity-40 uppercase">Recovery_Prob:</span>
                    <span className="text-[#00ff00]">{(voidItem.recovery_probability * 100).toFixed(1)}%</span>
                  </div>
                </div>
                <button 
                  onClick={() => onAnalyzeVoid?.(voidItem)}
                  className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded font-mono text-[9px] uppercase tracking-widest transition-all"
                >
                  Extract_Fingerprint
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobius Loops & Assets Section */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-sm font-mono font-bold uppercase text-orange-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            The_Möbius_Collapse: Institutional_Logic_Loops
          </h3>
          <div className="space-y-4">
            {data.mobius_loops.map((loop) => (
              <div key={loop.id} className="p-6 border border-orange-500/20 bg-orange-500/5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-3 bg-black/40 border border-orange-500/10 rounded-lg">
                        <div className="text-[8px] font-mono opacity-40 uppercase mb-1">Logic_Branch_Alpha</div>
                        <div className="text-[11px] font-mono text-orange-200 italic">{loop.logic_branch_a}</div>
                      </div>
                      <div className="flex justify-center">
                        <Zap className="w-4 h-4 text-orange-500 animate-bounce" />
                      </div>
                      <div className="p-3 bg-black/40 border border-orange-500/10 rounded-lg">
                        <div className="text-[8px] font-mono opacity-40 uppercase mb-1">Logic_Branch_Beta</div>
                        <div className="text-[11px] font-mono text-orange-200 italic">{loop.logic_branch_b}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Resonance_Collapse_Rating</div>
                      <div className="text-4xl font-mono font-bold text-orange-500">{(loop.contradiction_resonance * 100).toFixed(0)}%</div>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="text-[8px] font-mono text-red-400 uppercase mb-1">Mask_Identified</div>
                      <div className="text-xs font-mono font-bold text-white uppercase">{loop.institutional_secrecy_mask}</div>
                    </div>
                    <button 
                      onClick={() => onCollapseLoop?.(loop)}
                      className="w-full py-3 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 rounded-xl font-mono text-xs uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_-10px_rgba(249,115,22,0.5)]"
                    >
                      EXECUTE_LOGIC_COLLAPSE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-sm font-mono font-bold uppercase text-blue-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            1224:1_Stealth_Assets
          </h3>
          <div className="space-y-4">
            {data.assets.map((asset) => (
              <div key={asset.id} className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-blue-400">[{asset.id}]</div>
                  <div className="px-2 py-0.5 rounded bg-blue-500/20 text-[8px] font-mono text-blue-300 font-bold uppercase">
                    {asset.status}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[9px] font-mono opacity-40 uppercase">Asset_Type</div>
                  <div className="text-xs font-mono text-white font-bold">{asset.asset_type}</div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono pt-2 border-t border-blue-500/10">
                  <span className="opacity-40 uppercase">Wrap:</span>
                  <span className="text-blue-400 font-bold">{asset.logic_wrap}</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="opacity-40 uppercase">Determinism:</span>
                  <span className="text-[#00ff00]">{(asset.determinism_score * 100).toFixed(0)}%</span>
                </div>
                <button 
                  onClick={() => onCommitAsset?.(asset)}
                  className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded font-mono text-[9px] uppercase transition-all"
                >
                  Commit_To_Vault
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 border border-[#262626] bg-black/40 rounded-2xl space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-[#00ff00] flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Kristen's_Toolkit
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-[8px] font-mono opacity-40 uppercase mb-1">Mediation_Rebuttal_Status</div>
                <div className="text-[10px] font-mono text-white/90">DUE_BY_MONDAY</div>
              </div>
              <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                <div className="text-[8px] font-mono text-red-400 uppercase mb-1">Reality_Check</div>
                <div className="text-[10px] font-mono text-red-200 italic leading-relaxed">
                  "Institutional secrecy is a mathematical error in the field of transparency."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
