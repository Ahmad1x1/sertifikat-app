"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { ATTENDEES, type Attendee } from "@/lib/attendees";

interface Props {
  value: Attendee | null;
  onChange: (a: Attendee) => void;
}

export default function NameCombobox({ value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ATTENDEES;
    return ATTENDEES.filter((a) => a.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        Cari dan pilih nama Anda
      </label>
      <input
        type="text"
        value={open ? query : value?.name ?? query}
        onFocus={() => {
          setOpen(true);
          setQuery("");
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        placeholder="Ketik nama Anda..."
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
      />

      {open && (
        <div className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">Nama tidak ditemukan.</div>
          ) : (
            filtered.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => {
                  onChange(a);
                  setQuery("");
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-slate-50"
              >
                <span className="text-slate-800">{a.name}</span>
                <span
                  className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    a.role === "Pemateri"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {a.role}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
