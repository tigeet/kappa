import { TMiddleware, TMiddlewareFactory } from "@/middleware";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const middleware: TMiddlewareFactory =
  (next: TMiddleware) => (request: NextRequest, response: NextResponse) => {
    if (
      request.nextUrl.pathname.startsWith("/_next") ||
      request.nextUrl.pathname.includes("/api/") ||
      PUBLIC_FILE.test(request.nextUrl.pathname)
    ) {
      return next(request, response);
    }

    if (request.nextUrl.locale === "default") {
      const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
      response.cookies.set("locale", locale);

      // const response = NextResponse.redirect(
      //   new URL(
      //     `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
      //     request.url
      //   )
      // );

      return next(request, response);
    }

    return next(request, response);
  };

export default middleware;
