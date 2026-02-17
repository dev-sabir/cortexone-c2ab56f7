import { motion } from "framer-motion";
import { mockExecutions } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

const cloudColor: Record<string, string> = {
  aws: "bg-warning/20 text-warning",
  gcp: "bg-primary/20 text-primary",
  azure: "bg-chart-4/20 text-chart-4",
};

function getCloudClass(zone: string) {
  const provider = zone.split("/")[0];
  return cloudColor[provider] || "bg-muted text-muted-foreground";
}

export default function ExecutionLog() {
  const recent = mockExecutions.slice(0, 15);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="stat-card col-span-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Recent Executions</h3>
          <p className="text-xs text-muted-foreground mt-1">Live function execution log with zone routing</p>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {mockExecutions.length} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Function", "User", "Zone", "Latency", "Cost", "Type", "Time"].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2 px-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((exec, i) => (
              <motion.tr
                key={exec.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.03 }}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors"
              >
                <td className="py-2.5 px-3 font-mono text-xs text-foreground font-medium max-w-[180px] truncate">
                  {exec.function_name}
                </td>
                <td className="py-2.5 px-3 text-xs text-muted-foreground">{exec.user_name}</td>
                <td className="py-2.5 px-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium ${getCloudClass(exec.zone)}`}>
                    {exec.zone}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-mono text-xs text-foreground">{exec.duration_ms}ms</td>
                <td className="py-2.5 px-3 font-mono text-xs text-accent">${exec.execution_cost.toFixed(6)}</td>
                <td className="py-2.5 px-3">
                  <span className="text-xs text-muted-foreground capitalize">{exec.request_type}</span>
                </td>
                <td className="py-2.5 px-3 text-xs text-muted-foreground whitespace-nowrap">
                  {formatDistanceToNow(new Date(exec.executed_at), { addSuffix: true })}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
