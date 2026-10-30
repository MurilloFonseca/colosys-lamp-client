export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#121212] flex items-center justify-center p-4">
      {/* Loading Card */}
      <div className="w-full max-w-sm bg-fundo-card border border-borda-card backdrop-blur-md rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
        {/* Animated Custom Spinner */}
        <div className="relative w-20 h-20 mb-6">
          {/* Outer Pulse Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-amarelo-escuro/40 animate-pulse"></div>

          {/* Spinning Primary Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-amarelo-claro border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

          {/* Inner Counter-Spinning Ring */}
          <div
            className="absolute inset-2 rounded-full border-4 border-b-amarelo-escuro border-t-transparent border-l-transparent border-r-transparent animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-texto tracking-wide mb-2">
          Carregando Sistema
        </h1>

        {/* Subtitle / Status */}
        <p className="text-sm text-amarelo-claro/80 mb-6">
          Sincronizando dispositivos e sensores...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-preto-transparente rounded-full h-2 overflow-hidden p-0.5 border border-borda-card/30">
          <div className="bg-linear-to-r from-amarelo-escuro via-amarelo-claro to-luz-acessa h-full rounded-full animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
