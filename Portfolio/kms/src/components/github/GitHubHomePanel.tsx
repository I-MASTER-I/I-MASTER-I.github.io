import Link from "next/link";
import type { GitHubRepo } from "@/lib/github";

export default function GitHubHomePanel({
  owner,
  repositories,
}: {
  owner: string;
  repositories: GitHubRepo[];
}) {
  const live = repositories.filter((repo) => repo.source === "github");
  const stars = live.reduce((sum, repo) => sum + (repo.stars ?? 0), 0);
  const forks = live.reduce((sum, repo) => sum + (repo.forks ?? 0), 0);

  return (
    <aside className="homeGitHubPanel">
      <div className="homeGitHubHead">
        <span>// GITHUB SYNC</span>
        <b>● LIVE</b>
      </div>

      <div className="homeGitHubTitle">
        <div className="githubMark">GH</div>
        <div>
          <strong>GitHub Projects</strong>
          <span>@{owner}</span>
        </div>
      </div>

      <p>
        등록한 공개 Repository의 최신 메타데이터를 GitHub에서 읽어 표시합니다.
      </p>

      <div className="homeGitHubStats">
        <div><strong>{repositories.length}</strong><span>REGISTERED</span></div>
        <div><strong>{stars}</strong><span>STARS</span></div>
        <div><strong>{forks}</strong><span>FORKS</span></div>
      </div>

      <div className="homeGitHubRepos">
        {repositories.slice(0, 3).map((repo) => (
          <a href={repo.url} target="_blank" rel="noreferrer" key={repo.fullName}>
            <span>{repo.name}</span>
            <b>{repo.stars == null ? "—" : `★ ${repo.stars}`}</b>
          </a>
        ))}
      </div>

      <Link className="homeGitHubButton" href="/github">
        VIEW GITHUB PROJECTS <span>→</span>
      </Link>
    </aside>
  );
}
