export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <h1
        className="text-6xl text-white drop-shadow-2xl animate-pulse"
        style={{
          fontFamily: "Slackey, cursive",
          textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        }}
      >
        Z
        <span
          className="text-blue-400"
          style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.8)" }}
        >
          WIPE
        </span>
      </h1>
      <div className="mt-8 flex space-x-3 text-6xl font-extrabold">
        <span className="dot text-blue-400" style={{ animationDelay: "0s" }}>
          .
        </span>
        <span
          className="dot text-purple-400"
          style={{ animationDelay: "0.3s" }}
        >
          .
        </span>
        <span className="dot text-lime-400" style={{ animationDelay: "0.6s" }}>
          .
        </span>
      </div>
      <style jsx>{`
        .dot {
          opacity: 0.2;
          animation: dot-ellipsis 1.2s infinite;
          line-height: 1;
        }
        @keyframes dot-ellipsis {
          0% {
            opacity: 0.2;
          }
          20% {
            opacity: 1;
          }
          40% {
            opacity: 1;
          }
          60% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
