"use client";

import { useEffect, useRef, useState } from "react";
import Certificate from "./Certificate";
import { DESIGN_WIDTH, DESIGN_HEIGHT } from "@/lib/certificateConfig";
import type { Role } from "@/lib/attendees";

interface Props {
  name: string;
  role: Role;
  certNumber: string;
}

export default function CertificatePreview({ name, role, certNumber }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      setScale(width / DESIGN_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden rounded-lg shadow-xl ring-1 ring-black/10"
      style={{ aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}` }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Certificate name={name} role={role} certNumber={certNumber} />
      </div>
    </div>
  );
}
