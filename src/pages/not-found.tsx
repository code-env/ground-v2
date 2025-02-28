import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router";

const Notfound = () => {
  return (
    <div className="min-h-screen flex-col flex items-center justify-center gap-10 text-center">
      <div className="size-20 relative">
        <img src="/Graound.svg" alt="Graound" className="size-full" />
        <div className="gradient absolute inset-0 -z-10 size-16 m-auto blur-2xl" />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-xl">
          You look a little lost...
        </p>
        <h1 className="text-4xl font-semibold">Ooops! Page not found</h1>
      </div>

      <div>
        <Link to="/" className={buttonVariants({ size: "lg" })}>
          Back home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
