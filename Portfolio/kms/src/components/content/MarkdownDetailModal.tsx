"use client";
import { useEffect } from "react";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";

export type MarkdownModalDocument = {
  slug: string;
  title: string;
  subtitle?: string;
  period?: string;
  markdown: string;
  detailHref?: string;
  sourceLabel?: string;
};

export default function MarkdownDetailModal({
  item,
  closeLabel,
  detailLabel,
  onClose,
}: {
  item: MarkdownModalDocument | null;
  closeLabel: string;
  detailLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape") onClose();};
    window.addEventListener("keydown",onKeyDown);
    return ()=>{document.body.style.overflow=previousOverflow;window.removeEventListener("keydown",onKeyDown);};
  },[item,onClose]);

  if(!item) return null;
  return <div className="readmeModalBackdrop" onMouseDown={onClose}>
    <section className="readmeModal" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={e=>e.stopPropagation()}>
      <header className="readmeModalHead">
        <div>
          <span>{item.title}</span>
          <small>{item.sourceLabel}{item.period ? ` / ${item.period}` : ""}</small>
        </div>
        <button type="button" onClick={onClose} aria-label={closeLabel}>✕</button>
      </header>
      <div className="readmeModalBody">
        {item.subtitle && <p className="localModalSubtitle">{item.subtitle}</p>}
        <article className="readmeMarkdown"><MarkdownRenderer>{item.markdown}</MarkdownRenderer></article>
      </div>
      <footer className="readmeModalFoot">
        <span>{closeLabel}</span>
        {item.detailHref && <a href={item.detailHref}>{detailLabel} ↗</a>}
      </footer>
    </section>
  </div>;
}
