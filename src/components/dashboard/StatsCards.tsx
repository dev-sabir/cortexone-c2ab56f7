import { motion } from "framer-motion";
import { Activity, DollarSign, Gauge, Globe, Shield, TrendingDown } from "lucide-react";
import { getStats } from "@/data/mockData";

const stats = getStats();

const cards = [
  {
    label: "Total Executions",
    value: stats.totalExecutions.toLocaleString(),
    sub: "Last 7 days",
    icon: Activity,
    accent: "primary",
  },
  {
    label: "Avg Latency",
    value: `${stats.avgLatency}ms`,
    sub: "P50 across all zones",
    icon: Gauge,
    accent: "accent",
  },
  {
    label: "Active Zones",
    value: stats.activeZones.toString(),
    sub: "Multi-cloud routing",
    icon: Globe,
    accent: "chart-1",
  },
  {
    label: "Total Cost",
    value: `$${stats.totalCost.toFixed(2)}`,
    sub: `${stats.costSavings}% savings vs single-cloud`,
    icon: TrendingDown,
    accent: "chart-3",
  },
  {
    label: "Uptime",
    value: `${stats.uptime}%`,
    sub: "Zero downtime routing",
    icon: Shield,
    accent: "accent",
  },
  {
    label: "Cost / Execution",
    value: `$${(stats.totalCost / stats.totalExecutions).toFixed(5)}`,
    sub: "Optimized by intelligent router",
    icon: DollarSign,
    accent: "chart-4",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="stat-card group cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {card.label}
            </span>
            <card.icon className="h-4 w-4 text-primary opacity-60" />
          </div>
          <p className="text-2xl font-bold font-mono tracking-tight text-foreground">
            {card.value}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
