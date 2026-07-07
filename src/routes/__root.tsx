import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gold-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The dish you're looking for isn't on the menu.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lazeez Thai Chinese & Kabab — Authentic Flavors in Dhaka" },
      { name: "description", content: "Premium Thai, Chinese & Pakistani cuisine in Lalbagh, Dhaka. Fresh ingredients, authentic recipes, unforgettable taste. Order online today." },
      { property: "og:title", content: "Lazeez Thai Chinese & Kabab — Authentic Flavors in Dhaka" },
      { property: "og:description", content: "Premium Thai, Chinese & Pakistani cuisine in Lalbagh, Dhaka. Fresh ingredients, authentic recipes, unforgettable taste. Order online today." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lazeez" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lazeez Thai Chinese & Kabab — Authentic Flavors in Dhaka" },
      { name: "twitter:description", content: "Premium Thai, Chinese & Pakistani cuisine in Lalbagh, Dhaka. Fresh ingredients, authentic recipes, unforgettable taste. Order online today." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/diWIV2sldidiuKxrqrQYNbJx4Y13/social-images/social-1781626212669-FB_IMG_1781624853801.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/diWIV2sldidiuKxrqrQYNbJx4Y13/social-images/social-1781626212669-FB_IMG_1781624853801.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/__l5e/assets-v1/1a420a7b-b149-42ed-bf9b-b417ee2396df/lazeez-logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
