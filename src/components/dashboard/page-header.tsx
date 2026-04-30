import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * Standard page header pattern (Linear/Vercel/Stripe).
 * Breadcrumbs above title, primary actions right-aligned.
 */
export function PageHeader({ breadcrumbs, title, description, actions }: PageHeaderProps) {
  return (
    <div className="border-b -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-6 mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
