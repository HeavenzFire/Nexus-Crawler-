import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import * as cheerio from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock data for Oversight Records (State Level)
  const mockOversightData = [
    { uid: "RAINS-001", status: "RELEASED", county: "Rains", state: "TX" },
    { uid: "HUNT-002", status: "DETAINED", county: "Hunt", state: "TX" },
    { uid: "DALLAS-003", status: "TRANSFERRED", county: "Dallas", state: "TX" },
    { uid: "RAINS-004", status: "DETAINED", county: "Rains", state: "TX" },
    { uid: "LA-001", status: "DETAINED", county: "Los Angeles", state: "CA" },
    { uid: "SF-001", status: "RELEASED", county: "San Francisco", state: "CA" },
    { uid: "MIAMI-001", status: "TRANSFERRED", county: "Miami-Dade", state: "FL" },
    { uid: "NYC-001", status: "DETAINED", county: "New York City", state: "NY" },
  ];

  // Mock data for Healthcare Facilities
  const mockHealthcareData = [
    { id: "HOSP-001", name: "Rains Memorial", county: "Rains", state: "TX", mrfPricingStatus: "COMPLIANT", incidentReportsCount: 2, budgetAllocation: 5000000, lastAuditDate: Date.now() },
    { id: "HOSP-002", name: "Hunt County General", county: "Hunt", state: "TX", mrfPricingStatus: "NON_COMPLIANT", incidentReportsCount: 15, budgetAllocation: 12000000, lastAuditDate: Date.now() },
    { id: "HOSP-003", name: "Dallas Central Health", county: "Dallas", state: "TX", mrfPricingStatus: "PARTIAL", incidentReportsCount: 8, budgetAllocation: 45000000, lastAuditDate: Date.now() },
    { id: "HOSP-004", name: "Greenville Community", county: "Hunt", state: "TX", mrfPricingStatus: "COMPLIANT", incidentReportsCount: 4, budgetAllocation: 8000000, lastAuditDate: Date.now() },
    { id: "HOSP-CA-01", name: "Cedars-Sinai", county: "Los Angeles", state: "CA", mrfPricingStatus: "COMPLIANT", incidentReportsCount: 1, budgetAllocation: 150000000, lastAuditDate: Date.now() },
    { id: "HOSP-FL-01", name: "Jackson Memorial", county: "Miami-Dade", state: "FL", mrfPricingStatus: "NON_COMPLIANT", incidentReportsCount: 22, budgetAllocation: 85000000, lastAuditDate: Date.now() },
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", frequency: "144Hz" });
  });

  app.get("/api/healthcare-audit", async (req, res) => {
    res.json({
      healthcareData: mockHealthcareData,
      timestamp: Date.now()
    });
  });

  app.get("/api/audit", async (req, res) => {
    const mockCountyData = [
      { id: "RAINS-001", county: "Rains", state: "TX", timestamp: Date.now(), status: "DETAINED" }, 
      { id: "HUNT-002", county: "Hunt", state: "TX", timestamp: Date.now(), status: "DETAINED" },
      { id: "DALLAS-003", county: "Dallas", state: "TX", timestamp: Date.now(), status: "TRANSFERRED" },
      { id: "RAINS-004", county: "Rains", state: "TX", timestamp: Date.now(), status: "DETAINED" },
      { id: "HUNT-005", county: "Hunt", state: "TX", timestamp: Date.now(), status: "DETAINED" }, 
      { id: "LA-001", county: "Los Angeles", state: "CA", timestamp: Date.now(), status: "RELEASED" }, // Discrepancy!
      { id: "NYC-001", county: "New York City", state: "NY", timestamp: Date.now(), status: "DETAINED" },
      { id: "FL-UNTRACKED-01", county: "Orange", state: "FL", timestamp: Date.now(), status: "DETAINED" }, // Missing in Oversight
    ];

    res.json({
      countyData: mockCountyData,
      oversightData: mockOversightData,
      timestamp: Date.now()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYSTEM] Texas Crawler v2.0 active at http://localhost:${PORT}`);
    console.log(`[SYSTEM] Signal Frequency: 144Hz`);
  });
}

startServer();
