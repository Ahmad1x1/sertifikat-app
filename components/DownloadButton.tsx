"use client";

import { useRef, useState } from "react";
import Certificate from "./Certificate";
import { DESIGN_WIDTH, DESIGN_HEIGHT } from "@/lib/certificateConfig";
import type { Role } from "@/lib/attendees";

interface Props {
  name: string;
  role: Role;
  certNumber: string;
}

export default function DownloadButton({ name, role, certNumber }: Props) {
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!hiddenRef.current) return;
    setLoading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(hiddenRef.current, {
        scale: 2.5, // resolusi tinggi untuk hasil cetak yang tajam
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      // Ukuran PDF mengikuti rasio gambar (mendekati A4 landscape)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [297, Math.round((297 * DESIGN_HEIGHT) / DESIGN_WIDTH)],
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);

      const safeName = name.replace(/[^a-zA-Z0-9]+/g, "_");
      pdf.save(`Sertifikat_${safeName}.pdf`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Membuat PDF...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12.5a.75.75 0 00.75-.75V4a.75.75 0 00-1.5 0v7.75c0 .414.336.75.75.75z" />
              <path d="M5.22 9.22a.75.75 0 011.06 0L10 12.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 10.28a.75.75 0 010-1.06z" />
              <path d="M3 15.75A.75.75 0 013.75 15h12.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
            </svg>
            Unduh PDF
          </>
        )}
      </button>

      {/* Render tersembunyi ukuran penuh, khusus untuk capture PDF resolusi tinggi */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: -99999,
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <Certificate innerRef={hiddenRef} name={name} role={role} certNumber={certNumber} />
      </div>
    </>
  );
}
