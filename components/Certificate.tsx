import type { Ref } from "react";
import { CERT_LAYOUT, DESIGN_WIDTH, DESIGN_HEIGHT } from "@/lib/certificateConfig";
import { CLOSING_PARAGRAPH, type Role } from "@/lib/attendees";

interface CertificateProps {
  name: string;
  role: Role;
  certNumber: string;
  /** Dipakai untuk elemen tersembunyi khusus capture PDF resolusi tinggi */
  innerRef?: Ref<HTMLDivElement>;
}

export default function Certificate({ name, role, certNumber, innerRef }: CertificateProps) {
  const { nomor, nama, peran, paragraf } = CERT_LAYOUT;

  return (
    <div
      ref={innerRef}
      style={{
        position: "relative",
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        backgroundImage: "url(/certificate-bg.png)",
        backgroundSize: `${DESIGN_WIDTH}px ${DESIGN_HEIGHT}px`,
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Nomor sertifikat */}
      <div
        style={{
          position: "absolute",
          top: nomor.top,
          left: 0,
          width: "100%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontSize: nomor.fontSize,
          color: nomor.color,
          fontWeight: nomor.fontWeight,
          fontFamily: nomor.fontFamily,
          letterSpacing: nomor.letterSpacing,
          whiteSpace: "nowrap",
        }}
      >
        Nomor: {certNumber}
      </div>

      {/* Nama penerima */}
      <div
        style={{
          position: "absolute",
          top: nama.top,
          left: "8%",
          width: "84%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontSize: nama.fontSize,
          color: nama.color,
          fontWeight: nama.fontWeight,
          fontFamily: nama.fontFamily,
          lineHeight: 1.1,
        }}
      >
        {name}
      </div>

      {/* Peran (Pemateri / Peserta) */}
      <div
        style={{
          position: "absolute",
          top: peran.top,
          left: 0,
          width: "100%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontSize: peran.fontSize,
          color: peran.color,
          fontWeight: peran.fontWeight,
          fontFamily: peran.fontFamily,
          whiteSpace: "nowrap",
        }}
      >
        Sebagai{" "}
        <span style={{ fontWeight: peran.roleWeight, color: peran.roleColor }}>
          {role.toUpperCase()}
        </span>{" "}
        dalam acara:
      </div>

      {/* Paragraf penutup (beda teks untuk Pemateri vs Peserta) */}
      <div
        style={{
          position: "absolute",
          top: paragraf.top,
          left: "10%",
          width: "80%",
          textAlign: "center",
          transform: "translateY(-50%)",
          fontSize: paragraf.fontSize,
          color: paragraf.color,
          fontWeight: paragraf.fontWeight,
          fontFamily: paragraf.fontFamily,
          lineHeight: paragraf.lineHeight,
        }}
      >
        {CLOSING_PARAGRAPH[role]}
      </div>
    </div>
  );
}
