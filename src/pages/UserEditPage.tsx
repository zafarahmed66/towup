import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { UserData } from "./ProfilePage";

// Zod schema for form validation
const editUserSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Phone number should be exactly 10 digits.",
  }),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

export default function EditUserProfile() {
  const location = useLocation();
  const state = location.state as UserData;

  // Initialize react-hook-form with zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: state.user.fullname,
      email: state.user.email,
      phoneNumber: state.user.phoneNumber,
    },
  });

  // Submit function
  const onSubmit = async (data: EditUserFormValues) => {
    try {
      const updatedData = {
        appNotificationSetting: {
          ...state?.user?.appNotificationSetting,
        },
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
      await api.post("/users/me/update", updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
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
              Edit Profile
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[#3b5998]" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#3b5998]" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#3b5998]" />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  {...register("phoneNumber")}
                  placeholder="1234567890"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
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
