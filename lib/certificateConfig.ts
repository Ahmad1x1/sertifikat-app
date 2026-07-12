/**
 * Konfigurasi posisi teks dinamis di atas gambar template sertifikat.
 *
 * Semua koordinat dalam PIXEL, mengacu pada ukuran asli gambar template:
 *   DESIGN_WIDTH x DESIGN_HEIGHT (1492 x 1054).
 *
 * Kalau ada teks yang kurang pas posisinya dibanding gambar asli,
 * cukup ubah angka top / fontSize di sini — tidak perlu sentuh komponen lain.
 */

export const DESIGN_WIDTH = 1492;
export const DESIGN_HEIGHT = 1054;

export const NAVY = "#0a3f8c";
export const NAVY_DARK = "#0b2a5e";

export const CERT_LAYOUT = {
  nomor: {
    top: 258,
    fontSize: 21,
    color: "#33415c",
    fontWeight: 400,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: 0.3,
  },
  nama: {
    top: 456,
    fontSize: 46,
    color: NAVY_DARK,
    fontWeight: 700,
    fontFamily: "'Playfair Display', 'Georgia', serif",
  },
  peran: {
    // Kata "PEMATERI" / "PESERTA" besar, baris "Sebagai:" di atasnya statis (ada di gambar)
    top: 590,
    fontSize: 56,
    color: NAVY_DARK,
    fontWeight: 800,
    fontFamily: "'Playfair Display', 'Georgia', serif",
    letterSpacing: 2,
  },
  paragraf: {
    top: 780,
    fontSize: 19,
    color: "#33415c",
    fontWeight: 400,
    fontFamily: "'Inter', sans-serif",
    lineHeight: 1.6,
  },
} as const;
