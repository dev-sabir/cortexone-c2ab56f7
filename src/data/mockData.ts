export interface ExecutionLog {
  id: string;
  user_name: string;
  function_name: string;
  version: string;
  executed_at: string;
  execution_cost: number;
  request_type: string;
  compute_cost: number;
  function_cost: number;
  duration_ms: number;
  memory_mb: number;
  cpu_usage: number;
  zone: string;
}

export const CLOUD_ZONES = [
  { id: "aws/us-east-1", cloud: "AWS", region: "US East (Virginia)", lat: 39.0, lng: -77.5, color: "hsl(35, 90%, 55%)" },
  { id: "aws/eu-west-1", cloud: "AWS", region: "EU West (Ireland)", lat: 53.3, lng: -6.3, color: "hsl(35, 90%, 55%)" },
  { id: "aws/ap-southeast-1", cloud: "AWS", region: "AP Southeast (Singapore)", lat: 1.35, lng: 103.8, color: "hsl(35, 90%, 55%)" },
  { id: "gcp/us-central1", cloud: "GCP", region: "US Central (Iowa)", lat: 41.9, lng: -93.1, color: "hsl(185, 80%, 50%)" },
  { id: "gcp/europe-west1", cloud: "GCP", region: "EU West (Belgium)", lat: 50.8, lng: 3.7, color: "hsl(185, 80%, 50%)" },
  { id: "gcp/asia-east1", cloud: "GCP", region: "Asia East (Taiwan)", lat: 25.0, lng: 121.5, color: "hsl(185, 80%, 50%)" },
  { id: "azure/eastus", cloud: "Azure", region: "East US (Virginia)", lat: 37.4, lng: -79.4, color: "hsl(280, 65%, 60%)" },
  { id: "azure/westeurope", cloud: "Azure", region: "West Europe (Netherlands)", lat: 52.4, lng: 4.9, color: "hsl(280, 65%, 60%)" },
];

export const FUNCTIONS = [
  "Blockchain: Utilities",
  "Storm - PII Content Tagger",
  "Neural Search Engine",
  "Data Pipeline Orchestrator",
  "Real-time Fraud Detector",
  "Content Moderation AI",
  "Geo-Location Resolver",
  "Payment Gateway Bridge",
];

const USERS = [
  "Mohd Sabir",
  "Charlie Wardell",
  "Alex Chen",
  "Sarah Miller",
  "Raj Patel",
];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateExecution(hoursAgo: number): ExecutionLog {
  const zone = randomChoice(CLOUD_ZONES);
  const fn = randomChoice(FUNCTIONS);
  const duration = Math.floor(Math.random() * 800) + 5;
  const computeCost = parseFloat((Math.random() * 0.002).toFixed(7));
  const functionCost = parseFloat((Math.random() * 0.02).toFixed(4));

  return {
    id: crypto.randomUUID(),
    user_name: randomChoice(USERS),
    function_name: fn,
    version: `${Math.floor(Math.random() * 3)}.${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
    executed_at: new Date(Date.now() - hoursAgo * 3600000 - Math.random() * 3600000).toISOString(),
    execution_cost: parseFloat((computeCost + functionCost).toFixed(7)),
    request_type: randomChoice(["invoke", "execution", "scheduled", "webhook"]),
    compute_cost: computeCost,
    function_cost: functionCost,
    duration_ms: duration,
    memory_mb: randomChoice([64, 128, 256, 512]),
    cpu_usage: Math.floor(Math.random() * 15),
    zone: zone.id,
  };
}

// Generate 292 mock executions over the past 7 days
export const mockExecutions: ExecutionLog[] = Array.from({ length: 292 }, (_, i) =>
  generateExecution((i / 292) * 168)
).sort((a, b) => new Date(b.executed_at).getTime() - new Date(a.executed_at).getTime());

// Aggregated stats
export const getStats = () => {
  const totalCost = mockExecutions.reduce((s, e) => s + e.execution_cost, 0);
  const avgLatency = mockExecutions.reduce((s, e) => s + e.duration_ms, 0) / mockExecutions.length;
  const uniqueZones = new Set(mockExecutions.map((e) => e.zone)).size;

  return {
    totalExecutions: mockExecutions.length,
    totalCost,
    avgLatency: Math.round(avgLatency),
    activeZones: uniqueZones,
    uptime: 99.97,
    costSavings: 34, // % vs single cloud
  };
};

// Executions per hour for the last 24h
export const getHourlyExecutions = () => {
  const now = Date.now();
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hourStart = now - (23 - i) * 3600000;
    const hourEnd = hourStart + 3600000;
    const execs = mockExecutions.filter((e) => {
      const t = new Date(e.executed_at).getTime();
      return t >= hourStart && t < hourEnd;
    });

    const aws = execs.filter((e) => e.zone.startsWith("aws")).length;
    const gcp = execs.filter((e) => e.zone.startsWith("gcp")).length;
    const azure = execs.filter((e) => e.zone.startsWith("azure")).length;

    return {
      hour: new Date(hourStart).toLocaleTimeString("en-US", { hour: "2-digit", hour12: true }),
      total: execs.length,
      aws,
      gcp,
      azure,
      avgLatency: execs.length ? Math.round(execs.reduce((s, e) => s + e.duration_ms, 0) / execs.length) : 0,
    };
  });
  return hours;
};

// Zone distribution
export const getZoneDistribution = () => {
  const dist: Record<string, number> = {};
  mockExecutions.forEach((e) => {
    dist[e.zone] = (dist[e.zone] || 0) + 1;
  });
  return Object.entries(dist)
    .map(([zone, count]) => {
      const zoneInfo = CLOUD_ZONES.find((z) => z.id === zone);
      return {
        zone,
        cloud: zoneInfo?.cloud || "Unknown",
        region: zoneInfo?.region || zone,
        count,
        percentage: Math.round((count / mockExecutions.length) * 100),
      };
    })
    .sort((a, b) => b.count - a.count);
};

// Cloud provider split
export const getCloudSplit = () => {
  const split = { AWS: 0, GCP: 0, Azure: 0 };
  mockExecutions.forEach((e) => {
    if (e.zone.startsWith("aws")) split.AWS++;
    else if (e.zone.startsWith("gcp")) split.GCP++;
    else if (e.zone.startsWith("azure")) split.Azure++;
  });
  return [
    { name: "AWS", value: split.AWS, fill: "hsl(var(--chart-3))" },
    { name: "GCP", value: split.GCP, fill: "hsl(var(--chart-1))" },
    { name: "Azure", value: split.Azure, fill: "hsl(var(--chart-4))" },
  ];
};

// Cost over time (daily for last 7 days)
export const getDailyCosts = () => {
  const now = Date.now();
  return Array.from({ length: 7 }, (_, i) => {
    const dayStart = now - (6 - i) * 86400000;
    const dayEnd = dayStart + 86400000;
    const execs = mockExecutions.filter((e) => {
      const t = new Date(e.executed_at).getTime();
      return t >= dayStart && t < dayEnd;
    });
    return {
      day: new Date(dayStart).toLocaleDateString("en-US", { weekday: "short" }),
      compute: parseFloat(execs.reduce((s, e) => s + e.compute_cost, 0).toFixed(4)),
      function: parseFloat(execs.reduce((s, e) => s + e.function_cost, 0).toFixed(4)),
      total: parseFloat(execs.reduce((s, e) => s + e.execution_cost, 0).toFixed(4)),
    };
  });
};
