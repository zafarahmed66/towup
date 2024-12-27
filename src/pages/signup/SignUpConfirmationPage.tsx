import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import api from "@/controller/axiosController";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Mail, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function SignupConfirmationPage() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });
  const location = useLocation();

  const email = location.state.email || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
        handleSend();
    }
  }, [email]);

  if (!email) {
    return <Navigate to={"/login"} />;
  }

  const handleSend = async () => {
    setLoading(true);
    try {
      await api.post("/auth/send-verification-code", {
        email,
      });
      toast.success("Verification code sent successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 500) {
          toast.error(
            "An unexpected error occurred while sending verification code"
          );
        } else if (error.status === 404) {
          toast.error("User not found");
        } else if (error.response) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Please try again later");
        }
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      await api.post("/auth/verify-email", {
        email,
        code: data.pin,
      });
      toast.success("Email verified.");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          toast.error("User not found");
        } else if (error.response) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-md mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Mail className="h-16 w-16 text-[#3b5998]" />
          </div>
          <p className="text-center text-gray-600">
            We've sent a confirmation email to your address{" "}
            <span className="font-semibold"> {email} </span>. Please check your
            inbox and click on the verification link to validate your email and
            complete your signup.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center">
                      Enter the 6 digit code
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>

          <div className="space-y-4">
            <Button
              onClick={handleSend}
              disabled={loading}
              className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
            >
              Resend Verification Code
            </Button>
            <div className="text-center">
              <Link
                to="/signup"
                className="text-[#3b5998] hover:underline inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Signup
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
