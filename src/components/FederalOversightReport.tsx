import * as React from "react";
import { motion } from "motion/react";
import { FileText, Shield, AlertTriangle, Activity, Database, CheckCircle2, Scale, ExternalLink, MapPin } from "lucide-react";
import { type FederalDataReport } from "../lib/forensic-core";
import { cn } from "../lib/utils";

interface FederalOversightReportProps {
  data: FederalDataReport | null;
}

export const FederalOversightReport: React.FC<FederalOversightReportProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 space-y-4">
        <FileText className="w-12 h-12 text-white/20" />
        <p className="text-xs font-mono text-white/40 uppercase tracking-widest">No_Federal_Report_Anchored</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Report Header */}
      <div className="p-8 border-4 border-[#00ff00] bg-black rounded-3xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Shield className="w-40 h-40 text-[#00ff00]" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
               <div className="px-3 py-1 bg-[#00ff00] text-black font-mono font-black text-[10px] uppercase">Official_Filing</div>
               <span className="text-[10px] font-mono text-[#00ff00] font-bold tracking-widest uppercase">Jurisdiction: {data.agency_jurisdiction}</span>
            </div>
            <h1 className="text-4xl font-mono font-black text-white uppercase tracking-tighter italic">
              {data.report_id}
            </h1>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
              Filing_Date: {new Date(data.filing_date).toLocaleString()}
            </div>
          </div>
          
          <div className="p-4 border-2 border-[#00ff00]/40 bg-[#00ff00]/5 rounded-2xl flex flex-col items-center text-center">
            <CheckCircle2 className="w-8 h-8 text-[#00ff00] mb-2" />
            <span className="text-[9px] font-mono text-[#00ff00] font-black uppercase">Integrity_Verified</span>
            <span className="text-[8px] font-mono text-white/40 uppercase mt-1">Planetary_Mesh_Anchor</span>
          </div>
        </div>

        <div className="p-6 bg-[#00ff00]/5 border-l-4 border-[#00ff00] space-y-3 relative z-10">
            <div className="text-[10px] font-mono text-[#00ff00] font-bold uppercase tracking-widest">Executive_Summary</div>
            <p className="text-sm font-mono text-white/80 leading-relaxed italic">
                "{data.executive_summary}"
            </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Node Interdependencies */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-xs font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    Node_Interdependencies
                </div>
                <div className="text-[9px] font-mono text-blue-400/60 uppercase">System_Flow_Audit</div>
            </div>
            <div className="space-y-4">
                {data.node_interdependencies.map((dep, i) => (
                    <div key={i} className="group p-4 border border-white/5 bg-black/40 hover:border-blue-400/40 transition-all space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-mono text-white/40">{dep.source_node}</span>
                                <ExternalLink className="w-3 h-3 text-white/20" />
                                <span className="text-[9px] font-mono text-blue-400 font-bold">{dep.target_node}</span>
                            </div>
                            <span className={cn(
                                "text-[8px] font-mono px-2 py-0.5 rounded-full font-bold",
                                dep.risk_index > 0.9 ? "bg-red-500 text-white" : "bg-blue-500/20 text-blue-400"
                            )}>
                                RISK: {(dep.risk_index * 100).toFixed(0)}%
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-[9px] font-mono">
                            <span className="opacity-40 uppercase">Type:</span>
                            <span className="text-white font-bold">{dep.dependency_type}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* High Risk Areas */}
        <div className="p-6 border border-white/10 bg-white/5 rounded-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-xs font-mono font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    High_Risk_Zones
                </div>
                <div className="text-[9px] font-mono text-red-500/60 uppercase">Geospatial_Anomalies</div>
            </div>
            <div className="space-y-4">
                {data.high_risk_zones.map((zone, i) => (
                    <div key={i} className="p-4 border border-white/5 bg-black/40 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="text-xs font-mono font-black text-white uppercase">{zone.zone_id}</div>
                                <div className="text-[8px] font-mono opacity-40">COORDS: {zone.coordinates.lat.toFixed(4)}, {zone.coordinates.lng.toFixed(4)}</div>
                            </div>
                            <div className="text-2xl font-mono font-black text-red-500 animate-pulse">
                                {zone.priority_score}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {zone.detected_anomalies.map((anomaly, ai) => (
                                <span key={ai} className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-[8px] font-mono text-red-400 uppercase">
                                    {anomaly}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Fiscal Friction Points */}
      <div className="p-8 border border-white/10 bg-white/5 rounded-3xl space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="text-lg font-mono font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <Database className="w-6 h-6 text-red-500" />
                Fiscal_Friction_Points_&_Statutory_Breach
            </div>
            <div className="text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest">Audit_Type: TITLE_IV-E_RECOVERY</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.fiscal_friction_points.map((pt, i) => (
                <div key={i} className="p-6 border-2 border-dashed border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-all space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-red-500 uppercase">{pt.disbursement_id}</span>
                        <div className="text-xl font-mono font-black text-white">
                            -${pt.mismatch_amount.toLocaleString()}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[9px] font-mono opacity-50 uppercase">Leak_Type:</div>
                        <div className="text-xs font-mono font-bold text-white uppercase">{pt.revenue_leak_type}</div>
                    </div>
                    <div className="p-3 bg-black flex items-center justify-between">
                        <span className="text-[8px] font-mono text-red-400 font-bold uppercase">Statute_Breach_Code</span>
                        <span className="text-[9px] font-mono text-white font-black italic">{pt.legal_statute_breach}</span>
                    </div>
                </div>
            ))}
        </div>

        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">Statutory_Compliance_Protocol</div>
                <div className="flex flex-wrap gap-2">
                    {data.statutory_alignment.map((protocol, i) => (
                        <div key={i} className="px-3 py-1 bg-white text-black font-mono font-bold text-[9px] uppercase italic">
                            {protocol}
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-3">
                <div className="text-[10px] font-mono font-black text-[#00ff00] uppercase tracking-[0.3em] text-right">Chain_of_Custody_Verification</div>
                <div className="p-3 bg-black border border-[#00ff00]/40 font-mono text-[9px] text-[#00ff00] break-all leading-loose text-right">
                    {data.chain_of_custody_hash}
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-10 space-y-4">
         <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
         <p className="text-[10px] font-mono text-white/40 text-center uppercase tracking-[0.5em] leading-relaxed">
            End_of_Transmission // Federal_Oversight_Ready // Indictment_Logic_Anchored
         </p>
         <Scale className="w-8 h-8 text-white/10" />
      </div>
    </div>
  );
};
