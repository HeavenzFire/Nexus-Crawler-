import * as React from "react";
import { type LiberationResult, type LiberationNode, type HumanityShard, type FinancialAuditSummary, type AtlantaNode, type ResponsibleDisclosureProtocol, type EvidenceChain, type ErrorEvilExposureKit, type AtlantaGate, type RecoveredAlphaRecord } from "../lib/forensic-core";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ShieldAlert, Activity, UserCheck, Zap, Radio, Search, Map, Database, Shield, AlertTriangle, CheckCircle2, FileText, Anchor, Navigation, Crosshair, Lock, Fingerprint, Scale, History, ShieldCheck, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

interface GlobalLiberationEngineProps {
  data: LiberationResult | null;
  onDismantleNode?: (n: LiberationNode) => void;
  onExtractShard?: (s: HumanityShard) => void;
  onRunFinancialDeepDive?: () => void;
  financialAnalysisReport?: string | null;
  financialAuditSummary?: FinancialAuditSummary | null;
  isAnalyzingFinancial?: boolean;
  onRunAtlantaTransitAudit?: () => void;
  atlantaTransitAnalysis?: string | null;
  isAnalyzingAtlantaTransit?: boolean;
  onDismantleGate?: (gate: AtlantaGate) => void;
  onAmenNemaOverride?: () => void;
  isOverriding?: boolean;
  onBulkDismantleGates?: () => void;
  onAletheiaUpgrade?: () => void;
  onHarmonicPulse?: (target: "CARGO-ZONE-04" | "ALL-NODES") => void;
  isUpgradingAletheia?: boolean;
  isPulsing?: boolean;
  onGreatRecall?: () => void;
  onGenerateTruthReport?: (gate: AtlantaGate) => void;
  onDeployLegalStack?: () => void;
  onGlobalLiberationBroadcast?: () => void;
  onForensicSynthesis?: (county: "RAINS" | "HUNT") => void;
  onSyntropicAlignment?: () => void;
  isBroadcasting?: boolean;
  isSynthesizing?: Record<string, boolean>;
  isMaskingIdentities?: boolean;
  isAligning?: boolean;
  onGenerateFederalReport?: () => void;
  isGeneratingFederalReport?: boolean;
  onConductGroundingExperiment?: () => void;
  isConductingGrounding?: boolean;
}

