import { NextResponse } from "next/server";
import type { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";
import makeHex from "@/lib/utils/makeHex";
import { TMiddleware, TMiddlewareFactory } from "@/middleware";

const middleware: TMiddlewareFactory =
  (next: TMiddleware) => (request: NextRequest, response: NextResponse) => {
    response = NextResponse.next();
    if (request.cookies.has("uid")) return next(request, response);

    const uid = makeHex(16);
    response.cookies.set("uid", uid);

    return next(request, response);
  };
export default middleware;
