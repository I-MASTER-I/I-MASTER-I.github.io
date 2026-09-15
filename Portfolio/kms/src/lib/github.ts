import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type GitHubRepoConfig = {
  repo: string;
  featured?: boolean;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackLanguage?: string;
};

export type GitHubRepo = {
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number | null;
  forks: number | null;
  topics: string[];
  updatedAt: string | null;
  pushedAt: string | null;
  url: string;
  homepage: string | null;
  license: string | null;
  archived: boolean;
  source: "github" | "fallback";
};

type GitHubConfig = {
  owner: string;
  title?: string;
  description?: string;
  repositories: GitHubRepoConfig[];
};

type GitHubApiRepo = {
  name?: string;
  full_name?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  topics?: string[];
  updated_at?: string | null;
  pushed_at?: string | null;
  html_url?: string;
  homepage?: string | null;
  archived?: boolean;
  license?: { spdx_id?: string | null } | null;
};

const CONFIG_PATH = path.join(
  process.cwd(),
  "content",
  "04_GITHUB_PROJECTS",
  "repositories.md"
);

export function getGitHubConfig(): GitHubConfig {
  const raw = fs.readFileSync(CONFIG_PATH, "utf8");
  const parsed = matter(raw);
  return {
    owner: String(parsed.data.owner || ""),
    title: String(parsed.data.title || "GitHub Repositories"),
    description: String(parsed.data.description || ""),
    repositories: Array.isArray(parsed.data.repositories)
      ? (parsed.data.repositories as GitHubRepoConfig[])
      : [],
  };
}

function fallbackRepo(owner: string, item: GitHubRepoConfig): GitHubRepo {
  return {
    name: item.repo,
    fullName: `${owner}/${item.repo}`,
    description: String(item.fallbackDescription || "Public GitHub repository"),
    language: String(item.fallbackLanguage || "Repository"),
    stars: null,
    forks: null,
    topics: [],
    updatedAt: null,
    pushedAt: null,
    url: `https://github.com/${owner}/${item.repo}`,
    homepage: null,
    license: null,
    archived: false,
    source: "fallback",
  };
}

export async function getGitHubRepositories() {
  const config = getGitHubConfig();

  const repositories = await Promise.all(
    config.repositories.map(async (item): Promise<GitHubRepo> => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(item.repo)}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
            },
            cache: "force-cache",
          }
        );

        if (!response.ok) return fallbackRepo(config.owner, item);

        const data = (await response.json()) as GitHubApiRepo;
        return {
          name: String(data.name || item.repo),
          fullName: String(data.full_name || `${config.owner}/${item.repo}`),
          description: String(data.description || item.fallbackDescription || "Public GitHub repository"),
          language: String(data.language || item.fallbackLanguage || "Repository"),
          stars: Number(data.stargazers_count ?? 0),
          forks: Number(data.forks_count ?? 0),
          topics: Array.isArray(data.topics) ? data.topics.map(String) : [],
          updatedAt: data.updated_at ? String(data.updated_at) : null,
          pushedAt: data.pushed_at ? String(data.pushed_at) : null,
          url: String(data.html_url || `https://github.com/${config.owner}/${item.repo}`),
          homepage: data.homepage ? String(data.homepage) : null,
          license: data.license?.spdx_id ? String(data.license.spdx_id) : null,
          archived: Boolean(data.archived),
          source: "github",
        };
      } catch {
        return fallbackRepo(config.owner, item);
      }
    })
  );

  return { config, repositories };
}


export async function getGitHubReadme(owner: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        content: "",
        status: response.status,
      };
    }

    const content = await response.text();
    return {
      ok: true,
      content,
      status: 200,
    };
  } catch {
    return {
      ok: false,
      content: "",
      status: 500,
    };
  }
}
