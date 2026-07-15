export type Role = "Pemateri" | "Peserta";

export interface Attendee {
  id: string;
  name: string;
  role: Role;
}

// Urutan menentukan nomor sertifikat otomatis (index + 1).
// Pemateri diletakkan di urutan pertama secara sengaja.
const rawList: { name: string; role: Role }[] = [
  { name: "Dadan Suarya Praja, S.Pd., M.Pd.", role: "Pemateri" },

  // Asatidzah (Putri) — update 43 nama, sesuai data SDM Al Binaa Putri 2025/2026
  { name: "Alfiah, S.Pd.", role: "Peserta" },
  { name: "Amirah Faizah Khairani, B.A.", role: "Peserta" },
  { name: "Anisah Husna, S.Pd.", role: "Peserta" },
  { name: "Annisa Hafshah Azzahra, S.Pd.", role: "Peserta" },
  { name: "Annisa, S.Pd.", role: "Peserta" },
  { name: "Bayyanatul Fikriyah, S.Ak.", role: "Peserta" },
  { name: "Cici Sri Harnengsih, S.Pd.", role: "Peserta" },
  { name: "Dewi Yulianti, S.Pd.", role: "Peserta" },
  { name: "Erna Rosdiana, S.Pd.", role: "Peserta" },
  { name: "Fadilatul Muntasiroh, Lc.", role: "Peserta" },
  { name: "Haifa Zainatun Nafisah, S.Sos.", role: "Peserta" },
  { name: "Hilmi Fahmiyati Gustiani, S.Pd.", role: "Peserta" },
  { name: "Hilyatun Mufidah, S.Pd.", role: "Peserta" },
  { name: "Ida Fitriyana, Lc.", role: "Peserta" },
  { name: "Ida Maelatul Wakhidah", role: "Peserta" },
  { name: "Ika Afifah, S.Pd.", role: "Peserta" },
  { name: "Imaroh Isfaul Qolbah, S.Pd.", role: "Peserta" },
  { name: "Iroh Nurhayati, S.Si.", role: "Peserta" },
  { name: "J. Fitria Sari, S.Pd.", role: "Peserta" },
  { name: "Juniarti, S.Si.", role: "Peserta" },
  { name: "Kiki Rizqi Nadratushalihah, S.Pd.", role: "Peserta" },
  { name: "Lindawati, S.Pd.", role: "Peserta" },
  { name: "Liya Novitasari, S.Pd.", role: "Peserta" },
  { name: "Marenda Kurniawati, S.T., M.M.", role: "Peserta" },
  { name: "Masruroh, S.Pd.", role: "Peserta" },
  { name: "Mina Gantina, S.Si.", role: "Peserta" },
  { name: "Nabilla Sinta Dewi, S.Pd.", role: "Peserta" },
  { name: "Nisa Hasna Sakinah, S.Pd.I", role: "Peserta" },
  { name: "Nofriyanti, S.Pd.", role: "Peserta" },
  { name: "Ratih Rimawati Palupi, S.Pd.I", role: "Peserta" },
  { name: "Rini Indriani, Lc.", role: "Peserta" },
  { name: "Shofa Ilmina Nafi'an, A.Md.", role: "Peserta" },
  { name: "Siti Fatimah", role: "Peserta" },
  { name: "Siti Supriyanti, M.Pd.", role: "Peserta" },
  { name: "Teri Ahmad Pertiwi S, S.Pd.", role: "Peserta" },
  { name: "Trisianah, M.Pd.", role: "Peserta" },
  { name: "Ucu Sumisiani, S.Pd.", role: "Peserta" },
  { name: "Wahyuni, S.Pd.", role: "Peserta" },
  { name: "Widiyana, S.Pd.", role: "Peserta" },
  { name: "Wita Puspita, S.Pd.", role: "Peserta" },
  { name: "Yayu Yulia, S.Pd.", role: "Peserta" },
  { name: "Yungi Yudiarahman, M.Si.", role: "Peserta" },
  { name: "Zainab, B.A.", role: "Peserta" },

  // Asatidz (Putra)
  { name: "Nuralim, Lc., M.Pd.", role: "Peserta" },
  { name: "Agung Wahyu Adhy, Lc., M.Pd.", role: "Peserta" },
  { name: "Aam Hamdani, M.Pd.", role: "Peserta" },
  { name: "Achmad Reza Febrianto, Lc.", role: "Peserta" },
  { name: "Agus Setiawan, S.T.", role: "Peserta" },
  { name: "Anjasmara", role: "Peserta" },
  { name: "Arie Afriansyah, Lc.", role: "Peserta" },
  { name: "Akmal Sahdan, S.Pd.", role: "Peserta" },
  { name: "Azhar Fathurrahman, S.Si.", role: "Peserta" },
  { name: "Bahtiar, S.Pd.", role: "Peserta" },
  { name: "Bima Oflan Habibi", role: "Peserta" },
  { name: "Chevi Indrayadi, S.Si.", role: "Peserta" },
  { name: "Dadan Ridwanuloh, M.Si.", role: "Peserta" },
  { name: "Dany Wardhiman, S.Pd.", role: "Peserta" },
  { name: "Deddy, S.E.", role: "Peserta" },
  { name: "Deden Anugrah Hendriyana, M.Pfis.", role: "Peserta" },
  { name: "Harlan, S.Pd.", role: "Peserta" },
  { name: "Helmi Sukma Zaen", role: "Peserta" },
  { name: "Heriyanto, Lc., M.Pd.", role: "Peserta" },
  { name: "Irpan Halim, Lc., M.H.", role: "Peserta" },
  { name: "Mohammad Alam Novian, M.Pd.", role: "Peserta" },
  { name: "Mufti Al Farizi, S.Pi.", role: "Peserta" },
  { name: "Muhammad Ikhsan, S.Pd.", role: "Peserta" },
  { name: "Muhammad Ghozali, S.Sos.", role: "Peserta" },
  { name: "Muhammad Halidi, S.Si.", role: "Peserta" },
  { name: "Muhammad Dzaki, S.Ag.", role: "Peserta" },
  { name: "Nurmawan, Lc.", role: "Peserta" },
  { name: "Panji Asmara, S.Pd.", role: "Peserta" },
  { name: "Priyo Widodo, S.Pi.", role: "Peserta" },
  { name: "Radivan Tiravi, B.A.", role: "Peserta" },
  { name: "Rayis Syamlan, S.T.", role: "Peserta" },
  { name: "Rifqi Aqwamuddin, Lc., M.Pd.", role: "Peserta" },
  { name: "Ruslan, M.Pd.", role: "Peserta" },
  { name: "Saeful Anshar, M.Pd.", role: "Peserta" },
  { name: "Suharyadi, M.Pd., Gr.", role: "Peserta" },
  { name: "Syafiq Muhamad Rwinky, B.A.", role: "Peserta" },
  { name: "Tri Setyo Mardi Utomo, S.Pd.", role: "Peserta" },
  { name: "Umar Ahmad Ali, S.Pd.I.", role: "Peserta" },
  { name: "Wawanto, S.Si.", role: "Peserta" },
  { name: "Wahyudin Abdullah, M.Pd.", role: "Peserta" },
  { name: "Zainal Abidin, Lc., M.Pd.", role: "Peserta" },
  { name: "Zainal Arifin, Lc., M.Pd.", role: "Peserta" },
];

