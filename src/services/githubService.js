const BASE_URL = 'https://api.github.com';

export class GithubError extends Error {
  constructor(message, { status, rateLimited = false } = {}) {
    super(message);
    this.name = 'GithubError';
    this.status = status;
    this.rateLimited = rateLimited;
  }
}

function toProject(repo) {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    pushedAt: repo.pushed_at,
    url: repo.html_url,
    homepage: repo.homepage || null,
    stars: repo.stargazers_count,
    topics: repo.topics ?? [],
  };
}

async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch {
    throw new GithubError(
      'Sem conexão com o GitHub. Verifique sua internet e tente de novo.',
    );
  }

  if (!response.ok) {
    const rateLimited =
      response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0';
    throw new GithubError(
      rateLimited
        ? 'O limite de requisições da API do GitHub foi atingido. Tente de novo em alguns minutos.'
        : `Não foi possível carregar os projetos (erro ${response.status}).`,
      { status: response.status, rateLimited },
    );
  }
  return response.json();
}

export async function fetchProjects(username) {
  const repos = await request(`/users/${username}/repos?per_page=100&sort=pushed`);
  return repos.filter((repo) => !repo.fork).map(toProject);
}
