import { NextRequest, NextResponse } from 'next/server'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username'); 

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  await delay(2000)

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: response.status }
    )
  }

  const data = await response.json()
  return NextResponse.json(data)
}
