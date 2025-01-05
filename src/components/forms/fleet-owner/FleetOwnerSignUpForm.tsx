import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  MapPin,
  Settings,
  Bell,
  MapPinHouse,
  FlagTriangleRight,
  MapIcon,
  MapPinned,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import apiClient from "@/controller/axiosController";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const formSchema = z
  .object({
    companyName: z
      .string()
      .min(2, {
        message: "Company Name is required.",
      })
      .max(500, {
        message: "Company Name cannot be more than 500 characters",
      }),
    companyPhone: z.string().regex(/^\d{10}$/, {
      message: "Phone number should be exactly 10 digits.",
    }),
    street: z.string().min(2, {
      message: "Street address is required",
    }),
    city: z.string().min(2, {
      message: "City address is required",
    }),
    state: z.string().min(2, {
      message: "State address is required",
    }),
    country: z.string().min(2, {
      message: "Country name is required",
    }),
    postalCode: z.string().min(2, {
      message: "Postal Code is required",
    }),
    fullName: z.string().min(2, {
      message: "User fullname is required",
    }),
    email: z.string().email(),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, {
        message: "Phone number should be exactly 10 digits.",
      })
      .optional(),
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

    telematicsProvider: z.string().min(2, {
      message: "TelematicsProvider is required",
    }),
    apiKey: z.string().min(2, {
      message: "API key is required",
    }),

    emailNotification: z.boolean().default(true),
    smsNotification: z.boolean().default(true),
    pushNotification: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function FleetOwnerSignupPage() {
  const [useCompanyPhone, setUseCompanyPhone] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      state: "",
      street: "",
      city: "",
      postalCode: "",
      country: "",
      telematicsProvider: "",
      apiKey: "",
      fullName: "",
      password: "",
      email: "",
      emailNotification: true,
      smsNotification: true,
      pushNotification: true,
    },
  });

  const navigate = useNavigate();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      apiKey,
      city,
      companyName,
      companyPhone,
      country,
      email,
      emailNotification,
      fullName,
      password,
      postalCode,
      pushNotification,
      smsNotification,
      state,
      street,
      telematicsProvider,
      phoneNumber,
    } = values;

    const data = {
      companyName,
      phoneNumber: Number(companyPhone),
      operationalRegions: selectedRegions,
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
      telematicSettings: {
        telematicProvider: telematicsProvider,
        telematicApiKey: apiKey,
      },
      user: {
        email,
        fullname: fullName,
        password,
        phoneNumber: useCompanyPhone ? companyPhone : phoneNumber,
        appNotificationSetting: {
          emailNotificationEnabled: emailNotification,
          smsNotificationEnabled: smsNotification,
          appNotificationEnabled: pushNotification,
        },
      },
    };

    try {
      await apiClient.post("/api/fleetowners/signup", data);
      toast.success("Sign up successful");
      navigate("/signup-confirmation", {
        state: {
          email,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await form.trigger();
    console.log(form.getValues());

    if (isValid) {
      form.handleSubmit(onSubmit)(e);
    } else {
      toast.error("Please, ensure all fields are valid");
    }
  };

  const handleRegionSelect = (value: string) => {
    if (!selectedRegions.includes(value)) {
      setSelectedRegions([...selectedRegions, value]);
    }
  };

  const removeRegion = (region: string) => {
    setSelectedRegions(selectedRegions.filter((r) => r !== region));
  };

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-2xl mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Sign Up as Fleet Owner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Company Information
                  </h3>

                  {/* Company Name  */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="company"
                          className="flex items-center gap-2"
                        >
                          <Building2 className="h-4 w-4 text-[#3b5998]" />
                          Company Name
                        </FormLabel>
                        <Input
                          id="company"
                          placeholder="Fleet Operations Inc"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Company Phone  */}
                  <FormField
                    control={form.control}
                    name="companyPhone"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="companyPhone"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4 text-[#3b5998]" />
                          Company Phone
                        </FormLabel>

                        <Input
                          id="companyPhone"
                          type="tel"
                          placeholder="(555) 987-6543"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Company Address  */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {/* Street Address  */}
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel
                            htmlFor="street"
                            className="flex items-center gap-2"
                          >
                            <MapPinHouse className="h-4 w-4 text-[#3b5998]" />
                            Street Address
                          </FormLabel>
                          <Input
                            id="street"
                            placeholder="123 Fleet Street"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* City Address  */}
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel
                            htmlFor="city"
                            className="flex items-center gap-2"
                          >
                            <Building2 className="h-4 w-4 text-[#3b5998]" />
                            City Address
                          </FormLabel>
                          <Input
                            id="City"
                            placeholder="San Francisco"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {/* Country  */}
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel
                            htmlFor="country"
                            className="flex items-center gap-2"
                          >
                            <FlagTriangleRight className="h-4 w-4 text-[#3b5998]" />
                            Country Address
                          </FormLabel>
                          <Input
                            id="country"
                            placeholder="United States"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* Postal Code  */}
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <FormLabel
                            htmlFor="postalCode"
                            className="flex items-center gap-2"
                          >
                            <MapIcon className="h-4 w-4 text-[#3b5998]" />
                            Postal Code
                          </FormLabel>
                          <Input
                            id="postalCode"
                            placeholder="94105"
                            {...field}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>

                  {/* State Address */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="state"
                          className="flex items-center gap-2"
                        >
                          <MapPinned className="h-4 w-4 text-[#3b5998]" />
                          State Address
                        </FormLabel>
                        <Input
                          id="state"
                          placeholder="United States"
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

                  {/* Email  */}
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
                          placeholder="john@gmail.com"
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="phoneNumber"
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4 text-[#3b5998]" />
                          Phone Number
                        </FormLabel>
                        <div className="flex items-center mb-2 space-x-2">
                          <Checkbox
                            id="useCompanyPhone"
                            checked={useCompanyPhone}
                            onCheckedChange={(checked) =>
                              setUseCompanyPhone(checked as boolean)
                            }
                          />
                          <label
                            htmlFor="useCompanyPhone"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Use company phone
                          </label>
                        </div>

                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="(555) 987-6543"
                          value={
                            useCompanyPhone
                              ? form.getValues("companyPhone")
                              : field.value
                          }
                          disabled={useCompanyPhone}
                          onChange={(e) => {
                            if (!useCompanyPhone) {
                              form.setValue("phoneNumber", e.target.value);
                            } else {
                              form.setValue(
                                "phoneNumber",
                                form.getValues("companyPhone")
                              );
                            }
                          }}
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
                      type="button"
                      onClick={nextStep}
                      className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Telematics Information
                  </h3>

                  {/* Telematics Provider  */}
                  <FormField
                    control={form.control}
                    name="telematicsProvider"
                    render={() => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="telematicsProvider"
                          className="flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4 text-[#3b5998]" />
                          Telematics Provider
                        </FormLabel>
                        <Select
                          onValueChange={(value) => {
                            form.setValue("telematicsProvider", value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select telematics provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="TEST">TEST</SelectItem>
                            <SelectItem value="geotab">GeoTab</SelectItem>
                            <SelectItem value="samsara">Samsara</SelectItem>
                            <SelectItem value="test">Test</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </div>
                    )}
                  />

                  {/* Telematics API Key  */}
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <div className="space-y-2">
                        <FormLabel
                          htmlFor="apiKey"
                          className="flex items-center gap-2"
                        >
                          <Lock className="h-4 w-4 text-[#3b5998]" />
                          API Key
                        </FormLabel>
                        <Input
                          id="apiKey"
                          placeholder="Test_API_KEY"
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
                      type="button"
                      onClick={nextStep}
                      className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {step === 4 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Operational Regions
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="region"
                        className="flex items-center gap-2"
                      >
                        <MapPin className="h-4 w-4 text-[#3b5998]" />
                        Select Region
                      </Label>
                      <Select onValueChange={handleRegionSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW_YORK_METRO">
                            New York Region
                          </SelectItem>
                          <SelectItem value="SAN_FRANCISCO_BAY">
                            San Francisco Region
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegions.map((region) => (
                        <div
                          key={region}
                          className="bg-[#3b5998] text-white px-3 py-1 rounded-full flex items-center"
                        >
                          <span>{region}</span>
                          <button
                            type="button"
                            onClick={() => removeRegion(region)}
                            className="ml-2 focus:outline-none"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-1/2 text-gray-800 bg-gray-300 hover:bg-gray-400"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
              {step === 5 && (
                <>
                  <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                    Configure Notifications
                  </h3>
                  <div className="space-y-4">
                    {/* Email Notification  */}
                    <FormField
                      control={form.control}
                      name="emailNotification"
                      render={() => (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-[#3b5998]" />
                            <FormLabel
                              htmlFor="emailNotification"
                              className="text-sm font-medium"
                            >
                              Email Notifications
                            </FormLabel>
                          </div>
                          <Switch
                            id="emailNotification"
                            checked={form.getValues("emailNotification")}
                            onCheckedChange={(checked) =>
                              form.setValue("emailNotification", checked)
                            }
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* SMS Notification  */}
                    <FormField
                      control={form.control}
                      name="smsNotification"
                      render={() => (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-[#3b5998]" />
                            <FormLabel
                              htmlFor="smsNotification"
                              className="text-sm font-medium"
                            >
                              SMS Notifications
                            </FormLabel>
                          </div>
                          <Switch
                            id="smsNotification"
                            checked={form.getValues("smsNotification")}
                            onCheckedChange={(checked) =>
                              form.setValue("smsNotification", checked)
                            }
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    {/* Push Notification  */}
                    <FormField
                      control={form.control}
                      name="pushNotification"
                      render={() => (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bell className="h-4 w-4 text-[#3b5998]" />
                            <FormLabel
                              htmlFor="pushNotification"
                              className="text-sm font-medium"
                            >
                              SMS Notifications
                            </FormLabel>
                          </div>
                          <Switch
                            id="pushNotification"
                            checked={form.getValues("pushNotification")}
                            onCheckedChange={(checked) =>
                              form.setValue("pushNotification", checked)
                            }
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
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
