"use client";

import { DISCLAIMER } from "@/lib/constants";

export default function Disclaimer() {
  return (
    <div className="bg-cream-200 border border-cream-300 rounded-lg px-4 py-3 text-xs text-navy-400">
      <strong>Disclaimer:</strong> {DISCLAIMER}
    </div>
  );
}
