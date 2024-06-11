import uid from "@/middleware/uid";
import locale from "@/middleware/locale";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export type TMiddleware = (
  request: NextRequest,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>;

export type TMiddlewareFactory = (mw: TMiddleware) => TMiddleware;

const stack = (middlewares: TMiddlewareFactory[], index = 0): TMiddleware => {
  const current = middlewares[index];
  if (current) {
    const next = stack(middlewares, index + 1);
    return current(next);
  }

  return (request: NextRequest, response: NextResponse) => response;
};

const middlewares = [uid];
export default stack(middlewares);
import { NextMiddlewareResult } from "next/dist/server/web/types";
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
