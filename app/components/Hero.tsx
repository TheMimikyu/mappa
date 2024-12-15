const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="pointer-events-none z-10 whitespace-pre-wrap pb-2 bg-gradient-to-b from-[#3a3b3b] via-[#555555] to-[#6a6a6a] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent"
      >
        Mappa
      </div>
      <div
        className="text-sm md:text-base text-gray-800 mt-2 text-center"
      >
        Your <strong>AI-powered</strong> thought adventure 🚀
      </div>
    </div>
  );
};

export default Hero;
