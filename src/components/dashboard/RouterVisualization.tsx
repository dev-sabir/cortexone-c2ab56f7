import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap } from "lucide-react";

const steps = [
  { label: "Incoming Request", sub: "Function invocation", icon: Zap },
  { label: "Intelligent Router", sub: "Latency + cost + availability scoring", icon: Cpu, highlight: true },
  { label: "Optimal Zone", sub: "Routed to best available region", icon: ArrowRight },
];

export default function RouterVisualization() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="stat-card col-span-full"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1">Intelligent Routing Pipeline</h3>
      <p className="text-xs text-muted-foreground mb-6">
        Cloud-agnostic execution engine automatically selects the optimal zone based on real-time signals
      </p>

      <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 md:gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              className={`flex flex-col items-center p-4 rounded-xl border ${
                step.highlight
                  ? "border-primary/40 bg-primary/5 glow-primary"
                  : "border-border bg-muted/30"
              } min-w-[140px]`}
            >
              <step.icon className={`h-6 w-6 mb-2 ${step.highlight ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`text-sm font-semibold ${step.highlight ? "text-primary" : "text-foreground"}`}>
                {step.label}
              </span>
              <span className="text-xs text-muted-foreground text-center mt-1">{step.sub}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7 + i * 0.2, duration: 0.4 }}
              >
                <ArrowRight className="h-5 w-5 text-primary/40" />
              </motion.div>
            )}
          </div>
        ))}

        {/* Target zones */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
          className="flex flex-col gap-1.5 ml-2"
        >
          {[
            { zone: "aws/us-east-1", color: "bg-warning" },
            { zone: "gcp/us-central1", color: "bg-primary" },
            { zone: "azure/eastus", color: "bg-chart-4" },
          ].map((z) => (
            <div key={z.zone} className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/50 border border-border">
              <span className={`w-1.5 h-1.5 rounded-full ${z.color}`} />
              <span className="text-xs font-mono text-muted-foreground">{z.zone}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
