"use client";

import { DISCLAIMER } from "@/lib/constants";

export default function Disclaimer() {
  return (
    <div className="bg-navy-700 border border-navy-500 rounded-lg px-4 py-3 text-xs text-white/50">
      <strong className="text-white/70">Disclaimer:</strong> {DISCLAIMER}
    </div>
  );
}
