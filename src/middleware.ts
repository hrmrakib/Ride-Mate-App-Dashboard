import { NextResponse } from "next/server";
import { getCurrentUser } from "./service/authService";

import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = await getCurrentUser();

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
