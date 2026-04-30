import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

/**
 * Empty state pattern: contextual icon + 1 sentence + 1 CTA.
 * Used when lists/sections have no data.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  size = "md",
}: EmptyStateProps) {
  const sizes = {
    sm: { wrapper: "py-8", icon: "h-10 w-10", iconInner: "h-5 w-5" },
    md: { wrapper: "py-12", icon: "h-14 w-14", iconInner: "h-7 w-7" },
    lg: { wrapper: "py-20", icon: "h-16 w-16", iconInner: "h-8 w-8" },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.wrapper}`}>
      <div
        className={`${s.icon} flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 mb-4 ring-1 ring-border`}
      >
        <Icon className={`${s.iconInner} text-primary`} />
      </div>
      <h3 className="font-semibold text-base">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm leading-relaxed">
        {description}
      </p>
      {(action || secondaryAction) && (
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
