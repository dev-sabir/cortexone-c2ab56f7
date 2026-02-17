import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getHourlyExecutions } from "@/data/mockData";

const data = getHourlyExecutions();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-2 font-mono">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono font-semibold text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function ExecutionTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="stat-card col-span-full lg:col-span-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Execution Volume — 24h</h3>
          <p className="text-xs text-muted-foreground mt-1">Intelligent routing across cloud providers</p>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 border border-accent/20">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
          <span className="text-xs font-mono text-accent">LIVE</span>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="awsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(35, 90%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gcpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(185, 80%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(185, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="azureGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(280, 65%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
            <XAxis dataKey="hour" tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "hsl(215, 15%, 50%)", fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, color: "hsl(215, 15%, 50%)" }}
            />
            <Area type="monotone" dataKey="aws" name="AWS" stroke="hsl(35, 90%, 55%)" fill="url(#awsGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="gcp" name="GCP" stroke="hsl(185, 80%, 50%)" fill="url(#gcpGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="azure" name="Azure" stroke="hsl(280, 65%, 60%)" fill="url(#azureGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
