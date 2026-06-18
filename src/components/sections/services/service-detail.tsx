import Link from "next/link";

export function SolutionsCrossLink() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 text-center">
      <p className="text-muted">
        Looking for packaged, ready-to-deploy use cases?{" "}
        <Link
          href="/#solutions"
          className="font-medium text-accent hover:text-accent-strong"
        >
          Explore our AI solutions →
        </Link>
      </p>
    </div>
  );
}
