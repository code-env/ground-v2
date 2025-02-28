import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  gradient?: boolean;
}

const Logo = ({ className, gradient = true }: LogoProps) => {
  return (
    <div className={cn("size-20 relative", className)}>
      <img src="/Graound.svg" alt="Graound" className="size-full" />
      {gradient && (
        <div className="gradient absolute inset-0 -z-10 size-16 m-auto blur-2xl" />
      )}
    </div>
  );
};

export default Logo;
