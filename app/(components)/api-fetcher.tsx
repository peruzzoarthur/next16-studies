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

export async function ApiFetcher() {
  const response = await fetch("http://localhost:3000/api/github/user", {
    cache: "no-store", 
  })

  if (!response.ok) {
    throw new Error("Failed to fetch user from API")
  }

  const user: GitHubUser = await response.json()

  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-bold mb-4">GitHub User (via API Route)</h2>
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
