const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      
      <div className="relative w-20 h-20">
        
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-500 animate-spin"></div>

        {/* Inner Pulse */}
        <div className="absolute inset-4 rounded-full bg-green-400 animate-ping"></div>

        {/* Center Dot */}
        <div className="absolute inset-7 rounded-full bg-green-700"></div>

      </div>

    </div>
  );
};

export default Loading;
