"use client";

import { useMemo, useState } from "react";
import NameCombobox from "@/components/NameCombobox";
import CertificatePreview from "@/components/CertificatePreview";
import DownloadButton from "@/components/DownloadButton";
import { EVENTS, getEvent, getGroups, getRecipients, type CertRecipient } from "@/lib/events";

export default function Home() {
  const [eventId, setEventId] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [selected, setSelected] = useState<CertRecipient | null>(null);
  const [generated, setGenerated] = useState(false);

  const event = eventId ? getEvent(eventId) : undefined;
  const groups = event ? getGroups(event) : [];
  const isGrouped = event?.selectionMode === "grouped";

  const recipients = useMemo(() => {
    if (!event) return [];
    return getRecipients(event, isGrouped ? group : undefined);
  }, [event, group, isGrouped]);

  const certNumber = event && selected ? event.certNumber(selected, Number(selected.id)) : "";

  function resetFrom(step: "event" | "group") {
    if (step === "event") { setGroup(""); }
    setSelected(null);
    setGenerated(false);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-800">
            SMA IT Al Binaa Islamic Boarding School
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Generator Sertifikat
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Pilih acara, lalu pilih penerima untuk membuat sertifikat.
          </p>
        </header>

        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          {/* STEP 1: pilih event */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              1. Pilih Acara / Event
            </label>
            <select
              value={eventId}
              onChange={(e) => { setEventId(e.target.value); resetFrom("event"); }}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
            >
              <option value="">— Pilih acara —</option>
              {EVENTS.map((e) => (
                <option key={e.id} value={e.id}>{e.label}</option>
              ))}
            </select>
            {event && <p className="mt-1.5 text-xs text-slate-500">{event.description}</p>}
          </div>

          {/* STEP 2: pilih grup (kelas) — hanya untuk event grouped */}
          {event && isGrouped && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                2. Pilih {event.groupLabel ?? "Kelompok"}
              </label>
              <select
                value={group}
                onChange={(e) => { setGroup(e.target.value); setSelected(null); setGenerated(false); }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20"
              >
                <option value="">— Pilih {event.groupLabel ?? "kelompok"} —</option>
                {groups.map((g) => (
                  <option key={g} value={g}>{g.replace("-", " - ")}</option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 3: pilih nama */}
          {event && (!isGrouped || group) && (
            <div>
              <div className="mb-0 text-sm font-medium text-slate-700">
                {isGrouped ? "3." : "2."} Pilih Nama
              </div>
              <NameCombobox
                recipients={recipients}
                value={selected}
                onChange={(a) => { setSelected(a); setGenerated(false); }}
                label=""
                placeholder="Ketik nama..."
              />
            </div>
          )}

          <button
            type="button"
            disabled={!selected}
            onClick={() => setGenerated(true)}
            className="mt-1 w-full rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Generate Sertifikat
          </button>
        </section>

        {generated && event && selected && (
          <section className="mt-8">
            <CertificatePreview event={event} recipient={selected} certNumber={certNumber} />
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
              <p className="text-xs text-slate-500">
                Nomor sertifikat: <span className="font-medium text-slate-700">{certNumber}</span>
              </p>
              <DownloadButton event={event} recipient={selected} certNumber={certNumber} />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
