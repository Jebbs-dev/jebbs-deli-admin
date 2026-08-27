import { useState } from "react";
import { Image } from "@unpic/react";
import { createFileRoute } from "@tanstack/react-router";
import AuthForm, {
  type AuthVariant,
} from "@/modules/auth/components/forms/AuthForm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function Wordmark() {
  return (
    <p className="font-sans text-[1.375rem] font-bold leading-none tracking-tight text-foreground md:text-[1.625rem]">
      deli<span className="text-primary">.</span>
    </p>
  );
}

function AuthPage() {
  const [variant, setVariant] = useState<AuthVariant>("login");
  const isLogin = variant === "login";

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground lg:grid lg:h-svh lg:grid-cols-[minmax(20rem,32rem)_minmax(0,1fr)] lg:grid-rows-[auto_minmax(0,1fr)]">
      <header className="flex items-center justify-between px-5 pt-5 pb-4 md:px-12 lg:col-start-1 lg:row-start-1 lg:px-16 lg:pt-8 lg:pb-0">
        <Wordmark />
        <span className="font-sans text-[11px] font-semibold tracking-wide text-muted-foreground md:hidden">
          OPS
        </span>
      </header>

      <section
        className="relative hidden h-72 overflow-hidden md:block lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-full"
        aria-hidden="true"
      >
        <Image
          src="/auth-bg.jpg"
          alt=""
          layout="fullWidth"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/25 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/45" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1.5 p-8 lg:p-12">
          <p className="text-[11px] font-medium tracking-wide text-zinc-200 dark:hidden">
            LAGOS · OPS
          </p>
          <p className="hidden text-[11px] font-medium tracking-wide text-zinc-400 dark:block">
            NIGHT SERVICE
          </p>
          <p className="max-w-[22ch] font-sans text-xl font-semibold leading-snug text-zinc-50 lg:text-[1.75rem] dark:hidden">
            The kitchen ticket, on every order.
          </p>
          <p className="hidden max-w-[22ch] font-sans text-xl font-semibold leading-snug text-zinc-50 lg:text-[1.75rem] dark:block">
            The board never really closes.
          </p>
        </div>
      </section>

      <div className="flex flex-1 flex-col justify-start px-5 pb-10 pt-4 md:px-12 md:pb-10 lg:col-start-1 lg:row-start-2 lg:justify-center lg:px-16 lg:pt-0 lg:pb-10">
        <div className="mx-auto w-full max-w-[27rem] md:mx-0">
          <h1 className="font-sans text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground md:text-[2rem]">
            {isLogin ? "Sign in to Deli ops" : "Open a vendor account"}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            {isLogin
              ? "Email and password. We’ll route you as admin, vendor, or rider."
              : "For kitchens joining the Deli network — not a shopper signup."}
          </p>

          <div className="mt-8">
            <AuthForm variant={variant} />
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {isLogin ? "Need a kitchen on Deli? " : "Already on the pass? "}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm font-semibold text-primary"
              onClick={() =>
                setVariant((current) =>
                  current === "login" ? "register" : "login",
                )
              }
            >
              {isLogin ? "Create a vendor account" : "Sign in"}
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
