"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import type { CertRecipient } from "@/lib/events";

interface Props {
  recipients: CertRecipient[];
  value: CertRecipient | null;
  onChange: (a: CertRecipient) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function NameCombobox({ recipients, value, onChange, label, placeholder, disabled }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipients;
    return recipients.filter((a) => a.name.toLowerCase().includes(q));
  }, [query, recipients]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label ?? "Cari dan pilih nama"}
      </label>
      <input
        type="text"
        disabled={disabled}
        value={open ? query : value?.name ?? query}
        onFocus={() => { if (!disabled) { setOpen(true); setQuery(""); } }}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        placeholder={placeholder ?? "Ketik nama..."}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20 disabled:cursor-not-allowed disabled:bg-slate-100"
      />

      {open && !disabled && (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">Nama tidak ditemukan.</div>
          ) : (
            filtered.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => { onChange(a); setQuery(""); setOpen(false); }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-slate-50"
              >
                <span className="text-slate-800">{a.name}</span>
                {a.subtitle && (
                  <span className="ml-2 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {a.subtitle}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
