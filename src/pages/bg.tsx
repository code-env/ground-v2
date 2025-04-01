import { IslandMode } from "@/components/animations";
import { Button } from "@/components/ui/button";

const BackgroundChange = () => {
  return (
    <div className="min-h-[300vh] bg-white relative z-0 p-2">
      <IslandMode />
      <div className="absolute inset-0 z-30 min-h-[200vh] bg-transparent">
        <div className="max-w-7xl mx-auto inset-x-0  size-full container py-20 pt-[188px] flex flex-col gap-20">
          <div className="max-w-xl w-full mx-auto flex flex-col gap-6  transition-colors duration-300">
            <div className="size-[100px] rounded-full overflow-hidden">
              <img src="/her.avif" alt="" className="size-full object-cover" />
            </div>
            <h1 className="font-semibold text-5xl">
              <span>Hey, I'm Shanelle</span>
              <span className="inline-block">I write backend {"<Code />"}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              I Crafting seamless backend experiences and algorithms. High
              school student by day, creative thinker, and aspiring innovator by
              night.
            </p>
            <div className="flex items-center gap-4">
              <Button>Book a call</Button>
              <Button className="bg-[rgb(225_249_220)] shadow-none text-[rgb(23_141_0)] hover:bg-[rgb(166,255,146">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full size-full rounded-full bg-[rgb(23_141_0)] opacity-75" />
                  <span className="relative inline-flex rounded-full size-full bg-[rgb(23_141_0)]" />
                </span>
                <span>Available for new project</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="fixed  size-full top-0 -z-10 max-w-7xl mx-auto border-x  dark:border-muted/50  border-border  inset-x-0" />
      </div>
    </div>
  );
};
export default BackgroundChange;
