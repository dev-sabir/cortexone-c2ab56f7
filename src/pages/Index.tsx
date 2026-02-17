import { motion } from "framer-motion";
import StatsCards from "@/components/dashboard/StatsCards";
import ExecutionTimeline from "@/components/dashboard/ExecutionTimeline";
import CloudDistribution from "@/components/dashboard/CloudDistribution";
import CostChart from "@/components/dashboard/CostChart";
import RegionMap from "@/components/dashboard/RegionMap";
import ExecutionLog from "@/components/dashboard/ExecutionLog";
import RouterVisualization from "@/components/dashboard/RouterVisualization";
import { Activity } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                Cortex<span className="text-primary">One</span>
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Universal Execution Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
              <span className="text-xs font-mono text-accent font-medium">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2"
        >
          <h2 className="text-2xl font-bold text-foreground">
            Execution <span className="text-gradient-primary">Analytics</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Cloud-agnostic function routing across AWS, GCP & Azure — real-time
          </p>
        </motion.div>

        <StatsCards />
        <RouterVisualization />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExecutionTimeline />
          <CloudDistribution />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CostChart />
          <div className="stat-card flex flex-col justify-center items-center text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-6xl font-bold font-mono text-gradient-primary mb-2">34%</p>
              <p className="text-lg font-semibold text-foreground">Cost Reduction</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                vs single-cloud deployment. Intelligent router optimizes for cost, latency, and availability simultaneously.
              </p>
            </motion.div>
          </div>
        </div>

        <RegionMap />
        <ExecutionLog />

        {/* Footer */}
        <div className="text-center py-8 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground font-mono">
            CortexOne Universal Execution Engine v2.0 — Confidential Demo
          </p>
        </div>
      </main>
    </div>
  );
}
