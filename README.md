# Generator Sertifikat — SMA IT Al Binaa

Aplikasi web (Next.js) untuk membuat & mengunduh sertifikat PDF.
Mendukung **beberapa acara/event** dalam satu aplikasi.

## Alur Penggunaan
1. **Pilih Acara** dari dropdown (mis. "MPLS Kelas X 2026/2027" atau "Pelatihan Guru").
2. Jika acara berbasis kelas (MPLS): **Pilih Kelas** (X-A … X-E).
3. **Pilih Nama** penerima (bisa diketik untuk mencari).
4. Klik **Generate Sertifikat**, lalu **Unduh PDF**.

## Menambah Event Baru
Semua konfigurasi ada di `lib/events.ts`. Untuk menambah acara:
1. Siapkan gambar template di `public/` (ukuran 1492×1054 px).
2. Tambahkan satu objek `EventConfig` baru ke array `EVENTS`.
   - `selectionMode: "flat"` → langsung cari nama (mis. pelatihan guru).
   - `selectionMode: "grouped"` → pilih grup dulu (mis. per kelas).
3. Isi `fields` (koordinat teks) sesuai posisi pada template.

Data peserta:
- Event pelatihan → `lib/attendees.ts`
- Event MPLS → `lib/mplsData.ts` (per kelas)

## Menjalankan
```bash
npm install
npm run dev      # mode pengembangan
npm run build && npm start   # mode produksi
```

## Catatan Template MPLS
`public/certificate-mpls-bg.png` adalah template yang sudah "dibersihkan"
(nomor, nama, dan kelas contoh dihapus) agar bisa diisi dinamis. Teks statis
(judul acara, tanggal, paragraf, tanda tangan) tetap tercetak pada gambar.
