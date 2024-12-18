const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-40 pb-20 gap-10 border-b mx-auto w-full max-w-screen-lg">
      <div className="size-20">
        <img src="/Graound.svg" alt="Graound" className="size-full" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 max-w-sm">
        <h1 className="text-5xl font-medium  text-center leading-tight">
          Animations build for performance
        </h1>
        <p className="text-xl text-center">
          We're building a library of animations that are built for performance.
        </p>
      </div>
      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Join waitlist
      </button>
    </div>
  );
};

export default Hero;
