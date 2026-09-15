"use client";

import { useEffect } from "react";
import MarkdownRenderer from "@/components/content/MarkdownRenderer";

export default function GitHubReadmeModal({
  open,
  owner,
  repo,
  markdown,
  loading,
  error,
  onClose,
}: {
  open: boolean;
  owner: string;
  repo: string;
  markdown: string;
  loading: boolean;
  error: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="readmeModalBackdrop" onMouseDown={onClose}>
      <section
        className="readmeModal"
        role="dialog"
        aria-modal="true"
        aria-label={`${repo} README`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="readmeModalHead">
          <div>
            <span>~/github/{repo}/README.md</span>
            <small>LIVE SOURCE / {owner}</small>
          </div>
          <button type="button" onClick={onClose} aria-label="Close README modal">
            ✕
          </button>
        </header>

        <div className="readmeModalBody">
          {loading && (
            <div className="readmeState">
              <span>READING_REMOTE_MARKDOWN...</span>
              <p>GitHub README를 불러오는 중입니다.</p>
            </div>
          )}

          {!loading && error && (
            <div className="readmeState error">
              <span>README_NOT_FOUND</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <article className="readmeMarkdown">
              <MarkdownRenderer>{markdown}</MarkdownRenderer>
            </article>
          )}
        </div>

        <footer className="readmeModalFoot">
          <span>ESC TO CLOSE</span>
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noreferrer"
          >
            OPEN GITHUB ↗
          </a>
        </footer>
      </section>
    </div>
  );
}
