import Link from "next/link";
import { Terminal, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-term-bg text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-term-card border border-term-border rounded-2xl p-6 shadow-2xl space-y-6 font-mono text-center">
        <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-wider">404 // NOT_FOUND</h1>
          <p className="text-xs text-slate-400">
            ERR_ROUTE_TERMINATED: The requested resource or command does not exist in this environment.
          </p>
        </div>

        <div className="p-3 bg-slate-900/90 border border-term-border rounded-lg text-left text-xs space-y-1 text-slate-400">
          <div><span className="text-emerald-400">status</span>: 404 Not Found</div>
          <div><span className="text-cyan-400">target</span>: undefined</div>
          <div><span className="text-amber-400">action</span>: return_to_origin</div>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
