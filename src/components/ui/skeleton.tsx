
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

function ShimmerSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "skeleton rounded-md bg-muted",
        className
      )}
      {...props}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <ShimmerSkeleton className="h-4 w-24" />
        <ShimmerSkeleton className="h-6 w-6 rounded-full" />
      </div>
      <ShimmerSkeleton className="h-8 w-16" />
    </div>
  )
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <ShimmerSkeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <ShimmerSkeleton className="h-4 w-full" />
            <ShimmerSkeleton className="h-3 w-2/3" />
          </div>
          <ShimmerSkeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, ShimmerSkeleton, CardSkeleton, TableSkeleton }
