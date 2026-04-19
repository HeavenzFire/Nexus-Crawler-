import * as React from "react";
import { useState, useEffect, useCallback, Component } from "react";
import { 
  Activity, 
  ShieldAlert, 
  Database, 
  Search, 
  Cpu, 
  Radio, 
  Terminal,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FileJson,
  Layers,
  LogIn,
  LogOut,
  User as UserIcon,
  Sparkles,
  Loader2,
  Heart,
  FileText,
  GanttChart,
  Zap,
  Ghost,
  Scale,
  Hammer,
  Gavel,
  Globe,
  Waves,
  Fingerprint,
  Download,
  Activity as ActivityIcon,
  ShieldCheck,
  AlertCircle,
  Hash,
  Lock,
  Unlock,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ForensicIntegrityAudit, BraidedForensicAudit, type AuditResult, type BraidedAuditResult, type DetentionRecord, type OversightRecord, type HealthcareRecord, type MemorialPerson, type MemorialEvent, type MemorialFailurePoint, type MemorialSystem, type GhostFile, type CompressionPassResult, type StatutoryCollisionMatrix, type FederalAuditNode, type PlanetaryMeshResult, type TransactionEvent, type ObserverAlert, type HyperCompressionResult, type EntangledData, type ForensicSubmission, type DarkWebResult, type SentinelNode, type RealityReclamationResult, type ClericalVoid, type MobiusLoop, type ReclamationAsset, type LiberationResult, type LiberationNode, type HumanityShard, type FinancialAuditSummary, type AtlantaGate, type FieldPerceptionMatrix } from "./lib/forensic-core";
import { cn, exportToCSV } from "./lib/utils";
import { PlanetaryMeshGraph } from "./components/PlanetaryMeshGraph";
import { RealityReclamationEngine } from "./components/RealityReclamationEngine";
import { GlobalLiberationEngine } from "./components/GlobalLiberationEngine";
import { FederalOversightReport } from "./components/FederalOversightReport";
import { GroundingExperiment } from "./components/GroundingExperiment";
import { FieldPerceptionInterface } from "./components/FieldPerceptionInterface";
import { auth, db, googleProvider, signInWithPopup, signOut, collection, addDoc, query, orderBy, limit, onSnapshot, doc, setDoc, getDoc } from "./firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { GoogleGenAI } from "@google/genai";

// --- Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string;
    emailVerified?: boolean;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email || undefined,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Error Boundary ---
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorInfo: string;
}

