import { NextResponse, type NextRequest } from "next/server"

const REPOSITORY_DOCUMENT_PATHS = [
  /^\/(?:PROD_SPEC|LESSONS_LEARNED|AGENTS|CLAUDE|CODEX|GEMINI|README|TODO)\.md$/i,
  /^\/PROJECT(?:\/|$)/i,
  /^\/(?:Docs|docs)(?:\/|$)/i,
  /^\/(?:\.claude|\.codex)(?:\/|$)/i,
]

function blockRepositoryDocumentAccess() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  })
}

export function middleware(request: NextRequest) {
  if (
    REPOSITORY_DOCUMENT_PATHS.some((pattern) =>
      pattern.test(request.nextUrl.pathname),
    )
  ) {
    return blockRepositoryDocumentAccess()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/PROD_SPEC.md",
    "/LESSONS_LEARNED.md",
    "/AGENTS.md",
    "/CLAUDE.md",
    "/CODEX.md",
    "/GEMINI.md",
    "/README.md",
    "/TODO.md",
    "/PROJECT/:path*",
    "/docs/:path*",
    "/Docs/:path*",
    "/.claude/:path*",
    "/.codex/:path*",
  ],
}
