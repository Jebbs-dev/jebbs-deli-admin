import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginWithRoleDetection } from "../../mutations/login";
import { useCreateVendor } from "../../mutations/register-vendor";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export type AuthVariant = "login" | "register";

interface AuthFormProps {
  variant: AuthVariant;
}

const loginDefaults = { name: "", email: "", password: "" };
const registerDefaults = { name: "", email: "", password: "" };

const fieldClass =
  "h-11 text-base text-foreground shadow-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 dark:border-border dark:bg-secondary";

const AuthForm = ({ variant }: AuthFormProps) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: loginUser, isPending: isLoggingIn } =
    useLoginWithRoleDetection();
  const { mutateAsync: registerVendor, isPending: isRegistering } =
    useCreateVendor();

  const formSchema = z
    .object({
      name: z.string().optional(),
      email: z.string().email({
        message: "Please enter a valid email address.",
      }),
      password: z.string().min(6, {
        message: "Password must be at least 6 characters long.",
      }),
    })
    .superRefine((data, ctx) => {
      if (variant !== "register") return;
      const name = data.name?.trim() ?? "";
      if (name.length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Name must be at least 3 characters long.",
          path: ["name"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: variant === "login" ? loginDefaults : registerDefaults,
  });

  useEffect(() => {
    form.reset(variant === "login" ? loginDefaults : registerDefaults);
    setShowPassword(false);
  }, [variant, form]);

  const login = async (values: { email: string; password: string }) => {
    try {
      await loginUser(values);
    } catch {
      /* toast handled in mutation */
    }
  };

  const register = async (values: z.infer<typeof formSchema>) => {
    const name = values.name?.trim();
    if (!name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name is required for registration.",
      });
      return;
    }

    try {
      await registerVendor({
        name,
        email: values.email,
        password: values.password,
      });
    } catch {
      /* toast handled in mutation */
    }
  };

  const busy = isLoggingIn || isRegistering || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={
          variant === "login"
            ? form.handleSubmit(login)
            : form.handleSubmit(register)
        }
        className="space-y-4"
      >
        {variant === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[13px] font-medium text-muted-foreground">
                  Kitchen / vendor name
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="organization"
                    placeholder="Ada’s Jollof"
                    {...field}
                    className={fieldClass}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[13px] font-medium text-muted-foreground">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="ada@jollof.kitchen"
                  {...field}
                  className={fieldClass}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[13px] font-medium text-muted-foreground">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      variant === "login" ? "current-password" : "new-password"
                    }
                    placeholder="••••••••"
                    {...field}
                    className={cn(fieldClass, "pr-16")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 h-8 -translate-y-1/2 px-2 text-[13px] font-medium text-primary hover:bg-transparent hover:text-primary"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-pressed={showPassword}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={busy}
          className="h-11 w-full text-[15px] font-semibold dark:text-zinc-950"
        >
          {variant === "login" ? "Sign in" : "Create vendor account"}
          {busy && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
