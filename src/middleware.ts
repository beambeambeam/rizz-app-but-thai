import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.method === "POST") {
    // apply your logic here
    console.log(request);
  }
}

export const config = {
  matcher: "/",
};
