"use client";

import { useMemo, useState } from "react";
import type { GitHubRepo } from "@/lib/github";
import GitHubReadmeModal from "@/components/github/GitHubReadmeModal";

function dateLabel(value: string | null) {
  if (!value) return "SYNC PENDING";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date).replaceAll("-", ".");
}

export default function GitHubRepoExplorer({
  owner,
  repositories,
}: {
  owner: string;
  repositories: GitHubRepo[];
}) {
  const [query, setQuery] = useState("");
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return repositories;

    return repositories.filter((repo) =>
      [repo.name, repo.description, repo.language, repo.topics.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query, repositories]);

  async function openReadme(repo: string) {
    setActiveRepo(repo);
    setMarkdown("");
    setError("");
    setLoading(true);

    try {
      // GitHub Pages is a static export, so README data is fetched directly
      // from GitHub's public Contents API instead of a Next.js API route.
      const response = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.raw+json",
            "X-GitHub-Api-Version": "2022-11-28"
          }
        }
      );

      if (!response.ok) {
        setError("이 Repository에서 README.md를 읽을 수 없습니다.");
        return;
      }

      setMarkdown(await response.text());
    } catch {
      setError("GitHub README를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="githubControlBar">
        <div className="githubCommand">
          <span>$</span>
          <span>github.sync --owner {owner}</span>
        </div>

        <label className="githubSearch">
          <span>FILTER</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="repo / language / topic"
            aria-label="Filter GitHub repositories"
          />
        </label>
      </div>

      <div className="githubRepoGrid">
        {visible.map((repo, index) => (
          <article className="githubRepoCard" key={repo.fullName}>
            <div className="githubRepoTop">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className={repo.source === "github" ? "repoLive" : "repoFallback"}>
                ● {repo.source === "github" ? "LIVE API" : "FALLBACK"}
              </span>
            </div>

            <div className="githubRepoIdentity">
              <small>{repo.fullName}</small>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
            </div>

            <div className="githubRepoMetrics">
              <div><span>LANGUAGE</span><strong>{repo.language}</strong></div>
              <div><span>STARS</span><strong>{repo.stars ?? "—"}</strong></div>
              <div><span>FORKS</span><strong>{repo.forks ?? "—"}</strong></div>
              <div><span>UPDATED</span><strong>{dateLabel(repo.updatedAt)}</strong></div>
            </div>

            <div className="githubRepoTopics">
              {(repo.topics.length ? repo.topics.slice(0, 6) : [repo.language]).map((topic) => (
                <span key={topic}>#{topic}</span>
              ))}
            </div>

            <div className="githubRepoFooter">
              <div>
                <button
                  type="button"
                  className="githubReadmeButton"
                  onClick={() => openReadme(repo.name)}
                >
                  README
                </button>
                {repo.license && <span>LICENSE: {repo.license}</span>}
              </div>

              <div>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer">
                    WEBSITE ↗
                  </a>
                )}
                <a href={repo.url} target="_blank" rel="noreferrer">
                  GITHUB ↗
                </a>
              </div>
            </div>
          </article>
        ))}

        {visible.length === 0 && (
          <div className="githubEmpty">
            <span>NO_MATCH</span>
            <p>조건에 맞는 Repository가 없습니다.</p>
          </div>
        )}
      </div>

      <GitHubReadmeModal
        open={Boolean(activeRepo)}
        owner={owner}
        repo={activeRepo || ""}
        markdown={markdown}
        loading={loading}
        error={error}
        onClose={() => setActiveRepo(null)}
      />
    </>
  );
}
