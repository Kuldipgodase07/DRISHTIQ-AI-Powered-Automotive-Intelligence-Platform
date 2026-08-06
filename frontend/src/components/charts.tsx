import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const gridColor = "hsl(214 32% 91%)";
const axisColor = "hsl(215 20% 50%)";

const commonAxis = {
  stroke: axisColor,
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "white",
    border: "1px solid var(--color-border)",
    borderRadius: 8,
    fontSize: 12,
    boxShadow: "var(--shadow-elevated)",
  },
  labelStyle: { color: "var(--color-foreground)", fontWeight: 600 },
};

export function TrendArea({
  data,
  dataKey = "value",
  color = "var(--color-primary)",
  height = 220,
}: {
  data: any[];
  dataKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" {...commonAxis} />
        <YAxis {...commonAxis} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarSeries({
  data,
  keys,
  colors = ["var(--color-primary)", "var(--color-accent)", "var(--color-ai)"],
  height = 240,
}: {
  data: any[];
  keys: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" {...commonAxis} />
        <YAxis {...commonAxis} />
        <Tooltip {...tooltipStyle} />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i % colors.length]} radius={[6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MultiLine({
  data,
  keys,
  colors = ["var(--color-primary)", "var(--color-success)", "var(--color-warning)", "var(--color-ai)"],
  height = 240,
}: {
  data: any[];
  keys: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid stroke={gridColor} vertical={false} />
        <XAxis dataKey="label" {...commonAxis} />
        <YAxis {...commonAxis} />
        <Tooltip {...tooltipStyle} />
        {keys.map((k, i) => (
          <Line
            key={k}
            type="monotone"
            dataKey={k}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({
  data,
  height = 220,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip {...tooltipStyle} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
