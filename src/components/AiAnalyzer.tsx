"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Sparkles, AlertTriangle } from "lucide-react";

interface AnalysisResult {
  summary: string;
  totalSpend: number;
  topCategories: { category: string; amount: number; percentage: number }[];
  trend: string;
  riskFlags: string[];
  kpis: { label: string; value: string }[];
  recommendations: string[];
}

export default function AiAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        res = await api.post("/ai/analyze", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await api.post("/ai/analyze");
      }
      setResult(res.data.analysis);
      toast.success("Analysis ready.");
    } catch {
      toast.error("Analysis failed. Add some expenses first, or check your CSV format.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fintrack-ai-report.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-charcoal/10 p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="text-gold" size={20} />
        <h2 className="font-display text-xl font-semibold text-charcoal">AI Data Analyzer</h2>
      </div>
      <p className="mt-2 text-sm text-charcoal/60">
        Analyze your own logged expenses, or upload a CSV (columns: title, amount, date, category).
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-charcoal/60"
        />
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-ink hover:bg-gold-light disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Run analysis"}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6">
          <p className="text-charcoal/70">{result.summary}</p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {result.kpis?.map((k) => (
              <div key={k.label} className="rounded-xl bg-paper-dim p-4">
                <div className="font-display text-lg font-semibold text-ink">{k.value}</div>
                <div className="text-xs text-charcoal/50">{k.label}</div>
              </div>
            ))}
          </div>

          {result.topCategories?.length > 0 && (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.topCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e9e2" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#c89b3c" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {result.riskFlags?.length > 0 && (
            <div className="rounded-xl bg-rose/10 p-4">
              <div className="flex items-center gap-2 text-rose">
                <AlertTriangle size={16} /> <span className="font-medium">Risk flags</span>
              </div>
              <ul className="mt-2 list-inside list-disc text-sm text-charcoal/70">
                {result.riskFlags.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          {result.recommendations?.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-charcoal">Recommendations</h3>
              <ul className="mt-2 list-inside list-disc text-sm text-charcoal/70">
                {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

          <button onClick={downloadReport} className="rounded-full border border-ink px-5 py-2 text-sm text-ink hover:bg-ink/5">
            Download report
          </button>
        </div>
      )}
    </div>
  );
}
