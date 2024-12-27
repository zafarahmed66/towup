import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import axiosClient from "@/controller/axiosController";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should be atleast 6 character long.",
  }),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axiosClient.post("/api/login", values);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          toast.error("Email not verified.");
          navigate("/signup-confirmation-page", {
            state: { email: values.email },
          });
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-md mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Log in to TowUp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel
                      htmlFor="email"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-[#3b5998]" />
                      Email
                    </FormLabel>
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="space-y-2">
                    <FormLabel
                      htmlFor="password"
                      className="flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4 text-[#3b5998]" />
                      Password
                    </FormLabel>
                    <Input
                      type="password"
                      id="password"
                      placeholder="******"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
              >
                Log In
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#3b5998] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link to="#" className="text-sm text-[#3b5998] hover:underline">
              Forgot your password?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
