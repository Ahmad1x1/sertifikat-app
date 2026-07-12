"use client";

import { useState } from "react";
import NameCombobox from "@/components/NameCombobox";
import CertificatePreview from "@/components/CertificatePreview";
import DownloadButton from "@/components/DownloadButton";
import { certificateNumber, EVENT, type Attendee } from "@/lib/attendees";

export default function Home() {
  const [selected, setSelected] = useState<Attendee | null>(null);
  const [generated, setGenerated] = useState(false);

  const certNumber = selected ? certificateNumber(selected.id) : "";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-800">
            SMA IT Al Binaa Islamic Boarding School
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Generator Sertifikat Penghargaan
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {EVENT.titleLine1} {EVENT.titleLine2}
            <br />
            {EVENT.date} &middot; {EVENT.time} &middot; {EVENT.place}
          </p>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <NameCombobox
            value={selected}
            onChange={(a) => {
              setSelected(a);
              setGenerated(false);
            }}
          />

          <button
            type="button"
            disabled={!selected}
            onClick={() => setGenerated(true)}
            className="mt-4 w-full rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Generate Sertifikat
          </button>
        </section>

        {generated && selected && (
          <section className="mt-8">
            <CertificatePreview
              name={selected.name}
              role={selected.role}
              certNumber={certNumber}
            />

            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-slate-500">
                Nomor sertifikat:{" "}
                <span className="font-medium text-slate-700">{certNumber}</span>
              </p>
              <DownloadButton
                name={selected.name}
                role={selected.role}
                certNumber={certNumber}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
