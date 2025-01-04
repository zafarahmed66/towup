import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, Lock, Building2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import apiClient from "@/controller/axiosController";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const formSchema = z
  .object({
    operatorName: z
      .string()
      .min(2, {
        message: "Operator Name is required.",
      })
      .max(500, {
        message: "Operator Name cannot be more than 500 characters",
      }),
    licenseNumber: z.string().min(2, {
      message: "Liscence Number is required",
    }),
    fullName: z.string().min(2, {
      message: "User fullname is required",
    }),
    password: z
      .string()
      .min(12, {
        message: "Password should be at least 12 characters long.",
      })
      .regex(/[a-z]/, {
        message: "Password should contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password should contain at least one uppercase letter.",
      }),
    confirmPassword: z
      .string()
      .min(12, {
        message: "Confirm password should be at least 12 characters long.",
      })
      .regex(/[a-z]/, {
        message:
          "Confirm password should contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message:
          "Confirm password should contain at least one uppercase letter.",
      }),
    phoneNumber: z.string().regex(/^\d{10}$/, {
      message: "Phone number should be exactly 10 digits.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function TowTruckOperatorSignUpForm() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  console.log(email);
  console.log(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      operatorName: "",
      licenseNumber: "",
      fullName: "",
      password: "",
      phoneNumber: "",
    },
  });

  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { operatorName, licenseNumber, phoneNumber, fullName, password } =
      values;

    const data = {
      token,
      operatorName,
      licenseNumber,
      user: {
        email,
        fullname: fullName,
        password,
        phoneNumber,
      },
    };

    try {
      await apiClient.post("/api/towtruckoperators/signup", data);
      toast.success("Sign up successful");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          toast.error("Valid token is required.");
        } else {
          toast.error(error.response?.data.message);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();

    if (isValid) {
      form.handleSubmit(onSubmit)(e);
    } else {
      console.log(form.getValues());
      toast.error("Please, ensure all fields are valid");
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-2xl mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Sign Up as Tow Truck Operator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Operator Information
                  </h3>

                  <FormField
                    control={form.control}
                    name="operatorName"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="operatorName"
                          className="flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4 text-[#3b5998]" />
                          Operator Name
                        </FormLabel>
                        <Input
                          id="operatorName"
                          placeholder="Fleet Operations Inc"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="licenseNumber"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4 text-[#3b5998]" />
                          License Number
                        </FormLabel>
                        <Input
                          id="licenseNumber"
                          placeholder="(555) 987-6543"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                  >
                    Next
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Account Information
                  </h3>
                  {/* Full Name  */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="fullName"
                          className="flex items-center gap-2"
                        >
                          <User className="h-4 w-4 text-[#3b5998]" />
                          Full Name
                        </FormLabel>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Phone Number  */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="phoneNumber"
                          className="flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4 text-[#3b5998]" />
                          Phone Number
                        </FormLabel>

                        <Input
                          id="phoneNumber"
                          placeholder="(555) 987-6543"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Password  */}
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
                          id="password"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="confirmPassword"
                          className="flex items-center gap-2"
                        >
                          <Lock className="h-4 w-4 text-[#3b5998]" />
                          Confirm Password
                        </FormLabel>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="******"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-1/2 text-gray-800 bg-gray-300 hover:bg-gray-400"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                    >
                      Complete Signup
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3b5998] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
