import type { Ref, CSSProperties } from "react";
import { DESIGN_WIDTH, DESIGN_HEIGHT } from "@/lib/certificateConfig";
import type { EventConfig, CertRecipient, FieldStyle } from "@/lib/events";

interface CertificateProps {
  event: EventConfig;
  recipient: CertRecipient;
  certNumber: string;
  innerRef?: Ref<HTMLDivElement>;
}

function fieldBox(style: FieldStyle, extra: CSSProperties = {}): CSSProperties {
  return {
    position: "absolute",
    top: style.top,
    left: "8%",
    width: "84%",
    textAlign: "center",
    transform: "translateY(-50%)",
    fontSize: style.fontSize,
    color: style.color,
    fontWeight: style.fontWeight,
    fontFamily: style.fontFamily,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight ?? 1.1,
    fontStyle: style.italic ? "italic" : "normal",
    ...extra,
  };
}

export default function Certificate({ event, recipient, certNumber, innerRef }: CertificateProps) {
  const { fields } = event;
  const closing = event.closingParagraph?.(recipient);

  return (
    <div
      ref={innerRef}
      style={{
        position: "relative",
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        backgroundImage: `url(${event.backgroundImage})`,
        backgroundSize: `${DESIGN_WIDTH}px ${DESIGN_HEIGHT}px`,
        backgroundRepeat: "no-repeat",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {fields.nomor && (
        <div style={fieldBox(fields.nomor, { left: 0, width: "100%", whiteSpace: "nowrap" })}>
          Nomor: {certNumber}
        </div>
      )}

      <div style={fieldBox(fields.nama)}>{recipient.name}</div>

      {fields.subtitle && recipient.subtitle && (
        <div style={fieldBox(fields.subtitle, { left: 0, width: "100%", whiteSpace: "nowrap" })}>
          {recipient.subtitle}
        </div>
      )}

      {fields.paragraf && closing && (
        <div style={fieldBox(fields.paragraf, { left: "10%", width: "80%" })}>
          <div style={{ fontStyle: "italic" }}>{closing.text}</div>
          {closing.emphasis && (
            <div style={{ fontStyle: "italic", fontWeight: 700, color: fields.nama.color, marginTop: 4 }}>
              {closing.emphasis}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
