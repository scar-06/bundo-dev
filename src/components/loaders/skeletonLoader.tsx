import cn from "@/lib/utils";

function SkeletonLoader({ className }: { className?: string }) {
  return <div className={cn(`animate-pulse bg-gray-300`, className)} />
}
export default SkeletonLoader;
