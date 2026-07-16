import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AttoLogo({ className, showText = true, size = "md" }: LogoProps) {
  const dim = size === "sm" ? 20 : size === "lg" ? 32 : 24;
  const text = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  return (
    <div className={cn("flex items-center gap-2 font-semibold tracking-tight", className)}>
      <svg width={dim} height={dim} viewBox="0 0 24 24" className="text-primary" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2 2 22h4.2l1.6-3.6h8.4L17.8 22H22L12 2Zm-2.8 12.6L12 8.4l2.8 6.2H9.2Z"
        />
      </svg>
      {showText && (
        <span className={cn("flex items-baseline gap-1", text)}>
          <span className="text-foreground">Atto</span>
          <span className="text-primary">Bot</span>
        </span>
      )}
    </div>
  );
}
