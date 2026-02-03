import Link from "next/link";
import { type ReactNode } from "react";

export function BentoGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(140px,auto)] ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  header,
  icon: Icon,
  className = "",
  href,
}: {
  title: string;
  description: string;
  header?: ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  href?: string;
}) {
  const content = (
    <>
      {header ? <div className="mb-4 flex-1 w-full overflow-hidden rounded-xl">{header}</div> : null}
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="h-5 w-5 text-cyan-400" /> : null}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </>
  );

  const containerClasses = `group block h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:p-6 transition hover:border-slate-700 hover:bg-slate-900/80 flex flex-col ${className}`;

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
}
