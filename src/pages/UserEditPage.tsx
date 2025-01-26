import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, ArrowLeft, LockIcon, Pencil } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { profileType, UserData } from "./ProfilePage";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Define the base schema
const baseSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Phone number should be exactly 10 digits.",
  }),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});

// Schema with password validation
const schemaWithPassword = z
  .object({
    fullName: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z.string().regex(/^\d{10}$/, {
      message: "Phone number should be exactly 10 digits.",
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
        message: "Password should be at least 12 characters long.",
      })
      .regex(/[a-z]/, {
        message: "Password should contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password should contain at least one uppercase letter.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schemaWithPassword>;

export default function EditUserProfile() {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const location = useLocation();
  const state = location.state as UserData;
  const navigate = useNavigate();
  const { userType } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(isEditingPassword ? schemaWithPassword : baseSchema),
    defaultValues: {
      fullName: state.user.fullname,
      email: state.user.email,
      phoneNumber: state.user.phoneNumber.toString(),
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset({
      fullName: state.user.fullname,
      email: state.user.email,
      phoneNumber: state.user.phoneNumber.toString(),
      password: "",
      confirmPassword: "",
    });
  }, [reset, state.user]);

  const onSubmit = async (data: FormValues) => {
    try {
      const updatedData: {
        fullname: string;
        email: string;
        phoneNumber: number;
        password?: string;
      } = {
        fullname: data.fullName,
        email: data.email,
        phoneNumber: Number(data.phoneNumber),
      };

      if (isEditingPassword && data.password) {
        updatedData.password = data.password;
      }

      await api.post("/users/me/update", updatedData);
      toast.success("Profile updated successfully!");
      if (userType) {
        navigate(`${profileType[userType]}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <Link
          to={`${profileType[userType!]}`}
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <LockIcon className="h-4 w-4 text-[#3b5998]" />
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                    className="text-blue-500 hover:underline"
                  >
                    <Pencil />
                  </button>
                </div>
                {isEditingPassword && (
                  <>
                    <Input
                      id="password"
                      type="password"
                      {...register("password")}
                      placeholder="Enter new password"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </>
                )}
              </div>

              {isEditingPassword && (
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2"
                  >
                    <LockIcon className="h-4 w-4 text-[#3b5998]" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

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
