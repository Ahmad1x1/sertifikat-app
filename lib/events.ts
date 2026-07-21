import { ATTENDEES, certificateNumber as pelatihanCertNumber, EVENT as PELATIHAN_EVENT, CLOSING_PARAGRAPH, type Attendee, type Role } from "./attendees";
import { MPLS_KELAS } from "./mplsData";

export type SelectionMode = "flat" | "grouped";

/** Layout koordinat teks dinamis (pixel, relatif DESIGN 1492x1054). */
export interface FieldStyle {
  top: number;
  fontSize: number;
  color: string;
  fontWeight: number;
  fontFamily: string;
  letterSpacing?: number;
  lineHeight?: number;
  italic?: boolean;
}

export interface CertRecipient {
  id: string;         // dipakai untuk nomor urut
  name: string;
  subtitle?: string;  // mis. "Santri Kelas X - A" atau role "PESERTA"
  role?: Role;        // opsional (dipakai event pelatihan)
  group?: string;     // mis. "X-A" (dipakai event grouped)
}

export interface EventConfig {
  id: string;
  label: string;                 // tampil di dropdown
  description: string;           // subjudul
  backgroundImage: string;
  selectionMode: SelectionMode;  // flat = langsung cari nama; grouped = pilih grup dulu
  groupLabel?: string;           // mis. "Kelas"
  /** daftar peserta (flat) */
  recipients?: CertRecipient[];
  /** peserta per grup (grouped) */
  groups?: Record<string, CertRecipient[]>;
  certNumber: (recipient: CertRecipient, globalIndex: number) => string;
  /** field mana yang dirender di atas background */
  fields: {
    nomor?: FieldStyle;
    nama: FieldStyle;
    subtitle?: FieldStyle;   // baris di bawah nama (kelas / role besar)
    paragraf?: FieldStyle;   // paragraf penutup opsional
  };
  /** paragraf penutup: fungsi -> string (opsional, kalau tidak ada berarti sudah tercetak di bg) */
  closingParagraph?: (r: CertRecipient) => { text: string; emphasis?: string };
}

/* ============================================================
   EVENT 1: Pelatihan Guru (event lama)
   ============================================================ */
const NAVY_DARK = "#0b2a5e";

const pelatihanRecipients: CertRecipient[] = ATTENDEES.map((a: Attendee) => ({
  id: a.id,
  name: a.name,
  role: a.role,
  subtitle: a.role, // "Pemateri" / "Peserta"
}));

const pelatihanEvent: EventConfig = {
  id: "pelatihan-guru-2026",
  label: "Pelatihan Guru — Pembelajaran Mendalam (Juli 2026)",
  description: `${PELATIHAN_EVENT.titleLine1} ${PELATIHAN_EVENT.titleLine2} · ${PELATIHAN_EVENT.date}`,
  backgroundImage: "/certificate-bg.png",
  selectionMode: "flat",
  recipients: pelatihanRecipients,
  certNumber: (r) => pelatihanCertNumber(r.id),
  fields: {
    nomor: { top: 258, fontSize: 21, color: "#33415c", fontWeight: 400, fontFamily: "'Inter', sans-serif", letterSpacing: 0.3 },
    nama: { top: 456, fontSize: 46, color: NAVY_DARK, fontWeight: 700, fontFamily: "'Playfair Display', 'Georgia', serif" },
    subtitle: { top: 590, fontSize: 56, color: NAVY_DARK, fontWeight: 800, fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: 2 },
    paragraf: { top: 780, fontSize: 19, color: "#33415c", fontWeight: 400, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 },
  },
  closingParagraph: (r) => ({
    text: CLOSING_PARAGRAPH[(r.role ?? "Peserta") as Role],
    emphasis: "Jazakumullahu khairan katsiran.",
  }),
};

/* ============================================================
   EVENT 2: MPLS Kelas X 2026/2027 (event baru)
   Background MPLS sudah memuat teks statis (judul, tanggal,
   paragraf penutup, ttd). Yang dinamis: NOMOR, NAMA, KELAS.
   ============================================================ */

// Bangun grup dari data kelas, sekaligus id global 1..146 berurutan.
const mplsGroups: Record<string, CertRecipient[]> = {};
let mplsGlobalIdx = 0;
for (const kelas of Object.keys(MPLS_KELAS)) {
  mplsGroups[kelas] = MPLS_KELAS[kelas].map((name) => {
    mplsGlobalIdx += 1;
    return {
      id: String(mplsGlobalIdx),
      name,
      subtitle: `Santri Kelas ${kelas.replace("-", " - ")}`,
      group: kelas,
    };
  });
}

const mplsEvent: EventConfig = {
  id: "mpls-x-2026",
  label: "MPLS Kelas X 2026/2027",
  description:
    "Masa Pengenalan Lingkungan Sekolah (MPLS) Kelas X · 20 – 25 Juli 2026",
  backgroundImage: "/certificate-mpls-bg.png",
  selectionMode: "grouped",
  groupLabel: "Kelas",
  groups: mplsGroups,
  // Nomor urut global 001–146, format sertifikat peserta MPLS
  certNumber: (r) => `${String(r.id).padStart(3, "0")}/SMA-ITABN/SERT/VII/2026`,
  fields: {
    // Koordinat mengikuti posisi teks pada template MPLS (yang sudah dibersihkan)
    nomor: { top: 243, fontSize: 22, color: "#33415c", fontWeight: 400, fontFamily: "'Inter', sans-serif", letterSpacing: 0.3 },
    nama: { top: 388, fontSize: 52, color: NAVY_DARK, fontWeight: 700, fontFamily: "'Playfair Display', 'Georgia', serif" },
    subtitle: { top: 446, fontSize: 24, color: "#1e2f4d", fontWeight: 700, fontFamily: "'Inter', sans-serif" },
    // paragraf penutup TIDAK dirender (sudah tercetak di background)
  },
};

/* ============================================================ */

export const EVENTS: EventConfig[] = [mplsEvent, pelatihanEvent];

export function getEvent(id: string): EventConfig | undefined {
  return EVENTS.find((e) => e.id === id);
}

/** Ambil recipient berdasarkan event + (opsional) group. */
export function getRecipients(ev: EventConfig, group?: string): CertRecipient[] {
  if (ev.selectionMode === "grouped") {
    if (!group || !ev.groups) return [];
    return ev.groups[group] ?? [];
  }
  return ev.recipients ?? [];
}

export function getGroups(ev: EventConfig): string[] {
  if (ev.selectionMode === "grouped" && ev.groups) return Object.keys(ev.groups);
  return [];
}
