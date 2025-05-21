import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { useLoginUser } from "../../mutations/login";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateVendor } from "../../mutations/register-vendor";
import { FaSpinner } from "react-icons/fa";
import { useLoginVendor } from "../../mutations/login-vendor";
import { usePathname } from "next/navigation";
import { useCreateAdmin } from "../../mutations/register-admin";

interface AuthFormProps {
  variant: string;
}

const signupDefaultValues = {
  name: "",
  email: "",
  password: "",
};

const loginDefaultValues = {
  email: "",
  password: "",
};

const AuthForm = ({ variant }: AuthFormProps) => {
  const { toast } = useToast();
  const pathname = usePathname();

  const { mutateAsync: loginUser, isPending } = useLoginUser();
  // const { mutateAsync: loginVendor, isPending: isVendorPending } =
  //   useLoginVendor();
  //   const { mutateAsync: registerAdmin, isPending: isAdminPending } =
  //     useCreateAdmin();
  const { mutateAsync: registerVendor, isPending: isLoading } =
    useCreateVendor();

  const formSchema = z.object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long.",
      })
      .optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z
      .string()
      .min(4, {
        message: "Password must be at least 4 characters long.",
      })
      .max(10, {
        message: "Password must be no more than 10 characters long.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      variant === "login" ? loginDefaultValues : signupDefaultValues,
  });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  const login = async (values: { email: string; password: string }) => {
    try {
      await loginUser(values);
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong!",
      });
    }
  };

  const register = async (values: z.infer<typeof formSchema>) => {
    try {
      // Ensure name is provided for vendor registration
      if (!values.name) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Name is required for registration.",
        });
        return;
      }

      await registerVendor({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast({
        title: "Success",
        description: "Successfully Created Vendor Account!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jack Smith"
                      {...field}
                      className="dark:border-orange-400"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@example.com"
                    {...field}
                    className="dark:border-orange-400"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    className="dark:border-orange-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-primary w-full hover:bg-orange-600 disabled:bg-gray-400"
          >
            Submit
            {(isPending || isLoading) && (
              <span className="ml-2 text-sm">
                <FaSpinner className="animate-spin" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
