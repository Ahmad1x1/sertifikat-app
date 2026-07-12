# Generator Sertifikat Penghargaan — SMA IT Al Binaa

Web app untuk generate sertifikat penghargaan peserta/pemateri
"Pelatihan Pembelajaran Mendalam: Perencanaan dan Penilaian Pembelajaran".

Alur: guru memilih nama sendiri → klik **Generate Sertifikat** →
preview muncul → klik **Unduh PDF**.

## Menjalankan di lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur penting

```
public/certificate-bg.png     # Template sertifikat (background), area nama/nomor/peran sudah dikosongkan
lib/attendees.ts               # Daftar nama + peran (Pemateri/Peserta) — EDIT DI SINI untuk ubah daftar nama
lib/certificateConfig.ts       # Posisi & ukuran font teks dinamis — EDIT DI SINI kalau posisi teks kurang pas
components/Certificate.tsx     # Komponen render sertifikat (ukuran tetap 1492x1054px)
components/CertificatePreview.tsx  # Wrapper responsif untuk preview di layar
components/DownloadButton.tsx  # Render tersembunyi resolusi tinggi + convert ke PDF
components/NameCombobox.tsx    # Input pencarian nama
app/page.tsx                   # Halaman utama
```

## Mengubah daftar nama

Buka `lib/attendees.ts`, edit array `rawList`. Nomor sertifikat otomatis
mengikuti urutan di array ini (index + 1), format:
`Pel.01/{nomor urut 3 digit}/SMAIT-ABN/VII/2026`.

Untuk menambahkan orang dengan peran **Pemateri**, set `role: "Pemateri"`.
Selain itu default-nya `"Peserta"`.

## Mengubah posisi teks di atas sertifikat

Buka `lib/certificateConfig.ts`. Semua koordinat `top` dalam satuan piksel,
mengacu pada gambar asli berukuran 1492 x 1054 px (`DESIGN_WIDTH` / `DESIGN_HEIGHT`).

- `nomor.top` → posisi vertikal baris "Nomor: ..."
- `nama.top` → posisi vertikal nama penerima
- `peran.top` → posisi vertikal baris "Sebagai PEMATERI/PESERTA dalam acara:"

Jalankan `npm run dev`, buka halaman, generate sertifikat contoh, lalu
bandingkan dengan gambar template asli. Geser angka `top` (dan `fontSize`
kalau perlu) sampai pas persis.

## Mengganti template gambar

Ganti file `public/certificate-bg.png` dengan gambar baru berukuran sama
(atau ukuran lain — lalu update `DESIGN_WIDTH`/`DESIGN_HEIGHT` di
`lib/certificateConfig.ts` sesuai ukuran baru). Pastikan area nomor, nama,
dan baris peran dikosongkan/polos di gambar (background putih/krem polos)
supaya teks dinamis dari aplikasi tidak tumpang tindih dengan teks lama.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub baru.
2. Buka https://vercel.com/new, import repo tersebut.
3. Framework preset otomatis terdeteksi sebagai **Next.js** — tidak perlu
   ubah setting apa pun (build command & output sudah default Next.js).
4. Klik **Deploy**. Selesai dalam ~1-2 menit, dapat URL publik.

Tidak perlu environment variable atau database — semua data nama sifatnya
statis di dalam kode (`lib/attendees.ts`).

## Catatan teknis

- PDF dibuat 100% di sisi browser (client-side) memakai `html2canvas` +
  `jsPDF` — tidak ada server function, jadi ringan untuk di-deploy sebagai
  static/serverless di Vercel dan tidak butuh API route.
- Font judul memakai Google Fonts (`Inter` + `Playfair Display`), dimuat
  lewat `<link>` di `app/layout.tsx`.
