/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import useCookie from "@/hooks/useCookie";
import { UserData } from "./ProfilePage";

const editAccountSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d{4,10}$/, "Invalid postal code"),
});

type EditAccountFormValues = z.infer<typeof editAccountSchema>;

export default function EditAccountDetails() {
  const location = useLocation();
  const state = location.state as UserData;

  const [userType] = useCookie("userType", "");

  const {
    companyName,
    phoneNumber,
    address: { street, city, state: addrState, country, postalCode },
  } = state;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditAccountFormValues>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      company: companyName,
      phone: phoneNumber.toString(),
      street,
      city,
      state: addrState,
      country,
      postalCode,
    },
  });

  const navigate = useNavigate();

const onSubmit = async (data: EditAccountFormValues) => {
  try {
    const updatedData: any = {
      companyName: data.company,
      phoneNumber: Number(data.phone),
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    };


    await api.post(
      `/api/${userType === "FLEET_OWNER" ? "fleetowners" : "repo-companies"}/me/update`,
      updatedData
    );
    toast.success("Account details updated successfully!");
    navigate("/profile");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update account details.");
  }
};

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <Link
          to="/profile"
          className="flex items-center mb-4 text-white hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#2B4380] mb-6">
              Edit Account Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#3b5998]" />
                  Company Name
                </Label>
                <Input
                  id="company"
                  placeholder="Fleet Operations Inc"
                  {...register("company")}
                />
                {errors.company && (
                  <p className="text-sm text-red-500">
                    {errors.company.message}
                  </p>
                )}
              </div>

              {/* Company Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#3b5998]" />
                  Company Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Address Fields */}
              <h3 className="text-xl font-semibold text-[#2B4380] mt-4">
                Address Details
              </h3>

              <div className="space-y-2">
                <Label htmlFor="street" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#3b5998]" />
                  Street
                </Label>
                <Input
                  id="street"
                  placeholder="123 Fleet Street"
                  {...register("street")}
                />
                {errors.street && (
                  <p className="text-sm text-red-500">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="San Francisco"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="California"
                    {...register("state")}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="USA"
                    {...register("country")}
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="94105"
                    {...register("postalCode")}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white disabled:bg-[#3b5998]/100"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
