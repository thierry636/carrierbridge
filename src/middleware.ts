import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - api / trpc routes
  // - static files (_next, _vercel, *.* files like favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
