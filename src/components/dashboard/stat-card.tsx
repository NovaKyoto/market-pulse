import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  /** Numeric change vs previous period (e.g., 12.4 = +12.4%) */
  change?: number;
  /** Suffix shown after the change number, default "%" */
  changeSuffix?: string;
  /** Description of what the change is comparing to */
  changeLabel?: string;
  /** Mini sparkline data for trend visualization */
  sparkline?: number[];
  /** Visual accent color */
  accent?: "blue" | "emerald" | "amber" | "purple" | "rose" | "cyan";
}

const accentColors = {
  blue: { bg: "from-blue-500/10 to-transparent", icon: "from-blue-500 to-indigo-600", spark: "rgb(59 130 246)" },
  emerald: { bg: "from-emerald-500/10 to-transparent", icon: "from-emerald-500 to-teal-600", spark: "rgb(16 185 129)" },
  amber: { bg: "from-amber-500/10 to-transparent", icon: "from-amber-500 to-orange-600", spark: "rgb(245 158 11)" },
  purple: { bg: "from-purple-500/10 to-transparent", icon: "from-purple-500 to-pink-600", spark: "rgb(168 85 247)" },
  rose: { bg: "from-rose-500/10 to-transparent", icon: "from-rose-500 to-red-600", spark: "rgb(244 63 94)" },
  cyan: { bg: "from-cyan-500/10 to-transparent", icon: "from-cyan-500 to-blue-600", spark: "rgb(6 182 212)" },
};

/** Mini SVG sparkline — no dependencies */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const width = 100;
  const height = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="opacity-60"
    >
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  change,
  changeSuffix = "%",
  changeLabel,
  sparkline,
  accent = "blue",
}: StatCardProps) {
  const colors = accentColors[accent];
  const trendUp = change !== undefined && change > 0;
  const trendDown = change !== undefined && change < 0;
  const TrendIcon = trendUp ? TrendingUp : trendDown ? TrendingDown : Minus;

  return (
    <Card className="relative overflow-hidden hover:border-primary/30 transition-colors">
      <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${colors.bg} rounded-bl-full`} />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            {label}
          </p>
          {Icon && (
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${colors.icon} shadow-md`}>
              <Icon className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold font-mono tracking-tighter">{value}</p>
          {change !== undefined && (
            <div
              className={`flex items-center gap-0.5 text-xs font-medium ${
                trendUp ? "text-emerald-600" : trendDown ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              <TrendIcon className="h-3 w-3" />
              {Math.abs(change).toFixed(1)}{changeSuffix}
            </div>
          )}
        </div>

        {(description || changeLabel) && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            {description || changeLabel}
          </p>
        )}

        {sparkline && sparkline.length > 1 && (
          <div className="mt-3">
            <Sparkline data={sparkline} color={colors.spark} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
