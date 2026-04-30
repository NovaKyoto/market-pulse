"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Sparkles, Calculator } from "lucide-react";

/**
 * Brokerage ROI calculator — shows how MarketPulse pays for itself.
 * All calculations server-static math, just runs in client for interactivity.
 */
export function TeamsRoiCalculator() {
  const [agentCount, setAgentCount] = useState(15);
  const [avgCommission, setAvgCommission] = useState(8500);
  const [retentionLift, setRetentionLift] = useState(2);

  // Pricing
  const planCost = agentCount <= 10 ? 149 : 399;
  const annualCost = planCost * 12;
  const altCost = agentCount * 49 * 12; // If each agent paid solo

  // Returns
  const additionalReferrals = Math.round(agentCount * retentionLift);
  const additionalRevenue = additionalReferrals * avgCommission;
  const roi = Math.round((additionalRevenue / annualCost) * 100);
  const savedVsSolo = altCost - annualCost;

  function formatMoney(amount: number) {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Inputs */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
              <Calculator className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold tracking-tight">Your brokerage</h3>
              <p className="text-xs text-muted-foreground">Adjust the inputs to see your numbers</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Agent Count */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3 w-3" />
                  Number of agents
                </label>
                <span className="font-mono font-black text-xl">{agentCount}</span>
              </div>
              <input
                type="range"
                min="3"
                max="100"
                value={agentCount}
                onChange={(e) => setAgentCount(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-medium">
                <span>3</span>
                <span>50</span>
                <span>100+</span>
              </div>
            </div>

            {/* Avg Commission */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="h-3 w-3" />
                  Average commission per deal
                </label>
                <span className="font-mono font-black text-xl">${avgCommission.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="3000"
                max="25000"
                step="500"
                value={avgCommission}
                onChange={(e) => setAvgCommission(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-medium">
                <span>$3K</span>
                <span>$15K</span>
                <span>$25K+</span>
              </div>
            </div>

            {/* Retention Lift */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest font-bold text-muted-foreground flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" />
                  Extra referrals per agent / year
                </label>
                <span className="font-mono font-black text-xl">+{retentionLift}</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={retentionLift}
                onChange={(e) => setRetentionLift(parseInt(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-medium">
                <span>+1</span>
                <span>+3</span>
                <span>+6</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 italic">
                Industry data: agents with monthly client touchpoints earn 3-8 extra referrals/year
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="border-2 border-primary/30 shadow-xl bg-gradient-to-br from-blue-50/50 via-background to-indigo-50/50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <CardContent className="relative p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold tracking-tight">Your return</h3>
              <p className="text-xs text-muted-foreground">If MarketPulse delivers as expected</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Annual Cost */}
            <div className="flex items-baseline justify-between border-b pb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                MarketPulse annual cost
              </span>
              <span className="font-mono font-black text-xl text-foreground">
                ${annualCost.toLocaleString()}
                <span className="text-xs text-muted-foreground ml-1">/yr</span>
              </span>
            </div>

            {/* Extra Referrals */}
            <div className="flex items-baseline justify-between border-b pb-3">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                Extra referrals across team
              </span>
              <span className="font-mono font-black text-xl text-foreground">
                +{additionalReferrals}
                <span className="text-xs text-muted-foreground ml-1">/yr</span>
              </span>
            </div>

            {/* Additional Revenue — the big one */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 shadow-lg">
              <p className="text-[10px] uppercase tracking-widest font-black text-white/80 mb-1">
                Additional commission revenue
              </p>
              <p className="text-4xl sm:text-5xl font-black font-mono tracking-tighter text-white">
                {formatMoney(additionalRevenue)}
                <span className="text-base font-bold text-white/70 ml-1">/yr</span>
              </p>
            </div>

            {/* ROI Badge */}
            <div className="flex items-center justify-between rounded-lg bg-amber-500/10 border-2 border-amber-500/30 p-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black text-amber-700 dark:text-amber-400">
                  Return on Investment
                </p>
                <p className="text-2xl font-black font-mono tracking-tighter text-amber-600 dark:text-amber-400 mt-1">
                  {roi.toLocaleString()}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Vs solo plans
                </p>
                <p className="text-base font-bold text-emerald-600 mt-1">
                  Save ${savedVsSolo.toLocaleString()}/yr
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-[10px] text-center text-muted-foreground italic">
            Numbers are estimates based on industry retention data. Your actual results depend
            on agent engagement and market conditions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