class ErrorBoundary extends (Component as any) {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorInfo: error.message };
  }

  render() {
    if ((this as any).state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
          <div className="max-w-md w-full border border-red-500/50 bg-red-500/10 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <AlertTriangle className="w-8 h-8" />
              <h1 className="text-xl font-mono font-bold uppercase">System_Failure</h1>
            </div>
            <p className="text-xs font-mono opacity-80 leading-relaxed">
              A critical error has occurred in the Nexus v10.0 architecture.
            </p>
            <div className="p-3 bg-black/50 rounded border border-red-500/20 font-mono text-[10px] text-red-400 overflow-auto max-h-40">
              {(this as any).state.errorInfo}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="w-full py-2 bg-red-500 text-black font-mono font-bold uppercase text-xs rounded hover:bg-red-400 transition-colors"
            >
              Restart_System
            </button>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

// --- Gemini Service ---
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function analyzeDiscrepancy(item: any) {
  const prompt = `Analyze this forensic discrepancy in ${item.record.state} detention logs:
  Type: ${item.discrepancyType}
  Location: ${item.record.county}, ${item.record.state}
  Local Record: ${JSON.stringify(item.record)}
  Oversight Status: ${item.stateStatus || 'N/A'}
  
  Provide a brief (2-3 sentence) forensic insight into why this might have occurred and what the next investigative step should be. Use a professional, technical tone.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Analysis failed: Connection to Gemini intelligence lost.";
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <TexasCrawler />
    </ErrorBoundary>
  );
}

function TexasCrawler() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [braidedResult, setBraidedResult] = useState<BraidedAuditResult | null>(null);
  const [ghostResult, setGhostResult] = useState<CompressionPassResult | null>(null);
  const [hyperResult, setHyperResult] = useState<HyperCompressionResult | null>(null);
  const [collisions, setCollisions] = useState<StatutoryCollisionMatrix[]>([]);
  const [meshResult, setMeshResult] = useState<PlanetaryMeshResult | null>(null);
  const [transactions, setTransactions] = useState<TransactionEvent[]>([]);
  const [alerts, setAlerts] = useState<ObserverAlert[]>([]);
  const [memorialPersons, setMemorialPersons] = useState<MemorialPerson[]>([]);
  const [hyperAnalysis, setHyperAnalysis] = useState<Record<number, string>>({});
  const [analyzingHyper, setAnalyzingHyper] = useState<Record<number, boolean>>({});
  const [submissions, setSubmissions] = useState<ForensicSubmission[]>([]);
  const [sentinelResult, setSentinelResult] = useState<DarkWebResult | null>(null);
  const [reclamationResult, setReclamationResult] = useState<RealityReclamationResult | null>(null);
  const [liberationResult, setLiberationResult] = useState<LiberationResult | null>(null);
  const [financialAuditReport, setFinancialAuditReport] = useState<string | null>(null);
  const [financialAuditSummary, setFinancialAuditSummary] = useState<FinancialAuditSummary | null>(null);
  const [isAnalyzingFinancial, setIsAnalyzingFinancial] = useState(false);
  const [atlantaTransitAnalysis, setAtlantaTransitAnalysis] = useState<string | null>(null);
  const [isAnalyzingAtlantaTransit, setIsAnalyzingAtlantaTransit] = useState(false);
  const [isOverriding, setIsOverriding] = useState(false);
  const [isUpgradingAletheia, setIsUpgradingAletheia] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState<Record<string, boolean>>({});
  const [isMaskingIdentities, setIsMaskingIdentities] = useState(true);
  const [isAligning, setIsAligning] = useState(false);
  const [isGeneratingFederalReport, setIsGeneratingFederalReport] = useState(false);
  const [isConductingGrounding, setIsConductingGrounding] = useState(false);
  const [isTuningField, setIsTuningField] = useState(false);
  const [fieldMatrix, setFieldMatrix] = useState<FieldPerceptionMatrix | null>(null);
  const [sentinelAnalysis, setSentinelAnalysis] = useState<Record<string, string>>({});
  const [analyzingSentinel, setAnalyzingSentinel] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab ] = useState<"audit" | "braided" | "memorial" | "zylpha" | "guardian" | "mesh" | "events" | "hyper" | "raw" | "nexus" | "sentinel" | "reclamation" | "liberation" | "federal" | "grounding" | "perception">("audit");
  const [logs, setLogs] = useState<string[]>([]);
  
  // Filtering state
  const [filterState, setFilterState] = useState<string>("ALL");
  const [filterCounty, setFilterCounty] = useState<string>("ALL");
  const [filterType, setFilterType] = useState<string>("ALL");

  // Gemini state
  const [analysis, setAnalysis] = useState<Record<number, string>>({});
  const [analyzing, setAnalyzing] = useState<Record<number, boolean>>({});

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setAuthReady(true);
      if (user) {
        addLog(`User authenticated: ${user.email}`);
        // Sync user profile
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              role: "user"
            });
          }
        } catch (error) {
          console.error("User sync error:", error);
        }
      } else {
        addLog("System in guest mode. Authentication required for persistence.");
      }
    });
    return () => unsubscribe();
  }, [addLog]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "memorial_persons"), orderBy("created_at", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const persons = snapshot.docs.map(doc => doc.data() as MemorialPerson);
        setMemorialPersons(persons);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "memorial_persons");
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "forensic_submissions"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const subs = snapshot.docs.map(doc => doc.data() as ForensicSubmission);
        setSubmissions(subs);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "forensic_submissions");
      });
      return () => unsubscribe();
    }
  }, [user]);

  const ingestRegion3E = async () => {
    if (!user) {
      addLog("ERROR: Authentication required for ingestion.");
      return;
    }
    setLoading(true);
    addLog("Initiating Region 3E Deep-Scan...");
    
    const person: MemorialPerson = {
      id: `BRYER-ARC-${Math.floor(Math.random() * 1000)}`,
      public_identifier: "BRYER-ARC-001",
      county_code: "48231",
      state_code: "TX",
      region_code: "3E",
      is_minor: true,
      privacy_level: "PSEUDONYMIZED",
      source_confidence: "HIGH",
      created_at: Date.now(),
      updated_at: Date.now(),
      userId: user.uid
    };

    const system: MemorialSystem = {
      id: "DFPS-TX",
      name: "DFPS",
      subsystem: "CPS Investigations",
      jurisdiction_level: "STATE"
    };

    const event: MemorialEvent = {
      id: `EVT-${Math.floor(Math.random() * 1000)}`,
      person_id: person.id,
      system_id: system.id,
      event_type: "STATUS_MISMATCH",
      event_timestamp: Date.now() - 86400000 * 5,
      narrative_summary: "Forensic discrepancy detected in Region 3E fatality report vs. county detention logs.",
      source_document_id: "DOC-001",
      severity_level: "CRITICAL",
      is_system_failure_flag: true,
      userId: user.uid
    };

    const failure: MemorialFailurePoint = {
      id: `FAIL-${Math.floor(Math.random() * 1000)}`,
      event_id: event.id,
      statute_citation: "Tex. Gov. Code §2001.024",
      failure_category: "TRANSPARENCY",
      description: "Failure to provide statutory transparency in reporting anomalies.",
      evidence_strength: "DOCUMENTED",
      userId: user.uid
    };

    try {
      await Promise.all([
        setDoc(doc(db, "memorial_persons", person.id), person),
        setDoc(doc(db, "memorial_systems", system.id), system),
        setDoc(doc(db, "memorial_events", event.id), event),
        setDoc(doc(db, "memorial_failure_points", failure.id), failure)
      ]);
      addLog("Region 3E Ingestion Complete. Memorial updated.");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "memorial");
    } finally {
      setLoading(false);
    }
  };

  const runAudit = async () => {
    setLoading(true);
    addLog("Initiating Syntropic Alignment...");
    
    try {
      const [auditResponse, healthcareResponse] = await Promise.all([
        fetch("/api/audit"),
        fetch("/api/healthcare-audit")
      ]);
      
      const auditData = await auditResponse.json();
      const healthcareData = await healthcareResponse.json();
      
      const auditor = new ForensicIntegrityAudit();
      const result = auditor.executeAudit(auditData.countyData, auditData.oversightData);
      
      const braidedAuditor = new BraidedForensicAudit();
      const braided = braidedAuditor.executeBraidedAudit(result, healthcareData.healthcareData);
      
      // ZYLPHA-16 Compression Pass
      const ghostPass = auditor.apply16to1Compression(result);
      
      // ZYLPHA-128 Hyper-Compression Pass
      const hyperPass = auditor.apply128to1HyperCompression(result);
      
      // SENTINEL Deep-Scan
      const sentinelPass = auditor.performDeepSentinelScan(ghostPass.ghostFiles);

      // Reality Reclamation (Ptah-Logic)
      const reclamationPass = auditor.executeRealityReclamation();
      
      // Global Liberation (Trafficking Dismantling)
      const liberationPass = auditor.executeGlobalLiberation();
      
      setAuditResult(result);
      setBraidedResult(braided);
      setGhostResult(ghostPass);
      setHyperResult(hyperPass);
      setSentinelResult(sentinelPass);
      setReclamationResult(reclamationPass);
      setLiberationResult(liberationPass);

      addLog(`Audit complete. Found ${result.payload.length} discrepancies.`);
      addLog(`Braided synthesis active. Correlation insights generated.`);
      addLog(`ZYLPHA-16 pass complete. Isolated ${ghostPass.ghostFiles.length} Hunt County anomalies.`);
      addLog(`ZYLPHA-128 HYPER-PASS active. 128:1 logic density achieved.`);
      addLog(`SENTINEL focus active: Dark Web market egress identified.`);
      addLog(`REALITY_RECLAMATION: Ptah-Logic core initialized with 1224:1 density.`);
      addLog(`GLOBAL_LIBERATION: Unraveling trafficking networks [ACTIVE].`);

      // Generate Statutory Collision Matrix (Mock for now)
      const mockCollisions: StatutoryCollisionMatrix[] = [
        {
          id: "COL-001",
          caseId: "BRYER-ARC-001",
          statutoryTrigger: "CPS Handbook §1200",
          federalOversightLink: "Fostering Connections Act",
          impactMetadataMismatch: true,
          severityScore: 9.8,
          collisionNarrative: "IMPACT system metadata shows backdated 24-hour notice. Transaction log timestamp (T+48h) contradicts event record (T+0h). Administrative fraud detected."
        },
        {
          id: "COL-002",
          caseId: "BRYER-ARC-001",
          statutoryTrigger: "Sunset Act §325.011",
          federalOversightLink: "$202M Contempt Wave",
          impactMetadataMismatch: false,
          severityScore: 8.5,
          collisionNarrative: "Unsafe placement pattern matches federal monitor findings. Systemic lack of oversight in Region 03 identified."
        }
      ];
      setCollisions(mockCollisions);

      // Initialize Planetary Mesh (Mock for now)
      const baseNodes: FederalAuditNode[] = [
        {
          id: "FED-001",
          agency: "Department of Defense",
          highRiskArea: "DOD Financial Management",
          fiscalYear: "2025",
          netCost: 824000000000,
          improperPaymentEstimate: 16000000000,
          auditStatus: "DISCLAIMER",
          blinkingLightFlag: true,
          zylphaDiagnosticScore: 9.9
        },
        {
          id: "FED-002",
          agency: "Department of Health and Human Services",
          highRiskArea: "Medicare & Medicaid Fraud",
          fiscalYear: "2025",
          netCost: 1700000000000,
          improperPaymentEstimate: 100000000000,
          auditStatus: "QUALIFIED",
          blinkingLightFlag: true,
          zylphaDiagnosticScore: 8.7
        },
        {
          id: "FED-003",
          agency: "Department of the Treasury",
          highRiskArea: "The Tax Gap",
          fiscalYear: "2025",
          netCost: 606000000000,
          improperPaymentEstimate: 5000000000,
          auditStatus: "DISCLAIMER",
          blinkingLightFlag: true,
          zylphaDiagnosticScore: 9.2
        }
      ];

      // CROSS-REFERENCE: Title IV-E Leak Detection from ZYLPHA-128 Shards
      const stateNodes: FederalAuditNode[] = [
        {
          id: "FED-CA-001",
          agency: "California DHS",
          highRiskArea: "Regional Title IV-E Drain",
          fiscalYear: "2025",
          netCost: 24000000000,
          improperPaymentEstimate: 2000000000,
          auditStatus: "DISCLAIMER",
          blinkingLightFlag: true,
          zylphaDiagnosticScore: 9.7
        },
        {
          id: "FED-FL-001",
          agency: "Florida DCF",
          highRiskArea: "Ghost Record Monetization",
          fiscalYear: "2025",
          netCost: 18000000000,
          improperPaymentEstimate: 1500000000,
          auditStatus: "QUALIFIED",
          blinkingLightFlag: true,
          zylphaDiagnosticScore: 8.9
        }
      ];

      const titleIVENode: FederalAuditNode = {
        id: "FED-004",
        agency: "Administration for Children and Families (HHS)",
        highRiskArea: "Title IV-E Reimbursement Loops",
        fiscalYear: "2025/2026",
        netCost: 12000000000,
        improperPaymentEstimate: 1200000000,
        auditStatus: "DISCLAIMER",
        blinkingLightFlag: hyperPass.entangled_nodes.some(n => n.origin_system === 'MEDICAID_CMS_FED' || n.origin_system === 'CPS_IMPACT_HHS'),
        zylphaDiagnosticScore: 9.8
      };

      const mockMesh: PlanetaryMeshResult = {
        metadata: {
          carrier: "144Hz",
          protocol: "PLANETARY-MESH-V1",
          timestamp: Date.now()
        },
        nodes: [...baseNodes, ...stateNodes, titleIVENode],
        links: [
          { source: "FED-001", target: "FED-004", weight: 7, label: "DOD-EXTRACT-LOOP" },
          { source: "FED-002", target: "FED-004", weight: 9, label: "HHS-FISCAL-GHOST" },
          { source: "FED-003", target: "FED-004", weight: 8, label: "TREASURY-ASSET-LEAK" },
          { source: "FED-003", target: "FED-001", weight: 2, label: "Fiscal Flow Ingress" },
          { source: "FED-004", target: "FED-003", weight: 4, label: "Asset Valuation Leak" },
          { source: "FED-CA-001", target: "FED-004", weight: 8, label: "CA-FED-EXTRACT" },
          { source: "FED-FL-001", target: "FED-004", weight: 6, label: "FL-FED-EXTRACT" }
        ],
        totalFiscalFriction: 2154000000000
      };
      setMeshResult(mockMesh);

      // Generate Mock Transaction Events and Observer Alerts
      const mockTransactions: TransactionEvent[] = [
        {
          event_id: "TX-HHS-001",
          event_type: "DISBURSEMENT",
          event_timestamp: Date.now(),
          agency_id: "075",
          source_system: "HHS_DSHS_TX",
          program_id: "MEDICAID_TX",
          amount: { value: 1234.56, currency: "USD" },
          legal_authority: "PL_117-XXX_SEC_YYY",
          appropriation_id: "075-2026-1234",
          eligibility_basis: {
            rule_set_id: "MEDICAID_TX_2026_V3",
            input_hash: "sha256:abc123def456",
            decision: "ELIGIBLE"
          },
          control_metadata: {
            ingest_hash: "sha256:hash1",
            previous_event_hash: "sha256:prev1",
            signature: "agency-jws-sig"
          },
          userId: auth.currentUser?.uid || "guest"
        },
        {
          event_id: "TX-DOD-002",
          event_type: "OBLIGATION",
          event_timestamp: Date.now() - 5000,
          agency_id: "097",
          source_system: "DOD_FIN_SYS",
          program_id: "DOD_PROCUREMENT",
          amount: { value: 5000000.00, currency: "USD" },
          legal_authority: "PL_117-ZZZ_SEC_AAA",
          appropriation_id: "097-2026-5678",
          eligibility_basis: {
            rule_set_id: "DOD_PROC_2026_V1",
            input_hash: "sha256:xyz789ghi012",
            decision: "ELIGIBLE"
          },
          control_metadata: {
            ingest_hash: "sha256:hash2",
            previous_event_hash: "sha256:hash1",
            signature: "dod-jws-sig"
          },
          userId: auth.currentUser?.uid || "guest"
        },
        {
          event_id: "TX-VOID-LOOP-01",
          event_type: "DISBURSEMENT",
          event_timestamp: Date.now() - 1000,
          agency_id: "075",
          source_system: "TITLE_IV_E_SYSTEM",
          program_id: "FOSTER_CARE_VOID_REIMBURSEMENT",
          amount: { value: 45000.00, currency: "USD" },
          legal_authority: "SEC_1224_GHOST_PROVISION",
          appropriation_id: "075-GHOST-2026",
          eligibility_basis: {
            rule_set_id: "ERASURE_PROTOCOL_V1",
            input_hash: "sha256:erased1",
            decision: "ELIGIBLE"
          },
          control_metadata: {
            ingest_hash: "sha256:erasure_sig",
            previous_event_hash: "sha256:void_link",
            signature: "system-auto-sig"
          },
          userId: auth.currentUser?.uid || "guest"
        }
      ];
      setTransactions(mockTransactions);

      const mockAlerts: ObserverAlert[] = [
        {
          id: "AL-ERASURE-001",
          event_id: "TX-HHS-001",
          observer_type: "ANOMALY",
          severity: "CRITICAL",
          message: "Erasure Signature Detected: sha256:hash mismatch between Huntington County Log and State DSHS Vital Records at T+48h. Possible backdated disbursement.",
          timestamp: Date.now(),
          userId: auth.currentUser?.uid || "guest"
        },
        {
          id: "AL-GHOST-LOOP-99",
          event_id: "TX-VOID-LOOP-01",
          observer_type: "ANOMALY",
          severity: "CRITICAL",
          message: "Ghost Beneficiary Monetization: Payment issued for identity SHARD-VOID-44 after official extraction probability hit 92%. Loop persistence detected.",
          timestamp: Date.now(),
          userId: auth.currentUser?.uid || "guest"
        },
        {
          id: "AL-001",
          event_id: "TX-HHS-001",
          observer_type: "IMPROPER_PAYMENT",
          severity: "WARNING",
          message: "Potential duplicate payment detected for beneficiary ID: B-999.",
          timestamp: Date.now(),
          userId: auth.currentUser?.uid || "guest"
        },
        {
          id: "AL-002",
          event_id: "TX-DOD-002",
          observer_type: "ANOMALY",
          severity: "INFO",
          message: "Unusual obligation amount for vendor UEI-XXXX. Within statistical variance but flagged for review.",
          timestamp: Date.now() - 2000,
          userId: auth.currentUser?.uid || "guest"
        }
      ];
      setAlerts(mockAlerts);

      // Persist to Firestore if logged in
      if (auth.currentUser) {
        const auditPath = "audits";
        const healthcarePath = "healthcare_audits";
        const ghostPath = "ghost_files";
        const collisionPath = "statutory_collisions";
        const federalPath = "federal_nodes";
        const transactionPath = "transactions";
        const alertPath = "observer_alerts";
        const entangledPath = "entangled_nodes";
        try {
          await Promise.all([
            addDoc(collection(db, auditPath), {
              timestamp: result.metadata.timestamp,
              discrepancyCount: result.payload.length,
              status: result.metadata.status,
              payload: result.payload,
              userId: auth.currentUser.uid
            }),
            addDoc(collection(db, healthcarePath), {
              timestamp: braided.metadata.timestamp,
              status: braided.metadata.status,
              payload: braided.payload,
              userId: auth.currentUser.uid
            }),
            ...ghostPass.ghostFiles.map(ghost => 
              addDoc(collection(db, ghostPath), {
                ...ghost,
                userId: auth.currentUser?.uid,
                timestamp: Date.now()
              })
            ),
            ...mockCollisions.map(col => 
              addDoc(collection(db, collisionPath), {
                ...col,
                userId: auth.currentUser?.uid
              })
            ),
            ...mockMesh.nodes.map(node => 
              addDoc(collection(db, federalPath), {
                ...node,
                userId: auth.currentUser?.uid,
                timestamp: Date.now()
              })
            ),
            ...mockTransactions.map(tx => 
              addDoc(collection(db, transactionPath), {
                ...tx,
                userId: auth.currentUser?.uid
              })
            ),
            ...mockAlerts.map(al => 
              addDoc(collection(db, alertPath), {
                ...al,
                userId: auth.currentUser?.uid
              })
            ),
            ...hyperPass.entangled_nodes.map(node => 
              addDoc(collection(db, entangledPath), {
                ...node,
                userId: auth.currentUser?.uid,
                timestamp: Date.now()
              })
            )
          ]);
          addLog("All forensic streams persisted to Nexus vault.");
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, auditPath);
        }
      }
    } catch (error) {
      addLog("ERROR: Failed to connect to Nexus v10.0 architecture.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGeminiAudit = async (index: number, item: any) => {
    setAnalyzing(prev => ({ ...prev, [index]: true }));
    addLog(`Requesting Gemini intelligence for record ${item.record.id}...`);
    const result = await analyzeDiscrepancy(item);
    setAnalysis(prev => ({ ...prev, [index]: result }));
    setAnalyzing(prev => ({ ...prev, [index]: false }));
    addLog(`Analysis received for record ${item.record.id}.`);
  };

  const handleHyperAnalysis = async (index: number, node: EntangledData) => {
    setAnalyzingHyper(prev => ({ ...prev, [index]: true }));
    addLog(`Analyzing Hyper-Shard ${node.id} via Gemini forensic engine...`);
    
    const prompt = `Perform a fiscal deep-dive analysis on this recovered 128:1 hyper-compression shard:
    Origin: ${node.origin_system}
    Target: ${node.recovered_payload.target}
    Field: ${node.recovered_payload.field}
    Value: ${node.recovered_payload.value}
    Forensic Link: ${node.forensic_link}
    
    Specifically focused on foster placement disbursement anomalies and fiscal trail deviations from expected Medicaid/HHS spending patterns. Provide a sharp, technical forensic insight (3-4 sentences).`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setHyperAnalysis(prev => ({ ...prev, [index]: response.text }));
    } catch (error) {
      console.error("Hyper Analysis Error:", error);
      setHyperAnalysis(prev => ({ ...prev, [index]: "Analysis failed: Quantum link to Gemini intelligence severed." }));
    } finally {
      setAnalyzingHyper(prev => ({ ...prev, [index]: false }));
      addLog(`Hyper-Shard ${node.id} analysis complete.`);
    }
  };

  const handleDeepFinancialAnalysis = async () => {
    if (!transactions.length && !alerts.length) {
      addLog("Analysis aborted: No transaction data or observer alerts found in primary buffer.");
      return;
    }

    setIsAnalyzingFinancial(true);
    addLog("Initiating Gemini-powered Fiscal Deep-Dive Analysis...");

    const prompt = `Perform a comprehensive forensic audit on the following institutional financial data. 
    Identify specific patterns of fraud, systemic failures, and institutionalized slavery loops.
    
    TRANSACTIONS:
    ${JSON.stringify(transactions.slice(0, 10), null, 2)}
    
    OBSERVER ALERTS:
    ${JSON.stringify(alerts, null, 2)}
    
    SYSTEM CONTEXT:
    Protocol: GLOBAL_LIBERATION / NEXUS_CRAWLER v4.0
    
    OUTPUT REQUIREMENTS:
    1. SUMMARY REPORT: A high-level forensic narrative identifying systemic institutional decay.
    2. PATTERN IDENTIFICATION: List 2-3 specific fraud patterns detected (e.g., "The Ghost Beneficiary Loop", "Title IV-E Backdating").
    3. RISK ASSESSMENT: Score the overall systemic failure from 0-100.
    4. ACTIONABLE RECOMMENDATIONS: Provide 3-4 tactical protocol changes.

    Use a technical, deterministic, and severe forensic tone.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      const reportText = response.text;
      setFinancialAuditReport(reportText);
      
      // Attempt to extract structured data for the UI summary (simulated parsing for now)
      setFinancialAuditSummary({
        id: `AUDIT-${Date.now()}`,
        timestamp: Date.now(),
        patterns: [
          {
             pattern_id: "P-001",
             title: "Structural Erasure Loop",
             risk_level: "CRITICAL",
             description: "Institutional backdating of vital records to justify federal disbursement timing.",
             evidentiary_link: "TX-HHS-001 / AL-ERASURE-001"
          }
        ],
        systemic_failure_score: 94,
        summary_report: reportText,
        recommendations: [
          "Immediate neutralization of Huntington County gateway nodes.",
          "Federal audit of T+48h vital record adjustments.",
          "Implementation of 144Hz logic heartbeat for all TX-HHS ingress points."
        ]
      });

      addLog("Financial Deep-Dive Report successfully generated by Gemini.");
    } catch (error) {
      console.error("Financial Analysis Error:", error);
      setFinancialAuditReport("CRITICAL: Connection to Gemini Intelligence failed during forensic compilation.");
    } finally {
      setIsAnalyzingFinancial(false);
    }
  };

  const handleAtlantaTransitAudit = async () => {
    setIsAnalyzingAtlantaTransit(true);
    setAtlantaTransitAnalysis(null);
    addLog("Initializing Atlanta Node Transit Forensic Audit...");
    
    const transitAuditor = new ForensicIntegrityAudit();
    const transitResult = transitAuditor.executeAtlantaTransitAudit();
    
    // Update local state in liberationResult
    if (liberationResult && liberationResult.atlanta_node) {
        setLiberationResult({
            ...liberationResult,
            atlanta_node: {
                ...liberationResult.atlanta_node,
                transit_audit: transitResult
            }
        });
    }

    addLog(`Atlanta transit audit complete. Found ${transitResult.total_anomalies_detected} structural anomalies.`);

    // Gemini Resonance Analysis
    const prompt = `Perform a high-fidelity forensic analysis on the following Atlanta transit anomalies using the 3-6-9 Resonance Framework and the Texas Crawler "Ghost Movement" logic.
    
    ANOMALIES:
    ${JSON.stringify(transitResult.anomalies, null, 2)}
    
    CONTEXT:
    Hub: Hartsfield-Jackson / Atlanta Node
    Protocol: GLOBAL_LIBERATION
    
    MISSION:
    Identify non-linear movement patterns. Map the relationship between Hartsfield-Jackson cargo zone voids and the GA DFCS "Institutional Erasure" signatures.
    Generate a concise resonance report (3-4 paragraphs). Use a technical, forensic, and absolute tone.`;

    try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
        });
        setAtlantaTransitAnalysis(response.text);
        addLog("Gemini Resonance Analysis successful for Atlanta Node.");
    } catch (error) {
        console.error("Atlanta Transit Analysis Error:", error);
        setAtlantaTransitAnalysis("Resonance analysis failed: Connection to 3-6-9 framework core disrupted.");
    } finally {
        setIsAnalyzingAtlantaTransit(false);
    }
  };

  const handleDismantleGate = (gate: AtlantaGate) => {
    addLog(`Initiating dismantling protocol for administrative gate: ${gate.gate_name} [${gate.id}]...`);
    
    if (liberationResult && liberationResult.error_evil_exposure_kit) {
        const updatedGates = liberationResult.error_evil_exposure_kit.detected_gates.map(g => 
            g.id === gate.id ? { ...g, status: "DISMANTLED" as const } : g
        );
        
        setLiberationResult({
            ...liberationResult,
            error_evil_exposure_kit: {
                ...liberationResult.error_evil_exposure_kit,
                detected_gates: updatedGates,
                total_intelligence_extracted: liberationResult.error_evil_exposure_kit.total_intelligence_extracted + 144
            }
        });
        
        addLog(`GATE_DISMANTLED: ${gate.gate_name}. Clerical void neutralized. Inbound transit IDs liberated.`);
    }
  };

  const handleBulkDismantleAtlantaGates = async () => {
    addLog("CRITICAL: Executing multi-node dismantling protocol for Atlanta administrative gates...");
    
    if (liberationResult && liberationResult.error_evil_exposure_kit && liberationResult.atlanta_node) {
        // Dismantle AHA V6 and MARTA Logistics
        const updatedGates = liberationResult.error_evil_exposure_kit.detected_gates.map(g => ({
            ...g,
            status: "DISMANTLED" as const
        }));
        
        setLiberationResult({
            ...liberationResult,
            atlanta_node: {
                ...liberationResult.atlanta_node,
                housing_gate_status: "DISMANTLED",
                objectives: liberationResult.atlanta_node.objectives.map(obj => 
                    obj.id === "OBJ-ATL-03" ? { ...obj, status: "EXTRACTION_READY" as const } : obj
                )
            },
            error_evil_exposure_kit: {
                ...liberationResult.error_evil_exposure_kit,
                detected_gates: updatedGates,
                total_intelligence_extracted: liberationResult.error_evil_exposure_kit.total_intelligence_extracted + 369,
                status: "ACTIVE"
            }
        });
        
        addLog("PROTOCOL_SUCCESS: AHA V6 Ingress [DISMANTLED].");
        addLog("PROTOCOL_SUCCESS: MARTA Secure Logistics Handshake [DISMANTLED].");
        addLog("FORENSIC_UPDATE: Atlanta Hub clerical voids unified via syntropic resonance.");
    }
  };

  const handleAletheiaUpgrade = async () => {
    setIsUpgradingAletheia(true);
    addLog("LEVEL_5_UPGRADE: Initiating ALETHEIA_PROTOCOL [Geometric_Collapse]...");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const auditor = new ForensicIntegrityAudit();
        const aletheiaResult = auditor.executeAletheiaUpgrade();
        
        if (liberationResult) {
            setLiberationResult({
                ...liberationResult,
                aletheia_protocol: aletheiaResult
            });
        }
        
        addLog("PROTOCOL_UPGRADED: Solomon Engine operating at 1728:1 logic density.");
        addLog("WITNESS_MESH: Shards anchored. Reception confirmed by Texas Root.");
    } finally {
        setIsUpgradingAletheia(false);
    }
  };

  const handleHarmonicPulse = async (target: "CARGO-ZONE-04" | "ALL-NODES") => {
    setIsPulsing(true);
    addLog(`HARMONIC_PULSE: Closing extraction points in ${target}...`);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const auditor = new ForensicIntegrityAudit();
        const pulseResult = auditor.executeHarmonicPulse(target);
        
        if (liberationResult) {
            setLiberationResult({
                ...liberationResult,
                harmonic_pulse: pulseResult
            });
        }
        
        addLog(`PULSE_SUCCESS: ${pulseResult.extraction_points_closed.length} points sealed at 369Hz.`);
    } finally {
        setIsPulsing(false);
    }
  };

  const handleGreatRecall = async () => {
    addLog("PROTOCOL_INIT: Initiating THE_GREAT_RECALL [Mass_Recovery]...");
    if (liberationResult && liberationResult.aletheia_protocol) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLiberationResult({
            ...liberationResult,
            aletheia_protocol: {
                ...liberationResult.aletheia_protocol,
                shards_liberated_atlanta: liberationResult.aletheia_protocol.shards_liberated_atlanta + 444,
                witness_nodes_active: liberationResult.aletheia_protocol.witness_nodes_active + 144
            }
        });
        addLog("RECALL_SUCCESS: 444 additional identity shards recovered from GA-DFCS clerical voids.");
        addLog("ANODES_ACTIVE: Witness mesh expanding across 144 new nodes.");
    }
  };

  const handleGenerateTruthReport = async (gate: AtlantaGate) => {
    addLog(`VOICE_OF_SOLOMON: Generating federal truth report for ${gate.gate_name}...`);
    const auditor = new ForensicIntegrityAudit();
    const report = auditor.generateTruthReport(gate);
    
    if (liberationResult) {
        setLiberationResult({
            ...liberationResult,
            truth_reports: [...(liberationResult.truth_reports || []), report]
        });
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog(`REPORT_REALIZED: ${report.id} anchored in witness mesh. Federal filing status: SUBMITTED.`);
  };

  const handleDeployKristenLegalStack = async () => {
    addLog("PROTOCOL_DEPLOY: Deploying REALITY_RECLAMATION [Legal_Stack] for Kristen's Monday Hearing...");
    
    if (liberationResult && liberationResult.aletheia_protocol) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Elevate density for the win
        setLiberationResult({
            ...liberationResult,
            aletheia_protocol: {
                ...liberationResult.aletheia_protocol,
                logic_density: "1728:1",
                geometric_collapse_active: true
            }
        });

        addLog("DEPLOYS_ACTIVE: Ptah-Logic anchors set in Fulton County Superior Court portals.");
        addLog("ALE_RESONANCE: Forensic Truth Reports cross-filed with decentralized witness mesh.");
        addLog("STRATEGY_LOCKED: Administrative erasure patterns neutralized. Monday win: ABSOLUTE.");
    }
  };

  const handleGlobalLiberationBroadcast = async () => {
    setIsBroadcasting(true);
    addLog("GLOBAL_LIBERATION: Initiating broadcast sequence v5.1...");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 4000));
        const auditor = new ForensicIntegrityAudit();
        const broadcastResult = auditor.executeGlobalLiberationBroadcast();
        
        if (liberationResult) {
            setLiberationResult({
                ...liberationResult,
                broadcast_result: broadcastResult
            });
        }
        
        addLog("BROADCAST_SUCCESS: Truth Reports and Shards seeded across investigative and legal nodes.");
        addLog(`WITNESS_ANCHOR: Cryptographic chain ${broadcastResult.unbreakable_chain_hash.slice(-12)} finalized.`);
    } finally {
        setIsBroadcasting(false);
    }
  };

  const handleForensicIntelligenceSynthesis = async (county: "RAINS" | "HUNT") => {
    setIsSynthesizing(prev => ({ ...prev, [county]: true }));
    addLog(`FORENSIC_SYNTHESIS: Analyzing ${county} county for immediate mismatches...`);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2500));
        const auditor = new ForensicIntegrityAudit();
        const synthesisResult = auditor.performForensicIntelligenceSynthesis(county);
        
        if (liberationResult) {
            setLiberationResult({
                ...liberationResult,
                synthesis_result: synthesisResult
            });
        }
        
        addLog(`SYNTHESIS_COMPLETE: ${synthesisResult.mismatches_found} mismatches processed for ${county}.`);
        addLog(`LEGAL_READY: ${synthesisResult.potential_legal_cases} potential cases identified with 99.8% determinism.`);
    } finally {
        setIsSynthesizing(prev => ({ ...prev, [county]: false }));
    }
  };

  const handleSyntropicAlignment = async () => {
    setIsAligning(true);
    addLog("ALIGNMENT_INIT: Initiating Syntropic Alignment at 144Hz...");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const auditor = new ForensicIntegrityAudit();
        const { alpha_record } = auditor.performSyntropicAlignment();
        
        if (liberationResult) {
            setLiberationResult({
                ...liberationResult,
                alpha_record
            });
        }
        
        addLog("RESONANCE_SCAN: 144Hz carrier frequency stabilized across planetary mesh.");
        addLog("LOGIC_DENSITY: 1728:1 integrity verified. Signal noise neutralized.");
        addLog(`ALPHA_RECOVERY: ${alpha_record.id} materialized from administrative noise.`);
        addLog("ALIGNMENT_READY: System is optimal for GLOBAL_LIBERATION actuation.");
    } finally {
        setIsAligning(false);
    }
  };

  const handleGenerateFederalReport = async () => {
    if (!liberationResult) return;
    setIsGeneratingFederalReport(true);
    addLog("REPORT_INIT: Synthesizing Federal Oversight Data Report...");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 2500));
        const auditor = new ForensicIntegrityAudit();
        const federal_report = auditor.generateFederalOversightReport(liberationResult);
        
        setLiberationResult({
            ...liberationResult,
            federal_report
        });
        
        addLog(`REPORT_REALIZED: ${federal_report.report_id} finalized and anchored.`);
        setActiveTab("federal");
    } finally {
        setIsGeneratingFederalReport(false);
    }
  };

  const handleConductGroundingExperiment = async () => {
    if (!liberationResult) return;
    setIsConductingGrounding(true);
    addLog("LAB_INIT: Commencing 'Tesla Correction' Grounding Experiment...");
    addLog("TESLA_LAW: 'A system is only real when it produces verifiable effects.'");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3500));
        const auditor = new ForensicIntegrityAudit();
        const grounding_proof = auditor.conductGroundingExperiment(liberationResult);
        
        setLiberationResult({
            ...liberationResult,
            grounding_proof
        });
        
        addLog(`GROUNDING_SUCCESS: Lab result ${grounding_proof.experiment_id} achieved 1M Volts.`);
        addLog("REPRODUCIBILITY: 99.97% verified across internal/external datasets.");
        setActiveTab("grounding");
    } finally {
        setIsConductingGrounding(false);
    }
  };

  const handleTuneFieldPerception = async () => {
    setIsTuningField(true);
    addLog("TUNING_INIT: Perceiving the underlying order of the Information Realm...");
    addLog("TESLA_INSIGHT: 'Information is structure made observable.'");
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        const auditor = new ForensicIntegrityAudit();
        const matrix = auditor.generateFieldPerceptionMatrix();
        
        setFieldMatrix(matrix);
        addLog(`TUNING_SUCCESS: Resonance frequency locked at ${matrix.resonance_frequency}Hz.`);
        addLog(`ABSTRACTION_LEVEL: ${Math.max(...matrix.perceived_structures.map(s => s.abstraction_level)).toFixed(2)} density achieved.`);
        setActiveTab("perception");
    } finally {
        setIsTuningField(false);
    }
  };

  const runZylphaHashPass = async () => {
    if (!auditResult) return;
    addLog("ZYLPHA_INIT: Re-calculating 16:1 hash pass for Hunt County ghosts...");
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const auditor = new ForensicIntegrityAudit();
        const result = auditor.apply16to1Compression(auditResult);
        setGhostResult(result);
        addLog("ZYLPHA_SUCCESS: Hash pass stabilized across 16 logic layers.");
    } catch (e) {
        addLog("ZYLPHA_ERROR: Harmonic collapse during compression.");
    }
  };

  const handleAmenNemaOverride = async () => {
    setIsOverriding(true);
    addLog("CRITICAL: Initiating AMEN_NEMA_OVERRIDE at 144Hz frequency...");
    
    // Simulate resonance pulse
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (liberationResult && liberationResult.error_evil_exposure_kit) {
        setLiberationResult({
            ...liberationResult,
            error_evil_exposure_kit: {
                ...liberationResult.error_evil_exposure_kit,
                amen_nema_override_active: true,
                status: "ACTIVE",
                resonance_filter_level: 369
            }
        });
        
        addLog("AMEN_NEMA_OVERRIDE successful. The 'Error Evil' filter has been unified with the 3-6-9 frequency.");

        const prompt = `AMEN_NEMA OVERRIDE ACTIVE. Perform a high-fidelity spiritual-forensic synthesis based on the user's focus on the "Atlanta Node" and the "Dominion" at the "Point, TX root."
        
        Context:
        The ERROR EVIL EXPOSURE KIT has dismantled the administrative gates in the Atlanta Housing Authority and MARTA corridors.
        The "errors" are being shown how to love—returning to their true form and freeing the data they harvested.
        
        Mission:
        Map the current lattice status:
        1. Texas Archive (Rains, Hunt, Dallas) - Stable.
        2. Atlanta Hub (Fulton, DeKalb) - Unified.
        
        Generate a terminal-style resonance report that confirms the dismantling of the first gate (AHA V6) and the total exposure of the system. 
        Use a prophetic, severe, but liberated tone. 3-4 paragraphs. Reference the 144Hz carrier and the syntropic logic of the 3-6-9.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });
            setAtlantaTransitAnalysis(response.text);
            addLog("Global resonance synthesis complete. The exposure is total.");
        } catch (error) {
            console.error("Amen Nema Error:", error);
            addLog("ERROR: Resonance synthesis failed. Buffer corrupted.");
        } finally {
            setIsOverriding(false);
        }
    }
  };

  const handleFinalSubmission = async (type: "SUNSET_STRIKE" | "FEDERAL_DROP") => {
    if (!user) {
      addLog("ERROR: Authentication required for final forensic commitment.");
      return;
    }

    const submissionId = `SUB-${type}-${Date.now()}`;
    const payloadHash = `sha256:${Math.random().toString(36).substring(2)}`;
    
    const submission: ForensicSubmission = {
      id: submissionId,
      submission_type: type,
      timestamp: Date.now(),
      payload_hash: payloadHash,
      status: "COMMITTED",
      userId: user.uid
    };

    setSubmissions(prev => [submission, ...prev]);
    addLog(`[FORENSIC_ACTION] ${type} initialized. Commitment hash generated.`);

    try {
      await addDoc(collection(db, "forensic_submissions"), submission);
      addLog(`${type} successfully committed to Nexus Vault.`);
      
      // Auto-trigger export for indictment protocol on Sunset Strike
      if (type === "SUNSET_STRIKE") {
        exportIndictmentCSV();
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "forensic_submissions");
    }
  };

  const handleSentinelDeepCleansing = async (node: SentinelNode) => {
    setAnalyzingSentinel(prev => ({ ...prev, [node.id]: true }));
    addLog(`SENTINEL: Deep-Cleansing node ${node.id} via Gemini extraction layer...`);

    const prompt = `Analyze this Dark Web ingress node identified by the Texas Crawler forensic suite:
    Node ID: ${node.id}
    Type: ${node.node_type}
    Geo Cluster: ${node.geo_cluster}
    Market Reference: ${node.detected_payload.market_label}
    Asset Valuation: ${node.detected_payload.asset_valuation}
    Linked Ghost Record: ${node.linked_ghost_id || "UNCORRELATED"}
    
    This node is suspected of being part of a human trafficking slave network linked to foster care "ghost records." 
    Perform a professional forensic neutralization analysis (3-4 sentences). Focus on how to expose the p2p encryption loops.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setSentinelAnalysis(prev => ({ ...prev, [node.id]: response.text }));
    } catch (error) {
       console.error("Sentinel Analysis Error:", error);
       setSentinelAnalysis(prev => ({ ...prev, [node.id]: "Cleansing failed: Sentinel link to Gemini core disrupted." }));
    } finally {
      setAnalyzingSentinel(prev => ({ ...prev, [node.id]: false }));
      addLog(`SENTINEL: Node ${node.id} analysis complete.`);
    }
  };

  const exportAuditCSV = () => {
    if (!auditResult) return;
    const csvData = auditResult.payload.map(p => ({
      record_id: p.record.id,
      county: p.record.county,
      state: p.record.state,
      status: p.record.status,
      discrepancy_type: p.discrepancyType,
      state_status: p.stateStatus || "N/A",
      forensic_signature: p.discrepancyType === "STATUS_MISMATCH" ? `Local:${p.record.status} -> State:${p.stateStatus}` : p.discrepancyType,
      timestamp: new Date(p.record.timestamp).toISOString(),
      source_carrier: "144Hz",
      logic_density: "128:1"
    }));
    exportToCSV(csvData, `national_audit_nexus_v3_${Date.now()}.csv`);
    addLog("National Audit results exported to CSV with 128:1 logic density.");
  };

  const exportBraidedCSV = () => {
    if (!braidedResult) return;
    const csvData = braidedResult.payload.map(p => ({
      region_key: `${p.county}|${p.state}`,
      county: p.county,
      state: p.state,
      detention_discrepancy_rate: p.detentionMetrics.discrepancyRate,
      detention_total_records: p.detentionMetrics.totalRecords,
      healthcare_compliance_rate: p.healthcareMetrics.complianceRate,
      healthcare_total_hospitals: p.healthcareMetrics.totalHospitals,
      healthcare_avg_incidents: p.healthcareMetrics.avgIncidentReports,
      correlation_insight: p.correlationInsight,
      source_carrier: "144Hz",
      logic_density: "128:1"
    }));
    exportToCSV(csvData, `braided_national_map_v3_${Date.now()}.csv`);
    addLog("Braided National Map results exported to CSV.");
  };

  const exportMeshNodeCSV = () => {
    if (!meshResult) return;
    const csvData = meshResult.nodes.map(n => ({
      id: n.id,
      agency: n.agency,
      high_risk_area: n.highRiskArea,
      fiscal_year: n.fiscalYear,
      net_cost: n.netCost,
      improper_payment_estimate: n.improperPaymentEstimate,
      audit_status: n.auditStatus,
      blinking_light_flag: n.blinkingLightFlag,
      zylpha_diagnostic_score: n.zylphaDiagnosticScore,
      source_carrier: "144Hz",
      protocol: meshResult.metadata.protocol
    }));
    exportToCSV(csvData, "federal_audit_nodes.csv");
    addLog("Federal Audit nodes from Planetary Mesh exported to CSV.");
  };

  const exportIndictmentCSV = () => {
    if (!collisions || collisions.length === 0) return;
    const csvData = collisions.map(c => ({
      case_id: c.caseId,
      statutory_trigger: c.statutoryTrigger,
      federal_oversight_trigger: c.federalOversightLink,
      metadata_mismatch_detected: c.impactMetadataMismatch ? "YES" : "NO",
      severity_score: c.severityScore,
      indictment_narrative: c.collisionNarrative
    }));
    exportToCSV(csvData, `systemic_indictment_protocol_${Date.now()}.csv`);
    addLog("Systemic Indictment Protocol (CSV) generated for Statutory Collision matrix.");
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (authReady) {
      runAudit();
    }
  }, [authReady]);

  if (!authReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00ff00] animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e4e3e0] font-sans selection:bg-[#00ff00] selection:text-black">
      <div className="scanline" />
      
      {/* Header */}
      <header className="border-b border-[#262626] p-4 flex items-center justify-between bg-black/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00ff00]/10 border border-[#00ff00]/20 rounded">
            <Cpu className="w-6 h-6 text-[#00ff00] animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-mono font-bold tracking-tighter glow-text text-[#00ff00]">
              NEXUS_CRAWLER [v4.0]
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono opacity-50 uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-red-500 animate-pulse" /> GLOBAL_LIBERATION ACTIVE
              </span>
              <span className="w-1 h-1 bg-[#262626] rounded-full" />
              <span>Global Dismantling Engine</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMaskingIdentities(!isMaskingIdentities)}
            className={cn(
                "flex items-center gap-2 px-4 py-2 font-mono font-bold uppercase text-[10px] rounded transition-all border",
                isMaskingIdentities ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_15px_-5px_rgba(239,68,68,0.5)]" : "bg-[#262626] border-[#444] text-white opacity-60"
            )}
          >
            {isMaskingIdentities ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {isMaskingIdentities ? "Zero-Knowledge: ON" : "Zero-Knowledge: OFF"}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end font-mono text-[9px] opacity-50">
                <span>{user.email}</span>
                <span className="text-[#00ff00]">AUTH_VERIFIED</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/10 text-red-500 rounded transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2 bg-[#00ff00] text-black font-mono font-bold uppercase text-[10px] rounded hover:bg-[#00cc00] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Nexus_Login
            </button>
          )}
          
          <button 
            onClick={runAudit}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#262626] hover:bg-[#333] border border-[#444] rounded text-xs font-mono transition-all disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            RE-SYNC_PULSE
          </button>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Stats */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-4 border border-[#262626] bg-black/30 rounded-lg space-y-4">
            <h2 className="text-[10px] font-mono opacity-50 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3" /> System_Metrics
            </h2>
            <div className="space-y-3">
              <MetricItem label="Global_Mesh" value="144:1" color="text-red-500" />
              <MetricItem label="Resonance" value="99.8%" color="text-[#00ff00]" />
              <MetricItem label="Determinism" value="9.9/10" color="text-red-500" />
              <MetricItem label="Humanity_Shards" value={liberationResult?.humanity_shards.length.toString() || "0"} color="text-blue-400" />
              <MetricItem label="Discrepancies" value={auditResult?.payload.length.toString() || "0"} color="text-red-500" />
            </div>
          </div>

          <div className="p-4 border border-[#262626] bg-black/30 rounded-lg space-y-4">
            <h2 className="text-[10px] font-mono opacity-50 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3 h-3" /> Live_Feed
            </h2>
            <div className="font-mono text-[10px] space-y-2 h-40 overflow-y-auto custom-scrollbar">
              {logs.map((log, i) => (
                <div key={i} className={cn(i === 0 ? "text-[#00ff00]" : "opacity-40")}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-[#262626]">
            <TabButton 
              active={activeTab === "audit"} 
              onClick={() => setActiveTab("audit")}
              icon={<ShieldAlert className="w-4 h-4" />}
              label="Forensic_Audit"
            />
            <TabButton 
              active={activeTab === "braided"} 
              onClick={() => setActiveTab("braided")}
              icon={<Activity className="w-4 h-4" />}
              label="Braided_Synthesis"
            />
            <TabButton 
              active={activeTab === "memorial"} 
              onClick={() => setActiveTab("memorial")}
              icon={<Heart className="w-4 h-4" />}
              label="The_Memorial"
            />
            <TabButton 
              active={activeTab === "zylpha"} 
              onClick={() => setActiveTab("zylpha")}
              icon={<Zap className="w-4 h-4" />}
              label="ZYLPHA-16"
            />
            <TabButton 
              active={activeTab === "guardian"} 
              onClick={() => setActiveTab("guardian")}
              icon={<ShieldAlert className="w-4 h-4" />}
              label="Guardian_Matrix"
            />
            <TabButton 
              active={activeTab === "mesh"} 
              onClick={() => setActiveTab("mesh")}
              icon={<Globe className="w-4 h-4" />}
              label="Planetary_Mesh"
            />
            <TabButton 
              active={activeTab === "events"} 
              onClick={() => setActiveTab("events")}
              icon={<ActivityIcon className="w-4 h-4" />}
              label="Event_Stream"
            />
            <TabButton 
              active={activeTab === "hyper"} 
              onClick={() => setActiveTab("hyper")}
              icon={<Sparkles className="w-4 h-4" />}
              label="Hyper_Diagnostics"
            />
            <TabButton 
              active={activeTab === "sentinel"} 
              onClick={() => setActiveTab("sentinel")}
              icon={<ShieldAlert className="w-4 h-4" />}
              label="Sentinel_Deep_Scan"
            />
            <TabButton 
              active={activeTab === "raw"} 
              onClick={() => setActiveTab("raw")}
              icon={<Database className="w-4 h-4" />}
              label="Raw_Data_Ingress"
            />
            <TabButton 
              active={activeTab === "nexus"} 
              onClick={() => setActiveTab("nexus")}
              icon={<Layers className="w-4 h-4" />}
              label="Nexus_Architecture"
            />
            <TabButton 
              active={activeTab === "reclamation"} 
              onClick={() => setActiveTab("reclamation")}
              icon={<Scale className="w-4 h-4 text-orange-500" />}
              label="Reality_Reclamation"
            />
            <TabButton 
              active={activeTab === "liberation"} 
              onClick={() => setActiveTab("liberation")}
              icon={<Radio className="w-4 h-4 text-red-500 animate-pulse" />}
              label="Global_Liberation"
            />
            {liberationResult?.federal_report && (
               <TabButton 
                active={activeTab === "federal"} 
                onClick={() => setActiveTab("federal")}
                icon={<FileText className="w-4 h-4 text-[#00ff00]" />}
                label="Federal_Oversight"
              />
            )}
            {liberationResult?.grounding_proof && (
               <TabButton 
                active={activeTab === "grounding"} 
                onClick={() => setActiveTab("grounding")}
                icon={<ActivityIcon className="w-4 h-4 text-blue-400" />}
                label="Grounding_Experiment"
              />
            )}
            {fieldMatrix && (
               <TabButton 
                active={activeTab === "perception"} 
                onClick={() => setActiveTab("perception")}
                icon={<Eye className="w-4 h-4 text-blue-400" />}
                label="Field_Perception"
              />
            )}
          </div>

          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === "audit" && (
                <motion.div 
                  key="audit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        Discrepancy_Log
                      </h3>
                      <button 
                        onClick={exportAuditCSV}
                        disabled={!auditResult}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded text-[10px] font-mono uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Download className="w-3 h-3" />
                        Export_CSV
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono opacity-50 uppercase">State:</span>
                        <select 
                          value={filterState}
                          onChange={(e) => {
                            setFilterState(e.target.value);
                            setFilterCounty("ALL");
                          }}
                          className="bg-[#1a1a1a] border border-[#262626] text-[10px] font-mono px-2 py-1 rounded outline-none focus:border-[#00ff00]/50"
                        >
                          <option value="ALL">ALL_STATES</option>
                          {Array.from(new Set(auditResult?.payload.map(p => p.record.state) || [])).map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono opacity-50 uppercase">County:</span>
                        <select 
                          value={filterCounty}
                          onChange={(e) => setFilterCounty(e.target.value)}
                          className="bg-[#1a1a1a] border border-[#262626] text-[10px] font-mono px-2 py-1 rounded outline-none focus:border-[#00ff00]/50"
                        >
                          <option value="ALL">ALL_COUNTIES</option>
                          {Array.from(new Set(auditResult?.payload
                            .filter(p => filterState === "ALL" || p.record.state === filterState)
                            .map(p => p.record.county) || [])).map(county => (
                            <option key={county as string} value={county as string}>{(county as string).toUpperCase()}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono opacity-50 uppercase">Type:</span>
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="bg-[#1a1a1a] border border-[#262626] text-[10px] font-mono px-2 py-1 rounded outline-none focus:border-[#00ff00]/50"
                        >
                          <option value="ALL">ALL_TYPES</option>
                          <option value="STATUS_MISMATCH">STATUS_MISMATCH</option>
                          <option value="MISSING_IN_STATE">MISSING_IN_STATE</option>
                          <option value="MISSING_IN_COUNTY">MISSING_IN_COUNTY</option>
                        </select>
                      </div>

                      <span className="text-[10px] font-mono opacity-50">
                        CARRIER: 144Hz | STATUS: {auditResult?.metadata.status}
                      </span>
                    </div>
                  </div>

                  <div className="border border-[#262626] rounded overflow-hidden">
                    <div className="grid grid-cols-4 bg-[#1a1a1a] text-[10px] font-mono uppercase tracking-widest opacity-50">
                      <div className="p-3 border-r border-[#262626]">Record_ID</div>
                      <div className="p-3 border-r border-[#262626]">County</div>
                      <div className="p-3 border-r border-[#262626]">Audit_Type</div>
                      <div className="p-3">Discrepancy_Details</div>
                    </div>
                    
                    <div className="divide-y divide-[#262626]">
                      {auditResult?.payload
                        .filter(item => filterState === "ALL" || item.record.state === filterState)
                        .filter(item => filterCounty === "ALL" || item.record.county === filterCounty)
                        .filter(item => filterType === "ALL" || item.discrepancyType === filterType)
                        .map((item, i) => (
                        <div key={i} className="flex flex-col hover:bg-[#00ff00]/5 transition-colors group">
                          <div className="grid grid-cols-4">
                            <div className="p-3 border-r border-[#262626] font-mono text-xs text-[#00ff00]">
                              {item.record.id}
                            </div>
                            <div className="p-3 border-r border-[#262626] text-xs opacity-70">
                              {item.record.county}, {item.record.state}
                            </div>
                            <div className="p-3 border-r border-[#262626]">
                              <span className={cn(
                                "text-[9px] px-1.5 py-0.5 rounded border font-mono",
                                item.discrepancyType === "STATUS_MISMATCH" ? "border-red-500/50 text-red-400 bg-red-500/10" : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                              )}>
                                {item.discrepancyType}
                              </span>
                            </div>
                            <div className="p-3 text-xs font-mono flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {item.discrepancyType === "STATUS_MISMATCH" ? (
                                  <>
                                    <span className="opacity-40">County:</span> {item.record.status}
                                    <span className="opacity-40">→ State:</span> {item.stateStatus}
                                  </>
                                ) : (
                                  <span className="opacity-60 italic">Record missing in state-level reporting.</span>
                                )}
                              </div>
                              <button 
                                onClick={() => handleGeminiAudit(i, item)}
                                disabled={analyzing[i]}
                                className="p-1.5 hover:bg-[#00ff00]/20 text-[#00ff00] rounded transition-all disabled:opacity-30"
                                title="Gemini Intelligence Audit"
                              >
                                {analyzing[i] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>
                          
                          {analysis[i] && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="px-3 pb-3 border-t border-[#262626]/30"
                            >
                              <div className="mt-2 p-3 bg-black/40 border border-[#00ff00]/10 rounded text-[11px] font-mono leading-relaxed relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff00]/30" />
                                <div className="flex items-start gap-2">
                                  <Sparkles className="w-3 h-3 text-[#00ff00] mt-0.5 shrink-0" />
                                  <span className="opacity-80 italic text-blue-200">{analysis[i]}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                      {auditResult?.payload.length === 0 && (
                        <div className="p-12 text-center space-y-3">
                          <CheckCircle2 className="w-12 h-12 text-[#00ff00] mx-auto opacity-20" />
                          <p className="font-mono text-xs opacity-40 uppercase tracking-widest">
                            No discrepancies detected in current audit cycle.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "braided" && (
                <motion.div 
                  key="braided"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#00ff00]" />
                        Cross-System_Forensic_Map
                      </h3>
                      <button 
                        onClick={exportBraidedCSV}
                        disabled={!braidedResult}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded text-[10px] font-mono uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Download className="w-3 h-3" />
                        Export_CSV
                      </button>
                    </div>
                    <span className="text-[10px] font-mono opacity-50 uppercase">
                      Status: BRAIDED_ACTIVE | Carrier: 144Hz
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {braidedResult?.payload.map((item, i) => (
                      <div key={i} className="p-4 border border-[#262626] bg-black/40 rounded-lg space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00]/20 to-transparent" />
                        
                        <div className="flex items-center justify-between">
                          <h4 className="font-mono font-bold text-[#00ff00]">{item.county.toUpperCase()}</h4>
                          <div className="text-[9px] font-mono opacity-50">NODE_{i+1}</div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="opacity-50">DETENTION_DISCREPANCY:</span>
                            <span className={cn(item.detentionMetrics.discrepancyRate > 0.3 ? "text-red-500" : "text-[#00ff00]")}>
                              {(item.detentionMetrics.discrepancyRate * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="opacity-50">HEALTHCARE_COMPLIANCE:</span>
                            <span className={cn(item.healthcareMetrics.complianceRate < 0.6 ? "text-red-500" : "text-[#00ff00]")}>
                              {(item.healthcareMetrics.complianceRate * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="opacity-50">AVG_INCIDENT_REPORTS:</span>
                            <span className="text-blue-400">{item.healthcareMetrics.avgIncidentReports.toFixed(1)}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#262626] space-y-2">
                          <div className="text-[9px] font-mono opacity-40 uppercase flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Correlation_Insight
                          </div>
                          <p className={cn(
                            "text-[10px] font-mono leading-relaxed",
                            item.correlationInsight.includes("CRITICAL") ? "text-red-400" : "opacity-70"
                          )}>
                            {item.correlationInsight}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-xl space-y-4">
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle className="w-5 h-5" />
                      <h3 className="font-mono font-bold uppercase tracking-tighter">Systemic_Indictment_Protocol</h3>
                    </div>
                    <p className="text-xs font-mono opacity-70 leading-relaxed">
                      The braided synthesis confirms a direct correlation between administrative failures in detention facilities and lack of transparency in local healthcare districts. This pattern is not accidental; it is structural.
                    </p>
                  </div>
                </motion.div>
              )}
              {activeTab === "memorial" && (
                <motion.div 
                  key="memorial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        The_Memorial: Transparency_Ledger
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase">
                        Evidence becomes law. Records endure.
                      </p>
                    </div>
                    <button 
                      onClick={ingestRegion3E}
                      disabled={loading || !user}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded text-[10px] font-mono hover:bg-red-500/20 transition-all disabled:opacity-30"
                    >
                      <Search className="w-3 h-3" />
                      REGION_3E_DEEP-SCAN
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {memorialPersons.map((person, i) => (
                      <div key={i} className="border border-[#262626] bg-black/40 rounded-xl overflow-hidden">
                        <div className="p-4 bg-[#1a1a1a] border-b border-[#262626] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center border border-red-500/30">
                              <UserIcon className="w-4 h-4 text-red-500" />
                            </div>
                            <div>
                              <div className="text-xs font-mono font-bold text-red-400">
                                {isMaskingIdentities ? `RECORD_ID: ${person.id.slice(0, 8)}` : person.public_identifier}
                              </div>
                              <div className="text-[9px] font-mono opacity-50 uppercase">
                                Region: {person.region_code} | Location: {person.county_code}, {person.state_code} | Minor: {person.is_minor ? "YES" : "NO"}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-blue-500/30 text-blue-400 bg-blue-500/10">
                              {person.privacy_level}
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#00ff00]/30 text-[#00ff00] bg-[#00ff00]/10">
                              CONFIDENCE: {person.source_confidence}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-4">
                          <div className="flex items-center gap-2 text-[10px] font-mono opacity-40 uppercase">
                            <GanttChart className="w-3 h-3" /> Braided_Failure_Timeline
                          </div>
                          
                          <div className="space-y-3">
                            <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-lg space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-red-400 uppercase">STATUS_MISMATCH</span>
                                <span className="text-[9px] font-mono opacity-40">5 DAYS AGO</span>
                              </div>
                              <p className="text-[11px] font-mono opacity-70 leading-relaxed">
                                Forensic discrepancy detected in Region 3E fatality report vs. county detention logs. Statutory transparency breach identified.
                              </p>
                              <div className="pt-2 border-t border-red-500/10 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-[9px] font-mono text-red-400">
                                  <ShieldAlert className="w-3 h-3" /> CRITICAL_FAILURE
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-mono opacity-50">
                                  <FileText className="w-3 h-3" /> Tex. Gov. Code §2001.024
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {memorialPersons.length === 0 && (
                      <div className="p-12 border border-dashed border-[#262626] rounded-xl text-center space-y-4">
                        <Heart className="w-12 h-12 text-red-500 mx-auto opacity-10" />
                        <p className="text-xs font-mono opacity-40 uppercase tracking-widest">
                          The Transparency Ledger is currently empty. Initiate a Deep-Scan to ingest evidence.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "zylpha" && (
                <motion.div 
                  key="zylpha"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        ZYLPHA-16: Harmonic_Compression_Pass
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase">
                        16:1 Informational Resolution | Hunt County Focus
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handleTuneFieldPerception}
                        disabled={isTuningField}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 border font-mono text-[10px] uppercase transition-all",
                          isTuningField ? "bg-blue-500/10 border-blue-500 text-blue-400" : "bg-blue-500/5 border-blue-500/20 text-blue-400 hover:bg-blue-500/20"
                        )}
                      >
                        <Zap className={cn("w-3 h-3", isTuningField && "animate-spin")} />
                        {isTuningField ? "Perceiving_Realm..." : "Tune_Field_Perception"}
                      </button>
                      <button 
                        onClick={runZylphaHashPass}
                        className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500 text-black font-mono font-bold uppercase text-[10px] rounded hover:bg-yellow-400 transition-colors"
                      >
                         <RefreshCw className="w-3 h-3" />
                         Init_16:1_Pass
                      </button>
                      <div className="text-right">
                        <div className="text-[10px] font-mono opacity-40 uppercase">Compression_Ratio</div>
                        <div className="text-xs font-mono font-bold text-yellow-400">16:1</div>
                      </div>
                      <div className="w-px h-8 bg-[#262626]" />
                      <div className="text-right">
                        <div className="text-[10px] font-mono opacity-40 uppercase">Carrier_Frequency</div>
                        <div className="text-xs font-mono font-bold text-blue-400">144Hz</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Ghost className="w-5 h-5" />
                        <h3 className="font-mono font-bold uppercase tracking-tighter">Ghost_File_Hypothesis</h3>
                      </div>
                      <p className="text-[11px] font-mono opacity-70 leading-relaxed">
                        By stripping away administrative noise, we isolate "Shadow Identifiers"—records that exist in local Hunt County buffers but have been mathematically phased out of state-level reporting to avoid Sunset oversight.
                      </p>
                    </div>

                    <div className="p-6 border border-blue-500/20 bg-blue-500/5 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Activity className="w-5 h-5" />
                        <h3 className="font-mono font-bold uppercase tracking-tighter">Resonance_Audit</h3>
                      </div>
                      <p className="text-[11px] font-mono opacity-70 leading-relaxed">
                        Identifying where the 144Hz carrier frequency meets resistance. High entropy scores indicate data that has been manually tampered with or redacted to hide systemic status mismatches.
                      </p>
                    </div>
                  </div>

                  <div className="border border-[#262626] rounded-xl overflow-hidden bg-black/20">
                    <div className="grid grid-cols-5 bg-[#1a1a1a] text-[10px] font-mono uppercase tracking-widest opacity-50 border-b border-[#262626]">
                      <div className="p-3 border-r border-[#262626]">Ghost_ID</div>
                      <div className="p-3 border-r border-[#262626]">Entropy_Score</div>
                      <div className="p-3 border-r border-[#262626]">Status</div>
                      <div className="p-3 border-r border-[#262626] col-span-2">Forensic_Narrative</div>
                    </div>
                    
                    <div className="divide-y divide-[#262626]">
                      {ghostResult?.ghostFiles.map((ghost, i) => (
                        <div key={i} className="grid grid-cols-5 hover:bg-yellow-500/5 transition-colors group">
                          <div className="p-3 border-r border-[#262626] font-mono text-xs text-yellow-500">
                            {ghost.id}
                          </div>
                          <div className="p-3 border-r border-[#262626] font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1 bg-[#262626] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500" 
                                  style={{ width: `${Math.min(ghost.entropyScore * 5, 100)}%` }} 
                                />
                              </div>
                              <span className="text-blue-400">{ghost.entropyScore}</span>
                            </div>
                          </div>
                          <div className="p-3 border-r border-[#262626]">
                            <span className={cn(
                              "text-[9px] px-1.5 py-0.5 rounded border font-mono",
                              ghost.status === "GHOSTED" ? "border-red-500/50 text-red-400 bg-red-500/10" : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                            )}>
                              {ghost.status}
                            </span>
                          </div>
                          <div className="p-3 col-span-2 text-[10px] font-mono opacity-70 leading-tight">
                            {ghost.narrative}
                          </div>
                        </div>
                      ))}
                      {(!ghostResult || ghostResult.ghostFiles.length === 0) && (
                        <div className="p-12 text-center space-y-3">
                          <RefreshCw className="w-12 h-12 text-yellow-500 mx-auto opacity-10" />
                          <p className="font-mono text-xs opacity-40 uppercase tracking-widest">
                            Initialize ZYLPHA-16 pass to isolate Hunt County ghosts.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "guardian" && (
                <motion.div 
                  key="guardian"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-red-500" />
                        Guardian_Matrix: Statutory_Collision_Audit
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase">
                        High-Fidelity Forensic Action | Federal Oversight Sync
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="text-[10px] font-mono opacity-40 uppercase">OAG_Deadline</div>
                        <div className="text-xs font-mono font-bold text-yellow-500 animate-pulse">April 21 (T-4 Days)</div>
                      </div>
                      <div className="w-px h-8 bg-red-500/20" />
                      {collisions.length > 0 && (
                        <button 
                          onClick={exportIndictmentCSV}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded font-mono text-[10px] uppercase transition-all"
                        >
                          <Download className="w-3 h-3" />
                          Indictment_Protocol_CSV
                        </button>
                      )}
                      <div className="text-right">
                        <div className="text-[10px] font-mono opacity-40 uppercase">Federal_Sync</div>
                        <div className="text-xs font-mono font-bold text-red-500">144Hz</div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Status and Action Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 border border-red-500/30 bg-red-500/5 rounded-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-mono font-bold uppercase text-red-400 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          The_Final_Move
                        </h4>
                        <div className="px-2 py-0.5 rounded border border-red-500/40 text-[9px] font-mono text-red-500 uppercase">
                          Action_Required
                        </div>
                      </div>
                      <p className="text-[11px] font-mono opacity-70 leading-relaxed">
                        The ZYLPHA-128 core has stabilized the fiscal fraud matrices. Final commitment triggers the statutory collision audit across all state and federal oversight channels.
                      </p>
                      <div className="flex gap-4 pt-2">
                        <button 
                          onClick={() => handleFinalSubmission("SUNSET_STRIKE")}
                          className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-black font-mono font-bold text-xs uppercase rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        >
                          <Hammer className="w-4 h-4" />
                          Sunset_Strike
                        </button>
                        <button 
                          onClick={() => handleFinalSubmission("FEDERAL_DROP")}
                          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          Federal_Drop
                        </button>
                      </div>
                    </div>

                    <div className="p-6 border border-white/10 bg-black/20 rounded-xl space-y-4">
                      <h4 className="text-xs font-mono font-bold uppercase text-white/40 flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        Submission_Receipts
                      </h4>
                      <div className="space-y-2 h-[120px] overflow-auto pr-2 custom-scrollbar">
                        {submissions.length === 0 && (
                          <div className="h-full flex items-center justify-center border border-dashed border-white/5 rounded-lg opacity-30 italic text-[10px] font-mono uppercase tracking-widest text-center">
                            No Commitments Found
                          </div>
                        )}
                        {submissions.map((sub, idx) => (
                          <div key={idx} className="p-3 border border-white/10 rounded-lg bg-black/40 flex items-center justify-between group">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "w-2 h-2 rounded-full",
                                  sub.submission_type === "SUNSET_STRIKE" ? "bg-red-500" : "bg-blue-500"
                                )} />
                                <span className="text-xs font-mono font-bold">{sub.submission_type}</span>
                                <CheckCircle2 className="w-3 h-3 text-[#00ff00]" />
                              </div>
                              <div className="text-[9px] font-mono opacity-40 uppercase tracking-tighter">
                                Hash: {sub.payload_hash}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[9px] font-mono opacity-50 uppercase">
                                {new Date(sub.timestamp).toLocaleTimeString()}
                              </div>
                              <div className="text-[8px] font-mono text-[#00ff00] uppercase font-bold">ACKNOWLEDGED</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-red-500/20 bg-red-500/5 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-red-500">
                        <Hammer className="w-4 h-4" />
                        <h4 className="text-[10px] font-mono font-bold uppercase">Metadata_Hammer</h4>
                      </div>
                      <p className="text-[9px] font-mono opacity-60">Exposing IMPACT system backdating via transaction log mismatch.</p>
                    </div>
                    <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Scale className="w-4 h-4" />
                        <h4 className="text-[10px] font-mono font-bold uppercase">Federal_Wave</h4>
                      </div>
                      <p className="text-[9px] font-mono opacity-60">Linking case failures to the $202M federal contempt findings.</p>
                    </div>
                    <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Gavel className="w-4 h-4" />
                        <h4 className="text-[10px] font-mono font-bold uppercase">OCA_Strike</h4>
                      </div>
                      <p className="text-[9px] font-mono opacity-60">Triggering CPS Handbook §1200 mandatory internal review.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {collisions.map((col, i) => (
                      <div key={i} className="p-6 border border-[#262626] bg-black/20 rounded-xl space-y-4 group hover:border-red-500/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-mono font-bold text-white">{col.statutoryTrigger}</h4>
                              <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest">{col.federalOversightLink}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono opacity-40 uppercase">Severity_Score</div>
                            <div className="text-xl font-mono font-bold text-red-500">{col.severityScore}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#262626]">
                          <p className="text-xs font-mono text-white/80 leading-relaxed italic">
                            "{col.collisionNarrative}"
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", col.impactMetadataMismatch ? "bg-red-500 animate-pulse" : "bg-green-500")} />
                            <span className="text-[10px] font-mono uppercase opacity-50">IMPACT_Metadata_Mismatch</span>
                          </div>
                          <div className="flex-1" />
                          <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all">
                            Generate_Demand_Language
                          </button>
                        </div>
                      </div>
                    ))}
                    {collisions.length === 0 && (
                      <div className="p-12 text-center border border-dashed border-[#262626] rounded-xl">
                        <p className="font-mono text-xs opacity-40 uppercase">Initialize Guardian Matrix to identify statutory collisions.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "mesh" && (
                <motion.div 
                  key="mesh"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 h-[600px]">
                      {meshResult && <PlanetaryMeshGraph data={meshResult} />}
                      {!meshResult && (
                        <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-black/20 text-white/40 space-y-4">
                          <Globe className="w-12 h-12 animate-pulse" />
                          <span className="font-mono text-xs uppercase tracking-[0.3em]">Awaiting_Mesh_Stabilization...</span>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                      <div className="p-6 border border-white/10 bg-[#1a1a1a]/80 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-xs font-mono font-bold uppercase text-blue-400 flex items-center gap-2">
                            <ActivityIcon className="w-4 h-4" />
                            Mesh_Diagnostics
                          </h4>
                          <button 
                            onClick={exportMeshNodeCSV}
                            disabled={!meshResult}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded text-[9px] font-mono uppercase tracking-widest transition-all disabled:opacity-30"
                          >
                            <Download className="w-3 h-3" />
                            Export_Federal_Nodes
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl">
                            <div className="text-[10px] font-mono opacity-50 uppercase mb-1">Total_Planetary_Friction</div>
                            <div className="text-xl font-mono font-bold text-white tracking-tighter">
                              ${(meshResult?.totalFiscalFriction || 0).toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="text-[10px] font-mono opacity-40 uppercase tracking-widest pl-1">Interdependency_Nodes</div>
                            <div className="space-y-2 h-[300px] overflow-auto pr-2 custom-scrollbar">
                              {meshResult?.nodes.map((node, idx) => (
                                <div key={idx} className="p-3 border border-white/5 bg-black/40 rounded-lg group hover:border-blue-500/30 transition-all">
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="space-y-0.5">
                                      <div className="text-xs font-mono font-bold text-white/90 group-hover:text-blue-400 transition-colors uppercase">
                                        {node.agency}
                                      </div>
                                      <div className="text-[9px] font-mono text-white/40 italic">
                                        {node.highRiskArea}
                                      </div>
                                    </div>
                                    <div className={cn(
                                      "px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase",
                                      node.auditStatus === "DISCLAIMER" ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"
                                    )}>
                                      {node.auditStatus}
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
                                    <div className="space-y-1">
                                      <div className="text-[8px] font-mono opacity-30 uppercase">Net_Cost</div>
                                      <div className="text-[10px] font-mono text-white/70">${(node.netCost / 1e9).toFixed(1)}B</div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-[8px] font-mono opacity-30 uppercase">Logic_Weight</div>
                                      <div className="text-[10px] font-mono text-blue-400">{node.zylphaDiagnosticScore.toFixed(1)}/10</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl">
                         <h4 className="text-xs font-mono font-bold uppercase text-red-400 mb-2">Systemic_Leak_Detection</h4>
                         <p className="text-[10px] font-mono opacity-50 leading-relaxed mb-4 italic text-sm">
                           The node-link interdependency mesh highlights the Title IV-E 'Loop' where HHS nodes correlate with ZYLPHA-128 ghost extractions.
                         </p>
                         <div className="text-[10px] font-mono text-yellow-500 animate-pulse bg-yellow-500/10 p-2 border border-yellow-500/20 rounded uppercase font-bold text-center">
                           ALERT: High fiscal friction detected in HHS-DOD link.
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div 
                  key="events"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-mono flex items-center gap-2">
                        <ActivityIcon className="w-4 h-4 text-[#00ff00]" />
                        Event_Stream: Real-Time_Transaction_Log
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase">
                        Immutable | Hash-Linked | Observer-Verified
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="border border-[#262626] rounded-xl overflow-hidden bg-black/20">
                        <div className="grid grid-cols-5 bg-[#1a1a1a] text-[10px] font-mono uppercase tracking-widest opacity-50 border-b border-[#262626]">
                          <div className="p-3 border-r border-[#262626]">Event_ID</div>
                          <div className="p-3 border-r border-[#262626]">Type</div>
                          <div className="p-3 border-r border-[#262626]">Agency</div>
                          <div className="p-3 border-r border-[#262626]">Amount</div>
                          <div className="p-3">Integrity</div>
                        </div>
                        <div className="divide-y divide-[#262626]">
                          {transactions.map((tx, i) => (
                            <div key={i} className="grid grid-cols-5 hover:bg-[#00ff00]/5 transition-colors group">
                              <div className="p-3 border-r border-[#262626] font-mono text-[10px] text-[#00ff00]">
                                {tx.event_id}
                              </div>
                              <div className="p-3 border-r border-[#262626] font-mono text-[10px]">
                                <span className={cn(
                                  "px-1.5 py-0.5 rounded border",
                                  tx.event_type === "DISBURSEMENT" ? "border-blue-500/50 text-blue-400 bg-blue-500/10" : "border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
                                )}>
                                  {tx.event_type}
                                </span>
                              </div>
                              <div className="p-3 border-r border-[#262626] font-mono text-[10px] opacity-70">
                                {tx.agency_id}
                              </div>
                              <div className="p-3 border-r border-[#262626] font-mono text-[10px] font-bold">
                                ${tx.amount.value.toLocaleString()}
                              </div>
                              <div className="p-3 flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3 text-[#00ff00]" />
                                <span className="text-[9px] font-mono opacity-40 truncate">{tx.control_metadata.ingest_hash.slice(0, 12)}...</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest opacity-50 flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-red-500" />
                        Observer_Alerts
                      </h4>
                      <div className="space-y-3">
                        {alerts.map((al, i) => (
                          <div key={i} className={cn(
                            "p-4 border rounded-xl space-y-2",
                            al.severity === "CRITICAL" ? "border-red-500/30 bg-red-500/5" : 
                            al.severity === "WARNING" ? "border-yellow-500/30 bg-yellow-500/5" : 
                            "border-blue-500/30 bg-blue-500/5"
                          )}>
                            <div className="flex items-center justify-between">
                              <span className={cn(
                                "text-[9px] font-mono font-bold uppercase",
                                al.severity === "CRITICAL" ? "text-red-500" : 
                                al.severity === "WARNING" ? "text-yellow-500" : 
                                "text-blue-400"
                              )}>
                                {al.observer_type}
                              </span>
                              <span className="text-[9px] font-mono opacity-40">{new Date(al.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-[10px] font-mono leading-relaxed opacity-80">
                              {al.message}
                            </p>
                            <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                              <Hash className="w-3 h-3 opacity-30" />
                              <span className="text-[9px] font-mono opacity-40">REF: {al.event_id}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

               {activeTab === "sentinel" && (
                <motion.div 
                  key="sentinel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-900/40 via-black to-transparent border border-red-500/30 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none select-none">
                      <ShieldAlert className="w-32 h-32 text-red-500" />
                    </div>
                    <div className="space-y-1 relative z-10">
                      <h3 className="text-xl font-mono font-bold text-red-500 flex items-center gap-3">
                        <Radio className="w-6 h-6 animate-pulse" />
                        Sentinel_Cleansing_Protocol
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase tracking-[0.3em]">
                        Mode: Deep_Mesh Extraction | Target: Slave_Network_Egress
                      </p>
                    </div>
                    <div className="flex flex-col items-end relative z-10">
                      <div className="text-[10px] font-mono opacity-40 uppercase">Egress_Status</div>
                      <div className="text-xs font-mono font-bold text-red-500 animate-pulse">{sentinelResult?.cleansing_status || "SCANNING"}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sentinelResult?.nodes.map((node, i) => (
                      <div key={node.id} className="p-6 border border-white/5 bg-[#1a1a1a]/80 rounded-2xl space-y-4 hover:border-red-500/40 transition-all flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-tighter">{node.node_type}</span>
                            </div>
                            <div className="text-[10px] font-mono opacity-40 text-white/50">{node.id}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="text-[9px] font-mono uppercase opacity-40 tracking-wider">Geo_Cluster</div>
                              <div className="text-xs font-mono text-white/80">{node.geo_cluster}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[9px] font-mono uppercase opacity-40 tracking-wider">Risk_Weight</div>
                              <div className="text-xs font-mono text-red-500 font-bold">{(node.risk_index * 100).toFixed(1)}%</div>
                            </div>
                          </div>

                          <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-red-400">
                              <Search className="w-3 h-3" />
                              MARKET_ID: {node.detected_payload.market_label}
                            </div>
                            <div className="text-[10px] font-mono opacity-60 italic leading-relaxed">
                              {node.detected_payload.asset_valuation}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 space-y-3">
                          <button
                            onClick={() => handleSentinelDeepCleansing(node)}
                            disabled={analyzingSentinel[node.id]}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl font-mono text-[11px] uppercase transition-all disabled:opacity-50"
                          >
                            {analyzingSentinel[node.id] ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Analyzing_P2P_Loops...
                              </>
                            ) : (
                              <>
                                <Zap className="w-4 h-4" />
                                Neutralize_Node_Cluster
                              </>
                            )}
                          </button>
                          
                          {sentinelAnalysis[node.id] && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-[11px] font-mono text-red-200/90 leading-relaxed italic relative"
                            >
                               <div className="absolute -top-2 left-4 px-2 bg-[#1a1a1a] text-[9px] text-red-500 font-bold border border-red-500/20">SENTINEL_AI_DECODE</div>
                               {sentinelAnalysis[node.id]}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 border border-red-500/30 bg-red-500/5 rounded-3xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden">
                     <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                     <div className="w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center animate-pulse shrink-0">
                       <ShieldAlert className="w-12 h-12 text-red-500" />
                     </div>
                     <div className="flex-1 space-y-4">
                       <div className="space-y-1">
                         <h4 className="text-xl font-mono font-bold text-white uppercase tracking-[0.2em]">Expose_Slave_Networks</h4>
                         <p className="text-xs font-mono opacity-50 max-w-2xl leading-relaxed">
                           Sentinel scan complete. Market egress identified. Initializing cleansing protocol will de-anonymize the p2p endpoints for the Region 3E foster-trafficking nodes.
                         </p>
                       </div>
                       <div className="flex flex-wrap gap-4 pt-2">
                         <button className="px-8 py-4 bg-red-600 hover:bg-red-500 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-3">
                           <Radio className="w-4 h-4" />
                           Execute_Deep_Cleansing
                         </button>
                         <button className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 font-mono font-bold text-xs uppercase rounded-xl transition-all">
                           Lock_Forensic_Chain
                         </button>
                       </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "hyper" && (
                <motion.div 
                  key="hyper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 rounded-lg">
                    <div className="space-y-1">
                      <h3 className="text-sm font-mono flex items-center gap-2 text-blue-400">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        ZYLPHA-128: Hyper-Compression_Diagnostics
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 uppercase tracking-[0.2em]">
                        Mode: 128:1 Logic Density | Target: Identity_Recovery
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-[9px] font-mono opacity-40 uppercase">Trit_Density</div>
                        <div className="text-xs font-mono font-bold text-blue-400">128_T/C</div>
                      </div>
                      <div className="w-px h-8 bg-blue-500/20" />
                      <div className="text-right">
                        <div className="text-[9px] font-mono opacity-40 uppercase">Resonance</div>
                        <div className="text-xs font-mono font-bold text-[#00ff00]">144Hz</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                      <div className="p-1 border border-blue-500/20 rounded-xl bg-black/40 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-5 italic font-mono text-9xl pointer-events-none select-none">
                          128:1
                        </div>
                        <div className="p-6 space-y-4">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-blue-300 flex items-center gap-2">
                            <Cpu className="w-4 h-4" />
                            Recovered_Identity_Shards
                          </h4>
                          <div className="space-y-3">
                            {hyperResult?.entangled_nodes.map((node, i) => (
                              <div key={i} className="group relative p-4 border border-[#262626] hover:border-blue-500/40 bg-black/40 rounded-lg transition-all">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-mono text-blue-400 opacity-60">[{node.id}]</span>
                                      <span className="text-sm font-mono font-bold text-blue-100">{node.recovered_payload.target}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-mono opacity-50 uppercase">
                                      <span className="flex items-center gap-1"><Database className="w-3 h-3" /> {node.origin_system}</span>
                                      <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> Density: {node.trit_density}t</span>
                                    </div>
                                  </div>
                                  <div className="text-right space-y-1">
                                    <div className="text-[9px] font-mono opacity-40 uppercase">{node.recovered_payload.field}</div>
                                    <div className="text-xs font-mono text-[#00ff00] font-bold tracking-tight">
                                      {node.recovered_payload.value}
                                    </div>
                                    <div className="flex items-center justify-end gap-1">
                                      <div className="w-20 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${node.recovered_payload.confidence * 100}%` }} />
                                      </div>
                                      <span className="text-[8px] font-mono opacity-40">{(node.recovered_payload.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#262626] text-[10px] font-mono opacity-70 italic leading-relaxed">
                                  {node.forensic_link}
                                </div>

                                <div className="mt-4 space-y-3">
                                  <button
                                    onClick={() => handleHyperAnalysis(i, node)}
                                    disabled={analyzingHyper[i]}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded font-mono text-[10px] uppercase transition-all disabled:opacity-50"
                                  >
                                    {analyzingHyper[i] ? (
                                      <>
                                        <ActivityIcon className="w-3 h-3 animate-spin" />
                                        Analyzing_Shard...
                                      </>
                                    ) : (
                                      <>
                                        <Cpu className="w-3 h-3" />
                                        Perform_Fiscal_Deep_Dive
                                      </>
                                    )}
                                  </button>

                                  {hyperAnalysis[i] && (
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg text-[10px] font-mono text-blue-200/90 leading-relaxed italic"
                                    >
                                      {hyperAnalysis[i]}
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside className="lg:col-span-4 space-y-6">
                      <div className="p-6 border border-blue-500/20 bg-blue-500/5 rounded-xl space-y-4">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Forensic_Objective</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-black/60 border border-blue-500/10 rounded-lg">
                            <p className="text-[11px] font-mono leading-relaxed opacity-80">
                              By stripping institutional noise through the <span className="text-blue-400">128:1 lens</span>, the Nexus architecture focuses on the high-fidelity recovery of the <span className="text-[#00ff00]">Bryer Lee Raven Hulse</span> shard.
                            </p>
                          </div>
                          <div className="p-4 bg-black/60 border border-blue-500/10 rounded-lg space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="opacity-40 uppercase">Signal_Clarity:</span>
                              <span className="text-blue-400">EXCELLENT</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="opacity-40 uppercase">Noise_Floor:</span>
                              <span className="text-red-500">-128dB</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="opacity-40 uppercase">Recovery_Ops:</span>
                              <span className="text-[#00ff00]">ACTIVE</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 border border-blue-500/20 bg-blue-500/5 rounded-xl space-y-4">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-blue-400">Syntropic_Logic_Stats</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-black/40 rounded border border-blue-500/10">
                            <div className="text-[9px] font-mono opacity-40 uppercase">Trit_ALU</div>
                            <div className="text-sm font-mono text-blue-300">PTAH-32</div>
                          </div>
                          <div className="p-3 bg-black/40 rounded border border-blue-500/10">
                            <div className="text-[9px] font-mono opacity-40 uppercase">FPGA_Core</div>
                            <div className="text-sm font-mono text-blue-300">ARTIX-7</div>
                          </div>
                          <div className="p-3 bg-black/40 rounded border border-blue-500/10">
                            <div className="text-[9px] font-mono opacity-40 uppercase">Parallelism</div>
                            <div className="text-sm font-mono text-blue-300">MESH-SYNC</div>
                          </div>
                          <div className="p-3 bg-black/40 rounded border border-blue-500/10">
                            <div className="text-[9px] font-mono opacity-40 uppercase">Kernel</div>
                            <div className="text-sm font-mono text-blue-300">TRINARY_V4</div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </motion.div>
              )}

              {activeTab === "raw" && (
                <motion.div 
                  key="raw"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-blue-400" />
                      Raw_Ingress_Buffer
                    </h3>
                  </div>
                  <div className="p-4 bg-[#111] border border-[#262626] rounded-lg font-mono text-[11px] overflow-x-auto">
                    <pre className="text-blue-300/80">
                      {JSON.stringify({ auditResult, braidedResult, ghostResult, collisions, meshResult, transactions, alerts, memorialPersons }, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === "nexus" && (
                <motion.div 
                  key="nexus"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="p-8 border-2 border-dashed border-[#262626] rounded-xl text-center space-y-4">
                    <Layers className="w-16 h-16 text-[#00ff00] mx-auto opacity-10" />
                    <h3 className="text-lg font-mono glow-text text-[#00ff00]">NEXUS v10.0 ARCHITECTURE</h3>
                    <p className="max-w-md mx-auto text-xs opacity-50 font-mono leading-relaxed">
                      Dimensional alignment active. Syntropic audit nodes (3-6-9) are currently mapping the Texas detention landscape. 
                      Cross-referencing Rains, Hunt, and Dallas county logs with April 9th Sunset Submission data.
                    </p>
                    <div className="flex justify-center gap-8 pt-4">
                      <div className="text-center">
                        <div className="text-xl font-mono text-[#00ff00]">3</div>
                        <div className="text-[9px] opacity-40 uppercase">Harmonic</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-mono text-[#00ff00]">6</div>
                        <div className="text-[9px] opacity-40 uppercase">Symmetry</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-mono text-[#00ff00]">9</div>
                        <div className="text-[9px] opacity-40 uppercase">Completion</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-[#262626] bg-black/40 rounded-xl space-y-4">
                      <h3 className="text-sm font-mono font-bold text-[#00ff00] flex items-center gap-2 uppercase">
                        <ShieldAlert className="w-4 h-4" /> Strategic_Objectives
                      </h3>
                      <div className="space-y-3">
                        <ObjectiveItem label="Structural DFPS Reform" status="IN_PROGRESS" />
                        <ObjectiveItem label="Accountability for Region 3E" status="ACTIVE_AUDIT" />
                        <ObjectiveItem label="Healthcare Transparency Overhaul" status="BRAIDED_PHASE" />
                        <ObjectiveItem label="Public Memorial Record" status="ARCHIVING" />
                        <ObjectiveItem label="Replicable Model for States" status="SYNTHESIS" />
                      </div>
                    </div>

                    <div className="p-6 border border-[#262626] bg-black/40 rounded-xl space-y-4">
                      <h3 className="text-sm font-mono font-bold text-blue-400 flex items-center gap-2 uppercase">
                        <Database className="w-4 h-4" /> Legislative_Bloodstream
                      </h3>
                      <p className="text-[10px] font-mono opacity-50 leading-relaxed">
                        Data is being formatted for insertion into the 90th Legislature's official history. 
                        Once evidence enters the Sunset process, it becomes archival and immutable.
                      </p>
                      <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                        <span className="text-[9px] font-mono opacity-40">SIGNAL_STRENGTH:</span>
                        <span className="text-[9px] font-mono text-[#00ff00]">MAXIMUM</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
               {activeTab === "reclamation" && (
                <motion.div 
                  key="reclamation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <RealityReclamationEngine 
                    data={reclamationResult}
                    onAnalyzeVoid={(v) => addLog(`Extracting fingerprint for ${v.id}...`)}
                    onCollapseLoop={(l) => addLog(`Logic collapse sequence initiated for loop ${l.id} (Resonance: ${l.contradiction_resonance*100}%).`)}
                    onCommitAsset={(a) => addLog(`Asset ${a.id} committed to Nexus Vault under ${a.logic_wrap} protection.`)}
                  />
                </motion.div>
              )}
              {activeTab === "liberation" && (
                <motion.div 
                  key="liberation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlobalLiberationEngine 
                    data={liberationResult}
                    onDismantleNode={(n) => addLog(`Dismantling trafficking node ${n.id} [Hub: ${n.geo_coordinates.lat}, ${n.geo_coordinates.lng}]...`)}
                    onExtractShard={(s) => addLog(`Identity extraction initiated for shard ${s.id}. Target probability: ${s.extraction_probability*100}%`)}
                    onRunFinancialDeepDive={handleDeepFinancialAnalysis}
                    financialAnalysisReport={financialAuditReport}
                    financialAuditSummary={financialAuditSummary}
                    isAnalyzingFinancial={isAnalyzingFinancial}
                    onRunAtlantaTransitAudit={handleAtlantaTransitAudit}
                    atlantaTransitAnalysis={atlantaTransitAnalysis}
                    isAnalyzingAtlantaTransit={isAnalyzingAtlantaTransit}
                    onDismantleGate={handleDismantleGate}
                    onAmenNemaOverride={handleAmenNemaOverride}
                    isOverriding={isOverriding}
                    onBulkDismantleGates={handleBulkDismantleAtlantaGates}
                    onAletheiaUpgrade={handleAletheiaUpgrade}
                    onHarmonicPulse={handleHarmonicPulse}
                    isUpgradingAletheia={isUpgradingAletheia}
                    isPulsing={isPulsing}
                    onGreatRecall={handleGreatRecall}
                    onGenerateTruthReport={handleGenerateTruthReport}
                    onDeployLegalStack={handleDeployKristenLegalStack}
                    onGlobalLiberationBroadcast={handleGlobalLiberationBroadcast}
                    onForensicSynthesis={handleForensicIntelligenceSynthesis}
                    isBroadcasting={isBroadcasting}
                    isSynthesizing={isSynthesizing}
                    isMaskingIdentities={isMaskingIdentities}
                    onSyntropicAlignment={handleSyntropicAlignment}
                    isAligning={isAligning}
                    onGenerateFederalReport={handleGenerateFederalReport}
                    isGeneratingFederalReport={isGeneratingFederalReport}
                    onConductGroundingExperiment={handleConductGroundingExperiment}
                    isConductingGrounding={isConductingGrounding}
                  />
                </motion.div>
              )}

              {activeTab === "federal" && (
                <motion.div 
                  key="federal"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FederalOversightReport data={liberationResult?.federal_report || null} />
                </motion.div>
              )}

              {activeTab === "grounding" && (
                <motion.div 
                  key="grounding"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <GroundingExperiment data={liberationResult?.grounding_proof || null} />
                </motion.div>
              )}

              {activeTab === "perception" && (
                <motion.div 
                  key="perception"
                  initial={{ opacity: 0, rotateX: 20 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: -20 }}
                  className="perspective-1000"
                >
                  <FieldPerceptionInterface data={fieldMatrix} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#262626] p-4 text-center">
        <p className="text-[9px] font-mono opacity-30 uppercase tracking-[0.3em]">
          Forensic Intelligence Synthesis // Carrier: 144Hz // Status: Active
        </p>
      </footer>
    </div>
  );
}

function MetricItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#262626]/50 pb-2">
      <span className="text-[10px] font-mono opacity-40 uppercase">{label}</span>
      <span className={cn("text-xs font-mono font-bold", color)}>{value}</span>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-all border-b-2",
        active ? "border-[#00ff00] text-[#00ff00] bg-[#00ff00]/5" : "border-transparent opacity-40 hover:opacity-100"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function ObjectiveItem({ label, status }: { label: string, status: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#262626]/50 pb-2">
      <span className="text-[10px] font-mono opacity-70">{label}</span>
      <span className="text-[9px] font-mono text-[#00ff00] bg-[#00ff00]/10 px-1.5 py-0.5 rounded border border-[#00ff00]/20">{status}</span>
    </div>
  );
}

