import { cacheLife, cacheTag } from "next/cache"

interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string | null
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function getGitHubUser(username: string): Promise<GitHubUser> {
  "use cache"
  cacheLife("hours")
  cacheTag(`github-user-${username}`)

  await delay(2000)

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`)
  }

  return response.json()
}

export async function DynamicContent() {
  const user = await getGitHubUser("peruzzoarthur")

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4">GitHub User (Cached)</h2>
      <img
        src={user.avatar_url}
        alt={user.login}
        width={100}
        height={100}
        className="rounded-full"
      />
      <h3 className="text-lg font-semibold mt-2">{user.name || user.login}</h3>
      {user.bio && <p className="text-gray-600">{user.bio}</p>}
      <div className="flex gap-4 mt-2">
        <span>{user.public_repos} repos</span>
        <span>{user.followers} followers</span>
        <span>{user.following} following</span>
      </div>
    </div>
  )
}