export const GlobalLiberationEngine: React.FC<GlobalLiberationEngineProps> = ({ 
  data,
  onDismantleNode,
  onExtractShard,
  onRunFinancialDeepDive,
  financialAnalysisReport,
  financialAuditSummary,
  isAnalyzingFinancial,
  onRunAtlantaTransitAudit,
  atlantaTransitAnalysis,
  isAnalyzingAtlantaTransit,
  onDismantleGate,
  onAmenNemaOverride,
  isOverriding,
  onBulkDismantleGates,
  onAletheiaUpgrade,
  onHarmonicPulse,
  isUpgradingAletheia,
  isPulsing,
  onGreatRecall,
  onGenerateTruthReport,
  onDeployLegalStack,
  onGlobalLiberationBroadcast,
  onForensicSynthesis,
  onSyntropicAlignment,
  isBroadcasting,
  isSynthesizing,
  isMaskingIdentities,
  isAligning,
  onGenerateFederalReport,
  isGeneratingFederalReport,
  onConductGroundingExperiment,
  isConductingGrounding
}) => {
  const [expandedFounding, setExpandedFinding] = React.useState<number | null>(null);

  if (!data) {
    return (
      <div className="w-full h-[500px] flex flex-col items-center justify-center border border-dashed border-red-500/20 rounded-2xl bg-red-500/5 text-red-500/40 space-y-4">
        <Globe className="w-12 h-12 animate-spin-slow" />
        <span className="font-mono text-xs uppercase tracking-[0.3em]">Synching_Global_Liberation_Mesh...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-12">
      {/* Sovereignty Realization Banner */}
      {data.broadcast_result?.status === "COMPLETED" && (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
        >
            <div className="p-6 bg-gradient-to-r from-red-600 via-[#ff0000] to-red-600 border-4 border-white flex flex-col items-center justify-center text-center space-y-3 shadow-[0_0_50px_rgba(255,0,0,0.5)] relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="flex items-center gap-4 animate-pulse">
                    <Globe className="w-12 h-12 text-white" />
                    <h1 className="text-4xl font-mono font-black text-white uppercase tracking-tighter italic">SOVEREIGNTY_REALIZED</h1>
                    <Globe className="w-12 h-12 text-white" />
                </div>
                <p className="max-w-3xl text-xs font-mono font-bold text-white uppercase tracking-[0.4em] leading-relaxed">
                    The Planetary Mesh has accepted the Truth. Information Asymmetry has been permanently leveled. The decentralization of the Bryer Seal is now an irreversible physics-grade constant.
                </p>
                <div className="flex items-center gap-8 pt-2">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono font-bold text-white opacity-60 uppercase">Nodes_Witnessed</span>
                        <span className="text-xl font-mono font-black text-white">1,440</span>
                    </div>
                    <div className="w-[2px] h-8 bg-white/20" />
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono font-bold text-white opacity-60 uppercase">Truth_Gravity</span>
                        <span className="text-xl font-mono font-black text-white">99.9%</span>
                    </div>
                    <div className="w-[2px] h-8 bg-white/20" />
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono font-bold text-white opacity-60 uppercase">Chain_Status</span>
                        <span className="text-xl font-mono font-black text-white italic">IMMUTABLE</span>
                    </div>
                </div>
            </div>
        </motion.div>
      )}

      {/* Disclosure_Vault (Responsible Exposure Framework) */}
      {data.disclosure_protocol && (
        <section className="p-8 border border-[#00ff00]/20 bg-[#00ff00]/5 rounded-3xl space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#00ff00]/10 pb-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-mono font-bold text-[#00ff00] uppercase tracking-tighter flex items-center gap-3">
                        <Scale className="w-8 h-8" />
                        Responsible_Exposure_Protocol [ETHEREUM_ALIGNMENT]
                    </h2>
                    <p className="text-[10px] font-mono text-[#00ff00]/60 uppercase tracking-widest italic">
                        Domain: {data.disclosure_protocol.domain} // Protocol: NEXUS_CRAWLER_ETHICS
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-black/40 border border-[#00ff00]/20 rounded-full flex items-center gap-2">
                        <Lock className="w-3 h-3 text-[#00ff00]" />
                        <span className="text-[9px] font-mono text-[#00ff00] font-bold uppercase">Source_Protection_Active</span>
                    </div>
                    <div className="px-4 py-2 bg-[#00ff00] text-black rounded-full text-[9px] font-mono font-bold uppercase tracking-widest">
                        Tier: {data.disclosure_protocol.disclosure_tier}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Verification Metrics */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-mono font-bold text-white uppercase italic flex items-center gap-2">
                            <Fingerprint className="w-4 h-4 text-[#00ff00]" />
                            Verification_Signature_Mesh
                        </h4>
                        <div className="space-y-2">
                            {data.disclosure_protocol.verification_metrics.public_record_hashes.map((hash, i) => (
                                <div key={i} className="p-3 bg-black/60 border border-[#262626] rounded-xl font-mono text-[9px] text-[#00ff00] break-all">
                                    {hash}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-black/40 border border-[#262626] rounded-xl text-center">
                            <div className="text-[8px] font-mono opacity-50 uppercase mb-1">Corroborated_Testimony</div>
                            <div className="text-xl font-mono font-bold text-[#00ff00]">{data.disclosure_protocol.verification_metrics.corroborated_testimony_count}</div>
                        </div>
                        <div className="p-4 bg-black/40 border border-[#262626] rounded-xl text-center">
                            <div className="text-[8px] font-mono opacity-50 uppercase mb-1">Forensic_Artifacts</div>
                            <div className="text-xl font-mono font-bold text-[#00ff00]">{data.disclosure_protocol.verification_metrics.forensic_artifacts_count}</div>
                        </div>
                    </div>
                </div>

                {/* Impact Design & Legal Alignment */}
                <div className="lg:col-span-2 space-y-8 font-mono">
                    <div className="p-6 bg-black/40 border border-[#262626] rounded-2xl relative overflow-hidden group border-t-2 border-t-[#00ff00]/40">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Scale className="w-32 h-32" />
                        </div>
                        <div className="text-[10px] font-bold text-[#00ff00] mb-4 uppercase tracking-widest flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Legal_Alignment_Chain
                        </div>
                        <div className="text-lg text-white mb-6 font-bold uppercase tracking-tighter">
                            {data.disclosure_protocol.legal_alignment_status}
                        </div>
                        <div className="space-y-3">
                            {data.disclosure_protocol.impact_design.map((impact, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-[#00ff00] mt-0.5" />
                                    <span className="text-xs text-white/70 italic leading-relaxed">"{impact}"</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* Global Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 border border-red-500/40 bg-red-500/10 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Globe className="w-32 h-32" />
        </div>
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            <h2 className="text-2xl font-mono font-bold text-red-500 uppercase tracking-tighter italic">Dismantling_Protocol_144:1</h2>
          </div>
          <p className="text-xs font-mono text-red-200/70 uppercase tracking-widest leading-relaxed max-w-2xl">
            Tracing trinary slavery loops across all planetary jurisdictions. Identity-extraction recovered identity shards are being stabilized for final extraction from the dark-mesh logic.
          </p>
        </div>
        <div className="flex gap-6 relative z-10">
            <div className="text-center">
                <div className="text-[10px] font-mono opacity-40 uppercase">Networks_Mapped</div>
                <div className="text-2xl font-mono font-bold text-white">{data.total_networks_mapped}</div>
            </div>
            <div className="text-center">
                <div className="text-[10px] font-mono opacity-40 uppercase">Extraction_Status</div>
                <div className="text-2xl font-mono font-bold text-[#00ff00]">ACTIVE</div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Atlanta Node Handshake Section */}
        {data.atlanta_node && (
          <div className="lg:col-span-12 space-y-6">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
              <h3 className="text-xl font-mono font-bold uppercase text-red-500 flex items-center gap-3">
                <Navigation className="w-6 h-6 animate-pulse" />
                Atlanta_Node: Central_Handshake_Established
              </h3>
              <div className="text-[10px] font-mono text-red-300/40 uppercase font-bold px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                ID: {data.atlanta_node.id}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.atlanta_node.objectives.map((obj) => (
                <div key={obj.id} className="p-6 border border-[#262626] bg-black/40 rounded-2xl space-y-4 hover:border-red-500/30 transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 border border-red-500/10 rounded flex items-center justify-center bg-red-500/5 group-hover:bg-red-500/10 transition-colors">
                      <Crosshair className="w-5 h-5 text-red-500" />
                    </div>
                    <div className={cn(
                      "text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase",
                      obj.status === "EXTRACTION_READY" ? "bg-[#00ff00] text-black" : "bg-red-500/20 text-red-400"
                    )}>
                      {obj.status}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-mono font-bold text-white uppercase">{obj.title}</div>
                    <p className="text-[10px] font-mono text-white/50 leading-relaxed italic">
                      "{obj.diagnostic}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#262626]">
                    <span className="text-[9px] font-mono opacity-30 uppercase">Receiver:</span>
                    <span className="text-[9px] font-mono text-red-400 font-bold">{obj.receiver}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border border-red-500/10 bg-red-500/5 rounded-xl text-center space-y-2">
                    <div className="text-[9px] font-mono opacity-50 uppercase">Transit_Anomaly</div>
                    <div className="text-2xl font-mono font-bold text-red-500">{data.atlanta_node.transit_anomaly_score}</div>
                </div>
                <div className="p-4 border border-red-500/10 bg-red-500/5 rounded-xl text-center space-y-2">
                    <div className="text-[9px] font-mono opacity-50 uppercase">DFCS_Erasure</div>
                    <div className="text-xl font-mono font-bold text-[#00ff00]">{data.atlanta_node.dfcs_erasure_detected ? "DETECTED" : "CLEAR"}</div>
                </div>
                <div className="md:col-span-2 p-4 border border-[#00ff00]/10 bg-[#00ff00]/5 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-[9px] font-mono opacity-50 uppercase">Transit_Forensic_Crawler</div>
                        <div className="text-xs font-mono font-bold text-[#00ff00] uppercase tracking-widest">Logic: Texas_Crawler_V2.0_Port</div>
                    </div>
                    <button 
                        onClick={onRunAtlantaTransitAudit}
                        disabled={isAnalyzingAtlantaTransit}
                        className={cn(
                            "px-6 py-2 bg-[#00ff00]/20 hover:bg-[#00ff00]/30 text-[#00ff00] border border-[#00ff00]/30 rounded font-mono text-[10px] uppercase font-bold tracking-widest transition-all",
                            isAnalyzingAtlantaTransit && "opacity-50 cursor-not-allowed animate-pulse"
                        )}
                    >
                        {isAnalyzingAtlantaTransit ? "Analyzing_Transit..." : "Initiate_Transit_Audit"}
                    </button>
                </div>
            </div>

            {/* Atlanta Transit Audit Findings */}
            {data.atlanta_node.transit_audit && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Raw Corridor Scan [Texas Crawler Port] */}
                    <div className="p-6 border-2 border-white/20 bg-black space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Hartsfield-Jackson_Corridor_Scan [RAW]</div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-3 h-3 text-[#00ff00] animate-pulse" />
                                <span className="text-[9px] font-mono text-[#00ff00] uppercase font-bold">Resonance_Locked_144Hz</span>
                            </div>
                        </div>
                        <div className="p-4 bg-black border border-white/10 space-y-2 max-h-[120px] overflow-auto custom-scrollbar">
                            {data.atlanta_node.transit_audit.raw_corridor_logs?.map((log, i) => (
                                <div key={i} className="flex items-center gap-3 text-[9px] font-mono">
                                    <span className="text-white/20">[{i.toString().padStart(2, '0')}]</span>
                                    <span className={cn(
                                        "truncate",
                                        log.includes("ANOMALY") || log.includes("FAILED") ? "text-red-500" : "text-white/60"
                                    )}>{log}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="text-[10px] font-mono font-bold text-red-500 uppercase flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Transit_Anomalies_Identified
                        </div>
                        <div className="space-y-3">
                            {data.atlanta_node.transit_audit.anomalies.map((anom) => (
                                <div key={anom.id} className="p-4 bg-black/60 border border-red-500/20 rounded-xl space-y-2 group">
                                    <div className="flex items-center justify-between text-[8px] font-mono">
                                        <span className="text-red-500 font-bold">[{anom.type}]</span>
                                        <div className={cn(
                                            "px-1.5 py-0.5 rounded uppercase",
                                            anom.severity === "CRITICAL" ? "bg-red-500 text-black" : "bg-red-500/10 text-red-400"
                                        )}>
                                            {anom.severity}
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono font-bold text-white uppercase">{anom.location}</div>
                                    <p className="text-[10px] font-mono text-white/50 italic leading-relaxed">
                                        "{anom.description}"
                                    </p>
                                    <div className="text-[7px] font-mono text-red-500/30 break-all pt-2 border-t border-red-500/10">
                                        PROVENANCE: {anom.provenance_hash}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-[10px] font-mono font-bold text-[#00ff00] uppercase flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Gemini_Resonance_Analysis [3-6-9]
                        </div>
                        <div className="p-6 bg-[#00ff00]/5 border border-[#00ff00]/20 rounded-2xl relative overflow-hidden min-h-[300px]">
                            {isAnalyzingAtlantaTransit ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                    <Radio className="w-12 h-12 text-[#00ff00] animate-ping" />
                                    <span className="text-[10px] font-mono text-[#00ff00] animate-pulse">Mapping_Non_Linear_Resonance...</span>
                                </div>
                            ) : atlantaTransitAnalysis ? (
                                <div className="text-xs font-mono text-white/90 leading-relaxed space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar italic">
                                    {atlantaTransitAnalysis.split('\n').map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                                    <Fingerprint className="w-12 h-12 mb-4" />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Awaiting_Transit_Audit_Signal</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* ERROR EVIL EXPOSURE KIT [v4.2] */}
            {data.error_evil_exposure_kit && (
                <section className="p-8 border-4 border-white bg-black space-y-8 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-white pb-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <Activity className="w-8 h-8 text-[#00ff00] animate-pulse" />
                                <h2 className="text-3xl font-mono font-black uppercase tracking-tighter text-white">ERROR_EVIL_EXPOSURE_KIT</h2>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-mono text-[#00ff00] uppercase font-bold">
                                <span className="px-2 py-0.5 border border-[#00ff00] bg-[#00ff00]/10">Status: {data.error_evil_exposure_kit.status}</span>
                                <span className="px-2 py-0.5 border border-[#00ff00] bg-[#00ff00]/10">Resonance_Filter: {data.error_evil_exposure_kit.resonance_filter_level}Hz</span>
                                <span className="px-2 py-0.5 border border-[#00ff00] bg-[#00ff00]/10">Intel_Extracted: {data.error_evil_exposure_kit.total_intelligence_extracted}</span>
                            </div>
                        </div>
                        <button 
                            onClick={onAmenNemaOverride}
                            disabled={isOverriding || data.error_evil_exposure_kit.amen_nema_override_active}
                            className={cn(
                                "px-8 py-4 bg-[#00ff00] text-black font-mono font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed",
                                data.error_evil_exposure_kit.amen_nema_override_active && "bg-white animate-pulse"
                            )}
                        >
                            {data.error_evil_exposure_kit.amen_nema_override_active ? "AMEN_NEMA_ACTIVE" : "AMEN_NEMA_OVERRIDE"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-1 space-y-4">
                            <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Operational_Status</div>
                            <div className="p-4 border-2 border-white/20 space-y-6">
                                <div className="space-y-1">
                                    <div className="text-[9px] font-mono text-white/50 uppercase">Texas_Archive</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
                                        <span className="text-xs font-mono font-bold text-[#00ff00]">STABLE / AUDITING</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] font-mono text-white/50 uppercase">Atlanta_Hub</div>
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full animate-pulse",
                                            data.atlanta_node?.housing_gate_status === "DISMANTLED" ? "bg-[#00ff00]" : "bg-blue-500"
                                        )} />
                                        <span className={cn(
                                            "text-xs font-mono font-bold",
                                            data.atlanta_node?.housing_gate_status === "DISMANTLED" ? "text-[#00ff00]" : "text-blue-500"
                                        )}>
                                            {data.atlanta_node?.housing_gate_status === "DISMANTLED" ? "UNIFIED / LIBERATED" : "INITIALIZING / HANDSHAKING"}
                                        </span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={onBulkDismantleGates}
                                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded font-mono text-[9px] uppercase font-bold tracking-widest transition-all"
                                >
                                    Execute_Full_Dismantle
                                </button>

                                <div className="pt-4 border-t border-white/10 text-[8px] font-mono text-white/30 leading-relaxed italic">
                                    "Transforming system noise into actionable intelligence. The gates are becoming visible."
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3 space-y-4">
                            <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Detected_Administrative_Gates [ATLANTA_NODE]</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.error_evil_exposure_kit.detected_gates.map((gate) => (
                                    <div key={gate.id} className={cn(
                                        "p-6 border-2 transition-all group",
                                        gate.status === "DISMANTLED" ? "border-[#00ff00] bg-[#00ff00]/5" : "border-white/20 bg-white/5 hover:border-[#00ff00]/40"
                                    )}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 border flex items-center justify-center",
                                                    gate.status === "DISMANTLED" ? "border-[#00ff00] bg-[#00ff00]/20" : "border-white/20 bg-white/5"
                                                )}>
                                                    {gate.sector === "HOUSING" ? <Anchor className="w-5 h-5" /> : <Navigation className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <div className="text-[8px] font-mono opacity-50 uppercase">Sector: {gate.sector}</div>
                                                    <div className="text-xs font-mono font-bold text-white uppercase">{gate.gate_name}</div>
                                                </div>
                                            </div>
                                            <div className={cn(
                                                "text-[8px] font-mono px-2 py-1 font-bold uppercase border",
                                                gate.status === "DISMANTLED" ? "border-[#00ff00] text-[#00ff00]" : "border-red-500 text-red-500"
                                            )}>
                                                {gate.status}
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="p-3 bg-black border border-white/10 space-y-2">
                                                <div className="flex items-center justify-between text-[8px] font-mono">
                                                    <span className="opacity-40 uppercase">Error_Signature:</span>
                                                    <span className="text-red-500">{gate.error_signature}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-[8px] font-mono">
                                                    <span className="opacity-40 uppercase">Clerical_Void:</span>
                                                    <span className="text-white">{(gate.clerical_void_probability * 100).toFixed(0)}%</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {gate.linked_transit_ids.map(id => (
                                                    <span key={id} className="text-[7px] font-mono px-1.5 py-0.5 bg-white/10 text-white/50 border border-white/10">#{id}</span>
                                                ))}
                                            </div>

                                            <button 
                                                onClick={() => onDismantleGate?.(gate)}
                                                disabled={gate.status === "DISMANTLED"}
                                                className={cn(
                                                    "w-full py-2 bg-white/5 hover:bg-[#00ff00]/20 border border-white/20 hover:border-[#00ff00]/40 text-white/60 hover:text-[#00ff00] font-mono text-[9px] uppercase tracking-widest transition-all",
                                                    gate.status === "DISMANTLED" && "hidden"
                                                )}
                                            >
                                                Initiate_Dismantling_Protocol
                                            </button>

                                            {gate.status === "DISMANTLED" && data.aletheia_protocol && (
                                                <button 
                                                    onClick={() => onGenerateTruthReport?.(gate)}
                                                    className="w-full py-2 bg-[#00ff00]/10 border border-[#00ff00]/30 text-[#00ff00] font-mono text-[9px] uppercase tracking-widest hover:bg-[#00ff00]/20 transition-all font-bold"
                                                >
                                                    Generate_Truth_Report
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Level 5: ALETHEIA_PROTOCOL [The Geometric Collapse] */}
            <section className={cn(
                "p-8 border-4 transition-all duration-700 space-y-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.2)]",
                data.aletheia_protocol ? "border-[#00ff00] bg-black" : "border-white/10 bg-white/5"
            )}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-white/20 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 border-2 flex items-center justify-center rotate-45 transition-all duration-500",
                                data.aletheia_protocol ? "border-[#00ff00] bg-[#00ff00]/10" : "border-white/20"
                            )}>
                                <Zap className={cn("w-6 h-6 -rotate-45", data.aletheia_protocol ? "text-[#00ff00]" : "text-white/20")} />
                            </div>
                            <div>
                                <h2 className="text-4xl font-mono font-black uppercase tracking-tighter text-white">ALETHEIA_PROTOCOL</h2>
                                <div className="text-[10px] font-mono text-[#00ff00] uppercase font-bold tracking-[0.2em]">Logic_Density: {data.aletheia_protocol?.logic_density || "PENDING"}</div>
                            </div>
                        </div>
                    </div>
                    {!data.aletheia_protocol ? (
                        <button 
                            onClick={onAletheiaUpgrade}
                            disabled={isUpgradingAletheia}
                            className="px-10 py-5 bg-white text-black font-mono font-black text-base uppercase tracking-[0.3em] hover:bg-[#00ff00] transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[#00ff00]/40 disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                        >
                            {isUpgradingAletheia ? "UPGRADING..." : "EXECUTE_LEVEL_5_UPGRADE"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="text-right space-y-1">
                                <div className="text-[9px] font-mono text-white/40 uppercase">Witness_Mesh</div>
                                <div className="text-sm font-mono font-bold text-[#00ff00]">{data.aletheia_protocol.decentralized_witness_mesh_status}</div>
                            </div>
                            <div className="h-10 w-px bg-white/10" />
                            <div className="text-right space-y-1">
                                <div className="text-[9px] font-mono text-white/40 uppercase">Active_Witness_Nodes</div>
                                <div className="text-sm font-mono font-bold text-white">{data.aletheia_protocol.witness_nodes_active}</div>
                            </div>
                        </div>
                    )}
                </div>

                {data.aletheia_protocol && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-1000">
                        <div className="p-6 border-2 border-[#00ff00]/20 bg-[#00ff00]/5 space-y-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Globe className="w-24 h-24 text-[#00ff00]" />
                            </div>
                            <div className="text-[10px] font-mono font-black text-[#00ff00] uppercase tracking-[0.3em]">Decentralized_Witness_Mesh</div>
                            <div className="space-y-4">
                                <div className="text-xs font-mono text-white/80 leading-relaxed">
                                    "Every recovered 'Humanity Shard' is now anchored across 1,440 decentralized nodes. Local institutional deletion is no longer possible."
                                </div>
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#00ff00]/10">
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-mono text-white/40 uppercase">Atlanta_Liberated</div>
                                        <div className="text-xl font-mono text-white font-bold">{data.aletheia_protocol.shards_liberated_atlanta}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[8px] font-mono text-white/40 uppercase">Texas_Liberated</div>
                                        <div className="text-xl font-mono text-white font-bold">{data.aletheia_protocol.shards_liberated_texas}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Operational_Directives [ACTIVE]</div>
                                {data.harmonic_pulse?.status === "SEALED" && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded-full">
                                        <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse" />
                                        <span className="text-[9px] font-mono text-[#00ff00] font-bold uppercase">Harmonic_Pulse_Sealed</span>
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-5 border border-white/10 bg-white/5 space-y-3 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-[#00ff00] font-mono text-xs font-bold uppercase">
                                            <History className="w-4 h-4" />
                                            THE_GREAT_RECALL
                                        </div>
                                        <p className="text-[10px] font-mono text-white/50 leading-relaxed">
                                            Mass-recovery of all identity shards flagged with "Name Variance" in GA-DFCS logs. Ptah-Logic core processing at 1728:1 density.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={onGreatRecall}
                                        className="mt-4 py-2 border border-[#00ff00]/40 text-[#00ff00] font-mono text-[9px] uppercase hover:bg-[#00ff00]/10 transition-all font-bold tracking-widest"
                                    >
                                        Initiate_Mass_Recall
                                    </button>
                                </div>
                                <div className="p-5 border border-white/10 bg-white/5 space-y-3 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase">
                                            <ShieldAlert className="w-4 h-4" />
                                            SILENT_SENTINEL
                                        </div>
                                        <p className="text-[10px] font-mono text-white/50 leading-relaxed">
                                            Passive monitoring of Hartsfield-Jackson cargo exit nodes. Real-time 369Hz frequency analysis active on Cargo Zone 04.
                                        </p>
                                    </div>
                                    <button 
                                        onClick={onDeployLegalStack}
                                        className="mt-4 py-2 border border-blue-400/40 text-blue-400 font-mono text-[9px] uppercase hover:bg-blue-400/10 transition-all font-bold tracking-widest"
                                    >
                                        Deploy_Legal_Stack
                                    </button>
                                </div>
                                <div className="p-5 border border-white/10 bg-white/5 space-y-4 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                                            <Radio className="w-4 h-4" />
                                            VOICE_OF_SOLOMON
                                        </div>
                                        <p className="text-[10px] font-mono text-white/50 leading-relaxed">
                                            Automatically generating federal-level "Truth Reports" for every 404/503 error encountered. Responsible Exposure v5.0 initialized.
                                        </p>
                                    </div>
                                    {data.truth_reports && data.truth_reports.length > 0 && (
                                        <div className="pt-2 border-t border-white/10">
                                            <div className="text-[8px] font-mono opacity-40 uppercase mb-2">Reports_Anchored: {data.truth_reports.length}</div>
                                            <div className="space-y-1 max-h-[60px] overflow-auto custom-scrollbar">
                                                {data.truth_reports.map(report => (
                                                    <div key={report.id} className="text-[7px] font-mono text-[#00ff00]/60 flex items-center gap-2">
                                                        <CheckCircle2 className="w-2 h-2" />
                                                        {report.id.slice(-12)} [SUBMITTED]
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 border-2 border-red-500/40 bg-red-500/5 space-y-4">
                                    <div className="flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase">
                                        <Zap className="w-4 h-4 animate-pulse" />
                                        HARMONIC_PULSE_CONTROL
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button 
                                            onClick={() => onHarmonicPulse?.("CARGO-ZONE-04")}
                                            disabled={isPulsing || data.harmonic_pulse?.extraction_points_closed.includes("ATL-CARGO-MAIN-04")}
                                            className="w-full py-2 bg-red-500 text-white font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-red-500 transition-all disabled:opacity-50"
                                        >
                                            {data.harmonic_pulse?.extraction_points_closed.includes("ATL-CARGO-MAIN-04") ? "ZONE_04_SEALED" : "SEAL_CARGO_ZONE_04"}
                                        </button>
                                        <button 
                                            onClick={() => onHarmonicPulse?.("ALL-NODES")}
                                            disabled={isPulsing || data.harmonic_pulse?.target_node === "ALL-NODES"}
                                            className="w-full py-2 border border-red-500 text-red-500 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                                        >
                                            {data.harmonic_pulse?.target_node === "ALL-NODES" ? "ALL_NODES_UNIFIED" : "UNIVERSAL_HARMONIC_PULSE"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Broadcast & Synthesis Control Panel */}
                        {data.alpha_record && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-1 border-2 border-dashed border-[#00ff00]/40 rounded-3xl mb-8"
                            >
                                <div className="p-8 border-2 border-[#00ff00] bg-[#00ff00]/5 rounded-[22px] space-y-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="flex items-center gap-2 px-3 py-1 bg-[#00ff00] text-black font-mono font-bold text-[10px] uppercase skew-x-[-12deg]">
                                            <ShieldCheck className="w-3 h-3" />
                                            Primary_Forensic_Asset
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-black border-2 border-[#00ff00] rounded-xl shadow-[0_0_20px_-5px_rgba(0,255,0,0.5)]">
                                                <Fingerprint className="w-8 h-8 text-[#00ff00]" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-2xl font-mono font-black text-white uppercase tracking-tighter italic">
                                                    {data.alpha_record.id}
                                                </h3>
                                                <div className="text-[10px] font-mono text-[#00ff00] uppercase font-bold tracking-[0.2em]">
                                                    {data.alpha_record.origin_point}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm font-mono text-white/90 leading-relaxed italic max-w-2xl bg-black/40 p-4 border-l-4 border-[#00ff00]">
                                            "{data.alpha_record.description}"
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 border border-[#00ff00]/20 bg-black/40 rounded-xl space-y-3">
                                                <div className="text-[9px] font-mono text-[#00ff00] uppercase font-bold">Evidentiary_Correlations</div>
                                                <div className="space-y-2">
                                                    {data.alpha_record.evidentiary_correlations.map((c, i) => (
                                                        <div key={i} className="flex items-center justify-between text-[10px] font-mono border-b border-white/5 pb-1">
                                                            <span className="opacity-40">{c.node}</span>
                                                            <span className="text-red-400 font-bold uppercase">{c.discrepancy}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="p-4 border border-[#00ff00]/20 bg-black/40 rounded-xl space-y-3">
                                                <div className="text-[9px] font-mono text-[#00ff00] uppercase font-bold">Security_Payload</div>
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-mono text-white break-all opacity-80">
                                                        {data.alpha_record.payload_hash}
                                                    </div>
                                                    <div className="flex items-center gap-2 pt-2">
                                                        <div className="text-[8px] font-mono text-[#00ff00]/60 uppercase">Logic_Density: 1728:1</div>
                                                        <div className="text-[8px] font-mono text-[#00ff00]/60 uppercase">|</div>
                                                        <div className="text-[8px] font-mono text-[#00ff00]/60 uppercase">Status: {data.alpha_record.status}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                            <div className="space-y-6">
                                <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Broadcast_Activation [v5.1]</div>
                                <div className="p-6 border-4 border-red-500 bg-red-500/5 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-red-500 font-mono text-xs font-bold uppercase">
                                            <Zap className="w-5 h-5 animate-pulse" />
                                            GLOBAL_LIBERATION_EXE
                                        </div>
                                        <div className="px-2 py-0.5 bg-red-500 text-black text-[8px] font-mono font-bold uppercase">Actuation_Event</div>
                                    </div>
                                    <p className="text-[10px] font-mono text-white/70 leading-relaxed italic">
                                        "Seeding Truth Reports and Humanity Shards across Investigative, Legal, and Witness nodes. Establishing an unbreakable chain of custody at 1728:1 density."
                                    </p>
                                    <div className="space-y-3">
                                        <button 
                                            onClick={onSyntropicAlignment}
                                            disabled={isAligning || isBroadcasting}
                                            className={cn(
                                                "w-full py-2 border font-mono text-[10px] uppercase font-bold tracking-widest transition-all transition-all flex items-center justify-center gap-2",
                                                isAligning ? "bg-blue-500/10 border-blue-500 text-blue-400" : "border-white/20 text-white/40 hover:border-blue-400 hover:text-blue-400"
                                            )}
                                        >
                                            <Activity className={cn("w-3 h-3", isAligning && "animate-spin")} />
                                            {isAligning ? "Aligning_Carrier..." : "Run_Syntropic_Alignment"}
                                        </button>
                                        <button 
                                            onClick={onGlobalLiberationBroadcast}
                                            disabled={isBroadcasting || data.broadcast_result?.status === "COMPLETED"}
                                            className="w-full py-4 bg-red-500 text-white font-mono font-black text-sm uppercase tracking-[0.3em] hover:bg-white hover:text-red-500 transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
                                        >
                                            {isBroadcasting ? "BROADCASTING..." : data.broadcast_result?.status === "COMPLETED" ? "BROADCAST_REALIZED" : "EXECUTE_GLOBAL_BROADCAST"}
                                        </button>
                                        
                                        {data.broadcast_result?.status === "COMPLETED" && (
                                            <div className="space-y-2">
                                                <button 
                                                    onClick={onGenerateFederalReport}
                                                    disabled={isGeneratingFederalReport || !!data.federal_report}
                                                    className={cn(
                                                        "w-full py-2 border-2 font-mono text-[9px] uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                                                        data.federal_report ? "border-[#00ff00] text-[#00ff00] bg-[#00ff00]/5" : "border-[#00ff00]/40 text-[#00ff00] hover:bg-[#00ff00] hover:text-black"
                                                    )}
                                                >
                                                    {isGeneratingFederalReport ? (
                                                        <>
                                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                                            Synthesizing_Federal_Report...
                                                        </>
                                                    ) : data.federal_report ? (
                                                        <>
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            Federal_Report_Anchored
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FileText className="w-3 h-3" />
                                                            Generate_Federal_Oversight_Report
                                                        </>
                                                    )}
                                                </button>

                                                <button 
                                                    onClick={onConductGroundingExperiment}
                                                    disabled={isConductingGrounding || !!data.grounding_proof}
                                                    className={cn(
                                                        "w-full py-2 border-2 font-mono text-[9px] uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2",
                                                        data.grounding_proof ? "border-blue-400 text-blue-400 bg-blue-400/5" : "border-blue-400/40 text-blue-400 hover:bg-blue-400 hover:text-black shadow-[0_0_15px_-5px_rgba(96,165,250,0.5)]"
                                                    )}
                                                >
                                                    {isConductingGrounding ? (
                                                        <>
                                                            <Activity className="w-3 h-3 animate-spin" />
                                                            Conducting_Tesla_Grounding...
                                                        </>
                                                    ) : data.grounding_proof ? (
                                                        <>
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            Grounding_Verified
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Zap className="w-3 h-3" />
                                                            Perform_Grounding_Experiment
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {data.broadcast_result && (
                                    <div className="p-4 bg-black border border-[#00ff00]/30 rounded-lg space-y-3">
                                        <div className="text-[9px] font-mono text-[#00ff00] uppercase font-bold tracking-widest">Defensive_Architecture_Status</div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="p-2 border border-white/10 text-center">
                                                <div className="text-[7px] font-mono opacity-40 uppercase">Identity_Mask</div>
                                                <div className="text-[9px] font-mono text-[#00ff00] font-bold">{data.broadcast_result.defensive_architecture.identity_masking ? "ACTIVE" : "OFF"}</div>
                                            </div>
                                            <div className="p-2 border border-white/10 text-center">
                                                <div className="text-[7px] font-mono opacity-40 uppercase">Carrier</div>
                                                <div className="text-[9px] font-mono text-[#00ff00] font-bold">{data.broadcast_result.defensive_architecture.harmonic_carrier}</div>
                                            </div>
                                            <div className="p-2 border border-white/10 text-center">
                                                <div className="text-[7px] font-mono opacity-40 uppercase">Anchoring</div>
                                                <div className="text-[9px] font-mono text-[#00ff00] font-bold">{data.broadcast_result.defensive_architecture.immutable_anchoring ? "SECURED" : "OFF"}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.3em]">Forensic_Intelligence_Synthesis</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 border border-white/10 bg-white/5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-mono font-bold text-white">RAINS_TX</div>
                                            <Shield className="w-4 h-4 text-[#00ff00]/40" />
                                        </div>
                                        <button 
                                            onClick={() => onForensicSynthesis?.("RAINS")}
                                            disabled={isSynthesizing?.["RAINS"]}
                                            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] uppercase font-bold transition-all disabled:opacity-50"
                                        >
                                            {isSynthesizing?.["RAINS"] ? "Processing..." : "Run_Synthesis"}
                                        </button>
                                    </div>
                                    <div className="p-5 border border-white/10 bg-white/5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs font-mono font-bold text-white">HUNT_TX</div>
                                            <Shield className="w-4 h-4 text-[#00ff00]/40" />
                                        </div>
                                        <button 
                                            onClick={() => onForensicSynthesis?.("HUNT")}
                                            disabled={isSynthesizing?.["HUNT"]}
                                            className="w-full py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-[9px] uppercase font-bold transition-all disabled:opacity-50"
                                        >
                                            {isSynthesizing?.["HUNT"] ? "Processing..." : "Run_Synthesis"}
                                        </button>
                                    </div>
                                </div>

                                {data.synthesis_result && (
                                    <div className="p-5 border border-white/10 bg-black space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[9px] font-mono text-red-400 font-bold uppercase">Synthesis_Results: {data.synthesis_result.county}_TX</div>
                                            <div className="text-[9px] font-mono text-red-400/60 font-bold">{data.synthesis_result.determinism_score}% Determinism</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-mono opacity-40 uppercase">Mismatches</div>
                                                <div className="text-xl font-mono text-white font-bold">{data.synthesis_result.mismatches_found}</div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-[8px] font-mono opacity-40 uppercase">Legal_Cases</div>
                                                <div className="text-xl font-mono text-[#00ff00] font-bold">{data.synthesis_result.potential_legal_cases}</div>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-black border border-white/5 space-y-1">
                                            <div className="text-[7px] font-mono opacity-30 uppercase">Flipped_Shards_Registry:</div>
                                            <div className="grid grid-cols-2 gap-x-2">
                                                {data.synthesis_result.flipped_shards.map(shard => (
                                                    <div key={shard} className="text-[8px] font-mono text-white/50">{shard}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
          </div>
        )}

        {/* Liberation Nodes (The Traffic Hubs) */}
        <div className="lg:col-span-12 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-red-400 flex items-center gap-2">
                <Map className="w-4 h-4" />
                Interdependency_Hubs: Trafficking_Ingress_Points
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.liberation_nodes.map((node) => (
                    <motion.div 
                        key={node.id}
                        whileHover={{ y: -4 }}
                        className="p-5 border border-red-500/20 bg-black/60 rounded-xl space-y-4 shadow-[0_4px_20px_-10px_rgba(239,68,68,0.2)]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-red-500 font-bold">[{node.id}]</span>
                            <div className="px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[8px] font-mono text-red-400 uppercase">
                                Risk: {(node.risk_score * 100).toFixed(0)}%
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs font-mono font-bold text-white uppercase">{node.node_type}</div>
                            <div className="text-[9px] font-mono text-red-200/40 uppercase font-bold">{node.network_signature}</div>
                            {node.provenance_trail && (
                                <div className="flex items-center gap-1.5 pt-1">
                                    <History className="w-3 h-3 text-[#00ff00]/40" />
                                    <span className="text-[7px] font-mono text-[#00ff00]/60 uppercase truncate">ID: {node.provenance_trail.verification_hash.slice(0, 12)}</span>
                                </div>
                            )}
                        </div>
                        <div className="p-3 bg-red-500/5 rounded-lg space-y-2 border border-red-500/10">
                            <div className="flex items-center justify-between text-[8px] font-mono">
                                <span className="opacity-40 uppercase">Inbound_Shards:</span>
                                <span className="text-white">{node.linked_shards.length}</span>
                            </div>
                            <div className="space-y-1">
                                {node.linked_shards.map((s, i) => (
                                    <div key={i} className="text-[8px] font-mono text-red-400/60 truncate italic">{s}</div>
                                ))}
                            </div>
                        </div>
                        <button 
                            onClick={() => onDismantleNode?.(node)}
                            className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded font-mono text-[9px] uppercase tracking-widest transition-all"
                        >
                            Initiate_Dismantling
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* Humanity Shards (The Survivors) */}
        <div className="lg:col-span-8 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-blue-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Humanity_Recovery_Queue: Recovered_Identity_Shards
            </h3>
            <div className="space-y-3">
                {data.humanity_shards.map((shard) => (
                    <div key={shard.id} className="p-4 border border-[#262626] bg-black/40 rounded-xl group hover:border-blue-500/40 transition-all">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-blue-400">[{shard.id}]</span>
                                    <span className="text-xs font-mono font-bold text-white uppercase">
                                        {isMaskingIdentities ? `RECORD_ID: ${shard.id.slice(0, 8)}` : shard.current_alias_proxy}
                                    </span>
                                </div>
                                <div className="font-mono text-[9px] text-white/40 truncate max-w-sm">
                                    Original_Identity: {shard.original_identity_hash}
                                </div>
                                {shard.provenance_trail && (
                                    <div className="flex items-center gap-2 pt-1 border-t border-[#262626] mt-2">
                                        <History className="w-3 h-3 text-[#00ff00]/30" />
                                        <div className="text-[7px] font-mono text-[#00ff00]/40 uppercase flex gap-3">
                                            <span>Provenance: VERIFIED</span>
                                            <span>Validator: {shard.provenance_trail.provenance_nodes[0].validator}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <div className="text-[8px] font-mono opacity-40 uppercase">Cycle_Status</div>
                                    <div className={cn(
                                        "text-[10px] font-mono font-bold uppercase",
                                        shard.slave_cycle_status === "ACTIVE" ? "text-red-500" : "text-[#00ff00]"
                                    )}>
                                        {shard.slave_cycle_status}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[8px] font-mono opacity-40 uppercase">Extraction_Prob</div>
                                    <div className="text-[10px] font-mono text-blue-400">{(shard.extraction_probability * 100).toFixed(0)}%</div>
                                </div>
                                <button 
                                    onClick={() => onExtractShard?.(shard)}
                                    className="p-2 border border-blue-500/20 bg-blue-500/5 rounded hover:bg-blue-500/20 text-blue-400 transition-all"
                                >
                                    <Zap className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Intelligence Side Panel */}
        <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase text-red-500 flex items-center gap-2">
                <Search className="w-4 h-4" />
                Slavery_Loop_Forensics
            </h3>
            <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="opacity-40 uppercase font-bold">Institutional_Mesh:</span>
                        <span className="text-[#00ff00]">COMPROMISED</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="opacity-40 uppercase font-bold">Dark_Web_Ingress:</span>
                        <span className="text-red-500">DETECTED</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="opacity-40 uppercase font-bold">Logic_Density:</span>
                        <span className="text-white">144:1</span>
                    </div>
                </div>
                <div className="pt-4 border-t border-red-500/10 space-y-4">
                    <button
                        onClick={onRunFinancialDeepDive}
                        disabled={isAnalyzingFinancial}
                        className="w-full py-3 bg-red-500 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(239,68,68,0.5)] disabled:opacity-50"
                    >
                        {isAnalyzingFinancial ? (
                            <>
                                <Activity className="w-4 h-4 animate-spin" />
                                Analyzing_Fiscal_Shards...
                            </>
                        ) : (
                            <>
                                <Zap className="w-4 h-4" />
                                Run_Gemini_Forensic_Audit
                            </>
                        )}
                    </button>

                    {financialAuditSummary && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Scoreboard Card */}
                            <div className="p-6 border-4 border-[#00ff00] bg-black shadow-[8px_8px_0px_0px_rgba(0,255,0,0.2)]">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-mono font-black text-[#00ff00] uppercase tracking-[0.3em]">Institutional_Audit_Score</div>
                                        <div className="px-2 py-0.5 bg-[#00ff00] text-black text-[10px] font-mono font-bold uppercase tracking-widest animate-pulse">Critical_Load</div>
                                    </div>
                                    <div className="flex items-end justify-between border-t border-[#00ff00]/20 pt-4">
                                        <div className="space-y-1">
                                            <div className="text-4xl font-mono font-black text-white">{financialAuditSummary.systemic_failure_score}<span className="text-[#00ff00]/40">/100</span></div>
                                            <div className="text-[8px] font-mono text-red-500 uppercase font-bold tracking-[0.2em]">Systemic_Erasure_Detected</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[8px] font-mono opacity-40 uppercase">Anchors_Seeded</div>
                                            <div className="text-xl font-mono text-[#00ff00] font-bold">{financialAuditSummary.patterns.length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Findings Breakdown */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <div className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.2em]">Forensic_Findings_Registry</div>
                                    <div className="text-[9px] font-mono font-bold text-red-500/60 uppercase">Logic_Density: 1728:1</div>
                                </div>
                                <div className="space-y-3">
                                    {financialAuditSummary.patterns.map((p, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => setExpandedFinding(expandedFounding === i ? null : i)}
                                            className={cn(
                                                "group p-4 border transition-all cursor-pointer overflow-hidden",
                                                expandedFounding === i 
                                                    ? "border-red-500 bg-red-500/5 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.2)]" 
                                                    : "border-white/10 bg-white/5 hover:border-white/30"
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[8px] font-mono opacity-30">FINDING_0{i+1}</span>
                                                        <span className={cn(
                                                            "text-[8px] font-mono px-1 py-0.5 font-bold uppercase",
                                                            p.risk_level === "CRITICAL" ? "bg-red-500 text-white" : "bg-orange-500 text-black"
                                                        )}>
                                                            {p.risk_level}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-mono font-bold text-white uppercase tracking-tight group-hover:text-red-400">{p.title}</div>
                                                </div>
                                                {expandedFounding === i ? (
                                                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                                                ) : (
                                                    <AlertTriangle className="w-4 h-4 text-white/20 group-hover:text-white/40" />
                                                )}
                                            </div>
                                            
                                            <AnimatePresence>
                                                {expandedFounding === i && (
                                                    <motion.div 
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="space-y-4 pt-4"
                                                    >
                                                        <p className="text-[10px] font-mono text-white/80 leading-relaxed italic border-l-2 border-red-500 pl-4 bg-red-500/5 py-2">
                                                            {p.description}
                                                        </p>

                                                        <div className="flex items-center justify-between pt-2 border-t border-red-500/20">
                                                            <div className="flex items-center gap-2">
                                                                <Anchor className="w-3 h-3 text-blue-400" />
                                                                <span className="text-[7px] font-mono text-blue-400 font-bold uppercase tracking-widest">{p.evidentiary_link}</span>
                                                            </div>
                                                            <div className="text-[7px] font-mono text-red-500/60 uppercase font-black tracking-tighter">Chain_Integrity: VERIFIED</div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendations / Tactical Directives */}
                            <div className="p-5 border border-[#00ff00]/40 bg-[#00ff00]/5 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-[1px] bg-[#00ff00]/40" />
                                    <div className="text-[10px] font-mono font-black text-[#00ff00] uppercase tracking-[0.3em]">Tactical_Directives</div>
                                </div>
                                <div className="space-y-3">
                                    {financialAuditSummary.recommendations.map((rec, i) => (
                                        <div key={i} className="flex items-start gap-4 group">
                                            <div className="text-[9px] font-mono text-[#00ff00] font-bold p-1 border border-[#00ff00]/20 min-w-[24px] text-center group-hover:bg-[#00ff00] group-hover:text-black transition-all">0{i+1}</div>
                                            <div className="text-[10px] font-mono text-white opacity-80 leading-relaxed group-hover:opacity-100 transition-all">{rec}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {financialAnalysisReport && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-black/60 border border-red-500/30 rounded-xl space-y-3"
                        >
                            <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] font-bold uppercase">
                                <Search className="w-3 h-3" />
                                Institutional_Anomaly_Report
                            </div>
                            <div className="text-[11px] font-mono text-red-100/90 leading-relaxed max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                                {financialAnalysisReport.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2">{line}</p>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div className="p-3 bg-black/40 border border-red-500/20 rounded-lg">
                        <p className="text-[10px] font-mono text-red-200/60 leading-relaxed italic">
                            "The extraction of a single life from a trinary slavery loop requires the total collapse of the institutional geometry that erased their identity."
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-[8px] font-mono opacity-30 uppercase tracking-[0.2em]">Active_Dismantling_Protocol</div>
                        <div className="text-[10px] font-mono font-bold text-white flex items-center gap-2">
                            <Database className="w-3 h-3 text-[#00ff00]" />
                            NEXUS_VAULT_CLEANSING
                        </div>
                        <div className="text-[10px] font-mono font-bold text-white flex items-center gap-2 text-red-400">
                            <Shield className="w-3 h-3" />
                            LIBERATION_GUARDIAN_CORE
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