export const ATTENDEES: Attendee[] = rawList.map((a, i) => ({
  id: String(i + 1),
  name: a.name,
  role: a.role,
}));

/** Format nomor sertifikat otomatis, urut sesuai posisi di ATTENDEES. */
export function certificateNumber(id: string): string {
  const seq = id.padStart(3, "0");
  return `Pel.01/${seq}/SMAIT-ABN/VII/2026`;
}

export const EVENT = {
  titleLine1: "Pelatihan Pembelajaran Mendalam:",
  titleLine2: "Perencanaan dan Penilaian Pembelajaran",
  date: "Senin, 13 Juli 2026",
  time: "Pukul 08.00 s.d. 12.00 WIB",
  place: "Gedung Ukhuwwah Al Binaa",
  signCity: "Bekasi",
  signDate: "13 Juli 2026",
  principalName: "Nuralim Lc., M.Pd.",
  principalTitle: "Kepala SMA IT Al Binaa",
};

/** Paragraf penutup, disesuaikan dengan peran penerima sertifikat. */
export const CLOSING_PARAGRAPH: Record<Role, string> = {
  Pemateri:
    "Semoga ilmu dan pengalaman yang dibagikan menjadi amal jariyah dan membawa keberkahan.",
  Peserta:
    "Semoga ilmu dan pengalaman yang diperoleh menjadi bekal yang bermanfaat dan membawa keberkahan.",
};
