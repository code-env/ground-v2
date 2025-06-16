import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  gradient?: boolean;
  path?: string;
}

const Logo = ({ className, gradient, path }: LogoProps) => {
  return (
    <Link className={cn("size-20 relative z-0", className)} href={path ?? "/"}>
      <img src="/Graound.svg" alt="Graound" className="size-full" />
      {gradient && (
        <div className="gradient absolute inset-0 -z-10 size-16 m-auto blur-2xl" />
      )}
    </Link>
  );
};

export default Logo;
