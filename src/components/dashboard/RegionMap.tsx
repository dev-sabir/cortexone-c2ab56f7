import { motion } from "framer-motion";
import { CLOUD_ZONES, getZoneDistribution } from "@/data/mockData";

const zoneDist = getZoneDistribution();

// Simplified world map coordinates for region dots (projected to viewport)
const regionPositions: Record<string, { x: number; y: number }> = {
  "aws/us-east-1": { x: 25, y: 38 },
  "aws/eu-west-1": { x: 45, y: 30 },
  "aws/ap-southeast-1": { x: 78, y: 55 },
  "gcp/us-central1": { x: 20, y: 36 },
  "gcp/europe-west1": { x: 50, y: 32 },
  "gcp/asia-east1": { x: 82, y: 40 },
  "azure/eastus": { x: 27, y: 42 },
  "azure/westeurope": { x: 48, y: 28 },
};

export default function RegionMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="stat-card col-span-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Global Execution Map</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Intelligent router distributes load across {CLOUD_ZONES.length} zones on 3 cloud providers
          </p>
        </div>
        <div className="flex gap-4">
          {[
            { label: "AWS", color: "hsl(35, 90%, 55%)" },
            { label: "GCP", color: "hsl(185, 80%, 50%)" },
            { label: "Azure", color: "hsl(280, 65%, 60%)" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[280px] rounded-lg overflow-hidden bg-muted/30 border border-border">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`v${i}`} x1={`${(i + 1) * 8}%`} y1="0" x2={`${(i + 1) * 8}%`} y2="100%" stroke="hsl(220, 16%, 20%)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={`${(i + 1) * 14}%`} x2="100%" y2={`${(i + 1) * 14}%`} stroke="hsl(220, 16%, 20%)" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Connection lines between regions */}
        <svg className="absolute inset-0 w-full h-full">
          {CLOUD_ZONES.slice(0, -1).map((zone, i) => {
            const pos1 = regionPositions[zone.id];
            const pos2 = regionPositions[CLOUD_ZONES[i + 1].id];
            if (!pos1 || !pos2) return null;
            return (
              <motion.line
                key={`line-${i}`}
                x1={`${pos1.x}%`}
                y1={`${pos1.y}%`}
                x2={`${pos2.x}%`}
                y2={`${pos2.y}%`}
                stroke="hsl(185, 80%, 50%)"
                strokeWidth="0.5"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
              />
            );
          })}
        </svg>

        {/* Region dots */}
        {CLOUD_ZONES.map((zone, i) => {
          const pos = regionPositions[zone.id];
          const dist = zoneDist.find((d) => d.zone === zone.id);
          if (!pos) return null;

          return (
            <motion.div
              key={zone.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
              className="absolute group"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: zone.color, opacity: 0.15, width: 24, height: 24, margin: -4 }}
              />
              {/* Dot */}
              <span
                className="relative block w-4 h-4 rounded-full border-2 cursor-pointer"
                style={{ background: zone.color, borderColor: "hsl(220, 20%, 4%)" }}
              />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-card border border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                <p className="text-xs font-semibold text-foreground">{zone.cloud} / {zone.region}</p>
                <p className="text-xs font-mono text-primary">{zone.id}</p>
                {dist && (
                  <p className="text-xs text-muted-foreground mt-1">{dist.count} executions ({dist.percentage}%)</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
