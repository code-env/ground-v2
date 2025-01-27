import Waitlist from "@/components/forms/waitlist";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-40 pb-20 gap-10 md:border-b mx-auto w-full max-w-screen-lg">
      <div className="size-20">
        <img src="/Graound.svg" alt="Graound" className="size-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
        <h1 className="md:text-5xl text-2xl font-medium text-center leading-tight">
          Animations built for performance
        </h1>
        <p className="md:text-xl text-base text-center">
          We're building a library of animations that are built for performance.
        </p>
      </div>
      <Waitlist>
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          Join waitlist
        </button>
      </Waitlist>
    </div>
  );
};

export default Hero;
